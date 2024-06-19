import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToCalif = () => {
    navigation.navigate('Calificanos');
  };

  const navigateToNov = () => {
    navigation.navigate('Novedad');
  };

  const handleLogout = async () => {
    setModalVisible(true);
  };

  const confirmLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setModalVisible(false); // Cerrar modal inmediatamente después de navegar
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.tituloText}>Ajustes</Text>
      </View>
      <View style={styles.containerSetting}>
        <TouchableOpacity>
          <FontAwesomeIcon name="gear" size={60} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerOptions}>
        <TouchableOpacity style={styles.optionView} onPress={navigateToCalif}>
          <Text style={styles.optionText}>Calificanos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToCalif}>
          <FontAwesomeIcon name="star" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerOptions}>
        <TouchableOpacity style={styles.optionView} onPress={navigateToNov}>
          <Text style={styles.optionText}>Novedad</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToNov}>
          <FontAwesomeIcon name="headphones" size={30} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>¿Estás seguro de que deseas cerrar sesión?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButton, styles.modalButtonClose]} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.modalButtonConfirm]} onPress={confirmLogout}>
                <Text style={styles.modalButtonText}>Cerrar Sesión</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
  containerSetting: {
    marginHorizontal: '5%',
    width: '90%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  containerOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    marginHorizontal: 30,
    marginBottom: 50,
    marginVertical: 10,
  },
  optionView: {
    flex: 1,
    marginRight: 10,
  },
  optionText: {
    fontSize: 22,
  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: '#39A900',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 100,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    width: 120,
  },
  modalButtonClose: {
    backgroundColor: 'gray',
  },
  modalButtonConfirm: {
    backgroundColor: '#39A900',
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingScreen;