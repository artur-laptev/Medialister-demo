import { faker } from "@faker-js/faker";

type Company = {
  id: string
  name: string
  avatar: string
  website: string
  views: number
}

const createRandomCompany = () => <Company>({
  id: faker.string.uuid(),
  name: faker.company.name(),
  avatar: faker.image.avatar(),
  website: faker.internet.url(),
  views: faker.number.int(1000000),
})

export const getCompanies = (limit: number) => faker.helpers.multiple(createRandomCompany, {
  count: limit
})