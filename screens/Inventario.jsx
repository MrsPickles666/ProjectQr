import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Inventario = () => {
    const navigation = useNavigation();
    const navigateToHome = () => navigation.navigate('Home');

    const campos = [
        "Serial", "Consecutivo", "Descripcion", "Comentario", 
        "Codigo centro", "Centro", "Codigo ambiente", "Ambiente", 
        "Id objeto", "Modelo", "Nombre instructor", "Estado del articulo", "Articulo"
    ];

    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>Inventario</Text>
            </View>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.containerForm}>
                    {campos.map((campo) => (
                        <View style={styles.containerInput} key={campo}>
                            <Text style={styles.textInputLabel}>{campo}:</Text>
                            <Input containerStyle={styles.inputContainer} inputStyle={styles.input} />
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.flechaContainer}>
                <TouchableOpacity onPress={navigateToHome} style={styles.flechaLeft}>
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
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollContainer: {
        width: '100%',
        height: 500,
        margin: 100,
        
    },
    containerForm: {
        margin: '5%',
        width: '90%',
    },
    containerInput: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    textInputLabel: {
        fontSize: 15,
        marginRight: 10,
        flex: 1,
    },
    inputContainer: {
        flex: 2,
    },
    input: {
        width: '100%',
    },
    flechaContainer: {
        position: 'absolute',
        bottom: 0, 
        right: 0, 
        marginBottom: 40,
        marginRight: 20, 
      },
      flechaIcon: {
        color: 'black',
      },
  });

export default Inventario;
