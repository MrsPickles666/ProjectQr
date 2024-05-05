import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const NovedadScreen = () => {
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home');
    };
    const navigateToSetting = () => {
        navigation.navigate('Setting');
    };

    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>Novedad</Text>
            </View>
            <View style={styles.containerAudi}>
                <FontAwesomeIcon name="headphones" size={80} style={styles.Audi} />
            </View>
            <View style={styles.containerForm}>
                <View style={styles.containerInput}>
                    <Text style={styles.textInputLabel}>Nombre:</Text>
                    <Input containerStyle={styles.input} />
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.textInputLabel}>Correo:</Text>
                    <Input containerStyle={styles.input} />
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.textInputLabel}>Teléfono:</Text>
                    <Input containerStyle={styles.input} />
                </View>
                <View style={styles.containerComm}>
                    <Text style={styles.textComm}>Describe tu problema</Text>
                    <TextInput style={styles.comm} placeholder="Escribe aquí..." placeholderTextColor="#888" multiline />
                </View>
            </View>
            <TouchableOpacity onPress={navigateToHome} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <View style={styles.flechaContainer}>
                <TouchableOpacity onPress={navigateToSetting} style={styles.flechaLeft}>
                    <FontAwesomeIcon name="arrow-left" size={40} style={styles.flechaIcon}  />
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
    containerAudi: {
        width: '89%',
        borderBottomWidth: 1,
        alignItems: 'flex-end',
    },
    Audi: {
        width: 80,
        height: 80,
        margin: 10,
    },
    containerForm: {
        margin: '10%',
        width: '90%',
    },
    containerInput: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
    },
    textInputLabel: {
        fontSize: 16,
        width: '30%',

    },
    input: {
        flex: 1,
        marginRight: 40,
    },

    containerComm: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%',
    },
    textComm: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    comm: {
        width: '100%',
        height: 150,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlignVertical: 'top',
    },
    button: {
        position: 'absolute',
        bottom: '-4%',
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
      },
      flechaContainer: {
        position: 'absolute',
        bottom: '-15%',
        right: 0, 
        marginBottom: 40,
        marginRight: 20, 
      },
      flechaIcon: {
        color: 'black',
      },
});

export default NovedadScreen;