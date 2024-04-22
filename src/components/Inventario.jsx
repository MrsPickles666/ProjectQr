import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Input, } from 'react-native-elements';
import ComponentPantallas from './ComponentPantallas';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
const Inventario = () => {
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home');
    };
    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Inventario</Text>
            </View>
            <ScrollView style={styles.scroll}>
                <View style={styles.info}>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Serial</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Consecutivo</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Descripcion </Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Comentario</Text>
                        <Input style={styles.input} placeholder='' />
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
                        <Text style={styles.objetoinfo}>Codigo ambiente</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Ambiente</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Id objeto</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Modelo</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Nombre instructor</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Estado del articulo</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    <View style={styles.clas}>
                        <Text style={styles.objetoinfo}>Articulo</Text>
                        <Input style={styles.input} placeholder='' />
                    </View>
                    {/* Agrega más pares de Text e Input según sea necesario */}
                </View>
            </ScrollView>
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
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center',
        marginHorizontal: 20, // Ajusta la distancia de separación
    },
    objetoinfo: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 120,
    },
    input: {
        flex: 0.7,
        borderWidth: 1,
        borderRadius: 10,

    },
    boton: {
        width: 'auto',
        padding: 10,
        position: 'relative',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    scroll: {
        flex: 1,
    },
});

export default Inventario;
