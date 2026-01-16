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
import { styles } from './styles';

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
