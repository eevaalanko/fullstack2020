import React from "react";
import axios from "axios";
import { Icon, Container, Button } from "semantic-ui-react";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { updatePatient } from "../state";
import EntriesComponent from "./EntriesComponent";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const PatientComponent: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
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

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log("values:", values);
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatient(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
    }
  };

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
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
    </Container>
  );
};

export default PatientComponent;
