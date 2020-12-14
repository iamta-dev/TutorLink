import { GeneralApiProblem } from "./api-problem"
import { StudentPostSnapshot } from "../../models/student-post"
import { TutorJoinSnapshot } from "../../models/tutor-join"
import { UserSnapshot } from "../../models/user"
// For Student
export type GetStudentPostsResult = { kind: "ok"; studentPosts: StudentPostSnapshot[] } | GeneralApiProblem
export type GetStudentPostByIdResult = { kind: "ok"; studentPost: StudentPostSnapshot } | GeneralApiProblem
export type CreateStudentPostsResult = { kind: "ok"; studentPostId: number } | GeneralApiProblem
// For Tutor
export type GetTutorJoinsResult = { kind: "ok"; tutorJoins: TutorJoinSnapshot[] } | GeneralApiProblem
export type CreateTutorJoinResult = { kind: "ok"; message: string } | GeneralApiProblem
// For USER INFO
export type GetCurrentUserResult = { kind: "ok"; user: UserSnapshot } | GeneralApiProblem
