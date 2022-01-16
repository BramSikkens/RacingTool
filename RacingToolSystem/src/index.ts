import "reflect-metadata";
import ApplicationState from "./ApplicationLayer/ApplicationState";
import CreerOrganisatieDTO from "./ApplicationLayer/Organisatie/OrganisatieRequests";
import { CreatedOrganisatieResponse } from "./ApplicationLayer/Organisatie/OrganisatieResponses";
import {
  CreerOrganisatie,
  VerkrijgDeelnemers,
  LoadOrganisatieFromFile,
  VerkrijgNavigationKeys,
  VerkrijgRaceInfo,
} from "./ApplicationLayer/Organisatie/OrganisatieUseCases";
import { CreatedRaceResponse } from "./ApplicationLayer/Organisatie/Race/RaceResponses";

import {
  CreateRace,
  VerkrijgReeksenVanRonde,
} from "./ApplicationLayer/Organisatie/Race/RaceUseCases";
import { SchrijfIn } from "./ApplicationLayer/Organisatie/OrganisatieUseCases";
import { SchrijfInRequest } from "./ApplicationLayer/Organisatie/OrganisatieRequests";
import util from "util";
import FileSaver from "./lib/FileSaver";

let creerOrganisatieDTO: CreerOrganisatieDTO = {
  naam: "PropagandaNew",
  plaats: "Mechelen",
  start: "1/1/21",
  einde: "2/1/21",
};

let organisatieCreate: CreatedOrganisatieResponse = CreerOrganisatie(
  creerOrganisatieDTO,
  ApplicationState.getInstance()
);

let createRaceResponse: CreatedRaceResponse = CreateRace(
  {
    afstand: "1000",
    boottype: "K1",
    titel: "K1_1000",
    rondes: ["heat", "semifinals", "final"],
    aantalBanen: 5,
  },
  ApplicationState.getInstance()
);

let createRaceResponse2: CreatedRaceResponse = CreateRace(
  {
    afstand: "1000",
    boottype: "K2",
    titel: "K2_1000",
    rondes: ["heat", "semifinals", "final"],
  },
  ApplicationState.getInstance()
);

let schrijfInRequest = SchrijfIn(
  {
    voornaam: "bram",
    achternaam: "sikkens",
    club: "KCCM",
    categorie: "SEN_H",
    individueleWedstrijden: [{ wedstrijd: "K1_1000", rondes: ["heat"] }],
  },
  ApplicationState.getInstance()
);
let schrijfInRequest2 = SchrijfIn(
  {
    voornaam: "brafffxxxwm",
    achternaam: "sikkens",
    club: "KCCM",
    categorie: "SEN_H",
    individueleWedstrijden: [{ wedstrijd: "K1_1000", rondes: ["heat"] }],
  },
  ApplicationState.getInstance()
);
let schrijfInRequest3 = SchrijfIn(
  {
    voornaam: "brzzaaam",
    achternaam: "fddf",
    club: "KCCM",
    categorie: "SEN_H",
    individueleWedstrijden: [{ wedstrijd: "K1_1000", rondes: ["heat"] }],
  },
  ApplicationState.getInstance()
);
let schrijfInRequest4 = SchrijfIn(
  {
    voornaam: "aaae",
    achternaam: "sierfkkens",
    club: "KCCM",
    categorie: "SEN_H",
    individueleWedstrijden: [{ wedstrijd: "K1_1000", rondes: ["heat"] }],
  },
  ApplicationState.getInstance()
);
let schrijfInRequest5 = SchrijfIn(
  {
    voornaam: "lars",
    achternaam: "zezer",
    club: "KCCM",
    categorie: "SEN_H",
    individueleWedstrijden: [{ wedstrijd: "K1_1000", rondes: ["heat"] }],
  },
  ApplicationState.getInstance()
);

let schrijfInRequest6 = SchrijfIn(
  {
    voornaam: "janneman",
    achternaam: "zezsdqser",
    club: "KCCM",
    categorie: "SEN_H",
    individueleWedstrijden: [{ wedstrijd: "K1_1000", rondes: ["heat"] }],
  },
  ApplicationState.getInstance()
);

let schrijfInRequest7 = SchrijfIn(
  {
    voornaam: "iepsodi",
    achternaam: "zezsdqser",
    club: "KCCM",
    categorie: "SEN_H",
    individueleWedstrijden: [{ wedstrijd: "K1_1000", rondes: ["heat"] }],
  },
  ApplicationState.getInstance()
);
// console.log(
//   util.inspect(ApplicationState.getInstance().organisatie, false, null, true)
// );
FileSaver.getInstance().save(ApplicationState.getInstance().organisatie);

//console.log(VerkrijgDeelnemers(ApplicationState.getInstance()));

// LoadOrganisatieFromFile(
//   {
//     path: "/Users/bramsikkens/Documents/Ontwikkeling/Propaganda/Savefiles/saved.txt",
//     overwrite: true,
//   },
//   ApplicationState.getInstance(),
//   FileSaver.getInstance()
// );

console.log(
  "ok",
  util.inspect(ApplicationState.getInstance().organisatie, false, null, true)
);
// console.log(
//   util.inspect(
//     VerkrijgNavigationKeys(ApplicationState.getInstance()),
//     false,
//     null,
//     true
//   )
// );

//console.log(util.oVerkrijgRaceInfo(ApplicationState.getInstance(), "K1_1000"));

// console.log(
//   util.inspect(
//     VerkrijgReeksenVanRonde(
//       {
//         raceTitle: "K2_1000",
//         rondeTitle: "heat",
//       },
//       ApplicationState.getInstance()
//     ),
//     false,
//     null,
//     true
//   )
// );
