import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Tipo de codigo ${type} Informacion:--> ${data}  Fue escaneado`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner 
      
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camara}
      />
      {scanned && <Button  color={"#39A900"} title={'Escanear QR'} onPress={() => setScanned(false)} style={styles.boton} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop:-25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    width: "100%",
    
  },
  boton: {
    
    
  },
  camara: {
    height: "100%",
    width: "100%",
  },
});


export default CameraScreen;