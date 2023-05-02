import { Response, Request, NextFunction} from "express";
class AuthorizationMiddleware {
    checkKey(req: Request, res: Response, next: NextFunction) {
        if (req.headers.x_auth !== process.env.X_AUTH) {
            res.sendStatus(401);
            return;
        } else {
            next();
        }
    }
}

export = new AuthorizationMiddleware();
