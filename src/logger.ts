
import wiston, { Logger } from 'winston';
import { TransformedData, ElasticsearchTransformer, ElasticsearchTransport, LogData } from 'winston-elasticsearch';


const esTransformer = (logDate: LogData): TransformedData => {
    return ElasticsearchTransformer(logDate);
}

export const wistonLogger = (elasticsearchNode: string, name: string, level: string): Logger => {
    const option = {
        console: {
            level: level,
            handleExceptions: true,
            json: true,
            colorize: true
        },
        elasticsearch: {
            level: level,
            clientOpts: {
                node: elasticsearchNode,
                maxRetries: 5,
                log: level,
                requestTimeout: 60000,
                SniffOptions: false
            },
            transformer: esTransformer
        }
    };

    const esTransporter: ElasticsearchTransport = new ElasticsearchTransport(option.elasticsearch);
    const logger:Logger = wiston.createLogger({
        exitOnError: false,
        defaultMeta: { service: name },
        transports:[ new wiston.transports.Console(option.console), esTransporter],
    });
    return logger;
}
  