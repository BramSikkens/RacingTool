export default interface CreerOrganisatieDTO {
  naam: string;
  plaats: string;
  start: string;
  einde: string;
}

export interface LoadOrganisatieFromFileDTO {
  path: string;
  overwrite: boolean;
}

export interface LoadOrganisatieFromFileInWebbrowserDTO {
  filecontent: string;
  overwrite: boolean;
}

export interface SchrijfInRequest {
  voornaam: string;
  achternaam: string;
  club: string;
  categorie: string;
  individueleWedstrijden?: Array<{
    wedstrijd: string;
    rondes: Array<string>;
  }>;
  teamWedstrijden?: Array<{
    club: string;
    wedstrijd: string;
    categorie: string;
    rondes: Array<string>;
    teamgenoten: Array<{
      voornaam: string;
      achternaam: string;
      club: string;
      categorie: string;
    }>;
  }>;
}

export interface verkrijgOrganisatieDTO {
  id?: string;
  naam: string;
  plaats: string;
  start: string;
  einde: string;
  inschrijvingen?: [
    {
      afstand: string;
      boottype: string;
      naam?: string;
      rondes?: [
        {
          naam: string;
          reeksen?: [
            {
              categorie: String;
              reeks: {
                startijd: string;
                maxAantalBanen: string;
                isFull: string;
              };
            }
          ];
        }
      ];
    }
  ];
}
