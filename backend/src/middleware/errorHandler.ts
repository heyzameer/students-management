import type { Request, Response, NextFunction } from "express";

//setting the interface for error object
interface customeError extends Error {
    status?: number;
}

//this middleware function for send error response to the client
export function errorHandler(err: customeError, req: Request, res: Response, next: NextFunction): void {

    //consoling the error details for debugging
    console.error(err.stack);

    //error respose
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
    });
}