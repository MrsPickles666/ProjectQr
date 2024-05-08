import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, SafeAreaView } from 'react-native';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Settingcreen from './screens/SettingScreen';
import ComponentPantallas from './components/ComponentPantallas';
import UserScreen from './screens/UserScreen';
import CalificanosScreen from './screens/CalificanosScrenn';
import NovedadScreen from './screens/NovedadScreen';
import RegisterObjets from './screens/RegisterObjets';
import EditarObjets from './screens/EditarObjets';
import Inventario from './screens/Inventario';
import DeleScreen from './screens/DeleScreen';
import ReportScreen from './screens/ReportScreen';
import RecupContrScreen from './screens/RecupContrScreen';
import DetailScreen from './screens/DetailScreen';
import OtraPantalla from './screens/OtraPantalla';
import VerToken from './utils/ComponentToken';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="otra" component={OtraPantalla} />
          <Stack.Screen name="Token" component={VerToken} />
          <Stack.Screen name="Setting" component={Settingcreen} />
          <Stack.Screen name="Details" component={DetailScreen} />
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
