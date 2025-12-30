import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Animated,
  Platform
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QRScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  
  // Animação da linha (laser)
  const lineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startLineAnimation();
  }, []);

  const startLineAnimation = () => {
    lineAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(lineAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(lineAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // 🚀 AQUI ESTÁ A ALTERAÇÃO PRINCIPAL
  // Detectou QR Code → navega imediatamente (sem validar)
  const handleBarCodeScanned = () => {
    setScanned(true);
    navigation.replace('ClientDetailsScreen');
  };

  // Interpolação da linha de scan
  const translateY = lineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 340],
  });

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          Precisamos de permissão para abrir a câmera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.retryButton}>
          <Text style={styles.retryText}>Conceder Permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        {/* OVERLAY */}
        <View style={styles.overlay}>
          
          <SafeAreaView style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <View style={styles.backCircle}>
                <Ionicons name="chevron-back" size={24} color="#002D5E" />
              </View>
            </TouchableOpacity>

            <Text style={styles.instructionText}>
              Posicione o QR code{"\n"}dentro da área marcada...
            </Text>
          </SafeAreaView>

          {/* MOLDURA DE SCAN */}
          <View style={styles.viewFinder}>
            <View style={styles.frame}>
              <Animated.View
                style={[
                  styles.scanLine,
                  { transform: [{ translateY }] },
                ]}
              />
            </View>
          </View>

          <View style={styles.footer}>
            {scanned && (
              <TouchableOpacity
                onPress={() => setScanned(false)}
                style={styles.retryButton}
              >
                <Text style={styles.retryText}>Escanear Novamente</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 45, 94, 0.7)',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'ios' ? 0 : 20,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 80,
  },
  viewFinder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: 260,
    height: 350,
    borderWidth: 3,
    borderColor: '#FFF',
    borderRadius: 25,
    overflow: 'hidden',
  },
  scanLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#A6C838',
    shadowColor: '#A6C838',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  retryButton: {
    backgroundColor: '#A6C838',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
  },
  retryText: {
    color: '#002D5E',
    fontWeight: 'bold',
  },
});
