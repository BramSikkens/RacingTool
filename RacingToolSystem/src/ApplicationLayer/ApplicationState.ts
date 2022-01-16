import Organisatie from "../DomainLayer/Entities/Organisatie";
import IPersistable from "./IPersistable";

//Voor observer
export type ApplicationStateObserver = (
  applicationState: ApplicationState
) => void;
export default class ApplicationState {
  private static instance: ApplicationState;
  private constructor() {}

  private observers: ApplicationStateObserver[] = [];

  public attach(observer: ApplicationStateObserver) {
    this.observers.push(observer);
  }

  detach(observerToRemove: ApplicationStateObserver) {
    this.observers = this.observers.filter(
      (observer) => observerToRemove !== observer
    );
  }

  public notify(applicationState: ApplicationState) {
    console.log("notify observers");
    this.observers.forEach((observer) => observer(applicationState));
  }

  public static getInstance(): ApplicationState {
    if (!ApplicationState.instance) {
      ApplicationState.instance = new ApplicationState();
    }
    return ApplicationState.instance;
  }

  organisatie: Organisatie;
}
