import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const [mostrarBarra, setMostrarBarra] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const btnBars = () => {
    setMostrarBarra(!mostrarBarra);
    Animated.timing(slideAnimation, {
      toValue: mostrarBarra ? 0 : 1,
      duration: 500, 
      useNativeDriver: false,
    }).start();
  };

  const navigation = useNavigation();
  const navigateToSetting = () => {
    navigation.navigate('Setting');
  };
  const navigateToUser = () => {
    navigation.navigate('User');
  };
  const navigateObjets = () => {
    navigation.navigate('RegisterObjets');
  };
  const navigateEditar = () => {
    navigation.navigate('EditarObjets');
  };
  const navigateInve = () => {
    navigation.navigate('Inventario');
  };
  const navigateDele = () => {
    navigation.navigate('DeleScreen');
  };
  const navigateReport = () => {
    navigation.navigate('ReportScreen');
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <View style={styles.containerInfo}>
          <TouchableOpacity onPress={btnBars}>
            <FontAwesomeIcon name="bars" size={30} style={styles.imgInfo} />
          </TouchableOpacity>
          <Text style={styles.namUser}>Jairo de Avila</Text>
          <TouchableOpacity onPress={navigateToSetting}>
            <FontAwesomeIcon name="gear" size={30} style={styles.imgInfo} />
          </TouchableOpacity>
        </View>
      </View>

    <View style={styles.imgPerfContainer}>
      <TouchableOpacity onPress={navigateToUser}>
        <View style={styles.fondoPerf}>
          <View style={styles.Perf}>
            <FontAwesomeIcon name="user-circle" size={90} color="white"/>
          </View>
        </View>
      </TouchableOpacity>
    </View>

      <Animated.View style={[styles.barraLateral, { transform: [{ translateX: slideAnimation.interpolate({ inputRange: [0, 1], outputRange: [-150, 0] }) }] }]}>
        <View style={styles.barraOpcion}>
          <TouchableOpacity onPress={navigateObjets} style={styles.opcion}>
            <FontAwesomeIcon name="plus" size={45} />
            <Text>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateEditar} style={styles.opcion}>
            <FontAwesomeIcon name="edit" size={45} />
            <Text>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateInve} style={styles.opcion}>
            <FontAwesomeIcon name="list-alt" size={45} />
            <Text>Inventario</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateDele} style={styles.opcion}>
            <FontAwesomeIcon name="trash" size={45} />
            <Text>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateReport} style={styles.opcion}>
            <FontAwesomeIcon name="file-text" size={45} />
            <Text>Reporte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.opcion} onPress={btnBars}>
            <FontAwesomeIcon name="arrow-left" size={45} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={styles.containerScan}>
        <FontAwesomeIcon name="qrcode" size={250} />
      </View>

      <View style={styles.containerCam}>
        <FontAwesomeIcon name="camera" size={80} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  encabezado: {
    backgroundColor: '#39A900',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  namUser: {
    margin: 20,
    fontSize: 25,
  },
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 100,
  },
  imgInfo: {
    margin: 20,
  },
  imgPerfContainer: {
    top: -40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  fondoPerf:{
    backgroundColor: 'white',
    borderRadius: 100, 
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Perf:{
    backgroundColor: '#39A900',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100, 
  },
  barraLateral: {
    backgroundColor: 'white',
    position: 'absolute', 
    zIndex: 1,
    width: 150,
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
  },
  opcion: {
    margin: '15%',
    alignItems: 'center',
  },
  barraOpcion:{
    alignItems: 'center',
  },
  containerScan: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCam: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#39A900',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    },
});

export default HomeScreen;
