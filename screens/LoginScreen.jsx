import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity, BackHandler, Alert, Modal, Pressable } from 'react-native';
import { useNavigation, StackActions, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
      setErrorMessage('');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('¡Espera!', '¿Estás seguro que quieres salir de la aplicación?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel'
        },
        { text: 'Sí', onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, ingrese correo/contraseña.');
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch('http://192.168.81.71:3000/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        await AsyncStorage.setItem('token', token);

        if (data.user) {
          await AsyncStorage.setItem('user', JSON.stringify(data.user));
        } else {
          console.warn('User data is missing in the response');
        }

        const resetAction = StackActions.replace('Home');
        navigation.dispatch(resetAction);
      } else {
        setErrorMessage(data.message || 'Ocurrió un error durante el inicio de sesión.');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error de red:', error);
      setErrorMessage('Ocurrió un error de red. Por favor, intenta nuevamente.');
      setModalVisible(true);
    }
  };

  const handleRegisterLink = () => {
    navigation.navigate('Register');
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio De Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handleRegisterLink}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
      <Button title="Iniciar Sesión" onPress={handleLogin} color="#39A900" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <Pressable style={[styles.modalButton, styles.modalButtonClose]} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  registerLink: {
    marginBottom: 16,
    textAlign: 'center',
    color: '#39A900',
    textDecorationLine: 'underline',
  },
  title: {
    marginBottom: 32,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39A900',
    textAlign: 'center',
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
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  modalButtonClose: {
    backgroundColor: 'gray',
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
