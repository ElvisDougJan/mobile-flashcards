import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { white, amber_darken_3, blue, green_darken_1, grey_darken_1 } from './colors';
import DeckListComponent from './../components/DeckList';
import NewDeckComponent from './../components/NewDeck';
import DeckComponent from './../components/Deck';
import QuizComponent from './../components/Quiz';
import NewCardComponent from './../components/NewCard';

const RouteSettings = {
  DeckList: {
    screen: DeckListComponent,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeckComponent,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
};

const TabSettings = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? amber_darken_3 : white,
    style: {
      height: 60,
      backgroundColor: Platform.OS === 'ios' ? white : amber_darken_3,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
};

const Tabs = Platform.OS === "ios"
  ? createBottomTabNavigator(RouteSettings, TabSettings)
  : createMaterialTopTabNavigator(RouteSettings, TabSettings)

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  Deck: {
    screen: DeckComponent,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: amber_darken_3,
      },
    },
  },
  Quiz: {
    screen: QuizComponent,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green_darken_1,
      },
    },
  },
  NewCard: {
    screen: NewCardComponent,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: grey_darken_1,
      },
    }
  }
})

export default createAppContainer(MainNavigator);