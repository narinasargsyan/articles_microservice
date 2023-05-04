import AuthService from "common_auth";
import { Response, Request, NextFunction} from "express";
import db from "../../db/models";

class AuthorizationMiddleware {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService(db.redis);
    }

    static checkKey(req: Request, res: Response, next: NextFunction) {
        if (req.headers.x_auth !== process.env.X_AUTH) {
            res.sendStatus(401);
            return;
        } else {
            next();
        }
    }

    async authenticate(req: Request & { payload: string , accessToken: string }, res: Response, next: NextFunction) {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                res.status(401).send("Token not provided");
            }

            const token = authorization.split("Bearer ")[1].trim();

            if (!token) {
                res.status(401).send("Token not provided");
            }
            const isTokenExistOnRedis = await this.authService.getTokenFromRedis(
                `accessToken:${token}`
            );

            if (!isTokenExistOnRedis) {
                res.status(401).send("Invalid token");
            }
            const isAccessTokenVerified = await this.authService.verifyAccessToken(token);
            if (!isAccessTokenVerified) {
                res.status(401).send("Invalid token");
            }
            if(!isAccessTokenVerified.isUser) {
              res.status(401).send("Permission denied")
            }

            req.payload = isAccessTokenVerified;
            req.accessToken = token;
            return next();
        } catch (e) {
            return next(e);
        }
    }

    async authenticateAdmin(req: Request & { payload: string , accessToken: string }, res: Response, next: NextFunction) {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                res.status(401).send("Token not provided");
            }

            const token = authorization.split("Bearer ")[1].trim();

            if (!token) {
                res.status(401).send("Token not provided");
            }
            const isTokenExistOnRedis = await this.authService.getTokenFromRedis(
                `accessToken:${token}`
            );

            if (!isTokenExistOnRedis) {
                res.status(401).send("Invalid token");
            }
            const isAccessTokenVerified = await this.authService.verifyAccessToken(token);
            if (!isAccessTokenVerified) {
                res.status(401).send("Invalid token");
            }
            if(!isAccessTokenVerified.isAdmin) {
                res.status(401).send("Permission denied")
            }

            req.payload = isAccessTokenVerified;
            req.accessToken = token;
            return next();
        } catch (e) {
            return next(e);
        }
    }
}

export = AuthorizationMiddleware;
