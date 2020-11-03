import patients from "../data/patients";
import {
  Patient,
  NewPatientEntry,
  NonSensitivePatientEntry,
} from "../types";


const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
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

const findById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addEntry = (entry: NewPatientEntry): Patient=> {
  const newPatientEntry = {
    id: String(Math.floor(Math.random() * 1000000000)),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getNonSensitiveEntries, findById, addEntry };
