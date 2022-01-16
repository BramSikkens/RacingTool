import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import ApplicationState from "PropagandaSysteem/src/ApplicationLayer/ApplicationState";
import { SchrijfInRequest } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieRequests";
import { VerkrijgRaceInfoResponse } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieResponses";
import {
  SchrijfIn,
  VerkrijgRaceInfo,
} from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieUseCases";
import { BootType } from "PropagandaSysteem/src/DomainLayer/Enums/BootType";
import { Categorie } from "PropagandaSysteem/src/DomainLayer/Enums/Categorie";
import { howManyTeamMembers } from "PropagandaSysteem/src/DomainLayer/utils";
import React, { useEffect } from "react";
import { useParams } from "react-router";

export default function AddInschrijvingModal(props: any) {
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  const [isTeamRace, setIsTeamRace] = React.useState<boolean>(false);
  const [teamCount, setTeamCount] = React.useState<number | undefined>(
    undefined
  );
  const [schrijfInRequest, setSchrijfInRequest] = React.useState<
    SchrijfInRequest | undefined
  >(undefined);

  const [raceInfo, setRaceInfo] = React.useState<
    VerkrijgRaceInfoResponse | undefined
  >(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    SchrijfIn(schrijfInRequest!, ApplicationState.getInstance());

    handleClose();
  };

  useEffect(() => {
    setRaceInfo(
      VerkrijgRaceInfo(ApplicationState.getInstance(), params.raceTitle!)
    );
  }, [params]);

  useEffect(() => {
    if (raceInfo) {
      setIsTeamRace(
        howManyTeamMembers(raceInfo?.raceInfo?.boottype as BootType) > 1
      );

      setTeamCount(
        howManyTeamMembers(raceInfo?.raceInfo?.boottype as BootType)
      );
    }
  }, [raceInfo]);

  useEffect(() => {
    if (!isTeamRace) {
      setSchrijfInRequest({
        voornaam: "",
        achternaam: "",
        club: "",
        categorie: "",
        individueleWedstrijden: [
          {
            wedstrijd: params.raceTitle!,
            rondes: ["heat"],
          },
        ],
      });
    } else {
      const teamgenotenArray = [];
      for (let i = 0; i < teamCount! - 1; i++) {
        teamgenotenArray.push({
          voornaam: "",
          achternaam: "",
          club: "",
          categorie: Categorie.SEN_H,
        });
      }

      setSchrijfInRequest({
        voornaam: "",
        achternaam: "",
        club: "",
        categorie: "",
        teamWedstrijden: [
          {
            club: "",
            wedstrijd: params.raceTitle!,
            categorie: Categorie.ASP_D,
            rondes: ["heat"],
            teamgenoten: teamgenotenArray,
          },
        ],
      });
    }
  }, [isTeamRace, teamCount]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Inschrijving
      </Button>

      <Dialog open={open}>
        <DialogContent>
          <DialogContentText>
            Fill in the form to create a new inscription
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setSchrijfInRequest({
                ...(schrijfInRequest as SchrijfInRequest),
                voornaam: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="secondName"
            label="Second Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setSchrijfInRequest({
                ...(schrijfInRequest as SchrijfInRequest),
                achternaam: e.target.value,
              });
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="club"
            label="Club"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setSchrijfInRequest({
                ...(schrijfInRequest as SchrijfInRequest),
                club: e.target.value,
              });
            }}
          />
          <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>

          <Select
            labelId="Categorie"
            id="category"
            label="Category"
            value={schrijfInRequest?.categorie || Categorie.SEN_D}
            onChange={(e) => {
              setSchrijfInRequest({
                ...(schrijfInRequest as SchrijfInRequest),
                categorie: e.target.value,
              });
            }}
          >
            {Object.keys(Categorie).map((categorie: string) => {
              return (
                <MenuItem key={categorie} value={categorie}>
                  {categorie}
                </MenuItem>
              );
            })}
          </Select>

          {schrijfInRequest && schrijfInRequest!.teamWedstrijden
            ? schrijfInRequest!.teamWedstrijden![0].teamgenoten.map(
                (teammember, index) => {
                  return (
                    <>
                      <h3>TeamMember:{index + 1}</h3>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                          const schrijfInRequestCopy = { ...schrijfInRequest };
                          schrijfInRequestCopy.teamWedstrijden![0].teamgenoten[
                            index
                          ].voornaam = e.target.value;

                          setSchrijfInRequest(schrijfInRequestCopy);
                        }}
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="secondName"
                        label="Second Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                          const schrijfInRequestCopy = { ...schrijfInRequest };
                          schrijfInRequestCopy.teamWedstrijden![0].teamgenoten[
                            index
                          ].achternaam = e.target.value;

                          setSchrijfInRequest(schrijfInRequestCopy);
                        }}
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="club"
                        label="Club"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                          const schrijfInRequestCopy = { ...schrijfInRequest };
                          schrijfInRequestCopy.teamWedstrijden![0].teamgenoten[
                            index
                          ].club = e.target.value;

                          setSchrijfInRequest(schrijfInRequestCopy);
                        }}
                      />
                    </>
                  );
                }
              )
            : undefined}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddInschrijvingModal.propTypes = {
  onAddMenu: PropTypes.func,
};
