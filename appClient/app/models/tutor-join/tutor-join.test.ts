import { TutorJoinModel, TutorJoin } from "./tutor-join"

test("can be created", () => {
  const instance: TutorJoin = TutorJoinModel.create({})

  expect(instance).toBeTruthy()
})