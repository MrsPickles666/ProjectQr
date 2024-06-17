import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

const UserScreen = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    num_doc: '',
    nom_fun: '',
    ape_fun: '',
    email: '',
    tel_fun: '',
    id_rol_fk: ''
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success'); // success or error
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('user');
        if (storedUserData) {
          const user = JSON.parse(storedUserData);
          setUserData(user);
          setEditData({
            num_doc: user.num_doc.toString(),
            nom_fun: user.nom_fun,
            ape_fun: user.ape_fun,
            email: user.email,
            tel_fun: user.tel_fun,
            id_rol_fk: user.id_rol_fk.toString()
          });
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      ...editData,
      num_doc: userData.num_doc.toString(),
      nom_fun: userData.nom_fun,
      ape_fun: userData.ape_fun,
      email: userData.email,
      tel_fun: userData.tel_fun,
      id_rol_fk: userData.id_rol_fk.toString()
    });
  };

  const handleSave = async () => {
    if (JSON.stringify(editData) === JSON.stringify({
      num_doc: userData.num_doc.toString(),
      nom_fun: userData.nom_fun,
      ape_fun: userData.ape_fun,
      email: userData.email,
      tel_fun: userData.tel_fun,
      id_rol_fk: userData.id_rol_fk.toString()
    })) {
      setModalMessage('No se han realizado cambios.');
      setModalType('error');
      setModalVisible(true);
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found. Please log in again.');
      }

      const response = await fetch(`http://192.168.81.146:3000/usuario/${parseInt(userData.num_doc)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editData,
          num_doc: parseInt(editData.num_doc),
          id_rol_fk: parseInt(editData.id_rol_fk),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Unknown error');
      }

      const updatedUserData = await response.json();
      setUserData(updatedUserData);
      AsyncStorage.setItem('user', JSON.stringify(updatedUserData));
      setIsEditing(false);
      setModalMessage('Los cambios se guardaron correctamente.');
      setModalType('success');
      setModalVisible(true);


    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error.message);
      setModalMessage('Error al guardar los cambios. Por favor, intenta nuevamente.');
      setModalType('error');
      setModalVisible(true);
    }
  };

  const handleChange = (key, value) => {
    if (key === 'tel_fun') {
      // Validar que el valor ingresado solo contenga números
      if (/^\d*$/.test(value)) {
        setEditData({ ...editData, [key]: value });
      }
    } else {
      setEditData({ ...editData, [key]: value });
    }
  };

  const closeModal = () => {
    if (modalType === 'error') {
      handleCancel();
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.tituloText}>Mi perfil</Text>
      </View>
      <View style={styles.containerUser}>
        <View style={styles.editContainer}>
          <Text style={styles.editText}>{isEditing ? 'Cancelar edición' : 'Editar perfil'}</Text>
          <TouchableOpacity onPress={isEditing ? handleCancel : () => setIsEditing(true)}>
            <FontAwesomeIcon name={isEditing ? 'times' : 'pencil'} size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <FontAwesomeIcon name="user-circle" size={60} />
        </TouchableOpacity>
      </View>

      {userData && (
        <View style={styles.containerInfo}>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Documento:</Text>
            <Text style={styles.infoData}>{userData.num_doc}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Nombre:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.nom_fun}
                onChangeText={(text) => handleChange('nom_fun', text)}
              />
            ) : (
              <Text style={styles.infoData}>{userData.nom_fun}</Text>
            )}
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Apellido:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.ape_fun}
                onChangeText={(text) => handleChange('ape_fun', text)}
              />
            ) : (
              <Text style={styles.infoData}>{userData.ape_fun}</Text>
            )}
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Correo:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.email}
                onChangeText={(text) => handleChange('email', text)}
              />
            ) : (
              <Text style={styles.infoData}>{userData.email}</Text>
            )}
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Teléfono:</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.tel_fun}
                onChangeText={(text) => handleChange('tel_fun', text)}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.infoData}>{userData.tel_fun}</Text>
            )}
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>Rol:</Text>
            {isEditing ? (
              <Picker
                selectedValue={editData.id_rol_fk}
                style={styles.picker}
                onValueChange={(itemValue) => handleChange('id_rol_fk', itemValue)}
              >
                <Picker.Item label="ADMINISTRADOR" value={1} />
                <Picker.Item label="FUNCIONARIO" value={2} />
                <Picker.Item label="APRENDIZ" value={3} />
              </Picker>
            ) : (
              <Text style={styles.infoData}>{getRolName(parseInt(userData.id_rol_fk))}</Text>
            )}
          </View>
        </View>
      )}

      {isEditing && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.modalButton,
              styles.modalButtonClose,
            ]}
            onPress={handleCancel}
          >
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </Pressable>
          <Pressable
            style={[
              styles.modalButton,
              styles.modalButtonConfirm,
            ]}
            onPress={handleSave}
          >
            <Text style={styles.modalButtonText}>Guardar</Text>
          </Pressable>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {modalType === 'success' ? '¡Éxito!' : 'Error'}
            </Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <Pressable
              style={[
                styles.modalButton,
                modalType === 'success' ? styles.modalButtonConfirm : styles.modalButtonClose,
              ]}
              onPress={closeModal}
            >
              <Text style={styles.modalButtonText}>Aceptar</Text>
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
    borderBottomColor: '#dddddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    fontSize: 20,
    marginRight: 10,
  },
  containerInfo: {
    paddingHorizontal: '5%',
    width: '90%',
  },
  info: {
    padding: 10,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoData: {
    fontSize: 18,
    color: 'grey',
  },
  input: {
    height: 35,
    borderColor: '#dddddd',
    marginTop: 10,
    marginBottom: -10,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '50%',
  },
  picker: {
    height: 35,
    width: '60%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
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
    marginBottom: 20,
    textAlign: 'center',
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

export default UserScreen;
