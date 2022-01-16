import Organisatie from "../DomainLayer/Entities/Organisatie";

export default interface IPersistable {
  save(organisatie: Organisatie): boolean;
  load(path?: string, filecontent?: string): Organisatie;
}
