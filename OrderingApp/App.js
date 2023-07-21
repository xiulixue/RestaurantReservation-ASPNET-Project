import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './services/AuthContext';
import { getToken } from './services/TokenStorage';
import * as LoginApiService from './services/LoginApiService';
import LoginScreen from './screens/LoginScreen';
import OrderScreen from './screens/TableOrderScreen';
import OrderDetail from './screens/OrderDetail';
import OrderList from './screens/OrderList';
import WelcomeScreen from './screens/WelcomeScreen';
import MenuScreen from './screens/MenuScreen';
import MenuItemList from './screens/MenuItemList';
import MenuItemDetail from './screens/MenuItemDetail';
import CreateMenuItemPage from './screens/CreateMenuItemPage';
import EditMenuItemPage from './screens/EditMenuItemPage';


const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null)

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await getToken();
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setToken(userToken);
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const { username, password } = data;

        const result = await LoginApiService.login(username, password);
        if (result.authenticated) {
          setToken(result.token);
          //console.log(result);
        }
      },
      signOut: async () => {
        await LoginApiService.signOut();
        setToken(null);
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        // dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
        //initialRouteName='Test'
        >
          {token === null ? (
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Order" component={OrderScreen} />
              <Stack.Screen name="OrderList" component={OrderList} />
              <Stack.Screen name="Menu" component={MenuScreen} /> 
              <Stack.Screen name="OrderDetail" component={OrderDetail} />
              <Stack.Screen name="MenuItemList" component={MenuItemList} />
              <Stack.Screen name="MenuItemDetail" component={MenuItemDetail} />
              <Stack.Screen name="CreateMenuItem" component={CreateMenuItemPage} />
              <Stack.Screen name="EditMenuItem" component={EditMenuItemPage} />
            </>
          )}

        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
