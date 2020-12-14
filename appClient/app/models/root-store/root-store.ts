import { UserStoreModel } from "../../models/user-store"
import { TutorJoinStoreModel } from "../../models/tutor-join-store"
import { StudentPostStoreModel } from "../../models/student-post-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  userStore: types.optional(UserStoreModel, {}),
  tutorJoinStore: types.optional(TutorJoinStoreModel, {}),
  studentPostStore: types.optional(StudentPostStoreModel, {}),
  navigationStore: types.optional(NavigationStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
