import type { relations } from "./Relations";
import type { Stats } from "./Stats";
import type { User } from "./User";

export interface UserInformation {
  user: User;
  stats: Stats;
  relations: relations;
}
