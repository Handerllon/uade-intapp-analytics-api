import { Request, Response } from "express";

export class DeepRacerAnalysisController {


    async index(req: Request, res: Response): Promise<any> {
        try {
            res.status(200).json({ message: 'Resource Index' });
        } catch (err) {
            res.status(500).json({ error: 'An error ocurred: ' + err.message });
        }
    }

    async upload(req: Request, res: Response): Promise<any> {
        try {
            res.status(200).json({ message: 'Resource Upload' });
        } catch (err) {
            res.status(500).json({ error: 'An error ocurred: ' + err.message });
        }
    }

}