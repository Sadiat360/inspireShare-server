import express from 'express';
import stressQuoteRoutes from './routes/stressQuoteRoutes.js'
import loveQuoteRoutes from './routes/loveQuoteRoutes.js'
import 'dotenv/config';
import cors from 'cors';

/////for production deployment
/////app.use(cors({ origin: 'http://your-frontend-domain.com' }));




const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());

app.use('/stressQuote',stressQuoteRoutes);
app.use('/loveQuote',loveQuoteRoutes);

app.listen(PORT, () =>{
    console.log(`Server running at ${process.env.BACKEND_URL}${PORT} `)
})