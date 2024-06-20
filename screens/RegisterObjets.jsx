import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import crearObj from '../api/objs';

const RegisterObjets = () => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [serial, setSerial] = useState('');
    const [estado, setEstado] = useState('');
    const [observacion, setObservacion] = useState('');
    const [tipoObjeto, setTipoObjeto] = useState('');
    const [marca, setMarca] = useState('');
    const [valor, setValor] = useState('');
    const [token, setToken] = useState('');

    const [categorias, setCategorias] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const [ambientes, setAmbientes] = useState([]);
    const [selectedAmbiente, setSelectedAmbiente] = useState('');

    const [modalVisibleSuccess, setModalVisibleSuccess] = useState(false);
    const [modalVisibleError, setModalVisibleError] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const navigation = useNavigation();

    const RegisterAmbie = () => {
        navigation.navigate('RegisterObjets', {
            refresh: true, // Indicar que se debe refrescar la pantalla al regresar
        });
    };
    

    useEffect(() => {
        const obtenerToken = async () => {
            try {
                const tokenGuardado = await AsyncStorage.getItem('token');
                if (tokenGuardado) {
                    setToken(tokenGuardado);
                }
            } catch (error) {
                console.log('Error al obtener el token:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch('http://192.168.81.71:3000/categorias/all');
                const data = await response.json();
                setCategorias(data.data);
            } catch (error) {
                console.log('Error al obtener las categorías:', error);
            }
        };

        const fetchAmbientes = async () => {
            try {
                const response = await fetch('http://192.168.81.71:3000/ambiente/all');
                const data = await response.json();
                setAmbientes(data.data);
            } catch (error) {
                console.log('Error al obtener los ambientes:', error);
            }
        };

        obtenerToken();
        fetchCategories();
        fetchAmbientes();
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    

    const enviarDatos = async () => {
        if (!selectedCategory || !selectedAmbiente || !serial || !estado || !observacion || !tipoObjeto || !marca || !valor || !date) {
            setModalMessage('Por favor completa todos los campos');
            setModalVisibleError(true);
            return;
        }

        const formData = {
            id_cate: selectedCategory,
            id_amb: selectedAmbiente,
            ser_obj: serial,
            est_obj: estado,
            obser_obj: observacion,
            tip_obj: tipoObjeto,
            marc_obj: marca,
            val_obj: parseFloat(valor),
            fech_adqui: date.toISOString().split('T')[0],
        };

        try {
            await crearObj(formData, token);
            setModalMessage('El objeto se registró correctamente');
            setModalVisibleSuccess(true);
        } catch (error) {
            console.log('Error al enviar los datos del objeto', error);
            setModalMessage('Error al agregar el objeto. Inténtalo de nuevo.');
            setModalVisibleError(true);
        }
    };

    const handleCategoryChange = (itemValue) => {
        setSelectedCategory(itemValue);
    };

    const handleAmbienteChange = (itemValue) => {
        setSelectedAmbiente(itemValue);
    };

    const closeModalSuccess = () => {
        setModalVisibleSuccess(false);
        setModalMessage('');
    };

    const closeModalError = () => {
        setModalVisibleError(false);
        setModalMessage('');
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
                    <TextInput
                        style={styles.input}
                        placeholder="Serial"
                        onChangeText={setSerial}
                        value={serial}
                    />
                    <View style={styles.select}>
                        <Picker
                            selectedValue={selectedAmbiente}
                            onValueChange={handleAmbienteChange}
                            style={styles.select1}>
                            <Picker.Item label="Seleccione un Ambiente" value="" />
                            {ambientes.map((ambiente) => (
                                <Picker.Item key={ambiente.id_amb.toString()} label={ambiente.nom_amb} value={ambiente.id_amb} />
                            ))}
                        </Picker>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Observación"
                        onChangeText={setObservacion}
                        value={observacion}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Tipo De Objeto"
                        onChangeText={setTipoObjeto}
                        value={tipoObjeto}
                    />
                    <View style={styles.select}>
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={handleCategoryChange}
                            style={styles.select1}>
                            <Picker.Item label="Seleccione una Categoria" value="" />
                            {categorias.map((categoria) => (
                                <Picker.Item key={categoria.id_cate.toString()} label={categoria.nom_cate} value={categoria.id_cate} />
                            ))}
                        </Picker>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Marca"
                        onChangeText={setMarca}
                        value={marca}
                    />
                    <View style={styles.select}>
                        <Picker
                            selectedValue={estado}
                            onValueChange={(itemValue) => setEstado(itemValue)}
                            style={styles.select1}>
                            <Picker.Item label="Seleccione Estado" value="" />
                            <Picker.Item label="ACTIVO" value="ACTIVO" />
                            <Picker.Item label="EN USO" value="EN USO" />
                            <Picker.Item label="DADO DE BAJA" value="DADO DE BAJA" />
                        </Picker>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Valor"
                        keyboardType="numeric"
                        onChangeText={setValor}
                        value={valor}
                    />
                    <View style={styles.containerInput}>
                        <TouchableOpacity onPress={showDatepicker} style={styles.inputDate}>
                            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
                            <FontAwesomeIcon name="calendar" size={20} style={styles.calendarIcon} />
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                    <TouchableOpacity onPress={enviarDatos} style={styles.button}>
                        <FontAwesomeIcon name="qrcode" size={40} />
                        <Text style={styles.buttonText}>Crear</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {/* Modal de éxito */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleSuccess}
                onRequestClose={closeModalSuccess}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalMessage}>{modalMessage}</Text>
                        <Pressable style={[styles.modalButton, styles.modalButtonClose]} onPress={closeModalSuccess}>
                            <Text style={styles.modalButtonText}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* Modal de error */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleError}
                onRequestClose={closeModalError}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalMessageError}>{modalMessage}</Text>
                        <Pressable style={[styles.modalButton, styles.modalButtonClose]} onPress={closeModalError}>
                            <Text style={styles.modalButtonText}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
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
        margin: '1%',
    },
    scrollContainer: {
        width: '80%',
        height: 500,
        alignSelf: 'center',
    },
    containerForm: {
        width: '100%',
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
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
    select: {
        flexDirection: 'row',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
        height: 50,
    },
    textInputLabel: {
        fontSize: 16,
        marginRight: 10,
        flex: 1,
    },
    select1: {
        flex: 1,
    },
    inputDate: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        height: 50,
        alignItems: 'center',
    },
    calendarIcon: {
        marginLeft: 5,
    },
    dateText: {
        fontSize: 16,
        flex: 1,
    },
    containerInput: {
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        width: 160,
        height: 50,
        backgroundColor: '#39A900',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 50,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 10,
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
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalMessageError: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: 'red',
    },
    modalButton: {
        padding: 10,
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
        backgroundColor: '#39A900',
        marginTop: 10,
    },
    modalButtonClose: {
        backgroundColor: '#39A900',
    },
    modalButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegisterObjets;
