import diagnoseData from "../data/diagnoses.json";
import { DiagnoseEntry } from "../types";

const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>;

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const findById = (id: string): DiagnoseEntry | undefined => {
  return diagnoses.find((d) => d.code === id);
};

const addEntry = (code: string, name: string, latin: string): DiagnoseEntry => {
  const newDiagnoseEntry = {
    code,
    name,
    latin,
  };
  diagnoses.push(newDiagnoseEntry);
  return newDiagnoseEntry;
};


export default {
  getEntries,
  findById,
  addEntry,
};
