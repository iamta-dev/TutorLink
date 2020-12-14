import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import { TutorJoinSnapshot, TutorJoinModel, TutorJoin } from "../tutor-join"
import * as Types from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const TutorJoinStoreModel = types
  .model("TutorJoinStore")
  .props({
    tutorJoins: types.optional(types.array(TutorJoinModel), [])
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveTutorJoins: (tutorJoinSnapshot: TutorJoinSnapshot[]) => {
      const tutorJoinsModel: TutorJoin[] = tutorJoinSnapshot.map(c => TutorJoinModel.create(c))
      self.tutorJoins.replace(tutorJoinsModel)
    }
  }))
  .actions(self => ({
    getAllPostTutorByPostId: flow(function * (studentPostId: number) {
      const result: Types.GetTutorJoinsResult = yield self.environment.api.getAllPostTutorByPostId(studentPostId)

      if (result.kind === "ok") {
        self.saveTutorJoins(result.tutorJoins)
      } else {
        __DEV__ && console.tron.logImportant(result.kind)
        const error = { kind: result.kind, message: result.kind }
        throw error
      }
    }),
    createTutorJoin: flow(function * (postId: number, price: number, description: string) {
      const result: Types.CreateTutorJoinResult = yield self.environment.api.createTutorJoin(postId, price, description)

      if (result.kind === "ok") {
        // self.saveStudentPosts(result.studentPosts)
        console.tron.logImportant("Join Success")
      } else {
        __DEV__ && console.tron.logImportant(result.kind)
        const error = { kind: result.kind, message: result.kind }
        throw error
      }
    })
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type TutorJoinStoreType = Instance<typeof TutorJoinStoreModel>
export interface TutorJoinStore extends TutorJoinStoreType {}
type TutorJoinStoreSnapshotType = SnapshotOut<typeof TutorJoinStoreModel>
export interface TutorJoinStoreSnapshot extends TutorJoinStoreSnapshotType {}
