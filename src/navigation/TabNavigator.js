import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import TournamentsScreen from '../screens/TournamentsScreen';
import FaqScreen from '../screens/FaqScreen';
import ContactScreen from '../screens/ContactScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName='Torneios'
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#0084ff',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Torneios') iconName = 'trophy-outline';
            else if (route.name === 'Dúvidas') iconName = 'help-circle-outline';
            else if (route.name === 'Contato') iconName = 'mail-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Dúvidas" component={FaqScreen} />
        <Tab.Screen name="Torneios" component={TournamentsScreen} />
        <Tab.Screen name="Contato" component={ContactScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}