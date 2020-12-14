import { createStackNavigator } from "react-navigation-stack"
import {
  PostDetailScreen,
  TutorEnrollScreen,
} from "../screens"

export const PostDetailStackNavigator = createStackNavigator({
  postDetail: {
    screen: PostDetailScreen,
    navigationOptions: {
      title: 'postDetail',
      headerShown: false,
    }
  },
  tutorEnroll: { screen: TutorEnrollScreen },
})
