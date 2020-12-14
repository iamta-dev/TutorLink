import { createStackNavigator } from "react-navigation-stack"
import { PrimaryNavigator } from "./primary-navigator"
import { AuthNavigator } from "./auth-navigator"
import { MainNavigator } from "./main-navigator"
import {
  ChatGroupScreen,
  UserEnrollScreen,
} from "../screens" // eslint-disable-line @typescript-eslint/no-unused-vars

export const RootNavigator = createStackNavigator(
  {
    primaryStack: { screen: PrimaryNavigator },
    mainStack: { screen: MainNavigator },
    authStack: { screen: AuthNavigator },
    ChatGroupScreen: {
      screen: ChatGroupScreen,
    },
    userEnrollScreen: { 
      screen: UserEnrollScreen 
    },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
