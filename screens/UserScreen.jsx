import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ComponentPantallas from '../components/ComponentPantallas';


const UserScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.personInfoContainer}>
                <Text style={styles.personInfo}>Documento: 1047037264</Text>
                <Text style={styles.personInfo}>Nombre: Jairo de avila</Text>
                <Text style={styles.personInfo}>Correo: jairodeavila2004@example.com</Text>
                <Text style={styles.personInfo}>Telefono: 3013539759</Text>
                <Text style={styles.personInfo}>Rol: Aprendiz</Text>
                <Text style={styles.personInfo}>Direccion: Calle 98a #6-18</Text>
            </View>
            <ComponentPantallas tittle="Usuario" icono="user-circle" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    personInfoContainer: {
        position: 'absolute',
        justifyContent: 'center',
        left: 25,
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    personInfo: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
    },
});

export default UserScreen;
