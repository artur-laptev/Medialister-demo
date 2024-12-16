import { getCompanies } from "../lib/faker";

export default defineEventHandler(() => {
  const data = getCompanies()

  return { data };
})
