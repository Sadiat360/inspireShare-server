import fs from 'fs'

const server = async (req, res) =>{

    try{
        const dataBuffer = fs.readFileSync('./data/categoryImg.json');
        const categoryImgData = JSON.parse(dataBuffer);

        if(categoryImgData === 0){
            resizeBy.status(404).send('Category images not found');
            return;
        } else{
            res.status(200).json(categoryImgData);
            
        }

    }catch(error){
        console.error('error getting images:', error);
        res.status(500).send('Internal Server Error')
    }

   
}
export{
    server
}