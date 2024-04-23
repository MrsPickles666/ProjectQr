import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const ComponentPantallas = ({ tittle, icono}) => {
    const navigation = useNavigation();

    const backHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.topbar}>
                <TouchableOpacity onPress={backHome} style={styles.backButton}>
                    <FontAwesomeIcon name="arrow-left" style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.text}>{tittle}</Text>
            </View>

            <View style={styles.contencenter}>
                {/* Contenido del centro */}
            </View>

            <View style={styles.sidebar}>
                {/* Contenido de la barra lateral */}
            </View>

            <View style={styles.iconContainer}>
                {icono && <FontAwesomeIcon name={icono} style={styles.icon} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'column',

    },
    topbar: {
        flex: 1,
        backgroundColor: '#39A900',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    contencenter: {
        flex: 1, // Ajusta la altura según tus necesidades
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    sidebar: {
        flex: 5, // Ajusta la altura según tus necesidades
        flexDirection: 'column',
    },
    iconContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    icon: {
        flex: 1,
        fontSize: 50,
        top: 145,
        color: 'black',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        top: -20,
        fontFamily: 'sans-serif',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    backButton: {
        top: 15,
        right: '43%',
        padding: 10,
    },
    backIcon: {
        fontSize: 25,
        color: 'white',
    },
});

export default ComponentPantallas;
