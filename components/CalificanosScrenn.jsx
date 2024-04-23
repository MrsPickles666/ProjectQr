import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import ComponentPantallas from './ComponentPantallas';

const CalificanosScreen = () => {
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home');
    };
    return (
        <View style={styles.container}>
            <ComponentPantallas tittle="Calificanos" icono="star" />

            <View style={styles.info}>
                <Text style={styles.serv}>¿Qué te pareció nuestro servicio?</Text>
            </View>

            <View style={styles.input}>
                <Input placeholder='Danos tu opinión' />
            </View>

            <View style={styles.boton}>
                <Button
                    onPress={navigateToHome}
                    title="Listo"
                    buttonStyle={{ backgroundColor: '#39A900' }}
                    titleStyle={{ fontWeight: 'bold' }}
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    info: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    serv: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        width: '90%',
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: "80%",  // Puedes ajustar este valor según tus necesidades
    },
    boton: {
        width: 'auto',
        padding: 10,
        position: 'relative',
        justifyContent: 'center',
        alignSelf: 'center',
    },
});

export default CalificanosScreen;
