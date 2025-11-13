import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MainScreen" component={MainScreen} />
      <MainStack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
        
        }}
      />
    </MainStack.Navigator>
  );
}

export default function AppContent() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log('Auth changed:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainStackScreen} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackScreen} />
        )}

      </RootStack.Navigator>
    </NavigationContainer>
  );
}
