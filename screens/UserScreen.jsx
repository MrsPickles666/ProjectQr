import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const UserScreen = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('user');
        if (storedUserData) {
          const user = JSON.parse(storedUserData);
          setUserData(user);
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    getUserData();
  }, []);

  const getRolName = (idRol) => {
    switch (idRol) {
      case 1:
        return 'ADMINISTRADOR';
      case 2:
        return 'FUNCIONARIO';
      case 3:
        return 'APRENDIZ';
      default:
        return 'DESCONOCIDO';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.tituloText}>Mi perfil</Text>
      </View>

      <View style={styles.containerUser}>
        <View style={styles.editContainer}>
          <Text style={styles.editText}>Editar perfil </Text>
          <TouchableOpacity>
            <FontAwesomeIcon name="pencil" size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <FontAwesomeIcon name="user-circle" size={60} />
        </TouchableOpacity>
      </View>

      {userData && (
        <View style={styles.containeInfo}>
          <View style={styles.Info}>
            <Text style={styles.infoTitul}>Documento:</Text>
            <Text style={styles.infoDato}>{userData.num_doc}</Text>
          </View>
          <View style={styles.Info}>
            <Text style={styles.infoTitul}>Nombre:</Text>
            <Text style={styles.infoDato}>{userData.nom_fun}</Text>
          </View>
          <View style={styles.Info}>
            <Text style={styles.infoTitul}>Apellido:</Text>
            <Text style={styles.infoDato}>{userData.ape_fun}</Text>
          </View>
          <View style={styles.Info}>
            <Text style={styles.infoTitul}>Correo:</Text>
            <Text style={styles.infoDato}>{userData.email}</Text>
          </View>
          <View style={styles.Info}>
            <Text style={styles.infoTitul}>Telefono:</Text>
            <Text style={styles.infoDato}>{userData.tel_fun}</Text>
          </View>
          <View style={styles.Info}>
            <Text style={styles.infoTitul}>Rol:</Text>
            <Text style={styles.infoDato}>{getRolName(userData.id_rol_fk)}</Text>
          </View>
        </View>
      )}
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
  containerUser: {
    marginHorizontal: '5%',
    width: '90%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: -25,
  },
  editText: {
    fontSize: 20,
  },
  containeInfo: {
    alignSelf: 'flex-start',
    width: '100%',
    padding: 10,
  },
  Info: {
    padding: 10,
    marginBottom: 10,
  },
  infoTitul: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoDato: {
    color: 'grey',
  },
});

export default UserScreen;
