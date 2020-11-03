import patients from "../data/patients.json";
import {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
} from "../types";

// const patients: Array<PatientEntry> = patientData as Array<PatientEntry>;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): PatientEntry | undefined => {
  return patients.find((p) => p.id === id);
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: String(Math.floor(Math.random() * 1000000000)),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getNonSensitiveEntries, findById, addEntry };
