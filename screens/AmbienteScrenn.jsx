import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const AmbienteScreen = () => {
    const [ambientes, setAmbientes] = useState([]);
    const [filteredAmbientes, setFilteredAmbientes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAmbiente, setSelectedAmbiente] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    const navigateEditar = () => {
        navigation.navigate('EditAmbien');
    };

    const RegisterAmbie = () => {
        navigation.navigate('RegisterAmbie');
    };

    const showModal = (ambiente) => {
        setSelectedAmbiente(ambiente);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedAmbiente(null);
        setModalVisible(false);
    };
    
    useEffect(() => {
        const fetchAmbientes = async () => {
            try {
                const response = await fetch('http://192.168.137.1:3000/ambiente/all');
                const data = await response.json();


                setAmbientes(data.data);
                setFilteredAmbientes(data.data);
            } catch (error) {

            } finally {
                setLoading(false);
            }
        };

        fetchAmbientes();
    }, []);

    useEffect(() => {
        // Filtrar ambientes cuando cambia la consulta de búsqueda
        if (searchQuery === '') {
            setFilteredAmbientes(ambientes); // Mostrar todos los ambientes si no hay búsqueda
        } else {
            const filteredData = ambientes.filter(ambiente =>
                ambiente.nom_amb.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredAmbientes(filteredData);
        }
    }, [searchQuery, ambientes]);


    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>Ambientes</Text>
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
                    <FontAwesomeIcon name="search" size={30} style={styles.searchIcon} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#39A900" />
            ) : (
                <ScrollView style={styles.inventary}>
                    {filteredAmbientes.length > 0 ? (
                        filteredAmbientes.map(ambiente => (
                            <TouchableOpacity key={ambiente.id_amb} style={styles.item} onPress={() => showModal(ambiente)}>
                                <Text>{ambiente.nom_amb}</Text>

                                <TouchableOpacity>
                                    <FontAwesomeIcon name="pencil" size={20} style={styles.pencilIcon} />
                                </TouchableOpacity>
                            </TouchableOpacity>

                        ))
                    ) : (
                        <Text>No se encontraron ambientes.</Text>
                    )}
                </ScrollView>
            )}

            <View style={styles.containerButton}>
                <TouchableOpacity onPress={RegisterAmbie} style={[styles.button, { backgroundColor: 'rgb(191, 227, 173)' }]}>
                    <FontAwesomeIcon name="plus-circle" size={45} style={styles.agre} />
                    <Text style={styles.buttonText}>AGREGAR</Text>
                </TouchableOpacity>
            </View>

            {selectedAmbiente && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <Text><Text style={styles.modalText}>Id:</Text>  {selectedAmbiente.id_amb}</Text>
                            <Text><Text style={styles.modalText}>Nombre: </Text>{selectedAmbiente.nom_amb}</Text>
                            <Text><Text style={styles.modalText}>Centro: </Text>{selectedAmbiente.cen_fk}</Text>

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
    searchButton: {
        marginLeft: 10,
    },
    searchIcon: {
        color: 'black',
        
    },
    pencilIcon:{
        
    },
    inventary: {
        width: '100%',
        height: 'auto',
    },
    item: {
        justifyContent: 'space-between',
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
        justifyContent: 'center',
        borderRadius: 100,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
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
        fontWeight: 'bold',
        textAlign: 'center',
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
    buttonText: {
        fontSize: 15,
        color: '#000',
    },
});

export default AmbienteScreen;
