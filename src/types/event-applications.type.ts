import type { VolunteerProfile } from "../app/auth/auth.type";
import type { Event } from "./events.type";

export enum ApplicationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export interface EventApplication {
  id: string;
  eventId: string;
  event: Event;
  volunteerId: string;
  volunteer: VolunteerProfile;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}
