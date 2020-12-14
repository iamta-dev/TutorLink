import { TutorJoinStoreModel, TutorJoinStore } from "./tutor-join-store"

test("can be created", () => {
  const instance: TutorJoinStore = TutorJoinStoreModel.create({})

  expect(instance).toBeTruthy()
})