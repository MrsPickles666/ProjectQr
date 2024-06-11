import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const CategoriaScrenn = () => {
    const [categorias, setCategorias] = useState([]);
    const [filteredCategorias, setFilteredCategorias] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();


    const navigateEditar = () => {
        navigation.navigate('EditCategory');
    };

    const RegisterCatego = () => {
        navigation.navigate('RegisterCatego');

    };

    const showModal = (categoria) => {
        setSelectedCategoria(categoria);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedCategoria(null);
        setModalVisible(false);
    };

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://192.168.81.71:3000/categorias/all');
                const data = await response.json();


                setCategorias(data.data);
                setFilteredCategorias(data.data);
            } catch (error) {

            } finally {
                setLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    useEffect(() => {
        // Filtrar categorias cuando cambia la consulta de búsqueda
        if (searchQuery === '') {
            setFilteredCategorias(categorias); // Mostrar todos los categorias si no hay búsqueda
        } else {
            const filteredData = categorias.filter(categoria =>
                categoria.nom_cate.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCategorias(filteredData);
        } categorias
    }, [searchQuery, categorias]);

    return (
            <View style={styles.container}>
                <View style={styles.titulo}>
                    <Text style={styles.tituloText}>Categoria</Text>
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
                        {filteredCategorias.length > 0 ? (
                            filteredCategorias.map(categoria => (
                                <TouchableOpacity key={categoria.id_cate} style={styles.item} onPress={() => showModal(categoria)}>
                                    <Text>{categoria.nom_cate}</Text>

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
                    <TouchableOpacity onPress={RegisterCatego} style={[styles.button, { backgroundColor: 'rgb(191, 227, 173)' }]}>
                        <FontAwesomeIcon name="plus-circle" size={45} style={styles.agre} />
                        <Text style={styles.buttonText}>AGREGAR</Text>
                    </TouchableOpacity>
                </View>


                {selectedCategoria && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={closeModal}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                <Text><Text style={styles.modalText}>Id:</Text>  {selectedCategoria.id_cate}</Text>
                                <Text><Text style={styles.modalText}>Nombre: </Text>{selectedCategoria.nom_cate}</Text>

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
    listCate: {
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
    modalText: {
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
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
});

export default CategoriaScrenn;
