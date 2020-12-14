import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "../user"

/**
 * Model description here for TypeScript hints.
 */
export const TutorJoinModel = types
  .model("TutorJoin")
  .props({
    id: types.number,
    price: types.number,
    description: types.string,
    postDate: types.string,
    user: UserModel
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type TutorJoinType = Instance<typeof TutorJoinModel>
export interface TutorJoin extends TutorJoinType {}
type TutorJoinSnapshotType = SnapshotOut<typeof TutorJoinModel>
export interface TutorJoinSnapshot extends TutorJoinSnapshotType {}
