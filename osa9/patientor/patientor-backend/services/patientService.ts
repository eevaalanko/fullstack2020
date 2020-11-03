import patients from "../data/patients.json";
import {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
} from "../types";

const getEntries = (): Array<PatientEntry> =>
  patients.map((p) => ({ ...p, entries: [] }));

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return getEntries().map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const findById = (id: string): PatientEntry | undefined => {
  return getEntries().find((p) => p.id === id);
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
