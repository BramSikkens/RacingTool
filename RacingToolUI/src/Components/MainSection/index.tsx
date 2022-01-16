import { Box, Toolbar, Typography } from "@material-ui/core";
import { Tab, Tabs } from "@mui/material";
import ApplicationState from "PropagandaSysteem/src/ApplicationLayer/ApplicationState";
import { VerkrijgRaceInfoResponse } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieResponses";
import { VerkrijgRaceInfo } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieUseCases";
import React, { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import AddInschrijvingModal from "../Modals/AddInschrijving";

export default function MainSection() {
  const [pageTitle, setPageTitle] = React.useState("PlaceHolder");
  const [raceInfo, setRaceInfo] = React.useState<
    VerkrijgRaceInfoResponse | undefined
  >(undefined);
  const params = useParams();

  useEffect(() => {
    setRaceInfo(
      VerkrijgRaceInfo(ApplicationState.getInstance(), params.raceTitle!)
    );
  }, [params]);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Toolbar />
      <Typography variant="h3" align="left">
        {raceInfo?.raceInfo?.boottype || "No title"}{" "}
        {raceInfo?.raceInfo?.afstand}M
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs aria-label="basic tabs example">
          <AddInschrijvingModal />
          <Link key="basic" to={"deelnemers"}>
            <Tab key="basic" label={"deelnemers"} />
          </Link>
          {raceInfo?.raceInfo?.rondes.map((ronde: string) => {
            return (
              <Link key="rondes/test" to={"rondes/" + ronde}>
                <Tab key="ronde" label={ronde} />
              </Link>
            );
          })}
        </Tabs>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
