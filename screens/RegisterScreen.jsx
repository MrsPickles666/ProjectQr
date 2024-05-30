import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crearUsu from '../api/user';
import { Picker } from '@react-native-picker/picker';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [documentType, setDocumentType] = useState(''); // Cambiado el estado para almacenar el tipo de documento
  const [documentNumber, setDocumentNumber] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [token, setToken] = useState('');
  const [mensaje, setMensaje] = useState('');
  
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  
  const navigation = useNavigation('');

  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const tokenGuardado = await AsyncStorage.getItem('token');
        setToken(tokenGuardado);
      } catch (error) {
        console.log('Error al obtener el token:', error);
      }
    };
    obtenerToken();

    obtenerRoles();
  }, []);

  const obtenerRoles = async () => {
    try {
      const response = await fetch('http://192.168.137.1:3000/roles/all');
      const data = await response.json();
      let valor = data.data
      setRoles(valor)
    } catch (error) {
      console.log('Error al obtener los roles:', error);
    }
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const enviarDatos = async () => {
    const formData = {
      num_doc: documentNumber,
      nom_fun: name,
      ape_fun: lastName,
      car_fun: position,
      email: email,
      id_rol_fk: role,
      password: password,
      tip_doc: documentType,
      tel_fun: telefono,
    };
    try {
      await crearUsu(formData, token);
      setMensaje('El usuario se registró correctamente');
      handleSubmit();
    } catch (error) {
      console.log('Error al enviar los datos del usuario', error);
      setMensaje('Error al agregar al usuario. Inténtalo de nuevo.');
    }
  }

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

        <Picker
          style={styles.input}
          selectedValue={documentType} // Usamos documentType para el valor seleccionado
          onValueChange={(itemValue) => setDocumentType(itemValue)} // Actualizamos documentType
        >
          <Picker.Item label="Tipo de Documento" value="" />
          <Picker.Item label="CC" value="CC" />
          <Picker.Item label="TI" value="TI" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Número de Documento"
          keyboardType="numeric"
          onChangeText={setDocumentNumber}
          value={documentNumber} />

        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.input}>
          {roles.map((role) => {
            return <Picker.Item key={role.id_Rol} label={role.nom_Rol} value={role.id_Rol} />
          })}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder='Telefono'
          onChangeText={setTelefono}
          value={telefono}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <Button title="Listo" onPress={enviarDatos} color={'#39A900'} />
      </ScrollView>
      <TouchableOpacity onPress={navigateToHome}>
        <Text style={styles.registerLink}>Iniciar Sesión</Text>
      </TouchableOpacity>
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
  registerLink: {
    marginBottom: 16,
    textAlign: 'center',
    color: '#39A900',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
