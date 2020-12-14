import { StudentPostModel, StudentPost } from "./student-post"

test("can be created", () => {
  const instance: StudentPost = StudentPostModel.create({})

  expect(instance).toBeTruthy()
})