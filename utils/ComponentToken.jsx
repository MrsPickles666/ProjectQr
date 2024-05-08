import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const obtenerToken = async () => {
      try {
        // Obtener el token almacenado en AsyncStorage
        const tokenGuardado = await AsyncStorage.getItem('token');
        
        // Actualiza el estado con el token
        setToken(tokenGuardado);
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    };

    // Llama a la función para obtener el token cuando el componente se monta
    obtenerToken();
  }, []); // El array vacío asegura que useEffect solo se ejecute una vez, al montar el componente

  return (
    <View>
      <Text>Token almacenado en AsyncStorage:</Text>
      <Text>{token}</Text>
    </View>
  );
};

export default VerToken;
