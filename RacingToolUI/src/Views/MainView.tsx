import "@fontsource/roboto";
import { Box, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button } from "@mui/material";
import ApplicationState from "PropagandaSysteem/src/ApplicationLayer/ApplicationState";
import { saveFileFromWebbrowser } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieUseCases";
import FileReaderWeb from "PropagandaSysteem/src/lib/FileReaderWeb";
import React from "react";
import { Outlet } from "react-router-dom";
import "reflect-metadata";
import "../App.css";
import NavigationDrawer from "../Components/NavigationDrawer";

export default function MainView() {
  const drawerWidth = 240;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
  }));

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Clipped drawer
            </Typography>
            <Button
              sx={{ color: "white" }}
              onClick={() => {
                saveFileFromWebbrowser(
                  ApplicationState.getInstance(),
                  new FileReaderWeb()
                );
              }}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <NavigationDrawer />
        <Outlet />
      </Box>
    </>
  );
}
