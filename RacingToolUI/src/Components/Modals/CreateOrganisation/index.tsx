import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import ApplicationState from "PropagandaSysteem/src/ApplicationLayer/ApplicationState";
import CreerOrganisatieDTO from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieRequests";
import { CreatedOrganisatieResponse } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieResponses";
import { CreerOrganisatie } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieUseCases";
import React, { useState } from "react";

export default function CreateOrganisation(props: any) {
  const [open, setOpen] = React.useState(false);
  const [creerOrganisatieDTO, setCreerOrganisatieDTO] = useState<
    CreerOrganisatieDTO | undefined
  >(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const response: CreatedOrganisatieResponse = CreerOrganisatie(
      {
        naam: "testWedstrijd",
        plaats: "Mechelen",
        start: "01/01/2022",
        einde: "02/01/2022",
      },
      ApplicationState.getInstance()
    );

    console.log(response);

    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New Organisation
      </Button>
      <Dialog open={open}>
        <DialogTitle>Add new race</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the form to create a new race!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CreateOrganisation.propTypes = {};
