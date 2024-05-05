import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';



const UserScreen = () => {
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home');
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
                        <FontAwesomeIcon name="pencil" size={30}/> 
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <FontAwesomeIcon name="user-circle" size={60}/>
                </TouchableOpacity>
            </View>

            <View style={styles.containeInfo}>
                <View style={styles.Info}>
                    <Text style={styles.infoTitul}>Documento:</Text>
                    <Text style={styles.infoDato}>123456789</Text>
                </View>
                <View style={styles.Info}>
                    <Text style={styles.infoTitul}>Nombre:</Text>
                    <Text style={styles.infoDato}>Jairo De avila</Text>
                </View>
                <View style={styles.Info}>
                    <Text style={styles.infoTitul}>Correo:</Text>
                    <Text style={styles.infoDato}>Jairodeavila2004.com</Text>
                </View>
                <View style={styles.Info}>
                    <Text style={styles.infoTitul}>Telefono:</Text>
                    <Text style={styles.infoDato}>+57 3004865472</Text>
                </View>
                <View style={styles.Info}>
                    <Text style={styles.infoTitul}>Rol:</Text>
                    <Text style={styles.infoDato}>Aprendiz</Text>
                </View>
                <View style={styles.Info}>
                    <Text style={styles.infoTitul}>Direccion:</Text>
                    <Text style={styles.infoDato}>Calle 30 No 12-54</Text>
                </View>
            </View>
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


export default UserScreen;
