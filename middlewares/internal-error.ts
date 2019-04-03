import {Request, Response, NextFunction} from 'express';


export const internalErrorMiddleWare = (err, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error: ${err}` );
    res.status(500).json({code:500, data: err, message: 'internal system error'})
    
}