
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const EditCategory = () => {
    const navigation = useNavigation();

    const navigateToCateg = () => {
        navigation.navigate('CategoriaScrenn');
    };


    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>Editar Categoria</Text>
            </View>
            <View style={styles.containerEdit}>
                <FontAwesomeIcon name="pencil" size={60} style={styles.edit} />
            </View>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.containerForm}>
                    <View style={styles.containerInput}>
                        <Text style={styles.textInputLabel}>Nombre de Categoria: </Text>
                        <Input containerStyle={styles.inputContainer} inputStyle={styles.input} />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={navigateToCateg} style={styles.button}>
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
        </View>
    );
};

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
    containerEdit: {
        width: '89%',
        borderBottomWidth: 1,
        alignItems: 'flex-end',
    },
    edit: {
        margin: '1%'
    },
    scrollContainer: {
        width: '100%',
        height: 400,
        marginTop: '10%',
    },
    containerForm: {
        margin: '5%',
        width: '90%',
    },
    containerInput: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    textInputLabel: {
        fontSize: 16,
        marginRight: 10,
        flex: 1,
    },
    inputDate: {
        flex: 2,
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'rgb(133, 133, 133)',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 2,
    },
    input: {
        width: '100%',
    },
    button: {
        width: 160,
        height: 50,
        backgroundColor: '#39A900',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 100,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        marginHorizontal: 10,
    },
});

export default EditCategory;
