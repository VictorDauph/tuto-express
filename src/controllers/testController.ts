
import { Request, Response } from "express";

export function test(req: Request, res: Response) {

    res.send("wesh");
}

export function test2(req: Request, res: Response) {
    res.send(req.body);
}

export function protectedTest(req: Request, res: Response) {
    const decodeUser = JSON.parse(req.headers.user as string);
    res.send(decodeUser)
}