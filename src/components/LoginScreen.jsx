// components/LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Input } from 'react-native-elements';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    navigation.navigate('Home');
  };

  const handleRegisterLink = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Inicio De Sesión</Text>
      <Input style={styles.BoxInput}
        placeholder="Correo electrónico"
        leftIcon={<Icon name='email' />}
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input style={styles.BoxInput}
        placeholder="Contraseña"
        leftIcon={<Icon name='lock' />}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity onPress={handleRegisterLink}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>

      <View style={styles.boton}>
        <Button title="Listo" onPress={handleLogin}  color={'#39A900'}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  registerLink: {
    marginTop: 16,
    textAlign: 'center',
    color: '#39A900',
    textDecorationLine: 'underline',
  },
  tittle: {
    top: -100,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#39A900',
    textAlign: 'center',
  },
  boton: {
    marginTop: 16,
    color: '#39A900',
    width: 100,
    height: 'auto',
    backgroundColor: '#39A900',
    borderRadius: 10,
    padding: 5,
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'center'
  },
});

export default LoginScreen;
