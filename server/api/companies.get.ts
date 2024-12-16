import { getCompanies } from "../lib/faker";

export default defineEventHandler(() => {
  const data = getCompanies(100)

  return { data };
})
