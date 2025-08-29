import type { RequestHandler } from "express";

const checkSession: RequestHandler = (req, res, next): void => {
    try {
        if(req.session.email) {
            next();
        } else {
            res.redirect('/');
        }
    } catch (error) {
        next(error);
    }
}

export default checkSession;