// App.js (AGORA MUITO MAIS LIMPO!)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Analytics } from "@vercel/analytics/next"

// O CAMINHO CORRETO E MAIS SEGURO
import HomeScreen from './screens/HomeScreen';
import TicketDetailScreen from './screens/TicketDetailScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Analytics />
    </>
  );
}