import React from "react";
import { Item, Icon } from "semantic-ui-react";
import { Entry } from "../types";
import HealthRatingBar from "./HealthRatingBar";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const EntriesComponent: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Item>
          <Item.Content>
            <Item.Header>
              {entry.date} <Icon name="medrt" />
            </Item.Header>
            <Item.Description>{entry.description}</Item.Description>
            {entry.diagnosisCodes ? (
              <Item.Description>
                Diagnosis codes: {entry.diagnosisCodes.map((c) => c)}
              </Item.Description>
            ) : null}
            <Item.Extra>
              Discharged {entry.discharge.date}. {entry.discharge.criteria}
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    case "OccupationalHealthcare":
      return (
        <Item>
          <Item.Content>
            <Item.Header>
              {entry.date} <Icon name="heart" />
            </Item.Header>
            <Item.Description>{entry.description}</Item.Description>
            {entry.diagnosisCodes ? (
              <Item.Description>
                Diagnosis codes: {entry.diagnosisCodes.map((c) => c + " ")}
              </Item.Description>
            ) : null}
            {entry.sickLeave ? (
              <Item.Extra>
                Sick leave from {entry.sickLeave.startDate} to{" "}
                {entry.sickLeave.endDate}
              </Item.Extra>
            ) : null}
          </Item.Content>
        </Item>
      );
    case "HealthCheck":
      return (
        <Item>
          <Item.Content>
            <Item.Header>
              {entry.date} <Icon name="doctor" />
            </Item.Header>
            <Item.Description>{entry.description}</Item.Description>
            {entry.diagnosisCodes ? (
              <Item.Description>
                Diagnosis codes: {entry.diagnosisCodes.map((c) => c)}
              </Item.Description>
            ) : null}
            <Item.Extra>
              <HealthRatingBar
                rating={entry.healthCheckRating}
                showText={true}
              />
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    default:
      return assertNever(entry);
  }
};

export default EntriesComponent;
