import React from 'react';
import { Platform } from 'react-native';
import { 
    createBottomTabNavigator, 
    createMaterialTopTabNavigator,
    createStackNavigator,
    createAppContainer
  } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { purple, white } from '../utils/colors';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import Deck from './Deck';
import Quiz from './Quiz';
import NewCard from './NewCard';
  
const RouteConfigs = {
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        }
    }
  };

const TabConfigs = {
    navigationOptions: {
        header: null
      },
      tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 60,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
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
    ? createBottomTabNavigator(RouteConfigs, TabConfigs)
    : createMaterialTopTabNavigator(RouteConfigs, TabConfigs)

const MainNavigator = createStackNavigator({
    Home: {
          screen: Tabs,
          navigationOptions: {
            header: null,
          },
        },
    Deck: {
          screen: Deck,
          navigationOptions: {
            headerTintColor: white,
            headerStyle: {
              backgroundColor: purple,
            },
        },
      },
    Quiz: {
          screen: Quiz,
          navigationOptions: {
            headerTintColor: white,
            headerStyle: {
              backgroundColor: purple,
            },
        },
    },
    NewCard: {
            screen: NewCard, 
            navigationOptions: {
                headerTintColor: white,
                headerStyle: {
                  backgroundColor: purple,
            },
        }
    }
})

export default createAppContainer(MainNavigator);