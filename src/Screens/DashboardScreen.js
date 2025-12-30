import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  useWindowDimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg'; // Biblioteca para geração dinâmica

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Dados que serão codificados no QR Code (podem vir da sua API)
  const userData = {
    id: "20251220",
    nome: "Délcio Manuel da Silva",
    status: "Ativo"
  };

  return (
    <View style={styles.container}>
      {/* ... Seu código do Cartão de Saúde ... */}
      
      {/* Botão no canto superior direito do seu cartão verde */}
      <TouchableOpacity 
        style={styles.qrTrigger} 
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="qr-code" size={35} color="#002D5E" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContent}>
          
          {/* BOTÃO VOLTAR */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.backCircle}>
              <Ionicons name="chevron-back" size={24} color="#002D5E" />
            </View>
          </TouchableOpacity>

          {/* PADRÃO DE SÍMBOLOS "+" AO FUNDO (Fiel à imagem) */}
          <View style={styles.patternLayer}>
            <Text style={[styles.plus, { top: '15%', left: '20%' }]}>+</Text>
            <Text style={[styles.plus, { top: '10%', right: '15%' }]}>+</Text>
            <Text style={[styles.plus, { top: '40%', left: '10%' }]}>+</Text>
            <Text style={[styles.plus, { bottom: '25%', right: '20%' }]}>+</Text>
            <Text style={[styles.plus, { bottom: '10%', left: '35%' }]}>+</Text>
          </View>

          {/* QR CODE GERADO AUTOMATICAMENTE */}
          <View style={styles.qrWrapper}>
            <QRCode
              value={JSON.stringify(userData)} // Transforma os dados em texto para o QR
              size={220}
              color="#000"
              backgroundColor="#FFF"
              quietZone={10}
            />
          </View>

          {/* TEXTO DE ORIENTAÇÃO (Fiel à imagem) */}
          <View style={styles.textContainer}>
            <Text style={styles.modalText}>
              Estamos prontos para validar o seu atendimento...
            </Text>
          </View>

        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  qrTrigger: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#002D5E', // Azul idêntico à imagem enviada
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  plus: {
    position: 'absolute',
    color: 'rgba(255, 255, 255, 0.15)',
    fontSize: 40,
    fontWeight: '200',
  },
  qrWrapper: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 30, // Bordas arredondadas do card branco
    // Sombra para destacar o QR Code
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  textContainer: {
    marginTop: 50,
    paddingHorizontal: 40,
  },
  modalText: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 28,
  },
});