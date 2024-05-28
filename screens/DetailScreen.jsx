import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailScreen = () => {
    const [objetos, setObjetos] = useState([]);
    const [filteredObjetos, setFilteredObjetos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedObjeto, setSelectedObjeto] = useState(null);

    const navigation = useNavigation();

    const NavigateToCrear = () => {
        navigation.navigate('RegisterObjets');
    }
    
    useEffect(() => {
        const fetchObjetos = async () => {
            try {
                const response = await fetch('http://192.168.244.143:3000/objeto/all');
                const data = await response.json();
                console.log('Objetos recibidos:', data);
                setObjetos(data);
                setFilteredObjetos(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchObjetos();
    }, []);

    useEffect(() => {
        // Filtrar objetos cuando cambia la consulta de búsqueda
        if (searchQuery === '') {
            setFilteredObjetos(objetos); // Mostrar todos los objetos si no hay búsqueda
        } else {
            const filteredData = objetos.filter(objeto =>
                objeto.marc_obj.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredObjetos(filteredData);
        }
    }, [searchQuery, objetos]);

    const showModal = (objeto) => {
        setSelectedObjeto(objeto);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedObjeto(null);
        setModalVisible(false);
    };

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
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#39A900" />
            ) : (
                <ScrollView style={styles.inventary}>
                    {filteredObjetos.length > 0 ? (
                        filteredObjetos.map(objeto => (
                            <TouchableOpacity key={objeto.id_obj} style={styles.item} onPress={() => showModal(objeto)}>
                                <Text>{objeto.marc_obj}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text>No se encontraron objetos.</Text>
                    )}
                </ScrollView>
            )}

            <View style={styles.containerButton}>
                <TouchableOpacity onPress={NavigateToCrear} style={[styles.button, { backgroundColor: 'rgb(191, 227, 173)' }]}>
                    <Icon name="plus-circle" size={45} style={styles.agre} />
                    <Text style={styles.buttonText}>AGREGAR</Text>
                </TouchableOpacity>
            </View>

            {selectedObjeto && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text><Text style={styles.modalTitle}>ID:</Text> {selectedObjeto.id_obj}</Text>
                            <Text><Text style={styles.modalTitle}>Marca:</Text> {selectedObjeto.marc_obj}</Text>
                            <Text><Text style={styles.modalTitle}>Tipo:</Text> {selectedObjeto.tip_obj}</Text>
                            <Text><Text style={styles.modalTitle}>Estado:</Text> {selectedObjeto.est_obj}</Text>
                            <Text><Text style={styles.modalTitle}>Valor:</Text> {selectedObjeto.val_obj}</Text>
                            <Text><Text style={styles.modalTitle}>Observaciones:</Text> {selectedObjeto.obser_obj}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={closeModal}
                            >
                                <Text style={styles.textStyle}>Cerrar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}
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
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 20,
    },
    button: {
        width: 130,
        height: 50,
        gap: 5,
        justifyContent: 'center',
        borderRadius: 100,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    agre: {
        color: "#39A900",
    },
    buttonText: {
        fontSize: 15,
        color: '#000',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonClose: {
        backgroundColor: '#39A900',
        marginTop: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalTitle: {
        fontWeight: 'bold',
    },
});

export default DetailScreen;
