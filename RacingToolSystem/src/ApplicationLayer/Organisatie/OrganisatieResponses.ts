export interface CreatedOrganisatieResponse {
  status: string;
  message: string;
  organisatie?: {
    naam: string;
    plaats: string;
    start: string;
    einde: string;
  };
}

export interface VerkrijgRaceInfoResponse {
  status: string;
  message: string;
  raceInfo?: {
    boottype: string;
    title: string;
    afstand: string;
    rondes: Array<string>;
  };
}
