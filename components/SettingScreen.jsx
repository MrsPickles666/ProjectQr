import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ComponentPantallas from './ComponentPantallas';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

const SettingScreen = () => {
  const navigation = useNavigation();

  const navigateToCalificanos = () => {
    navigation.navigate('Calificanos');
  };

  const navigateToNovedad = () => {
    navigation.navigate('Novedad');
  };

  const navigateRecupPassw = () => {
    navigation.navigate('RecupContrScreen');
  };

  const navigateTologin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.TouchableOpacity, { top: '50%' }]} onPress={navigateToCalificanos}>
        <View style={styles.cali}>
          <Text style={styles.text}>
            Calificanos
            <FontAwesomeIcon style={styles.iconstar} name="star" />
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.TouchableOpacity, { top: '60%' }]} onPress={navigateToNovedad}>
        <View style={styles.nove}>
          <Text style={styles.text}>
            Novedad
            <FontAwesomeIcon style={styles.iconcascos} name="headphones" />
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.TouchableOpacity, { top: '70%' }]} onPress={navigateRecupPassw}>
        <View style={styles.nove}>
          <Text style={styles.text}>
            Recuperar Contraseña
            <FontAwesomeIcon style={styles.iconcascos} name="headphones" />
          </Text>
        </View>
      </TouchableOpacity>

      <ComponentPantallas tittle="Ajustes" icono='gear' />

      <View style={styles.boton}>
        <Button
          onPress={navigateTologin}
          title="Cerrar Sesión"
          buttonStyle={{ backgroundColor: '#39A900' }}
          titleStyle={{ fontWeight: 'bold' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  iconstar: {
    bottom: '48%',
    position: 'absolute',
    justifyContent: 'center',
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '50%',
  },
  iconcascos: {
    bottom: '36%',
    position: 'absolute',
    justifyContent: 'center',
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '50%',
  },
  cali: {
    justifyContent: 'center',
    alignItems: 'center',  // Añadida esta línea para centrar horizontalmente
  },
  nove: {
    justifyContent: 'center',
    alignItems: 'center',  // Añadida esta línea para centrar horizontalmente
  },
  boton: {
    width: 'auto',
    padding: 10,
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  TouchableOpacity: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
    color: 'white',
    fontSize: 30,
    elevation: 2,

  },
});

export default SettingScreen;
