import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// error handler
// body parser
// authentication
// middy + express/lambda? 


app.get('/health', (req, res) => {
    res.status(200).json('ok');
});
// app.use('/api', routes);

export default app;
