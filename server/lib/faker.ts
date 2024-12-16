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
  views: faker.number.int(1_000_000),
})

const data = faker.helpers.multiple(createRandomCompany, {
  count: 150_000
})

export const getCompanies = () => data