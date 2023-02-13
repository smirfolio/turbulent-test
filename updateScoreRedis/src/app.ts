import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import playerScoreGraphQl from "./graphqlQuery/playerScore";


const app = express();
app.use(morgan('combined'));
app.use(cors());


app.use('/update-score', playerScoreGraphQl);


export default app;
