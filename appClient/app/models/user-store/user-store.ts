import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import * as Types from "../../services/api"
import { User, UserModel, UserSnapshot } from "../user"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .extend(withEnvironment)
  .props({
    users: types.optional(types.array(UserModel), [])
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveUser: (userSnapshot: UserSnapshot[]) => {
      const userModels: User[] = userSnapshot.map(c => UserModel.create(c))
      self.users.replace(userModels)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getCurrentUser: flow(function * () {
      const result: Types.GetCurrentUserResult = yield self.environment.api.getCurrentUser()
      if (result.kind === "ok") {
        // const arr = [result.user]
        // self.saveUser(arr)
        return result.user
      } else {
        __DEV__ && console.tron.logImportant(result.kind)
        const error = { kind: result.kind, user: result.kind }
        throw error
      }
    }),
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
