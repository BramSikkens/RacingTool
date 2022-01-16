import { Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { TreeItem, TreeView } from "@material-ui/lab";
import { Box, Button, Drawer } from "@mui/material";

import ApplicationState from "PropagandaSysteem/src/ApplicationLayer/ApplicationState";
import { verkrijgOrganisatieDTO } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieRequests";
import {
  VerkrijgNavigationKeys,
  VerkrijgRaceInfo,
  VerkrijgOrganisatie,
} from "PropagandaSysteem/src/ApplicationLayer/Organisatie/OrganisatieUseCases";
import { CreatedRaceResponse } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/Race/RaceResponses";
import { CreateRace } from "PropagandaSysteem/src/ApplicationLayer/Organisatie/Race/RaceUseCases";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddRaceModal from "../Modals/AddRaceModal";

const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const generateMenu = (items: any) => {
  return (
    <>
      {items.map((item: any) => {
        if (item.children) {
          return (
            <Link to={`/races/${item.title}`}>
              <TreeItem nodeId={item.index} key="1" label={item.title}>
                {generateMenu(item.children)}
              </TreeItem>
            </Link>
          );
        } else {
          return <TreeItem nodeId={item.index} key="1" label={item.title} />;
        }
      })}
    </>
  );
};

export default function NavigationDrawer() {
  const classes = useStyles();
  const [navigationItems, setNavigationItems] = useState([]);
  const [OrganisatieInfo, setOrganisatieInfo] = useState<
    verkrijgOrganisatieDTO | undefined
  >(undefined);

  useEffect(() => {
    if (ApplicationState.getInstance().organisatie !== undefined) {
      setNavigationItems(
        VerkrijgNavigationKeys(ApplicationState.getInstance())
      );

      setOrganisatieInfo(VerkrijgOrganisatie(ApplicationState.getInstance()));
    }
  }, [ApplicationState.getInstance().organisatie.inschrijvingen]);

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", textAlign: "left" }}>
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem
              nodeId="0"
              label={
                (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {OrganisatieInfo?.naam}
                    <AddRaceModal onAddMenu={setNavigationItems} />
                  </Box>
                ) || "Geen Naam"
              }
            >
              {navigationItems.length > 0 && generateMenu(navigationItems)}
            </TreeItem>
          </TreeView>
        </Box>
      </Drawer>
    </>
  );
}
