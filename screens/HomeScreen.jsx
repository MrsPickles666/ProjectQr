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
  const navigateAmbien = () => {
    navigation.navigate('AmbienteScrenn');
  };
  const navigateReport = () => {
    navigation.navigate('ReportScreen');
  };
  const navigateCateg = () => {
    navigation.navigate('CategoriaScrenn');
  };
  return (

    <View style={styles.container}>
      <View style={styles.encabezado}>
        <View style={styles.containerInfo}>
          <TouchableOpacity onPress={btnBars}>
            <FontAwesomeIcon name="bars" size={25} style={styles.imgInfo} />
          </TouchableOpacity>
          <Text style={styles.namUser}>Jairo de Avila</Text>
          <TouchableOpacity onPress={navigateToSetting}>
            <FontAwesomeIcon name="gear" size={25} style={styles.imgInfo} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imgPerfContainer}>
        <TouchableOpacity onPress={navigateToUser}>
          <View style={styles.fondoPerf}>
            <View style={styles.Perf}>
              <FontAwesomeIcon name="user-circle" size={50} color="white" />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.barraLateral, { transform: [{ translateX: slideAnimation.interpolate({ inputRange: [0, 1], outputRange: [-150, 0] }) }] }]}>
        <View style={styles.barraOpcion}>
          <TouchableOpacity onPress={navigateAmbien} style={styles.opcion}>
            <FontAwesomeIcon name="building" size={40} />
            <Text>Ambientes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateReport} style={styles.opcion}>
            <FontAwesomeIcon name="file-text" size={40} />
            <Text>Inventarios</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateCateg} style={styles.opcion}>
            <FontAwesomeIcon name="th" size={40} />
            <Text>Categorias</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.opcion} onPress={btnBars}>
            <FontAwesomeIcon name="arrow-left" size={35} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <TouchableOpacity style={styles.containerScan}>
        <FontAwesomeIcon name="qrcode" size={200} />
      </TouchableOpacity>

      <View style={styles.containerCam}>
        <TouchableOpacity>
          <FontAwesomeIcon style={styles.Cam} name="camera" size={60} />
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECECEC',
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
    margin: 18,
    fontSize: 20,
    color: 'white',
  },
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 80,
  },
  imgInfo: {
    margin: 20,
  },
  imgPerfContainer: {
    top: -30,
    alignItems: 'center',
  },

  fondoPerf: {
    backgroundColor: '#ECECEC',
    borderRadius: 100,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Perf: {
    backgroundColor: '#39A900',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  barraLateral: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1,
    width: 100,
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
  },
  opcion: {
    margin: '15%',
    alignItems: 'center',
  },
  barraOpcion: {
    alignItems: 'center',
  },
  containerScan: {
    flex: 1,
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCam: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#39A900',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },

  Cam: {
    color: 'white',
  },
});

export default HomeScreen;
