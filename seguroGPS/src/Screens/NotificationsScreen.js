import React from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen({ navigation }) {
  const { width } = useWindowDimensions();

  // Dados fictícios baseados na imagem
  const notifications = [
    { id: '1', title: 'Alerta', description: 'Foi registado um procedimento diferente do habitual.', type: 'alert' },
    { id: '2', title: 'Novidades', description: 'A clinica Naturmed está credenciada para consultas de paludismo.', type: 'news' },
    { id: '3', title: 'Lembrete', description: 'O seu cartão é pessoal e intransmissível. Valide sempre pelo App.', type: 'reminder' },
    { id: '4', title: 'Subscrição a expirar', description: 'A sua subscrição termina em 5 dias. Renove para continuar protegido.', type: 'expiry' },
    { id: '5', title: 'Alerta', description: 'Foi registado um procedimento diferente do habitual.', type: 'alert' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER FIXO */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation?.goBack("home")}
        >
          <Ionicons name="chevron-back" size={24} color="#002D5E" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notificações</Text>

        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={26} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* LISTA DE NOTIFICAÇÕES ROLÁVEL */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((item) => (
          <View key={item.id} style={styles.notificationCard}>
            {/* Ícone Quadrado (Espaço Reservado) */}
            <View style={styles.iconPlaceholder} />
            
            <View style={styles.textContainer}>
              <Text style={styles.notifTitle}>{item.title}</Text>
              <Text style={styles.notifDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#A6C838' // Verde limão de fundo
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
  },
  backButton: {
    backgroundColor: '#FFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  notificationCard: {
    backgroundColor: '#002D5E', // Azul marinho dos cards
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    // Sombra para dar profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconPlaceholder: {
    width: 45,
    height: 45,
    backgroundColor: '#D9D9D9', // Cinza claro do ícone na imagem
    borderRadius: 10,
    opacity: 0.8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  notifTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notifDescription: {
    color: '#FFF',
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.9,
  },
});