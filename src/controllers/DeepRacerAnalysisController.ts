const fs = require('fs');
import { Request, Response } from "express";
import { generateTrainingNotebook, initPythonEnv } from "../share/system/process";

export class DeepRacerAnalysisController {


    async getTraining(req: Request, res: Response): Promise<any> {
        const filePath = 'boards/html/Training_analysis.html';
        try {
            generateTrainingNotebook()

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).send('Error reading the HTML file');
                }

                res.setHeader('Content-Type', 'text/html');
                res.send(data);
            });
        } catch (err) {
            res.status(500).json({ error: 'An error ocurred: ' + err.message });
        }
    }

    async getMetrics(req: Request, res: Response): Promise<any> {
        const filePath = 'boards/html/Training_analysis.html';
        try {
            generateTrainingNotebook()

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).send('Error reading the HTML file');
                }

                res.setHeader('Content-Type', 'text/html');
                res.send(data);
            });
        } catch (err) {
            res.status(500).json({ error: 'An error ocurred: ' + err.message });
        }
    }

    async getVisual(req: Request, res: Response): Promise<any> {
        const filePath = 'boards/html/Training_analysis.html';
        try {
            generateTrainingNotebook()

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).send('Error reading the HTML file');
                }

                res.setHeader('Content-Type', 'text/html');
                res.send(data);
            });
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