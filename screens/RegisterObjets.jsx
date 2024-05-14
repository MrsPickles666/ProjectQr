import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import crearObjeto from '../api/objs';

const RegisterObjets = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [serial, setSerial] = useState('');
  const [codigoAmbiente, setCodigoAmbiente] = useState('');
  const [idCate, setIdCate] = useState('');
  const [estObj, setEstObj] = useState('');
  const [obserObj, setObserObj] = useState('');
  const [tipObj, setTipObj] = useState('');
  const [marcObj, setMarcObj] = useState('');
  const [valObj, setValObj] = useState('');
  const [token, setToken] = useState('');

  const [mensaje, setMensaje] = useState('');

  const handleSubmit = () => {
    // Limpiar las cajas de texto
    setSerial('');
    setCodigoAmbiente('');
    setIdCate('');
    setEstObj('');
    setObserObj('');
    setTipObj('');
    setMarcObj('');
    setValObj('');

    // Limpiar el mensaje
    setMensaje('');
  };

  const navigation = useNavigation();

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
  }, []);

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const enviarDatos = async () => {
    const formData = {
      id_cate: idCate,
      ser_obj: serial,
      id_amb: codigoAmbiente,
      fech_adqui: date,
      est_obj: estObj,
      obser_obj: obserObj,
      tip_obj: tipObj,
      marc_obj: marcObj,
      val_obj: valObj,
    };
    try {
      await crearObjeto(formData, token);
      // Si la creación es exitosa, mostrar mensaje de éxito
      setMensaje('El objeto se agregó correctamente.');
      // Limpiar las cajas de texto
      handleSubmit();
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      // Si hay un error, mostrar mensaje de error
      setMensaje('Error al agregar el objeto. Inténtalo de nuevo.');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.tituloText}>Registrar Objeto</Text>
      </View>
      <View style={styles.containerRegit}>
        <FontAwesomeIcon name="plus-square" size={60} style={styles.regist} />
      </View>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.containerForm}>
          {['Serial','Código de Ambiente', 'ID Categoría', 'Estado del Objeto', 'Observaciones del Objeto', 'Tipo de Objeto', 'Marca del Objeto', 'Valor del Objeto'].map((label) => (
            <View style={styles.containerInput} key={label}>
              <Text style={styles.textInputLabel}>{label}:</Text>
              <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChangeText={(text) => {
                  switch (label) {
                    case 'Serial':
                      setSerial(text);
                      break;
                    case 'Código de Ambiente':
                      setCodigoAmbiente(text);
                      break;
                    case 'ID Categoría':
                      setIdCate(text);
                      break;
                    case 'Estado del Objeto':
                      setEstObj(text);
                      break;
                    case 'Observaciones del Objeto':
                      setObserObj(text);
                      break;
                    case 'Tipo de Objeto':
                      setTipObj(text);
                      break;
                    case 'Marca del Objeto':
                      setMarcObj(text);
                      break;
                    case 'Valor del Objeto':
                      setValObj(text);
                      break;
                    default:
                      break;
                  }
                }}
              />
            </View>
          ))}
          <View style={styles.containerInput}>
            <Text style={styles.textInputLabel}>Fecha:</Text>
            <TouchableOpacity onPress={showDatepicker} style={styles.inputDate}>
              <Text style={styles.dateText}>{date.toLocaleDateString()} </Text>
              <FontAwesomeIcon name="calendar" size={20} style={styles.calendarIcon} />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={enviarDatos} style={styles.button}>
        <FontAwesomeIcon name="qrcode" size={40} />
        <Text style={styles.buttonText}>Crear</Text>
      </TouchableOpacity>

      <View style={styles.flechaContainer}>
        <TouchableOpacity onPress={navigateToHome} style={styles.flechaLeft}>
          <FontAwesomeIcon name="arrow-left" size={40} style={styles.flechaIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
  containerRegit: {
    width: '89%',
    borderBottomWidth: 1,
    alignItems: 'flex-end',
  },
  regist: {
    margin: '1%'
  },
  scrollContainer: {
    width: '90%',
    height: 500,
    alignSelf: 'center',
  },
  containerForm: {
    width: '100%',
    marginLeft: '5%',
  },
  containerInput: {
    flexDirection: 'row',
    marginBottom: 20,
    marginRight: 10,
    alignItems: 'center',
  },
  textInputLabel: {
    fontSize: 16,
    marginRight: 10,
    flex: 1,
  },
  inputContainer: {
    flex: 2,
  },
  input: {
    width: '100%',
  },
  inputDate: {
    flex: 2,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgb(133, 133, 133)',
    alignItems: 'center',
  },
  calendarIcon: {
    marginLeft: 5,
  },
  dateText: {
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: '-20%',
    width: 160,
    height: 50,
    backgroundColor: '#39A900',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    marginHorizontal: 10,
  },
  flechaContainer: {
    position: 'absolute',
    bottom: '-25%',
    right: 0,
    marginRight: 20,
  },
  flechaIcon: {
    color: 'black',
  },
});

export default RegisterObjets;





