import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import crearUsu from '../api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RegisterScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [position, setPosition] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [mensaje, setmensaje] = useState('');



  navigation.navigate('Login');

  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const tokenGuardado = await AsyncStorage.getItem('token');
      } catch (error) {
        console.error('Error getting token', error);
      }
    };

  })
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.containerForm} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Registro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          onChangeText={setLastName}
          value={lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo de Documento"
          onChangeText={setDocumentType}
          value={documentType}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de Documento"
          keyboardType="numeric"
          onChangeText={setDocumentNumber}
          value={documentNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Cargo"
          onChangeText={setPosition}
          value={position}
        />
        <TextInput
          style={styles.input}
          placeholder="Rol"
          onChangeText={setRole}
          value={role}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <Button title="Listo" onPress={handleRegister} color={'#39A900'} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  scrollContainer: {
    width: '100%',
  },
  containerForm: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  title: {
    marginBottom: 32,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39A900',
    textAlign: 'center',
  },
});

export default RegisterScreen;
