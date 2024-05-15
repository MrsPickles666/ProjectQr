import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';



const RegisterCatego = () => {

    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home');
    };



    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>Agregar Categoria</Text>
            </View>
            <View style={styles.containerRegit}>
                <FontAwesomeIcon name="plus-circle" size={60} style={styles.regist} />
            </View>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.containerForm}>
                    {['ID Categoria', 'Nombre Del Categoria'].map((label) => (
                        <View style={styles.containerInput} key={label}>
                            <Text style={styles.textInputLabel}>{label}:</Text>
                            <Input containerStyle={styles.inputContainer} inputStyle={styles.input} />
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity onPress={navigateToHome} style={styles.button}>
                <FontAwesomeIcon name="qrcode" size={40} />
                <Text style={styles.buttonText}>Crear</Text>
            </TouchableOpacity>
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
        marginTop: '10%',
        width: '90%',
        height: 400,
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
});

export default RegisterCatego;
