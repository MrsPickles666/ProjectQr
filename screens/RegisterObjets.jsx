import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ComponentPantallas from '../components/ComponentPantallas';

const RegisterObjets = () => {
    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Registrar objetos</Text>
            </View>
            <ScrollView style={styles.scroll}>
                <View style={styles.info}>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Codigo</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Descripcion</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Fecha</Text>
                        <Input style={styles.input}  placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Codigo centro</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Centro</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Ambiente</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Codigo ambiente</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    {/* Agrega más pares de Text e Input según sea necesario */}
                </View>
            </ScrollView>
            <Button
                title="Crear"
                buttonStyle={styles.butCrear}
                titleStyle={styles.crearBut}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'rgb(236, 236, 236)',

    },
    header: {
        backgroundColor: 'green',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    info: {
        padding: '5%',
        alignItems: 'flex-start',
        
    },
    clas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 1,
        width: '80%',
    },
    objetoinfo: {
        fontSize: 18,
        marginBottom: 1,
        height: 50,
        fontWeight: 'bold',
        width: 100,
    },
    input: {
        flex: 1,
        height: 30,
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
    },
    butCrear: {
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: "white",
    },
    crearBut: {
        color: 'black',
        backgroundColor: "white",
    },
    scroll: {
        flexGrow: 1,
  
    },
});

export default RegisterObjets;