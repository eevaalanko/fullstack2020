/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatientEntry } from "./types";

const isString = (text: any): text is string =>
  typeof text === "string" || text instanceof String;

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};


const parseDateString = (date: any): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender =>
  Object.values(Gender).includes(param);

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const toNewPatientEntry = (object: any): NewPatientEntry => ({
  name: parseName(object.name),
  dateOfBirth: parseDateString(object.dateOfBirth),
  ssn: parseSSN(object.ssn),
  gender: parseGender(object.gender),
  occupation: parseOccupation(object.occupation),
});

export default toNewPatientEntry;
