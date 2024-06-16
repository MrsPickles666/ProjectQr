import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (scanning) {
      setScanned(true);
      alert(`Código Escaneado:\nTipo: ${type}\nDatos: ${data}`);
      setScanning(false); // Desactivar el escaneo después de escanear uno
    }
  };

  const startScan = () => {
    setScanned(false);
    setScanning(true);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <Text style={styles.scanText}>Ubica el QR en el cuadro: </Text>
        <View style={styles.border} />
        <Button
          title={'Escanear Codigo QR'}
          onPress={startScan} // Iniciar el escaneo al presionar el botón
          color="#39A900"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scanText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  border: {
    height: 350,
    width: 350,
    borderWidth: 2,
    marginBottom: 20,
    borderColor: '#39A900',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default CameraScreen;
