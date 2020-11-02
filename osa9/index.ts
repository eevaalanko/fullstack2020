import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const values = req.query;
  try {
    res.send({
      ...values,
      bmi: bmiCalculator(Number(values.height), Number(Number(values.weight))),
    });
  } catch (e) {
    console.log("Error, something bad happened: ", e);
  }
});

app.post(
  "/exercises",
  (
    request: { body: { daily_exercises: Array<number>; target: number } },
    response
  ) => {
    const values = request.body;
    console.log(calculateExercises(values.daily_exercises, values.target));
    console.log(values);
    return response.json(
      calculateExercises(values.daily_exercises, values.target)
    );
  }
);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
