import {
  Box,
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
import { VerkrijgReeksenVanRondeResponse } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/Race/RaceResponses";
import { VerkrijgReeksenVanRonde } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/Race/RaceUseCases";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RaceTable() {
  const params = useParams();
  const [reeksen, setReeksen] = useState<
    VerkrijgReeksenVanRondeResponse | undefined
  >(undefined);

  useEffect(() => {
    ApplicationState.getInstance().attach(onApplicationStateUpdated);
    return () =>
      ApplicationState.getInstance().detach(onApplicationStateUpdated);
  }, []);

  const onApplicationStateUpdated: ApplicationStateObserver = (
    applicationState: ApplicationState
  ) => {
    setReeksen(
      VerkrijgReeksenVanRonde(
        {
          raceTitle: params.raceTitle!,
          rondeTitle: params.rondeTitle!,
        },
        applicationState
      )
    );
  };

  useEffect(() => {
    setReeksen(
      VerkrijgReeksenVanRonde(
        {
          raceTitle: params.raceTitle!,
          rondeTitle: params.rondeTitle!,
        },
        ApplicationState.getInstance()
      )
    );
  }, [params]);

  return (
    <>
      {reeksen?.reeksen?.map((reeks, index) => {
        return (
          <>
            <Box
              sx={{
                textAlign: "left",
                paddingLeft: 2,
                paddingBottom: 2,
              }}
            >
              <b>{reeks.categorie} : </b>
              <b>Reeks: </b>
              {index + 1}/{reeksen!.reeksen!.length}
            </Box>
            <TableContainer
              key={index}
              component={Paper}
              sx={{ marginBottom: 2 }}
            >
              <Table
                key={index}
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Lane</TableCell>
                    <TableCell align="right">Naam</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Club</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reeks?.baanVerdeling?.map((baanVerdeling, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{baanVerdeling.baan}</TableCell>

                      {baanVerdeling.team == undefined ? (
                        <TableCell align="right">
                          {baanVerdeling.naam}
                        </TableCell>
                      ) : (
                        <TableCell align="right">
                          {baanVerdeling.team.map(
                            (deelnemer: any, index: any) => {
                              return <>{deelnemer.naam};</>;
                            }
                          )}
                        </TableCell>
                      )}

                      <TableCell align="right">
                        {baanVerdeling.category}
                      </TableCell>
                      <TableCell align="right">{baanVerdeling.club}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        );
      })}
    </>
  );
}
