
import { Request, Response } from "express";

export function test(req: Request, res: Response) {
    res.send("wesh");
}

export function test2(req: Request, res: Response) {
    res.send(req.body);
}
