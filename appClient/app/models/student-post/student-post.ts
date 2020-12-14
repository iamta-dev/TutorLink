import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "../../models/user"
/**
 * Model description here for TypeScript hints.
 */
export const StudentPostModel = types
  .model("StudentPost")
  .props({
    id: types.number,
    topic: types.string,
    postDate: types.string,
    user: UserModel,
    description: types.string,
    tutorCount: types.number
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type StudentPostType = Instance<typeof StudentPostModel>
export interface StudentPost extends StudentPostType {}
type StudentPostSnapshotType = SnapshotOut<typeof StudentPostModel>
export interface StudentPostSnapshot extends StudentPostSnapshotType {}
