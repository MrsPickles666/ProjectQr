import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity, BackHandler, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crearUsu from '../api/user';
import { Picker } from '@react-native-picker/picker';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [token, setToken] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

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
      const response = await fetch('http://192.168.81.71:3000/roles/all');
      const data = await response.json();
      let valor = data.data;
      setRoles(valor);
    } catch (error) {
      console.log('Error al obtener los roles:', error);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
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
      setModalVisible(true);
    } catch (error) {
      console.log('Error al enviar los datos del usuario', error);
      setMensaje('Error al agregar al usuario. Inténtalo de nuevo.');
      setModalVisible(true);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Login');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation])
  );

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

        <View style={styles.selectContainer}>
          <Picker
            style={styles.select}
            selectedValue={documentType}
            onValueChange={(itemValue) => setDocumentType(itemValue)}
          >
            <Picker.Item label="Tipo de Documento" value="" />
            <Picker.Item label="CC" value="CC" />
            <Picker.Item label="TI" value="TI" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Número de Documento"
          keyboardType="numeric"
          onChangeText={setDocumentNumber}
          value={documentNumber} />

        <View style={styles.selectContainer}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.select}>
            {roles.map((role) => {
              return <Picker.Item key={role.id_Rol} label={role.nom_Rol} value={role.id_Rol} />;
            })}
          </Picker>
        </View>

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
          keyboardType="numeric"
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
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.registerLink}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
        <Button title="Listo" onPress={enviarDatos} color={'#39A900'} />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{mensaje}</Text>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButton, styles.modalButtonConfirm]} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Cerrar</Text>
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
    width: '100%',
    height: 50,
  },
  selectContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  select: {
    width: '100%',
    height: '100%',
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

export default RegisterScreen;
