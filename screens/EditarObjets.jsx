import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const EditarObjets = () => {
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>Editar objetos</Text>
            </View>
            <View style={styles.containerEdit}>
                <FontAwesomeIcon name="pencil" size={60} style={styles.edit} />
            </View>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.containerForm}>
                    {['Serial', 'Consecutivo', 'Descripcion', 'Comentario', 'Codigo centro', 'Centro', 'Codigo ambiente', 'Ambiente','Id objeto','Modelo','Nombre instructor','Estado del articulo','Articulo' ].map((label) => (
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
        fontSize: 24,
        color: 'white',
    },
    containerEdit: {
        width: '89%',
        borderBottomWidth: 1,
        alignItems: 'flex-end',
    },
    edit: {
        margin: '1%'
    },
    scrollContainer: {
        width: '100%',
        height: 400,
        marginTop: '10%',
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
    button: {
        width: 160,
        height: 50,
        backgroundColor: '#39A900',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 100,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        marginHorizontal: 10,
    },
    flechaContainer: {
        position: 'absolute',
        bottom: '5%',
        right: 0,
        marginRight: 20,
    },
    flechaIcon: {
        color: 'black',
    },
});

export default EditarObjets;
