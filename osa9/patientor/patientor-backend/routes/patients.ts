import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.get("/:id/entries", (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    console.log(patient.entries);
    res.send(patient.entries);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry = toNewEntry(req.body);
    const entryAddedPatient = patientService.addEntry(newEntry, patient);
    res.json(entryAddedPatient);
  } else {
    res.status(400);
  }
});

export default router;
