import express from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
const cors = require('cors');
import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});




const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
