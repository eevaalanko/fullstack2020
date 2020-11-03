import patients from "../data/patients";
import {Patient, NewPatientEntry, NonSensitivePatientEntry, NewEntry} from "../types";

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

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: String(Math.floor(Math.random() * 1000000000)),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (newEntry: NewEntry, patient: Patient): Patient => {
  const entry = {
    id: String(Math.floor(Math.random() * 1000000000)),
    ...newEntry,
  };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    const updatedPatient = { ...patient, entries: patient.entries.concat(entry) };
  patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p));
  return updatedPatient;
};

export default { getNonSensitiveEntries, findById, addPatient, addEntry };
