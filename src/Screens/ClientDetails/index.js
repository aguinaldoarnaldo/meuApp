import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

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
              source={require('../../../assets/2.jpeg')} 
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
