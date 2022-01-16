import { Button } from "@mui/material";
import ApplicationState from "PropagandaSysteem/src/ApplicationLayer/ApplicationState";
import { LoadOrganisatieFromFileInWebbrowser } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieUseCases";
import FileReaderWeb from "PropagandaSysteem/src/lib/FileReaderWeb";
import React from "react";
import { Link } from "react-router-dom";
import CreateOrganisation from "src/Components/Modals/CreateOrganisation";

async function showFile(e: any) {
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = async (e) => {
    const text: string = e!.target!.result as string;
    LoadOrganisatieFromFileInWebbrowser(
      {
        filecontent: text,
        overwrite: true,
      },
      ApplicationState.getInstance(),
      new FileReaderWeb()
    );
  };
  reader.readAsText(e!.target!.files![0]);
}

export default function WelcomeView() {
  return (
    <>
      <Link to="/races">
        <Button>Click to go to MainView</Button>
      </Link>
      <CreateOrganisation />
      <input type="file" onChange={(e) => showFile(e)} />
    </>
  );
}
