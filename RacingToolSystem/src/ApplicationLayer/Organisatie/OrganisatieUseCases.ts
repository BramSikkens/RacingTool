import { Deelnemer } from "../../DomainLayer/Entities/Deelnemer";
import Organisatie from "../../DomainLayer/Entities/Organisatie";
import Race from "../../DomainLayer/Entities/Race";
import Team from "../../DomainLayer/Entities/Team";
import { Categorie } from "../../DomainLayer/Enums/Categorie";
import ApplicationState from "../ApplicationState";
import FileSaver from "../../lib/FileSaver";
import IPersistable from "../IPersistable";
import CreerOrganisatieDTO, {
  LoadOrganisatieFromFileDTO,
  SchrijfInRequest,
  verkrijgOrganisatieDTO,
  LoadOrganisatieFromFileInWebbrowserDTO,
} from "./OrganisatieRequests";
import {
  CreatedOrganisatieResponse,
  VerkrijgRaceInfoResponse,
} from "./OrganisatieResponses";
import FileReaderWeb from "../../lib/FileReaderWeb";
import { Reeks } from "../../DomainLayer/Entities/Reeks";

export function CreerOrganisatie(
  CreerOrganisatieDTO: CreerOrganisatieDTO,
  ApplicationState: ApplicationState
): CreatedOrganisatieResponse {
  let newOrganisatie: Organisatie = new Organisatie(
    CreerOrganisatieDTO.naam,
    CreerOrganisatieDTO.plaats,
    new Date(CreerOrganisatieDTO.start),
    new Date(CreerOrganisatieDTO.einde)
  );

  ApplicationState.organisatie = newOrganisatie;
  return {
    status: ApplicationState.organisatie ? "succes" : "fail",
    message: ApplicationState.organisatie
      ? "Organisatie Created"
      : "Creation failed",
    organisatie: ApplicationState.organisatie
      ? {
          naam: newOrganisatie.naam,
          plaats: newOrganisatie.plaats,
          start: newOrganisatie.start.toISOString(),
          einde: newOrganisatie.einde.toISOString(),
        }
      : undefined,
  };
}

export function LoadOrganisatieFromFile(
  request: LoadOrganisatieFromFileDTO,
  ApplicationState: ApplicationState,
  FileSaver: IPersistable
) {
  try {
    const loadedOrganisatie: Organisatie = FileSaver.load(request.path);

    if (loadedOrganisatie && request.overwrite == true) {
      ApplicationState.organisatie = loadedOrganisatie;

      return {
        status: "succes",
        message: "New Organisatie Loaded",
        organisatie: {
          naam: loadedOrganisatie.naam,
          plaats: loadedOrganisatie.plaats,
          //start: loadedOrganisatie.start.toISOString(),
          //einde: loadedOrganisatie.einde.toISOString(),
        },
      };
    }
  } catch (e) {
    console.warn(e);
    return {
      status: "failed",
      message: e,
    };
  }
}

export function LoadOrganisatieFromFileInWebbrowser(
  request: LoadOrganisatieFromFileInWebbrowserDTO,
  ApplicationState: ApplicationState,
  FileSaver: IPersistable
) {
  try {
    const loadedOrganisatie: Organisatie = FileSaver.load(
      undefined,
      request.filecontent
    );

    if (loadedOrganisatie && request.overwrite == true) {
      ApplicationState.organisatie = loadedOrganisatie;

      return {
        status: "succes",
        message: "New Organisatie Loaded",
        organisatie: {
          naam: loadedOrganisatie.naam,
          plaats: loadedOrganisatie.plaats,
          //start: loadedOrganisatie.start.toISOString(),
          //einde: loadedOrganisatie.einde.toISOString(),
        },
      };
    }
  } catch (e) {
    console.warn(e);
    return {
      status: "failed",
      message: e,
    };
  }
}

export function saveFileFromWebbrowser(
  applicationState: ApplicationState,
  FileSaver: FileReaderWeb
) {
  FileSaver.save(applicationState.organisatie);
}

export function VerwijderOrganisatie() {}
export function WijzigOrganisatie() {}
export function VerkrijgOrganisatie(
  ApplicationState: ApplicationState
): verkrijgOrganisatieDTO | undefined {
  if (ApplicationState.organisatie != undefined) {
    return {
      naam: ApplicationState.organisatie.naam,
      plaats: ApplicationState.organisatie.plaats,
      start: ApplicationState.organisatie.start.toString(),
      einde: ApplicationState.organisatie.einde.toString(),
    };
  } else {
    return undefined;
  }
}

