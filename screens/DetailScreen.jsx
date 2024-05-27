import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const DetailScreen = () => {
    const [objetos, setObjetos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchObjetos = async () => {
            try {
                const response = await fetch('http://192.168.67.235:3000/objeto/all');
                const data = await response.json();
                console.log('Objetos recibidos:', data);
                setObjetos(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchObjetos();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>Objetos</Text>
            </View>
            <View style={styles.search}>
                <Text style={styles.searchLabel}>Buscar:</Text>
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Escriba aquí"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.inventary}>
                {objetos.map(objeto => (
                    <TouchableOpacity key={objeto.id} style={styles.item}>
                        <Text>{objeto.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    inventary: {
        height: 'auto',
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
});

export default DetailScreen;
