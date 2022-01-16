export interface CreateRaceRequest {
  afstand: string;
  boottype: string;
  titel: string;
  rondes: Array<string>;
  aantalBanen?: number;
}

export interface WisselDeelnemerVanReeks {}

export interface VerkrijgReeksenVanRondeDTO {
  raceTitle: string;
  rondeTitle: string;
}

export interface VerkrijgDeelnemersVanRaceRequest {
  raceTitle: string;
}

export interface VerkrijgRondesDTO {
  raceTitle: string;
}

export interface SchrijfUitRequest {
  deelnemerId: string;
  raceTitle: string;
  rondes: Array<string>;
}
