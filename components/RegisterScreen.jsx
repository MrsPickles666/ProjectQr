import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { Input } from 'react-native-elements';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [documentType, setDocumentType] = useState('DNI');
  const [documentNumber, setDocumentNumber] = useState('');
  const [position, setPosition] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
  
    console.log('Registro exitoso:', {
      name,
      lastName,
      documentType,
      documentNumber,
      position,
      role,
      email,
      password,
    });

    navigation.navigate('Login'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <Input
        placeholder='Nombre'
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        containerStyle={styles.inputContainer}
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <Input
        placeholder='Apellido'
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        containerStyle={styles.inputContainer}
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />

      <Input
        placeholder='Tipo de Documento'
        leftIcon={{ type: 'font-awesome', name: 'id-card' }}
        containerStyle={styles.inputContainer}
        onChangeText={(text) => setDocumentType(text)}
        value={documentType}
      />

      <Input
        placeholder='Número de Documento'
        leftIcon={{ type: 'font-awesome', name: 'id-card' }}
        containerStyle={styles.inputContainer}
        onChangeText={(text) => setDocumentNumber(text)}
        value={documentNumber}
        keyboardType="numeric"
      />

      <Input
        placeholder='Cargo'
        leftIcon={{ type: 'font-awesome', name: 'briefcase' }}
        containerStyle={styles.inputContainer}
        onChangeText={(text) => setPosition(text)}
        value={position}
      />

      <Input
        placeholder='Rol'
        leftIcon={{ type: 'font-awesome', name: 'users' }}
        containerStyle={styles.inputContainer}
        onChangeText={(text) => setRole(text)}
        value={role}
      />

      <Input
        placeholder='Email'
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        containerStyle={styles.inputContainer}
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <Input
        placeholder='Contraseña'
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        containerStyle={styles.inputContainer}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <View style={styles.boton}>
        <Button title="Listo" onPress={handleRegister} color={'#39A900'} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,

  },
  inputContainer: {
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 30,

    fontWeight: 'bold',
    color: '#39A900',
    textAlign: 'center',
  },
  boton: {

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

export default RegisterScreen;
