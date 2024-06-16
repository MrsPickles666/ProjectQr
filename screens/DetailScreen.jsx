import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const DetailScreen = () => {
    const [objetos, setObjetos] = useState([]);
    const [filteredObjetos, setFilteredObjetos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedObjeto, setSelectedObjeto] = useState(null);
    const [editMarca, setEditMarca] = useState('');
    const [editSerial, setEditSerial] = useState('');
    const [editTipo, setEditTipo] = useState('');
    const [editEstado, setEditEstado] = useState('');
    const [editValor, setEditValor] = useState('');
    const [editObservaciones, setEditObservaciones] = useState('');
    const navigation = useNavigation();

    const navigateToCrear = () => {
        navigation.navigate('RegisterObjets');
    }

    useEffect(() => {
        const fetchObjetos = async () => {
            try {
                const response = await fetch('http://192.168.81.71:3000/objeto/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setObjetos(data);
                setFilteredObjetos(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchObjetos();
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredObjetos(objetos);
        } else {
            const filteredData = objetos.filter(objeto =>
                objeto.marc_obj.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredObjetos(filteredData);
        }
    }, [searchQuery, objetos]);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };

    const showViewModal = async (objeto) => {
        try {
            const response = await fetch(`http://192.168.81.71:3000/objeto/${objeto.id_obj}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            data.qrimagen = arrayBufferToBase64(data.qrimagen.data);
            setSelectedObjeto(data);
            setViewModalVisible(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const showEditModal = (objeto) => {
        setSelectedObjeto(objeto);
        setEditMarca(objeto.marc_obj);
        setEditSerial(objeto.ser_obj);
        setEditTipo(objeto.tip_obj);
        setEditEstado(objeto.est_obj);
        setEditValor(objeto.val_obj);
        setEditObservaciones(objeto.obser_obj);
        setEditModalVisible(true);
    };

    const closeViewModal = () => {
        setSelectedObjeto(null);
        setViewModalVisible(false);
    };

    const closeEditModal = () => {
        setSelectedObjeto(null);
        setEditMarca('');
        setEditSerial('');
        setEditTipo('');
        setEditEstado('');
        setEditValor('');
        setEditObservaciones('');
        setEditModalVisible(false);
    };

    const updateObjeto = async () => {
        try {
            const response = await fetch(`http://192.168.81.71:3000/objeto/${selectedObjeto.id_obj}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    marc_obj: editMarca,
                    ser_obj: editSerial,
                    tip_obj: editTipo,
                    est_obj: editEstado,
                    val_obj: editValor,
                    obser_obj: editObservaciones,
                }),
            });

            if (response.ok) {
                const updatedObjetos = objetos.map(obj =>
                    obj.id_obj === selectedObjeto.id_obj ? {
                        ...obj,
                        marc_obj: editMarca,
                        ser_obj: editSerial,
                        tip_obj: editTipo,
                        est_obj: editEstado,
                        val_obj: editValor,
                        obser_obj: editObservaciones,
                    } : obj
                );
                setObjetos(updatedObjetos);
                setFilteredObjetos(updatedObjetos);
                closeEditModal();
            } else {
                const errorData = await response.json();
                console.error('Error actualizando objeto:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>Activos</Text>
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
                            <TouchableOpacity key={objeto.id_obj} style={styles.item} onPress={() => showViewModal(objeto)}>
                                <Text>{objeto.marc_obj}</Text>
                                <TouchableOpacity style={styles.editButton} onPress={() => showEditModal(objeto)}>
                                    <FontAwesomeIcon name="pencil" size={20} style={styles.pencilIcon} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text>No se encontraron objetos.</Text>
                    )}
                </ScrollView>
            )}

            <View style={styles.containerButton}>
                <TouchableOpacity onPress={navigateToCrear} style={[styles.button, { backgroundColor: 'rgb(191, 227, 173)' }]}>
                    <FontAwesomeIcon name="plus-circle" size={45} style={styles.agre} />
                    <Text style={styles.buttonText}>AGREGAR</Text>
                </TouchableOpacity>
            </View>

            {selectedObjeto && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={viewModalVisible}
                    onRequestClose={closeViewModal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Detalles del Objeto</Text>
                            <Text><Text style={styles.modalTitle}>Serial:</Text> {selectedObjeto.ser_obj}</Text>
                            <Text><Text style={styles.modalTitle}>Marca:</Text> {selectedObjeto.marc_obj}</Text>
                            <Text><Text style={styles.modalTitle}>Tipo:</Text> {selectedObjeto.tip_obj}</Text>
                            <Text><Text style={styles.modalTitle}>Estado:</Text> {selectedObjeto.est_obj}</Text>
                            <Text><Text style={styles.modalTitle}>Valor:</Text> {selectedObjeto.val_obj}</Text>
                            <Text><Text style={styles.modalTitle}>Observaciones:</Text> {selectedObjeto.obser_obj}</Text>
                            {selectedObjeto.qrimagen && (
                                <>
                                    <Text style={styles.modalTitle}>Qr del Objeto: </Text>
                                    <Image
                                        style={styles.qrCodeImage}
                                        source={{ uri: `data:image/png;base64,${selectedObjeto.qrimagen}` }}
                                    />
                                </>
                            )}
                            <Pressable style={[styles.button, styles.buttonClose]} onPress={closeViewModal}>
                                <Text style={styles.textStyle}>Cerrar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}

            {selectedObjeto && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editModalVisible}
                    onRequestClose={closeEditModal}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>EDITAR</Text>
                            <Text><Text style={styles.modalText}>MARCA:</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={editMarca}
                                onChangeText={setEditMarca}
                            />
                            <Text><Text style={styles.modalText}>SERIAL:</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={editSerial}
                                onChangeText={setEditSerial}
                            />
                            <Text><Text style={styles.modalText}>TIPO:</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={editTipo}
                                onChangeText={setEditTipo}
                            />
                            <Text><Text style={styles.modalText}>ESTADO:</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={editEstado}
                                onChangeText={setEditEstado}
                            />
                            <Text><Text style={styles.modalText}>VALOR:</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={editValor}
                                onChangeText={setEditValor}
                            />
                            <Text><Text style={styles.modalText}>OBSERVACION:</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={editObservaciones}
                                onChangeText={setEditObservaciones}
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={updateObjeto}
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
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'left',
    },
    qrCodeImage: {
        width: 300,
        height: 300,
        marginTop: 0,
        marginBottom: 10,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: 'black',
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default DetailScreen;
