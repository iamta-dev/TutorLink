import createNativeStackNavigator from "react-native-screens/createNativeStackNavigator"
import {
  LoginScreen,
  RegisterScreen,
  ForgotPassScreen
} from "../screens"

export const AuthNavigator = createNativeStackNavigator(
  {
    login: { screen: LoginScreen },
    register: { screen: RegisterScreen },
    forgotPass: { screen: ForgotPassScreen }
  },
  {
    headerMode: "none",
  },
)

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
// export const exitRoutes: string[] = ["login"]
