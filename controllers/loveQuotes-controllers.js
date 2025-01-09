import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const server = async (_req, res) => {
    try{
        const filePath = path.resolve('data/loveQuotes.json');
        const dataBuffer = fs.readFileSync(filePath);
        const stressQuotesData = JSON.parse(dataBuffer);
        if(stressQuotesData.length === 0){
            res.status(404).send('Love & Relationship quote not found');
            return;
        }

        res.status(200).json(stressQuotesData);

    }catch(error){
        console.error('error getting to quote server:', error);
        res.status(500).send('Internal Server Error')
    }
}
const findRandomloveQuote = async (_req, res) => {
    try{
        const filePath = path.resolve('data/loveQuotes.json');
        const dataBuffer = fs.readFileSync(filePath);
        const loveQuotesData = JSON.parse(dataBuffer);
        if(loveQuotesData.length === 0){
            res.status(404).send('Love & Relationship quote not found');
            return;
        }
        const randomLoveQuote = loveQuotesData [Math.floor(Math.random() * loveQuotesData.length)]

        res.send(randomLoveQuote);

    }catch(error){
        console.error('error getting to quote server:', error);
        res.status(500).send('Internal Server Error')
    }
}

export {
server,
findRandomloveQuote
}