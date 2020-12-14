import { createStackNavigator } from 'react-navigation-stack'
import {
  ProfileScreen,
  ProfileSettingScreen,
  PersonalDataScreen,
  ProfileDataScreen,
  TeachingHistoryScreen,
  ReviewsSubjectScreen
} from "../screens"

export const ProfileNavigator = createStackNavigator(  
  {
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
        headerShown: false,
      }
    },
    profileSetting: { 
      screen: ProfileSettingScreen, 
      navigationOptions: { 
        title: 'Profile Setting',
        headerShown: false,
      } 
    },
    editPersonalData: { 
      screen: PersonalDataScreen, 
      navigationOptions: { 
        title: 'Personal Data',
        headerShown: false,
      } 
    },
    editProfileData: { 
      screen: ProfileDataScreen, 
      navigationOptions: { 
        title: 'Profile Data',
        headerShown: false,
      } 
    },
    teachingHistory: { 
      screen: TeachingHistoryScreen, 
      navigationOptions: { 
        title: 'Teaching History',
        headerShown: false,
      } 
    },
    reviewsSubject: { 
      screen: ReviewsSubjectScreen, 
      navigationOptions: { 
        title: 'Reviews Subject',
        headerShown: false,
      } 
    },
  },
  {
    // headerMode: "screen",
  },)