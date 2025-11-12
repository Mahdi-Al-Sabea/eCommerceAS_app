import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';




const AuthStack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}



const MainStack = createNativeStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MainScreen" component={MainScreen} />
      <MainStack.Screen name="ProductDetailsScreen"  component={ProductDetailsScreen}           options={
          { presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',headerShown: true }}/>
    </MainStack.Navigator>
  );
}










function App() {
  
  const RootStack = createNativeStackNavigator();
  
  return (
    <NavigationContainer >
      <SafeAreaProvider>
        <RootStack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>

          <RootStack.Screen name="Auth" component={AuthStackScreen} />
          <RootStack.Screen name="Main" component={MainStackScreen} />


        </RootStack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}



export default App;
