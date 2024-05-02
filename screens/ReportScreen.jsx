import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const ReportScreen = () => {
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('Home');
    };
    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>Reportes</Text>
            </View>
            <View style={styles.search}>
                <Text style={styles.searchLabel}>Buscar:</Text>
                <TextInput style={styles.inputSearch} placeholder="Escriba aquí" />
                <TouchableOpacity style={styles.searchButton}>
                    <FontAwesomeIcon name="search" size={30} style={styles.searchIcon} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.inventary}>
                <TouchableOpacity style={styles.item}>
                    <FontAwesomeIcon name="laptop" size={30} style={styles.itemImage} />
                    <Text style={styles.listInv}>Inventario ADSO</Text>
                    <View style={styles.option}>
                        <TouchableOpacity>
                            <FontAwesomeIcon name="download" size={20} style={styles.optionIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesomeIcon name="eye" size={20} style={styles.optionIcon} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <FontAwesomeIcon name="paint-brush" size={30} style={styles.itemImage} />
                    <Text style={styles.listInv}>Inventario Artes grafiacas</Text>
                    <View style={styles.option}>
                        <TouchableOpacity>
                            <FontAwesomeIcon name="download" size={20} style={styles.optionIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesomeIcon name="eye" size={20} style={styles.optionIcon} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <FontAwesomeIcon name="shopping-bag" size={30} style={styles.itemImage} />
                    <Text style={styles.listInv}>Inventario confecciones</Text>
                    <View style={styles.option}>
                        <TouchableOpacity>
                            <FontAwesomeIcon name="download" size={20} style={styles.optionIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesomeIcon name="eye" size={20} style={styles.optionIcon} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <FontAwesomeIcon name="truck" size={30} style={styles.itemImage} />
                    <Text style={styles.listInv}>Inventario Automotriz</Text>
                    <View style={styles.option}>
                        <TouchableOpacity>
                            <FontAwesomeIcon name="download" size={20} style={styles.optionIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesomeIcon name="eye" size={20} style={styles.optionIcon} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.containerButton}>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'gray' }]}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={navigateToHome} style={styles.flechaContainer}>
                <FontAwesomeIcon name="arrow-left" size={40} style={styles.flechaIcon} />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
    inventary: {
        flex: 1,
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

    button: {
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        marginBottom: 100,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
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

export default ReportScreen;
