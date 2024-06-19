import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, SafeAreaView } from 'react-native';
import AppStateManager from './AppStateManager';

import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import ComponentPantallas from './components/ComponentPantallas';
import UserScreen from './screens/UserScreen';
import CalificanosScreen from './screens/CalificanosScrenn';
import NovedadScreen from './screens/NovedadScreen';
import RegisterObjets from './screens/RegisterObjets';
import EditarObjets from './screens/EditarObjets';
import EditarInventario from './screens/EditarInventario';
import Inventario from './screens/Inventario';
import DeleScreen from './screens/DeleScreen';
import ReportScreen from './screens/InventarioScreen';
import InventarioScreen from './screens/InventarioScreen';
import RecupContrScreen from './screens/RecupContrScreen';
import DetailScreen from './screens/DetailScreen';
import VerToken from './utils/ComponentToken';
import OtraPantalla from './screens/OtraPantalla';
import RegisterInventario from './screens/RegisterInventario';
import AmbienteScrenn from './screens/AmbienteScrenn';
import CategoriaScrenn from './screens/CategoriaScrenn';
import EditAmbien from './screens/EditAmbien';
import EditCategory from './screens/EditCategory';
import RegisterAmbie from './screens/RegisterAmbie';
import RegisterCatego from './screens/RegisterCatego';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import CameraScreen from './components/Camera';

const Stack = createStackNavigator();

const forNoAnimation = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Navigation = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#39A900" />
      <NavigationContainer>
        <AppStateManager>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: forNoAnimation,
            }}
            initialRouteName="Login"
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ gestureEnabled: false }}
            />            
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="User" component={UserScreen} />
            <Stack.Screen name="Calificanos" component={CalificanosScreen} />
            <Stack.Screen name="Novedad" component={NovedadScreen} />
            <Stack.Screen name="RegisterObjets" component={RegisterObjets} />
            <Stack.Screen name="EditarObjets" component={EditarObjets} />
            <Stack.Screen name="EditarInventario" component={EditarInventario} />
            <Stack.Screen name="Inventario" component={Inventario} />
            <Stack.Screen name="DeleScreen" component={DeleScreen} />
            <Stack.Screen name="ReportScreen" component={ReportScreen} />
            <Stack.Screen name="RecupContrScreen" component={RecupContrScreen} />
            <Stack.Screen name="AmbienteScrenn" component={AmbienteScrenn} />
            <Stack.Screen name="CategoriaScrenn" component={CategoriaScrenn} />
            <Stack.Screen name="EditAmbien" component={EditAmbien} />
            <Stack.Screen name="EditCategory" component={EditCategory} />
            <Stack.Screen name="RegisterAmbie" component={RegisterAmbie} />
            <Stack.Screen name="RegisterCatego" component={RegisterCatego} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Token" component={VerToken} />
            <Stack.Screen name="otra" component={OtraPantalla} />
            <Stack.Screen name="RegisterInventario" component={RegisterInventario} />
            <Stack.Screen name="Details" component={DetailScreen} />
            <Stack.Screen name="componente" component={ComponentPantallas} />
          </Stack.Navigator>
        </AppStateManager>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Navigation;