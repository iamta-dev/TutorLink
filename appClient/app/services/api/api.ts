import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { StudentPostSnapshot } from "../../models/student-post"
import { TutorJoinSnapshot } from "../../models/tutor-join"
import { UserSnapshot } from "../../models/user"
// const API_PAGE = 1

const convertStudentPost = (raw: any): StudentPostSnapshot => {
  return {
    id: raw.id,
    topic: raw.topic,
    postDate: raw.postDate,
    user: raw.user,
    description: raw.description,
    tutorCount: raw.tutorCount
  }
}
const convertTutorJoin = (raw: any): TutorJoinSnapshot => {
  return {
    id: raw.id,
    price: raw.price,
    description: raw.description,
    postDate: raw.postDate,
    user: raw.user
  }
}
const convertUserInfo = (raw: any): UserSnapshot => {
  return {
    phone: raw.phone,
    firstName: raw.firstName,
    lastName: raw.lastName,
    username: raw.username,
    email: raw.email,
    regDate: raw.regDate,
    userImg: raw.userImg,
    shortDetail: raw.shortDetail
  }
}
/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJib2IiLCJpYXQiOjE1Nzc4MDA0ODAsImV4cCI6MTU3Nzg4Njg4MH0.8-O6kpnXJYsoSOrSpwGDl-Ak8XLIjDSD9P_OuuBZOXxIyZfDQZ05s6Dw1WjMLe9afokI792Jnb22lC_BkpCszg`,
      },
    })
  }

  /**
   * Load all student post in timeline
   */
  async getStudentPostsOnTimeline(page: number): Promise<Types.GetStudentPostsResult> {
    const data = {
      page,
      size: 2
    }
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/post`, data)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawStudentPost = response.data
      const resultStudentPost: StudentPostSnapshot[] = rawStudentPost.map(convertStudentPost)
      return { kind: "ok", studentPosts: resultStudentPost }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * get student post infomation from id
   * @param id
   */
  async getStudentPostById(id: number): Promise<Types.GetStudentPostByIdResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/post/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawStudentPost = response.data
      const resultStudentPost: StudentPostSnapshot = convertStudentPost(rawStudentPost)
      return { kind: "ok", studentPost: resultStudentPost }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * create student post on timeline
   * @param topic
   * @param description
   */
  async createStudentPost(topic: string, description: string): Promise<Types.CreateStudentPostsResult> {
    // make the api call
    const params = {
      topic,
      description,
      tags: []
    }
    const response: ApiResponse<any> = await this.apisauce.post(`/post`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const studentPostId = response.data
      return { kind: "ok", studentPostId: studentPostId }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Tutor join student post
   * @param postId
   * @param price
   * @param description
   */
  async createTutorJoin(postId: number, price: number, description: string): Promise<Types.CreateTutorJoinResult> {
    // make the api call
    const params = {
      postId,
      price,
      description
    }
    const response: ApiResponse<any> = await this.apisauce.post(`/post-tutor/create`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const res = response.data
      return { kind: "ok", message: res }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * get tutor join list from student post id
   * @param studentPostId
   */
  async getAllPostTutorByPostId(studentPostId: number): Promise<Types.GetTutorJoinsResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/post-tutor/${studentPostId}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data
      const convertResult: TutorJoinSnapshot[] = rawData.map(convertTutorJoin)
      return { kind: "ok", tutorJoins: convertResult }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getCurrentUser(): Promise<Types.GetCurrentUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/user/current`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data
      const convertResult: UserSnapshot = convertUserInfo(rawData)
      return { kind: "ok", user: convertResult }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
