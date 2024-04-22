import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ComponentPantallas from './ComponentPantallas';
import { Icon, Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const NovedadScreen = () => {

    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home');
    };
    return (
        <View style={styles.pant} >
            <ComponentPantallas tittle="Novedad" icono="headphones" />

            <View style={styles.container}>

                <View style={styles.info}>
                    <View style={styles.clas}>
                        <Text style={styles.novedadinfo}>Nombre</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.novedadinfo}>Correo</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.novedadinfo}>Telefono</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                </View>

                <View style={styles.problema}>
                    <Text style={styles.text}>Describe tu problema</Text>
                    <Input style={styles.input} placeholder='' />


                </View>
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
    pant: {
        height: "100%",
        width: "100%",
        paddingTop: '6%',
    },
    container: {
        flex: 1,
    },
    info: {
        padding: '5%',
        marginTop:-200
    },
    clas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 1,
        width: '70%',
    },
    novedadinfo: {
        fontSize: 18,
        marginBottom: 1,
        height: 50,
        fontWeight: 'bold',
        width: 100,
    },
    input: {

        height: 20,  // Ajusta la altura según tus necesidades
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
    },
    problema:{
        alignItems: "center",   
    },
    text:{
        fontWeight: 'bold',
            fontSize:15,
    },
    boton: {
        width: 'auto',
        padding: 10,
        position: 'relative',
        justifyContent: 'center',
        alignSelf: 'center',
    },
});

export default NovedadScreen;
