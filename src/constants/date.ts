import { startOfDay, subDays } from "date-fns";

interface IDate {
  [index: number]: Date;
}

export const date: IDate = {
  0: startOfDay(subDays(new Date(), 1)),
  1: startOfDay(subDays(new Date(), 7)),
  2: startOfDay(subDays(new Date(), 15)),
  3: startOfDay(subDays(new Date(), 30)),
};
