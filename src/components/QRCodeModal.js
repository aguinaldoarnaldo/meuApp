import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '../services/api';

const { width } = Dimensions.get('window');

export default function QRCodeModal({ visible, onClose, tipoUso = 'consulta' }) {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expiraEm, setExpiraEm] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (visible) {
      generateQRCode();
    } else {
      // Limpar dados ao fechar
      setQrCodeData(null);
      setExpiraEm(null);
      setCountdown(null);
    }
  }, [visible]);

  // Contador regressivo
  useEffect(() => {
    if (!expiraEm || !visible) return;

    const interval = setInterval(() => {
      const agora = new Date();
      const expira = new Date(expiraEm);
      const diff = Math.max(0, Math.floor((expira - agora) / 1000));

      if (diff === 0) {
        setCountdown(0);
        clearInterval(interval);
        Alert.alert(
          'QR Code Expirado',
          'O QR Code expirou. Gere um novo código para usar o cartão.',
          [{ text: 'OK', onPress: handleClose }]
        );
      } else {
        const minutos = Math.floor(diff / 60);
        const segundos = diff % 60;
        setCountdown(`${minutos}:${segundos.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiraEm, visible]);

  const generateQRCode = async () => {
    setLoading(true);
    try {
      const response = await ApiService.generateQRCode(tipoUso);
      setQrCodeData(response.qrCodeData);
      setExpiraEm(response.expiraEm);
      
      // Iniciar contador
      const agora = new Date();
      const expira = new Date(response.expiraEm);
      const diff = Math.max(0, Math.floor((expira - agora) / 1000));
      const minutos = Math.floor(diff / 60);
      const segundos = diff % 60;
      setCountdown(`${minutos}:${segundos.toString().padStart(2, '0')}`);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao gerar QR Code');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (qrCodeData) {
      // Invalidar QR Code ao fechar
      try {
        const data = JSON.parse(qrCodeData);
        ApiService.invalidateQRCode(data.token).catch(console.error);
      } catch (error) {
        console.error('Erro ao invalidar QR Code:', error);
      }
    }
    onClose();
  };

  const handleInvalidate = async () => {
    Alert.alert(
      'Cancelar QR Code',
      'Tem certeza que deseja cancelar este QR Code?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: async () => {
            try {
              if (qrCodeData) {
                const data = JSON.parse(qrCodeData);
                await ApiService.invalidateQRCode(data.token);
              }
              handleClose();
            } catch (error) {
              Alert.alert('Erro', 'Erro ao cancelar QR Code');
            }
          },
        },
      ]
    );
  };

  const getTipoUsoLabel = () => {
    const labels = {
      consulta: 'Consulta Médica',
      medicamento: 'Medicamento',
      exame: 'Exame',
    };
    return labels[tipoUso] || 'Uso do Cartão';
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>QR Code - {getTipoUsoLabel()}</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#002D5E" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#002D5E" />
                <Text style={styles.loadingText}>Gerando QR Code...</Text>
              </View>
            ) : qrCodeData ? (
              <>
                <View style={styles.qrCodeContainer}>
                  <QRCode
                    value={qrCodeData}
                    size={width * 0.7}
                    color="#002D5E"
                    backgroundColor="#FFFFFF"
                  />
                </View>

                {countdown && (
                  <View style={styles.countdownContainer}>
                    <Ionicons name="time-outline" size={20} color="#A6C838" />
                    <Text style={styles.countdownText}>
                      Expira em: {countdown}
                    </Text>
                  </View>
                )}

                <Text style={styles.instruction}>
                  Apresente este código na clínica ou farmácia parceira
                </Text>

                <View style={styles.warningContainer}>
                  <Ionicons name="shield-checkmark-outline" size={20} color="#FF6B6B" />
                  <Text style={styles.warningText}>
                    Este código é válido por apenas 15 minutos e pode ser usado apenas uma vez
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleInvalidate}
                >
                  <Ionicons name="close-circle-outline" size={20} color="#FFF" />
                  <Text style={styles.cancelButtonText}>Cancelar QR Code</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002D5E',
  },
  closeButton: {
    padding: 5,
  },
  content: {
    padding: 25,
    alignItems: 'center',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  qrCodeContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8E8',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 15,
  },
  countdownText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A6C838',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  warningContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  warningText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: '#FF6B6B',
    lineHeight: 16,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: '100%',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

