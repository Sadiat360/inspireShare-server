import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const server = async (req, res) => {
    try{
        const filePath = path.resolve('data/photos.json');
        const dataBuffer = fs.readFileSync(filePath);
        const photosData = JSON.parse(dataBuffer);
        if(photosData.length === 0){
            res.status(404).send('Photos not found');
            return;
        }

        res.status(200).json(photosData);
        console.log(photosData);

    }catch(error){
        console.error('error getting photo:', error);
        res.status(500).send('Internal Server Error')
    }
}
const findPhoto = async (req, res) => {
    try{
        console.log(`Fetching photo with ID: ${req.params.photoId}`);
        const filePath = path.resolve('data/photos.json');
        const dataBuffer = fs.readFileSync(filePath);
        const photosData= JSON.parse(dataBuffer);

        const foundPhoto = photosData.find((photo)=>{
            return photo.id === req.params.photoId;
        })
        if(!foundPhoto){
            res.status(404).send('Error: photo with that id not found');
            return;
        }
       
        const photoUrl = `/public/${foundPhoto.photo}`;
        res.status(200).json(foundPhoto);
        console.log(foundPhoto);

    }catch(error){
        console.error('error getting photo:', error);
        res.status(500).send('Internal Server Error')
    }
}

export {
server,
findPhoto
}