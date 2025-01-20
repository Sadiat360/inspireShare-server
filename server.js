import express from 'express';
import stressQuoteRoutes from './routes/stressQuoteRoutes.js'
import loveQuoteRoutes from './routes/loveQuoteRoutes.js'
import photosRoutes from './routes/photosRoutes.js'
import heroImageRoutes from './routes/heroImageRoutes.js'
import faqQuestionRoutes from './routes/faqQuestionRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import categoryImgRoutes from './routes/categoryImgRoutes.js'
import userStreakRoutes from './routes/userStreakRoutes.js'
import 'dotenv/config';
import cors from 'cors';
import crypto from 'crypto';

/////for production deployment
/////app.use(cors({ origin: 'http://your-frontend-domain.com' }));




const app = express();
const PORT = process.env.PORT || 5050;
const jwtSecret = process.env.JWT_SECRET;
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Default to localhost for dev
    credentials: true,
  };

// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(secretKey); ///

app.use(cors(corsOptions));
app.use(express.json({limit: '10mb'}));
app.use(express.static('public'));

app.use('/stressQuote',stressQuoteRoutes);
app.use('/loveQuote',loveQuoteRoutes);
app.use('/photos',photosRoutes);
app.use('/hero',heroImageRoutes);
app.use('/faq',faqQuestionRoutes);
app.use('/streaks',userStreakRoutes);
app.use('/users',usersRoutes);
app.use('/category',categoryImgRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Inspire-Share Server');
})


app.listen(PORT, () =>{
    console.log(`Server running at ${process.env.BACKEND_URL}${PORT} `)
})