import { Timestamp } from "@firebase/firestore-types";
import moment from "moment";

export function dateFromTimestamp(timestamp: Timestamp): Date {
  if (timestamp) {
    return timestamp.toDate();
  }
  return new Date();
}

export function formatDate(date: Date | null): string {
  return date ? moment(date).format("DD/MM/YYYY HH:mm") : "";
}

export function dateFromTimestampSafe(timestamp: Timestamp): Date | null {
  if (timestamp && timestamp instanceof Date) {
    return timestamp;
  }
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate();
  }
  return null;
}
