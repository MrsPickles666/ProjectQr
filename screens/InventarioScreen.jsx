import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const InventarioScreen = () => {
    const navigation = useNavigation();
    const [ambientes, setAmbientes] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchAmbientes();
    }, []);

    const fetchAmbientes = async () => {
        try {
            const response = await fetch('http://192.168.81.71:3000/ambiente/all');
            if (!response.ok) {
                throw new Error('Error al obtener los ambientes');
            }
            const data = await response.json();
            setAmbientes(data.data); // Asignar solo el array de ambientes a setAmbientes
        } catch (error) {
            console.error('Error fetching ambientes:', error);
        }
    };

    const navigateEditar = () => {
        navigation.navigate('EditarInventario');
    };

    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    const navigateDai = (ambiente) => {
        navigation.navigate('Details', { ambienteId: ambiente.id_amb });
    };    


    // Función para convertir a formato Título
    const toTitleCase = (str) => {
        const exclude = ['de', 'y', 'en', 'la', 'el', 'los', 'las', 'un', 'una', 'unos', 'unas', 'con', 'a', 'para', 'por'];
        return str
            .toLowerCase()
            .split(' ')
            .map(word => exclude.includes(word) ? word : word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const renderAmbientes = () => {
        if (!Array.isArray(ambientes) || ambientes.length === 0) {
            return (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text>No se encontraron ambientes</Text>
                </View>
            );
        }
    
        return ambientes.map((ambiente, index) => (
            <TouchableOpacity key={index} style={styles.item} onPress={() => navigateDai(ambiente)}>
                <FontAwesomeIcon name="laptop" size={30} style={styles.itemImage} />
                <Text style={styles.listInv}>{`Inventario de ${toTitleCase(ambiente.nom_amb)}`}</Text>
                <View style={styles.option}>
                    <TouchableOpacity onPress={() => navigateDai(ambiente)}>
                        <FontAwesomeIcon name="eye" size={20} style={styles.optionIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateEditar}>
                        <FontAwesomeIcon name="pencil" size={20} style={styles.optionIcon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        ));
    };
    


    const handleSearchTextChange = (text) => {
        setSearchText(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>Inventarios</Text>
            </View>
            <View style={styles.search}>
                <Text style={styles.searchLabel}>Buscar:</Text>
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Escriba aquí"
                    value={searchText}
                    onChangeText={handleSearchTextChange}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <FontAwesomeIcon name="search" size={30} style={styles.searchIcon} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.inventary}>{renderAmbientes()}</ScrollView>

            <View style={styles.containerButton}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RegisterInventario')}
                    style={[styles.button, { backgroundColor: 'rgb(191, 227, 173)' }]}
                >
                    <FontAwesomeIcon name="plus-circle" size={45} style={styles.agre} />
                    <Text style={styles.buttonText}>AGREGAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    inventary: {
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
        position: 'absolute',
        bottom: 0,
    },
    agre: {
        color: '#39A900',
    },
    button: {
        width: 130,
        height: 50,
        justifyContent: 'center',
        borderRadius: 100,
        margin: 10,
        marginBottom: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: '#000',
    },
});

export default InventarioScreen;
