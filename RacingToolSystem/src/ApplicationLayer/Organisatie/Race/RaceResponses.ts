export interface CreatedRaceResponse {
  status: string;
  message: string;
  organisatie?: {
    naam?: string;
  };
  race?: {
    titel: string;
    afstand: string;
    boottype: string;
  };
  rondes?: Array<string>;
}

export interface VerkrijgReeksenVanRondeResponse {
  status: string;
  message: string;
  reeksen?: Array<{
    categorie: string;
    starttijd: string;
    baanVerdeling?: Array<{
      baan: string;
      club: string;
      naam: string;
      category: string;
      team?: any;
    }>;
  }>;
}

export interface VerkrijgDeelnemersFromRaceResponse {
  status: string;
  message: string;
  deelnemers?: Array<{
    id: string;
    naam: string;
    club: string;
    category: string;
  }>;
}

export interface VerkrijgRondesResponse {
  status: string;
  message: string;
  rondes?: Array<string>;
}
