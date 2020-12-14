import { createStackNavigator } from 'react-navigation-stack'
import { PostDetailStackNavigator } from "../navigation/postDetailStack-navigator"
import {
  TimelineScreen,
  CreatePostScreen,
  SearchPostScreen,
  OtherProfileScreen,
} from "../screens"

export const TimelineNavigator = createStackNavigator(
  {
    timeline: {
      screen: TimelineScreen,
      navigationOptions: {
        title: 'Timeline',
        headerShown: false,
      }
    },
    otherProfile: { screen: OtherProfileScreen },
    createPost: { screen: CreatePostScreen, navigationOptions: { title: 'Create New Post' } },
    searchPost: { screen: SearchPostScreen, navigationOptions: { title: 'Search' } },
    postDetailStack: { screen: PostDetailStackNavigator, navigationOptions: { headerShown: false, title: 'Detail' } },
  },
  {
    // headerMode: "screen",
  },
)
