import fs from 'fs';


///// get all photos
const server = async (req, res) => {
    try{
        const dataBuffer = fs.readFileSync('./data/photos.json');
        const photosData = JSON.parse(dataBuffer);
        if(photosData.length === 0){
            res.status(404).send('Photos not found');
            return;
        }

        res.status(200).json(photosData);
       

    }catch(error){
        console.error('error getting photo:', error);
        res.status(500).send('Internal Server Error')
    }
}

///// find a single photo
const findPhoto = async (req, res) => {
    try{
       

        console.log(`Fetching photo with ID: ${req.params.photoId}`);
        const dataBuffer = fs.readFileSync('./data/photos.json');
        const photosData= JSON.parse(dataBuffer);

        const photoId = req.params.photoId;
        const foundPhoto = photosData.find((photo)=>{
            return photo.id === req.params.photoId;
        })
        if(!foundPhoto){
            res.status(404).send('Error: photo with that id not found');
            return;
        }
       
       
        res.status(200).json(foundPhoto);
        
    }catch(error){
        console.error('error getting photo:', error);
        res.status(500).send('Internal Server Error')
    }
}

export {
  server,
  findPhoto
}