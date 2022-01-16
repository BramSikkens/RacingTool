import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ApplicationState, {
  ApplicationStateObserver,
} from "PropagandaSysteem/src/ApplicationLayer/ApplicationState";
import { VerkrijgDeelnemersFromRaceResponse } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/Race/RaceResponses";
import {
  schrijfUit,
  verkrijgDeelnemersFromRace,
} from "PropagandaSysteem/src/ApplicationLayer/Organisatie/Race/RaceUseCases";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

export default function DeelnemersTable() {
  const params = useParams();
  const [deelnemers, setDeelnemers] = useState<
    VerkrijgDeelnemersFromRaceResponse | undefined
  >(undefined);

  useEffect(() => {
    ApplicationState.getInstance().attach(onApplicationStateUpdated);
    return () =>
      ApplicationState.getInstance().detach(onApplicationStateUpdated);
  }, []);

  const onApplicationStateUpdated: ApplicationStateObserver = (
    applicationState: ApplicationState
  ) => {
    setDeelnemers(
      verkrijgDeelnemersFromRace(
        {
          raceTitle: params.raceTitle!,
        },
        ApplicationState.getInstance()
      )
    );
  };

  useEffect(() => {
    setDeelnemers(
      verkrijgDeelnemersFromRace(
        {
          raceTitle: params.raceTitle!,
        },
        ApplicationState.getInstance()
      )
    );
  }, []);

  return (
    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Naam</TableCell>
            <TableCell align="right">Categorie</TableCell>
            <TableCell align="right">Club</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deelnemers?.deelnemers?.map((deelnemer, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{deelnemer.naam}</TableCell>
              <TableCell align="right">{deelnemer.category}</TableCell>
              <TableCell align="right">{deelnemer.club}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    schrijfUit(
                      {
                        deelnemerId: deelnemer.id,
                        rondes: ["heat"],
                        raceTitle: "K1_1000",
                      },
                      ApplicationState.getInstance()
                    );

                    console.log(ApplicationState.getInstance());
                  }}
                >
                  <RemoveCircleRoundedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
