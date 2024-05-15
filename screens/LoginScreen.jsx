import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.47.170:3000/usuario/login', {
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
        await AsyncStorage.setItem('token',token);
        // Si la respuesta es exitosa, redirige al usuario a la pantalla de inicio
        navigation.navigate('Home');
      } else {
        // Si hay un error en la respuesta, muestra un mensaje de error
        setErrorMessage(data.message || 'Ocurrió un error durante el inicio de sesión.');
      }
    } catch (error) {
      // Si hay un error en la solicitud, muestra un mensaje de error
      console.error('Error de red:', error);
      setErrorMessage('Ocurrió un error de red. Por favor, intenta nuevamente.');
    }
  };

  const handleRegisterLink = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Inicio De Sesión</Text>
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
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity onPress={handleRegisterLink}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
      <Button title="Iniciar Sesión" onPress={handleLogin} color={'#39A900'} />
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
  },
  registerLink: {
    marginBottom: 16,
    textAlign: 'center',
    color: '#39A900',
    textDecorationLine: 'underline',
  },
  tittle: {
    marginBottom: 32,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39A900',
    textAlign: 'center',
  },
});

export default LoginScreen;
