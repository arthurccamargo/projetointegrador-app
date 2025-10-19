import type { Event } from "./events.type";

export enum ApplicationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export interface EventApplication extends Event {
  applicationStatus: ApplicationStatus;
  applicationId: string;
}
