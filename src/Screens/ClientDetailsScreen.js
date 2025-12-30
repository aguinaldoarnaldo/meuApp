import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ClientDetailsScreen({ navigation }) {
  const { width } = useWindowDimensions();

  // largura responsiva
  const contentWidth = width > 500 ? 400 : width * 0.9;

  const handleClose = () => {
    if (navigation?.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.overlay}
        showsVerticalScrollIndicator={false}
      >
        {/* CARD PRINCIPAL */}
        <View style={[styles.mainCard, { width: contentWidth }]}>

          {/* FOTO - Alterado para usar require local */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/2.jpeg')} 
              style={styles.clientImage}
              resizeMode="cover"
            />
          </View>

          {/* DADOS */}
          <View style={styles.dataBox}>
            <Info label="Nome" value="Délcio Manuel da Silva" />
            <Info label="Género" value="Masculino" />
            <Info label="Idade" value="18 anos" />
            <Info label="Altura" value="1.65m" />
            <Info label="Peso" value="54 Kg" />
          </View>

          {/* BOTÕES */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Iniciar Atendimento</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* COMPONENTE REUTILIZÁVEL */
const Info = ({ label, value }) => (
  <View style={styles.infoGroup}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002D5E',
  },
  overlay: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mainCard: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: 350, // Aumentei um pouco para combinar com a imagem de referência
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#EEE',
  },
  clientImage: {
    width: '100%',
    height: '100%',
  },
  dataBox: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#A6C838',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
  },
  infoGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#AAA',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  startButton: {
    backgroundColor: '#A6C838',
    flex: 1.2,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#AAA',
    flex: 0.8,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});