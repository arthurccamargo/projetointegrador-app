import type { OngProfile } from "../app/auth/auth.type";
import type { Category } from "./categorys.type";

export interface Volunteer {
  id: string;
  userId: string;
  fullName: string;
}

export interface Application {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
  checkedIn: boolean;
  checkInAt: string | null;
  eventId: string;
  volunteerId: string;
  volunteer: Volunteer;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO 8601
  durationMinutes: number;
  location: string;
  maxCandidates: number;
  currentCandidates: number;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  ongId: string;
  ong: OngProfile;
  categoryId: string;
  category: Category;
  applications?: Application[];
}
