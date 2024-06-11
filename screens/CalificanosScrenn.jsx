import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const CalificanosScreen = () => {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState({});

    const navigateToHome = () => {
        navigation.navigate('Home');
    };
    const navigateToSetting = () => {
        navigation.navigate('Setting');
    };

    const handleCheck = (starNumber) => {
        const num = parseInt(starNumber.replace('star', ''), 10);
        let newCheckState = {};
        const isCurrentlyChecked = isChecked[starNumber];
    
        if (isCurrentlyChecked && num === Object.keys(isChecked).reduce((acc, key) => {
            return isChecked[key] ? parseInt(key.replace('star', ''), 10) : acc;
        }, 0)) {
            for (let i = 1; i <= num; i++) {
                newCheckState[`star${i}`] = i < num;
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                newCheckState[`star${i}`] = i <= num;
            }
        }
    
        setIsChecked(newCheckState);
    };
    
    
    

    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.tituloText}>Calificanos</Text>
            </View>
            <View style={styles.containerStar}>
                <FontAwesomeIcon name="star" size={80} style={styles.Star} />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.textForm}>Como te parecio nuestro servicio?</Text>
                <TextInput
                  style={styles.textOpin}
                  placeholder="Danos tu opinion!"
                  placeholderTextColor="#888"
                  multiline
                />
                <View style={styles.containerStarSelec}>
                    {[1, 2, 3, 4, 5].map((index) => (
                        <TouchableOpacity key={index} onPress={() => handleCheck(`star${index}`)}>
                            <FontAwesomeIcon
                                name={isChecked[`star${index}`] ? "star" : "star-o"}
                                size={50}
                                style={styles.selectStar}
                                color={isChecked[`star${index}`] ? "gold" : "black"} 
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <TouchableOpacity onPress={navigateToHome} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
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
    containerStar: {
        width: '89%',
        borderBottomWidth: 1,
        alignItems: 'flex-end',
    },
    Star: {
        width: 80,
        height: 80,
        margin: 10,
    },

    containerForm: {
        width: '90%',
        alignContent: 'flex-start',
        margin: '10%'
    },
    
    textForm: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    textOpin: {
        width: 300,
        height: 180,
        marginTop: '5%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textAlignVertical: 'top', 
        borderRadius: 5,
    },
    containerStarSelec:{
        flexDirection: 'row',
        marginTop: '20%',
        justifyContent: 'center',
    },
    selectStar:{
        margin: '3%',
    },
    button: {
      position: 'absolute',
    bottom: '-15%',
      width: 160,
      height: 50,
      backgroundColor: '#39A900',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
    },
});

export default CalificanosScreen;