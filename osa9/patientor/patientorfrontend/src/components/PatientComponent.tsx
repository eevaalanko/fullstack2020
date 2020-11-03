import React from "react";
import axios from "axios";
import { Icon, Container } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { updatePatient } from "../state";
import EntriesComponent from "./EntriesComponent";

const PatientComponent: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];
  const genderIcons = {
    male: { name: "mars" as "mars" },
    female: { name: "venus" as "venus" },
    other: { name: "other gender vertical" as "other gender vertical" },
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [id, dispatch]);

  if (!patient) return null;
  if (!patient.entries) return null;

  return (
    <Container>
      <h1>
        {patient.name} <Icon {...genderIcons[patient.gender]} />
      </h1>

      <p>
        <b>snn: {patient.ssn}</b>
      </p>
      <p>
        <b>occupation: {patient.occupation}</b>
      </p>

      {patient.entries.length > 0 && (
        <div>
          <p>
            <b>entries:</b>
          </p>
          <div>
            {patient.entries.map((e) => (
              <EntriesComponent key={e.id} entry={e} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default PatientComponent;
