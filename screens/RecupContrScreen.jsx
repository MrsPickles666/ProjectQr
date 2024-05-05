import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


const RecupContrScreen = () => {
    const navigation = useNavigation();

    const navigateTologin = () => {
        navigation.navigate('Login');
    };
    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>Recuperar Contraseña</Text>
            </View>

            <View style={styles.containerCarta}>
                <FontAwesomeIcon name="envelope" size={80} style={styles.Carta}/>
            </View>

            <View style={styles.form}>
                <Text style={styles.TextForm}> Ingrese correo de recuperacion ! </Text>
                <TextInput style={styles.Inputform} placeholder='Digite correo'/>
            </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>

                <View style={styles.flechaContainer}>
                    <TouchableOpacity onPress={navigateTologin}>
                        <FontAwesomeIcon name="arrow-left" size={40} style={styles.flechaIcon} />
                    </TouchableOpacity>
                </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
    containerCarta: {
        width: '89%',
        borderBottomWidth: 1,
        margin: 5,
        alignItems: 'flex-end',
    },
    
    Carta: {
        width: 80,
        height: 80,
        margin: 10,
    },

    form: {
        alignContent: 'center',
        justifyContent: 'center',
    },

    TextForm: {
        marginTop: 80,
        fontSize: 20,

    },

    Inputform: {
        marginTop: 80,
        width: 300,
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
    },

    button: {
        marginTop: 150,
        width: 160,
        height: 50,
        backgroundColor: '#39A900',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        marginBottom: 100,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },

    flechaContainer: {
        position: 'absolute',
        bottom: 0, 
        right: 0, 
        marginBottom: 40,
        marginRight: 20, 
    },
     
    flechaIcon: {
        width: 40,
        height: 40,
     },

});

export default RecupContrScreen;
