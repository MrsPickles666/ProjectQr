import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

const AmbienteScreen = () => {
    const [ambientes, setAmbientes] = useState([]);
    const [centros, setCentros] = useState([]);
    const [filteredAmbientes, setFilteredAmbientes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedAmbiente, setSelectedAmbiente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editNombre, setEditNombre] = useState('');
    const [editCentro, setEditCentro] = useState('');

    const navigation = useNavigation();

    const RegisterAmbie = () => {
        navigation.navigate('RegisterAmbie');
    };

    const showViewModal = (ambiente) => {
        setSelectedAmbiente(ambiente);
        setViewModalVisible(true);
    };

    const showEditModal = (ambiente) => {
        setSelectedAmbiente(ambiente);
        setEditNombre(ambiente.nom_amb);
        setEditCentro(ambiente.cen_fk);
        setEditModalVisible(true);
    };

    const closeViewModal = () => {
        setSelectedAmbiente(null);
        setViewModalVisible(false);
    };

    const closeEditModal = () => {
        setSelectedAmbiente(null);
        setEditModalVisible(false);
    };

    const updateAmbiente = async () => {
        try {
            const response = await fetch(`http://192.168.1.5:3000/ambiente/${selectedAmbiente.id_amb}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom_amb: editNombre,
                    cen_fk: editCentro,
                }),
            });
    
            if (response.ok) {
                const updatedAmbientes = ambientes.map(amb =>
                    amb.id_amb === selectedAmbiente.id_amb ? { ...amb, nom_amb: editNombre, cen_fk: editCentro } : amb
                );
                setAmbientes(updatedAmbientes);
                setFilteredAmbientes(updatedAmbientes);
                closeEditModal();
            } else {
                const errorData = await response.json();
                console.error('Error actualizando ambiente:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchAmbientes = async () => {
            try {
                const response = await fetch('http://192.168.1.5:3000/ambiente/all');
                const data = await response.json();
                setAmbientes(data.data);
                setFilteredAmbientes(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCentros = async () => {
            try {
                const response = await fetch('http://192.168.1.5:3000/centro/all');
                const data = await response.json();
                setCentros(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAmbientes();
        fetchCentros();
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
                            <View key={ambiente.id_amb} style={styles.item}>
                                <TouchableOpacity onPress={() => showViewModal(ambiente)}>
                                    <Text>{ambiente.nom_amb}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => showEditModal(ambiente)}>
                                    <FontAwesomeIcon name="pencil" size={20} style={styles.pencilIcon} />
                                </TouchableOpacity>
                            </View>
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
                    visible={viewModalVisible}
                    onRequestClose={closeViewModal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text><Text style={styles.modalText}>Id:</Text>  {selectedAmbiente.id_amb}</Text>
                            <Text><Text style={styles.modalText}>Nombre:</Text>  {selectedAmbiente.nom_amb}</Text>
                            <Text><Text style={styles.modalText}>Centro:</Text>  {selectedAmbiente.cen_fk}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={closeViewModal}
                            >
                                <Text style={styles.textStyle}>Cerrar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}

            {selectedAmbiente && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editModalVisible}
                    onRequestClose={closeEditModal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text><Text style={styles.modalText}>Id:</Text>  {selectedAmbiente.id_amb}</Text>
                            <Text><Text style={styles.modalText}>Nombre:</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={editNombre}
                                onChangeText={setEditNombre}
                            />
                            <Text><Text style={styles.modalText}>Centro:</Text></Text>
                            <Picker
                                selectedValue={editCentro}
                                style={styles.input}
                                onValueChange={(itemValue) => setEditCentro(itemValue)}
                            >
                                {ambientes.map((centro) => (
                                    <Picker.Item key={centro.cen_fk} label={centro.cen_fk} value={centro.id_centro} />
                                ))}
                            </Picker>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={updateAmbiente}
                            >
                                <Text style={styles.textStyle}>Guardar</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={closeEditModal}
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
    pencilIcon: {
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});

export default AmbienteScreen;
