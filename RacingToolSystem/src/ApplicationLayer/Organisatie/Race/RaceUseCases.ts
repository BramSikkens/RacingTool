import RaceEntry from "../../../DomainLayer/Abstracts/RaceEntry";
import { Deelnemer } from "../../../DomainLayer/Entities/Deelnemer";
import Organisatie from "../../../DomainLayer/Entities/Organisatie";
import Race from "../../../DomainLayer/Entities/Race";
import { Reeks } from "../../../DomainLayer/Entities/Reeks";
import Team from "../../../DomainLayer/Entities/Team";
import { BootType } from "../../../DomainLayer/Enums/BootType";
import ApplicationState from "../../ApplicationState";
import {
  CreateRaceRequest,
  SchrijfUitRequest,
  VerkrijgDeelnemersVanRaceRequest,
  VerkrijgReeksenVanRondeDTO,
  VerkrijgRondesDTO,
} from "./RaceRequests";
import {
  CreatedRaceResponse,
  VerkrijgDeelnemersFromRaceResponse,
  VerkrijgReeksenVanRondeResponse,
  VerkrijgRondesResponse,
} from "./RaceResponses";

export function CreateRace(
  request: CreateRaceRequest,
  ApplicationState: ApplicationState
): CreatedRaceResponse {
  let organisatie: Organisatie = ApplicationState.organisatie;
  let newRace: Race = new Race(
    request.afstand,
    request.boottype as BootType.K1,
    request.aantalBanen
  );
  organisatie.addWedstrijd(newRace, request.titel);

  let createdRace: Race | undefined = organisatie.inschrijvingen.get(
    request.titel
  );

  if (createdRace) {
    request.rondes.forEach((ronde: string) => {
      createdRace?.creerRonde(ronde);
    });
  }

  return {
    status: createdRace ? "succes" : "fail",
    message: createdRace ? "raceCreated" : "Race Could not be created",
    organisatie: {
      naam: organisatie.naam,
    },
    race: createdRace
      ? {
          titel: request.titel,
          afstand: createdRace._afstand,
          boottype: createdRace._bootType as string,
        }
      : undefined,
    rondes: request.rondes,
  };
}

export function verkrijgRondesVanRace(
  request: VerkrijgRondesDTO,
  applicationState: ApplicationState
): VerkrijgRondesResponse {
  let rondes: Array<string>;

  let race: Race | undefined = applicationState.organisatie.inschrijvingen.get(
    request.raceTitle
  );

  if (race) {
    rondes = race.verkrijgRondes();
    if (rondes) {
      return {
        status: "succes",
        message: "Retrieved Rondes",
        rondes: rondes,
      };
    } else {
      return {
        status: "failed",
        message: "Something went wrong",
      };
    }
  } else {
    return {
      status: "failed",
      message: "Something went wrong",
    };
  }
}

export function VerkrijgReeksenVanRonde(
  request: VerkrijgReeksenVanRondeDTO,
  applicationState: ApplicationState
): VerkrijgReeksenVanRondeResponse {
  let race: Race | undefined = applicationState.organisatie.inschrijvingen.get(
    request.raceTitle
  );

  let reeksen: Reeks[] | undefined;

  if (race) {
    reeksen = race.verkrijgReeksen([request.rondeTitle]);
  }

  if (reeksen) {
    return {
      status: "suces",
      message: "ok",
      reeksen: reeksen.map((reeks: Reeks) => {
        return {
          categorie: reeks.categorie.toString(),
          starttijd: reeks.startTijd?.toISOString(),
          baanVerdeling: Array.from(reeks.baanVerdeling.entries()).map(
            (entry) => {
              return {
                baan: entry[0].toString(),
                club: entry[1].club,
                naam: (entry[1] as Deelnemer)._naam,
                category: (entry[1] as Deelnemer).categorie,
                team: (entry[1] as Team)._team,
              };
            }
          ),
        };
      }),
    };
  } else {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
}

export function verkrijgDeelnemersFromRace(
  request: VerkrijgDeelnemersVanRaceRequest,
  applicationState: ApplicationState
): VerkrijgDeelnemersFromRaceResponse {
  const race: Race | undefined =
    applicationState.organisatie.inschrijvingen.get(request.raceTitle);

  if (race !== undefined) {
    let deelnemersArray: Array<Deelnemer> = race.verkrijgDeelnemers();
    return {
      status: "Succes",
      message: "Received Deelnemers",
      deelnemers: deelnemersArray.map((deelnemer: Deelnemer) => {
        return {
          id: deelnemer._id,
          naam: deelnemer._naam,
          category: deelnemer.categorie.toString(),
          club: deelnemer.club,
        };
      }),
    };
  } else {
    return {
      status: "Failed",
      message: "Something went wrong",
    };
  }
}

export function schrijfUit(
  req: SchrijfUitRequest,
  applicationState: ApplicationState
): any {
  const organisatie: Organisatie = applicationState.organisatie;
  const race: Race | undefined = organisatie.inschrijvingen.get(req.raceTitle);
  if (race) {
    const response = race.schrijfUit(req.deelnemerId, req.rondes);
    applicationState.notify(applicationState);
  }
}
