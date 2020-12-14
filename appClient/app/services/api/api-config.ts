// import { API_URL } from "react-native-dotenv"
import { Platform } from "react-native"
/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  // eslint-disable-next-line eqeqeq
  url: Platform.OS == "ios" ? "http://localhost:9000/api" : "http://10.0.2.2:9000/api",
  timeout: 10000,
}
