import fs from 'fs';

const server = async (req, res) => {
    try{
        
        const dataBuffer = fs.readFileSync('./data/faq.json');
        const faqQuestionData = JSON.parse(dataBuffer);
        if(faqQuestionData.length === 0){
            res.status(404).send('Frequently asked questions not found');
            return;
        }

        res.status(200).json(faqQuestionData);

    }catch(error){
        console.error('error getting photo:', error);
        res.status(500).send('Internal Server Error')
    }
}

export {
    server
}