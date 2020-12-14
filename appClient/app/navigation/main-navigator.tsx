import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { TimelineNavigator } from './timeline-navigator'
import { ProfileNavigator } from './profile-navigator'
import {
  ChatScreen,
  NotificationsScreen,
} from "../screens"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import React from "react"
import { translate } from "../i18n"
const TabBarComponent = props => <BottomTabBar {...props} />;

export const MainNavigator = createBottomTabNavigator(
  {
    timeline: {
      screen: TimelineNavigator,
      navigationOptions: {
        tabBarLabel: translate("common.timeline"),
        tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} size={25} />
      }
    },
    profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: translate("common.profile"),
        tabBarIcon: ({ tintColor }) => <Icon name="account-box" color={tintColor} size={25} />
      }
    },
    notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        tabBarLabel: translate("common.notifications"),
        tabBarIcon: ({ tintColor }) => <Icon name="bell" color={tintColor} size={25} />
      }
    },
    chat: {
      screen: ChatScreen,
      navigationOptions: {
        tabBarLabel: translate("common.chat"),
        tabBarIcon: ({ tintColor }) => <Icon name="message-text" color={tintColor} size={25} />
      }
    }
  },
  {
    tabBarComponent: props => (
      <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    ),
  }
)
