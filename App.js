
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectionScreen from './src/screens/SelectionScreen';
import MatchScreen from './src/screens/MatchScreen';
import WinnerScreen from './src/screens/WinnerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
        <Stack.Screen name="Winner" component={WinnerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}