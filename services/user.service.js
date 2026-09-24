import { findDevelopers } from "../repositories/user.repository";

export async function getDevelopers() {
  return findDevelopers();
}
