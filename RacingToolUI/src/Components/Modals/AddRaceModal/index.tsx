import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CreateRaceRequest } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/Race/RaceRequests";
import { CreateRace } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/Race/RaceUseCases";
import ApplicationState from "PropagandaSysteem/src/ApplicationLayer/ApplicationState";

import PropTypes from "prop-types";
import { CreatedRaceResponse } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/Race/RaceResponses";
import { VerkrijgNavigationKeys } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieUseCases";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { BootType } from "PropagandaSysteem/src/DomainLayer/Enums/BootType";

export default function AddRaceModal(props: any) {
  const [open, setOpen] = React.useState(false);
  const [raceRequest, setRaceRequest] = React.useState<CreateRaceRequest>({
    afstand: "125M",
    boottype: "K1",
    titel: "K1_125M",
    rondes: ["ronde1", "ronde2", "finales"],
    aantalBanen: undefined,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const response: CreatedRaceResponse = CreateRace(
      raceRequest,
      ApplicationState.getInstance()
    );

    props.onAddMenu(VerkrijgNavigationKeys(ApplicationState.getInstance()));
    handleClose();
  };

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <AddCircleRoundedIcon />
      </IconButton>
      <Dialog open={open}>
        <DialogTitle>Add new race</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the form to create a new race!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="raceTitle"
            label="race Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e: any) => {
              setRaceRequest({ ...raceRequest, titel: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="raceDistance"
            label="race Distance"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e: any) => {
              setRaceRequest({ ...raceRequest, afstand: e.target.value });
            }}
          />
          <Select
            labelId="BootType"
            id="BootType"
            label="BootType"
            value={raceRequest.boottype}
            onChange={(e) => {
              setRaceRequest({
                ...(raceRequest as CreateRaceRequest),
                boottype: e.target.value,
              });
            }}
          >
            {Object.keys(BootType).map((type: string) => {
              return (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            autoFocus
            margin="dense"
            id="aantalBanen"
            label="Aantal Banen"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e: any) => {
              setRaceRequest({ ...raceRequest, aantalBanen: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="rounds"
            label="Rounds"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e: any) => {
              const textWithoutContentAfterLastComma = e.target.value.substring(
                "0",
                e.target.value.lastIndexOf(",")
              );

              if (textWithoutContentAfterLastComma.length > 0) {
                const itemArray: Array<string> =
                  textWithoutContentAfterLastComma.split(",");
                setRaceRequest({ ...raceRequest, rondes: itemArray });
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddRaceModal.propTypes = {
  onAddMenu: PropTypes.func,
};
