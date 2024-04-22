import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, SafeAreaView } from 'react-native';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import Settingcreen from './components/SettingScreen';
import ComponentPantallas from './components/ComponentPantallas';
import UserScreen from './components/UserScreen';
import CalificanosScreen from './components/CalificanosScrenn';
import NovedadScreen from './components/NovedadScreen';
import RegisterObjets from './components/RegisterObjets';
import EditarObjets from './components/EditarObjets';
import Inventario from './components/Inventario';
import DeleScreen from './components/DeleScreen';
import ReportScreen from './components/ReportScreen';
import RecupContrScreen from './components/RecupContrScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="Setting" component={Settingcreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="componente" component={ComponentPantallas} />
          <Stack.Screen name="User" component={UserScreen} />
          <Stack.Screen name="Calificanos" component={CalificanosScreen} />
          <Stack.Screen name="Novedad" component={NovedadScreen} />
          <Stack.Screen name="RegisterObjets" component={RegisterObjets} />
          <Stack.Screen name="EditarObjets" component={EditarObjets} />
          <Stack.Screen name="Inventario" component={Inventario} />
          <Stack.Screen name="DeleScreen" component={DeleScreen} />
          <Stack.Screen name="ReportScreen" component={ReportScreen} />
          <Stack.Screen name="RecupContrScreen" component={RecupContrScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Navigation;
