import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, Image, Pressable, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

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
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [editObservaciones, setEditObservaciones] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { ambienteId } = route.params;
    const [objetosAmbiente, setObjetosAmbiente] = useState([]);
const [objetosTodos, setObjetosTodos] = useState([]);

    const navigateToCrear = () => {
        navigation.navigate('RegisterObjets', {
            refresh: true, // Indicar que se debe refrescar la pantalla al regresar
        });
    };

    useEffect(() => {
        const fetchObjetosAmbiente = async () => {
            try {
                const response = await fetch(`http://192.168.81.71:3000/objeto/byAmbiente/${ambienteId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setObjetosAmbiente(data);
                setFilteredObjetos(data); // Actualizar también los objetos filtrados
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchObjetosAmbiente();
    }, [ambienteId]); // Aquí se agrega ambienteId como dependencia
    
    


    useEffect(() => {
        const fetchObjetosTodos = async () => {
            try {
                const response = await fetch('http://192.168.81.71:3000/objeto/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setObjetosTodos(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchObjetosTodos();
    }, []);
    

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredObjetos(objetosAmbiente);
        } else {
            const filteredData = objetosAmbiente.filter(objeto =>
                objeto.marc_obj.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredObjetos(filteredData);
        }
    }, [searchQuery, objetosAmbiente]);
    

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
    

    const handleDownloadConfirmation = () => {
        setConfirmModalVisible(false);  // Cerrar el modal de confirmación
        downloadImage();  // Llamar a la función para descargar la imagen
    };

    const downloadImage = async () => {
        try {
            // Pedir permisos para acceder a la librería de medios
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permiso para acceder a la librería de medios es necesario para descargar la imagen.');
                return;  // Salir de la función si los permisos no son otorgados
            }

            // Convertir la imagen base64 a un archivo en el sistema de archivos
            const base64Data = selectedObjeto.qrimagen.replace(/^data:image\/(png|jpeg);base64,/, '');
            const filename = `${selectedObjeto.ser_obj}_SAFTS.png`;
            const dir = FileSystem.documentDirectory + filename;
            await FileSystem.writeAsStringAsync(dir, base64Data, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // Guardar la imagen en la librería de medios
            const asset = await MediaLibrary.createAssetAsync(dir);

            setSuccessModalVisible(true);  // Mostrar el modal de éxito
        } catch (error) {
            // Manejar error de manera silenciosa si se debe a permisos denegados
            if (error.message.includes("User didn't grant write permission to requested files.")) {
                console.log('El usuario denegó los permisos, no se descargó la imagen.');
                alert('El usuario denegó los permisos, no se descargó la imagen.');
            } else {
                console.error('Error al descargar la imagen:', error);
                alert('Error al descargar la imagen.');
            }
        }
    };

    const closeSuccessModal = () => {
        setSuccessModalVisible(false);
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
                        <Text>{`Objetos del ambiente ${ambienteId}`}</Text>

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
                                    <TouchableOpacity onPress={() => setConfirmModalVisible(true)}>
                                        <Text style={styles.textQrDow}>Descargar QR</Text>
                                    </TouchableOpacity>
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

            <Modal visible={confirmModalVisible} animationType="slide" transparent={true}>
                <View style={styles.confirmModalContainer}>
                    <View style={styles.confirmModalContent}>
                        <Text style={styles.modalTitle}>¿Desea descargar el QR?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleDownloadConfirmation}>
                                <Text style={styles.confirmButtonText}>Sí</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setConfirmModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={successModalVisible} animationType="slide" transparent={true}>
                <View style={styles.confirmModalContainer}>
                    <View style={styles.confirmModalContent}>
                        <Text style={styles.modalTitle}>Imagen descargada exitosamente!</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <TouchableOpacity style={styles.BtonMenss} onPress={closeSuccessModal}>
                                <Text style={styles.confirmButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>



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
        width: 250,
        height: 250,
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

    buttonDownload: {
        backgroundColor: '#39A900',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },

    confirmModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    confirmModalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalLabel: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: '#39A900',
        paddingVertical: 10,
        paddingHorizontal: 23,
        borderRadius: 10,
        marginBottom: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    confirmModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    confirmModalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    BtonMenss: {
        backgroundColor: '#39A900',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },


    textQrDow: {
        color: '#39A900',
        fontSize: 18,
        marginBottom: 20,
        textDecorationLine: 'underline',
    },
});

export default DetailScreen;