import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OtraPantalla = () => {
  const navigation = useNavigation();

  const verToken = () => {
    navigation.navigate('Token');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Ver Token" onPress={verToken} />
    </View>
  );
};

export default OtraPantalla;
