import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const server = async (_req, res) => {
    try{
        const filePath = path.resolve('quotesData/stressQuotes.json');
        const dataBuffer = fs.readFileSync(filePath);
        const stressQuotesData = JSON.parse(dataBuffer);
        if(stressQuotesData.length === 0){
            res.status(404).send('Stress quote not found');
            return;
        }

        res.status(200).json(stressQuotesData);

    }catch(error){
        console.error('error getting to quote server:', error);
        res.status(500).send('Internal Server Error')
    }
}
const findRandomstressQuote = async (_req, res) => {
    try{
        const filePath = path.resolve('quotesData/stressQuotes.json');
        const dataBuffer = fs.readFileSync(filePath);
        const stressQuotesData = JSON.parse(dataBuffer);
        if(stressQuotesData.length === 0){
            res.status(404).send('Stress quote not found');
            return;
        }
        const randomStressQuote = stressQuotesData [Math.floor(Math.random() * stressQuotesData.length)]

        res.send(randomStressQuote);

    }catch(error){
        console.error('error getting to quote server:', error);
        res.status(500).send('Internal Server Error')
    }
}

export {
server,
findRandomstressQuote
}