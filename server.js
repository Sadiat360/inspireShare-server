import express from 'express';
import stressQuoteRoutes from './routes/stressQuoteRoutes.js'
import loveQuoteRoutes from './routes/loveQuoteRoutes.js'
import photosRoutes from './routes/photosRoutes.js'
import heroImageRoutes from './routes/heroImageRoutes.js'
import faqQuestionRoutes from './routes/faqQuestionRoutes.js'
import 'dotenv/config';
import cors from 'cors';
import crypto from 'crypto';

/////for production deployment
/////app.use(cors({ origin: 'http://your-frontend-domain.com' }));




const app = express();
const PORT = process.env.PORT || 5050;
const jwtSecret = process.env.JWT_SECRET;
// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(secretKey);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/stressQuote',stressQuoteRoutes);
app.use('/loveQuote',loveQuoteRoutes);
app.use('/photos',photosRoutes);
app.use('/hero',heroImageRoutes);
app.use('/faq',faqQuestionRoutes);
app.use('/streaks',faqQuestionRoutes);


app.listen(PORT, () =>{
    console.log(`Server running at ${process.env.BACKEND_URL}${PORT} `)
})