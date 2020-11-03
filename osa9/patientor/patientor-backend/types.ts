export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

/*id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
    date: '2015-01-02',
    type: 'Hospital',
    specialist: 'MD House',
    diagnosisCodes: ['S62.5'],
    description:
"Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
    discharge: {
    date: '2015-01-16',
        criteria: 'Thumb has healed.',
}
} */

interface Discharge {
    date: string,
    criteria: string,
}

interface SickLeave {
    startDate: string,
    endDate: string,
}
export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string,
    sickLeave?: SickLeave,
    specialist: string,
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    diagnosisCodes: string[],
    discharge: Discharge
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[],
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type NewEntry = Omit<Entry, 'id'>;


export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}



