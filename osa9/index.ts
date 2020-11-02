import express from "express"
import {bmiCalculator} from "./bmiCalculator";

const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const values = req.query
    try {
        console.log(bmiCalculator(Number(values.height), Number(Number(values.weight))));
        res.send({...values, bmi: bmiCalculator(Number(values.height), Number(Number(values.weight)))});

    } catch (e) {
        console.log('Error, something bad happened, message: ', e.message);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});