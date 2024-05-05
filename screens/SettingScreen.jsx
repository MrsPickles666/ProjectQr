import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const SettingScreen = () => {
  const navigation = useNavigation();

  const navigateToCalif = () => {
    navigation.navigate('Calificanos');
  };

  const navigateToNov = () => {
    navigation.navigate('Novedad');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
          <Text style={styles.tituloText}>Ajustes</Text>
      </View>
      <View style={styles.containerSettin}>
          <TouchableOpacity>
              <FontAwesomeIcon name="gear" size={60}/>
          </TouchableOpacity>
      </View>

      <View style={styles.containeOption}>
          <View style={styles.Options}>
            <TouchableOpacity style={styles.optionViews} onPress={navigateToCalif}>
              <Text style={styles.optionText}>Calificanos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToCalif}>
              <FontAwesomeIcon name="star" size={30}/>
            </TouchableOpacity>

          </View>
          <View style={styles.Options}>
            <TouchableOpacity style={styles.optionViews} onPress={navigateToNov}>
              <Text style={styles.optionText}>Novedad</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToNov}>
              <FontAwesomeIcon name="headphones" size={30}/>
            </TouchableOpacity>
          </View>
      </View>

      <TouchableOpacity onPress={navigateToLogin} style={styles.button}>
          <Text style={styles.buttonText}>Cerrar Sesion</Text>
      </TouchableOpacity>
      
      <View style={styles.flechaContainer}>
          <TouchableOpacity onPress={navigateToHome}>
              <FontAwesomeIcon name="arrow-left" size={40} style={styles.flechaIcon} />
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  titulo: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#39A900',
  },
  tituloText: {
    fontSize: 24,
    color: 'white',
  },
  containerSettin: {
    marginHorizontal: '5%',
    width: '90%',
    borderBottomWidth: 1,
    flexDirection: 'row',   
    justifyContent: 'flex-end',  
    alignItems: 'center', 
    padding: 10,
  },
  containeOption: {
    bottom: '-10%',
  },
  Options: {
    width: '80%',
    paddingBottom: '10%',
    marginHorizontal: '5%',
    flexDirection: 'row',
  },
  optionViews: {
    width: '40%',
    marginRight: '40%',
  },

  optionText: {
    fontSize: 22,
  },

  button: {
    position: 'absolute',
    bottom: '20%',
    width: 160,
    height: 50,
    backgroundColor: '#39A900',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  flechaContainer: {
    position: 'absolute',
    bottom: 0, 
    right: 0, 
    marginBottom: 40,
    marginRight: 40, 
  },
  flechaIcon: {
    color: 'black',
  },
});

export default SettingScreen;
