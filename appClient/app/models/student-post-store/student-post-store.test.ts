import { StudentPostStoreModel, StudentPostStore } from "./student-post-store"

test("can be created", () => {
  const instance: StudentPostStore = StudentPostStoreModel.create({})

  expect(instance).toBeTruthy()
})
