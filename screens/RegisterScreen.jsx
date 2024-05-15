import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, TextInput, StyleSheet, Button, Picker } from 'react-native'; // Importa Picker
import AsyncStorage from '@react-native-async-storage/async-storage';
import crearUsu from '../api/user';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [position, setPosition] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [token, setToken] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [roles, setRoles] = useState([]); // Nuevo estado para almacenar los roles

  const navigation = useNavigation('');

  useEffect(() => {
    const obtenerToken = async () => {
      try {
        const tokenGuardado = await AsyncStorage.getItem('token');
        setToken(tokenGuardado);
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    };
    obtenerToken();

    // Obtener los roles cuando el componente se monte
    obtenerRoles();
  }, []);

  // Función para obtener los roles de la base de datos
  const obtenerRoles = async () => {
    try {
      const response = await fetch('http://192.168.47.170:3000/roles/all');
      const data = await response.json(); // Parsea los datos JSON
      
      // Ahora puedes actualizar el estado "roles"
    let valor =  data.data
    setRoles(valor)
       // Imprime los datos obtenidos
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  };
  console.log(roles);

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
      setMensaje('El usuario se registro correctamente');
      handleSubmit();
    } catch (error) {
      console.error('Error al enviar los datos del usuario', error);
      setMensaje('Error al agregar al usuario. Inténtalo de nuevo.');
    }
  };

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

        {/* Selector de roles */}
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.input}>
          {roles.map((role) =>{
            console.log(role)
            return <Picker.Item key = {role.id_Rol} label={role.nom_Rol} value={role.id_Rol} />
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
