import JWT from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from './error-handler';


const token:string[] = ['auth' , 'seller', 'gig', 'order', 'buyer', 'review', 'message', 'search'];


export function verifyGatewatRequest (req:Request, res:Response, next: NextFunction) : void {
    if( !req.headers?.gatewatroken) {
        throw new NotAuthorizedError('Invalid Request', '[method]: verifyGatewatRequest() [detail]: Request is not comming from api gateway');
    }
    const token : string = req.headers.gatewatroken as string;
    if (!token) {
        throw new NotAuthorizedError('Invalid Request', '[method]: verifyGatewatRequest() [detail]: Request is not comming from api gateway');
    }

    try{
        const payload: { id: string, iat: number} = JWT.verify(token, '') as { id: string, iat: number };
        if (!token.includes(payload.id)) {
            throw new NotAuthorizedError('Invalid Request', '[method]: verifyGatewatRequest() [detail]: Request is not comming from api gateway');
        }
        
    }catch (error) {
        throw new NotAuthorizedError('Invalid Request', '[method]: verifyGatewatRequest() [detail]: Request is not comming from api gateway');
    }
}