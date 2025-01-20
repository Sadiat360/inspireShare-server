import fs from 'fs';


const server = async (req, res) => {
    try{
        const dataBuffer = fs.readFileSync('./data/hero.json');
        const heroData = JSON.parse(dataBuffer);
        if(heroData.length === 0){
            res.status(404).send('Hero image not found');
            return;
        }

        res.status(200).json(heroData);
        console.log(heroData);

    }catch(error){
        console.error('error getting photo:', error);
        res.status(500).send('Internal Server Error')
    }
}

export {
    server
}