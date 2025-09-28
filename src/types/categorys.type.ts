import type { Event } from "./events.type";

export interface Category {
  id: string;
  name: string;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  events: Event[];
}