export function SchrijfIn(
  request: SchrijfInRequest,
  ApplicationState: ApplicationState
) {
  const organisatie: Organisatie = ApplicationState.organisatie;

  const newDeelnemer: Deelnemer = new Deelnemer(
    request.voornaam + " " + request.achternaam,
    request.club,
    request.categorie as Categorie
  );

  if (request.individueleWedstrijden !== undefined) {
    request.individueleWedstrijden!.forEach((wedstrijdKey) => {
      let wedstrijd: Race = organisatie.inschrijvingen.get(
        wedstrijdKey.wedstrijd
      )!;

      wedstrijd.schrijfIn(
        [newDeelnemer],
        wedstrijdKey.rondes,
        wedstrijd._maxAantalBanen
      );
    });
  }
  if (
    request.teamWedstrijden !== undefined &&
    request.teamWedstrijden!.length > 0
  ) {
    request.teamWedstrijden.forEach((teamWedstrijd) => {
      let wedstrijd: Race = organisatie.inschrijvingen.get(
        teamWedstrijd.wedstrijd
      )!;

      let teamGenoten: Array<Deelnemer> = new Array();
      teamWedstrijd.teamgenoten.forEach((teamGenoot) => {
        teamGenoten.push(
          new Deelnemer(
            teamGenoot.voornaam + " " + teamGenoot.achternaam,
            teamGenoot.club,
            teamGenoot.categorie as Categorie
          )
        );
      });

      let team: Team = new Team(
        teamWedstrijd.categorie as Categorie,
        "1",
        request.club,
        [newDeelnemer, ...teamGenoten]
      );

      wedstrijd.schrijfIn([team], teamWedstrijd.rondes);
    });
  }

  ApplicationState.notify(ApplicationState);
}

export function VerkrijgDeelnemers(applicationState: ApplicationState) {
  let organisatie = applicationState.organisatie;
  let deelnemerArray: Array<Deelnemer> = new Array<Deelnemer>();

  for (let wedstrijdKey of organisatie.inschrijvingen.keys()) {
    let deelnemers: Array<Deelnemer> = organisatie.inschrijvingen
      .get(wedstrijdKey)!
      .verkrijgDeelnemers();

    deelnemerArray.push(...deelnemers);
  }

  let noDuplicateDeelnemers = [...new Set(deelnemerArray)];
  return noDuplicateDeelnemers;
}

export function VerkrijgNavigationKeys(applicationState: ApplicationState) {
  let testIndex = 0;
  function RecursiveNavigation(object: any): any {
    return Object.keys(object).map((key, index) => {
      testIndex = testIndex + 1;
      if (Object.keys(object[key]).length) {
        return {
          title: key,
          index: testIndex,
          children: RecursiveNavigation(object[key]),
        };
      } else {
        return {
          title: key,
          index: testIndex,
        };
      }
    });
  }

  let keys = applicationState.organisatie.verkrijgWedstrijdKeys();
  return RecursiveNavigation(keys);
}

export function VerkrijgRaceInfo(
  applicationState: ApplicationState,
  raceTitle: string
): VerkrijgRaceInfoResponse {
  const raceToGet: Race =
    applicationState.organisatie.inschrijvingen.get(raceTitle)!;
  if (raceToGet !== undefined) {
    return {
      status: "succes",
      message: "Race Fetched",
      raceInfo: {
        boottype: raceToGet._bootType,
        title: "K1 1000",
        afstand: raceToGet._afstand,
        rondes: raceToGet.verkrijgRondes(),
      },
    };
  } else {
    return {
      status: "failed",
      message: "Something went wrong",
    };
  }
}

export function VerkrijgAlleReeksenVanOrganisatie(
  applicationState: ApplicationState
): any {
  const organisatie: Organisatie = applicationState.organisatie;
  const reeksen: Array<Reeks> = organisatie.verkrijgAlleReeksen();
  if (reeksen) {
    return {
      status: "success",
      message: "Retrieved Reeksen",
      reeksen: reeksen,
    };
  }else
  {
    return {
      status: "fail",
      message: "Something went wrong",
    };
  }
}
