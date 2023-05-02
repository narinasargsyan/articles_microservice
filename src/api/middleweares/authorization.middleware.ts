class AuthorizationMiddleware {
    checkKey(req, res, next) {
        if (req.headers.x_auth !== process.env.X_AUTH) {
            res.sendStatus(401);
            return;
        } else {
            next();
        }
    }
}

export = new AuthorizationMiddleware();
