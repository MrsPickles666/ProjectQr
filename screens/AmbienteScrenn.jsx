import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const AmbienteScrenn = () => {
    const navigation = useNavigation();


    const navigateEditar = () => {
        navigation.navigate('EditAmbien');
    };

    const RegisterAmbie = () => {
        navigation.navigate('RegisterAmbie');

    };
    const navigateToHome = () => {
        navigation.navigate('Home');

    };
    return (
        <View >
            <View style={styles.container}>
                <View style={styles.titulo}>
                    <Text style={styles.tituloText}>Ambientes</Text>
                </View>
                <View style={styles.search}>
                    <Text style={styles.searchLabel}>Buscar:</Text>
                    <TextInput style={styles.inputSearch} placeholder="Escriba aquí" />
                    <TouchableOpacity style={styles.searchButton}>
                        <FontAwesomeIcon name="search" size={30} style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.ambients}>
                    <TouchableOpacity style={styles.item}>
                        <FontAwesomeIcon name="laptop" size={30} style={styles.itemImage} />
                        <Text style={styles.listInv}>Ambiente ADSO</Text>
                        <View style={styles.option}>
                            <TouchableOpacity onPress={navigateEditar}>
                                <FontAwesomeIcon name="pencil" size={20} style={styles.optionIcon} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <FontAwesomeIcon name="paint-brush" size={30} style={styles.itemImage} />
                        <Text style={styles.listInv}>Ambiente Artes Grafiacas</Text>
                        <View style={styles.option}>
                            <TouchableOpacity onPress={navigateEditar}>
                                <FontAwesomeIcon name="pencil" size={20} style={styles.optionIcon} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <FontAwesomeIcon name="shopping-bag" size={30} style={styles.itemImage} />
                        <Text style={styles.listInv}>Ambiente Confecciones</Text>
                        <View style={styles.option}>
                            <TouchableOpacity onPress={navigateEditar}>
                                <FontAwesomeIcon name="pencil" size={20} style={styles.optionIcon} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <FontAwesomeIcon name="truck" size={30} style={styles.itemImage} />
                        <Text style={styles.listInv}>Ambiente Automotriz</Text>
                        <View style={styles.option}>
                            <TouchableOpacity onPress={navigateEditar}>
                                <FontAwesomeIcon name="pencil" size={20} style={styles.optionIcon} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={RegisterAmbie} style={[styles.button, { backgroundColor: 'rgb(191, 227, 173)' }]}>
                        <FontAwesomeIcon name="plus-circle" size={45} style={styles.agre} />
                        <Text style={styles.buttonText}>AGREGAR</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

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
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    searchLabel: {
        fontSize: 18,
        marginRight: 15,
    },
    inputSearch: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
    },
    searchButton: {
        marginLeft: 10,
    },
    searchIcon: {
        color: 'black',
    },
    ambients: {
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    itemImage: {
        marginRight: 10,
    },
    listInv: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIcon: {
        marginRight: 5,
    },
    containerButton: {
        flexDirection: 'row',
    },
    agre: {
        color: "#39A900",

    },

    button: {
        width: 130,
        height: 50,
        gap: 5,
        bottom: '-60%',
        justifyContent: 'center',
        borderRadius: 100,
        margin: 10,
        marginBottom: 100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 15,
        color: '#000',
    },
});

export default AmbienteScrenn;
