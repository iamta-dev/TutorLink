import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { StudentPostModel, StudentPostSnapshot, StudentPost } from "../student-post"
import { withEnvironment } from "../extensions"
import * as Types from "../../services/api"
/**
 * Model description here for TypeScript hints.
 */
export const StudentPostStoreModel = types
  .model("StudentPostStore")
  .props({
    studentPosts: types.optional(types.array(StudentPostModel), [])
  })
  .extend(withEnvironment)
  .views(self => ({
    // getStudentPostById(_id: number) {
    //   return self.studentPosts.filter(p => p.id === _id)
    // },
    // findTodosByUser(user) {
    //   return self.todos.filter(t => t.assignee === user)
    // }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveStudentPosts: (studentPostSnapshot: StudentPostSnapshot[]) => {
      const StudentPostModels: StudentPost[] = studentPostSnapshot.map(c => StudentPostModel.create(c))
      self.studentPosts.replace(StudentPostModels)
    },
    addStudentPost: (studentPostSnapshot: StudentPostSnapshot[]) => {
      const StudentPostModels: StudentPost[] = studentPostSnapshot.map(c => StudentPostModel.create(c))
      StudentPostModels.map(data => self.studentPosts.push(data))
    }
  }))
  .actions(self => ({
    getStudentPosts: flow(function * () {
      const result: Types.GetStudentPostsResult = yield self.environment.api.getStudentPostsOnTimeline(0)

      if (result.kind === "ok") {
        self.saveStudentPosts(result.studentPosts)
      } else {
        __DEV__ && console.tron.logImportant(result.kind)
        const error = { kind: result.kind, message: result.kind }
        throw error
      }
    }),
    getMoreStudentPosts: flow(function * (page: number) {
      const result: Types.GetStudentPostsResult = yield self.environment.api.getStudentPostsOnTimeline(page)

      if (result.kind === "ok") {
        self.addStudentPost(result.studentPosts)
      } else {
        __DEV__ && console.tron.logImportant(result.kind)
        const error = { kind: result.kind, message: result.kind }
        throw error
      }
    }),
    createStudentPost: flow(function * (topic: string, description: string) {
      const result: Types.CreateStudentPostsResult = yield self.environment.api.createStudentPost(topic, description)

      if (result.kind === "ok") {
        // self.saveStudentPosts(result.studentPosts)
        console.tron.logImportant("Create Success")
      } else {
        __DEV__ && console.tron.logImportant(result.kind)
        const error = { kind: result.kind, message: result.kind }
        throw error
      }
    }),
    getStudentPostById: flow(function * (id: number) {
      const result: Types.GetStudentPostByIdResult = yield self.environment.api.getStudentPostById(id)

      if (result.kind === "ok") {
        // self.saveStudentPosts(result.studentPosts)
        console.tron.logImportant("Get Success")
        return result.studentPost
      } else {
        __DEV__ && console.tron.logImportant(result.kind)
        const error = { kind: result.kind, message: result.kind }
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

type StudentPostStoreType = Instance<typeof StudentPostStoreModel>
export interface StudentPostStore extends StudentPostStoreType {}
type StudentPostStoreSnapshotType = SnapshotOut<typeof StudentPostStoreModel>
export interface StudentPostStoreSnapshot extends StudentPostStoreSnapshotType {}
