import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crearObj from '../api/objs';

const RegisterObjets = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [serial, setSerial] = useState('');
    const [estado, setEstado] = useState('');
    const [observacion, setObservacion] = useState('');
    const [tipoObjeto, setTipoObjeto] = useState('');
    const [marca, setMarca] = useState('');
    const [valor, setValor] = useState('');
    const [token, setToken] = useState('');
    const [mensaje, setMensaje] = useState('');

    const [categorias, setCategorias] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const [ambientes, setAmbientes] = useState([]);
    const [selectedAmbiente, setSelectedAmbiente] = useState('');

    const navigation = useNavigation();

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
                const response = await fetch('http://192.168.169.107:3000/categorias/all');
                const data = await response.json();
                setCategorias(data.data);
            } catch (error) {
                console.log('Error al obtener las categorías:', error);
            }
        };

        const fetchAmbientes = async () => {
            try {
                const response = await fetch('http://192.168.169.107:3000/ambiente/all');
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
        console.log(formData);
        try {
            await crearObj(formData, token);
            setMensaje('El objeto se registró correctamente');
        } catch (error) {
            console.log('Error al enviar los datos del objeto', error);
            setMensaje('Error al agregar el objeto. Inténtalo de nuevo.');
        }
    };

    const handleCategoryChange = (itemValue) => {
        console.log('Selected Category:', itemValue);
        setSelectedCategory(itemValue);
    };

    const handleAmbienteChange = (itemValue) => {
        console.log('Selected Ambiente:', itemValue);
        setSelectedAmbiente(itemValue);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.containerForm} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Registrar Objeto</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Serial"
                    onChangeText={setSerial}
                    value={serial}
                />



                <Picker
                    selectedValue={selectedAmbiente}
                    onValueChange={handleAmbienteChange}
                    style={styles.input}>
                    <Picker.Item  label="Seleccione un ambiente" value="" />
                    {ambientes.map((ambiente) => (

                        <Picker.Item key={ambiente.id_amb} label={ambiente.nom_amb} value={ambiente.id_amb} />
                    ))}
                </Picker>

                <TextInput
                    style={styles.input}
                    placeholder="Estado"
                    onChangeText={setEstado}
                    value={estado}
                />
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

                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={handleCategoryChange}
                    style={styles.input}>
                    <Picker.Item  label="Seleccione un Categoria" value="" />
                    {categorias.map((categoria) => (
                        <Picker.Item key={categoria.id_cate} label={categoria.nom_cate} value={categoria.id_cate} />
                    ))}
                </Picker>

                <TextInput
                    style={styles.input}
                    placeholder="Marca"
                    onChangeText={setMarca}
                    value={marca}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Valor"
                    keyboardType="numeric"
                    onChangeText={setValor}
                    value={valor}
                />
                <TouchableOpacity onPress={showDatepicker} style={styles.inputDate}>
                    <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
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
                <Button title="Registrar" onPress={enviarDatos} color={'#39A900'} />
                {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
            </ScrollView>
            <TouchableOpacity onPress={navigateToHome}>
                <Text style={styles.registerLink}>Volver al inicio</Text>
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
        justifyContent: 'center',
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
    inputDate: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'rgb(133, 133, 133)',
        alignItems: 'center',
        marginBottom: 16,
    },
    dateText: {
        fontSize: 16,
    },
    registerLink: {
        marginBottom: 16,
        textAlign: 'center',
        color: '#39A900',
        textDecorationLine: 'underline',
    },
    mensaje: {
        textAlign: 'center',
        color: 'green',
        marginTop: 16,
    },
    debugText: {
        textAlign: 'center',
        color: 'blue',
        marginTop: 16,
    },
});

export default RegisterObjets;
