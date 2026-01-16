import React, { useState, useEffect } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, useWindowDimensions, ActivityIndicator, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../../services/api';
import { styles } from './styles';

export default function NotificationsScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getNotifications();
      setNotifications(response.notifications || []);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja deletar todas as notificações?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              await ApiService.deleteAllNotifications();
              setNotifications([]);
              Alert.alert('Sucesso', 'Todas as notificações foram deletadas');
            } catch (error) {
              Alert.alert('Erro', 'Erro ao deletar notificações');
            }
          },
        },
      ]
    );
  };

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

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAll}>
          <Ionicons name="trash-outline" size={26} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* LISTA DE NOTIFICAÇÕES ROLÁVEL */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        ) : notifications.length > 0 ? (
          notifications.map((item) => (
            <View key={item.id} style={styles.notificationCard}>
              {/* Ícone Quadrado (Espaço Reservado) */}
              <View style={styles.iconPlaceholder} />
              
              <View style={styles.textContainer}>
                <Text style={styles.notifTitle}>{item.titulo}</Text>
                <Text style={styles.notifDescription}>{item.descricao}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma notificação encontrada</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
