import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// URL base da API - ajuste conforme necessário
// Para Android Emulador usar: 'http://10.0.2.2:3000/api'
// Para iOS Simulador usar: 'http://localhost:3000/api'
// Para dispositivo físico usar: 'http://SEU_IP_LOCAL:3000/api'
// Exemplo: 'http://192.168.1.100:3000/api'

const API_BASE_URL = Platform.OS === 'android'
  ? 'http://172.20.10.3:3000/api'  // Android Emulador
  : 'http://localhost:3000/api'; // iOS Simulador ou Web

class ApiService {
  // Função auxiliar para fazer requisições
  async request(endpoint, options = {}) {
    const token = await AsyncStorage.getItem('@auth_token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }

  // Autenticação
  async register(nome, telefone, senha, confirmar) {
    return this.request('/auth/register', {
      method: 'POST',
      body: { nome, telefone, senha, confirmar },
    });
  }

  async login(telefone, senha) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: { telefone, senha },
    });

    // Salvar token
    if (data.token) {
      await AsyncStorage.setItem('@auth_token', data.token);
      await AsyncStorage.setItem('@user_data', JSON.stringify(data.user));
    }

    return data;
  }

  async logout() {
    await AsyncStorage.removeItem('@auth_token');
    await AsyncStorage.removeItem('@user_data');
  }

  async verifyToken() {
    return this.request('/auth/verify', {
      method: 'GET',
    });
  }

  // Usuário
  async getProfile() {
    return this.request('/users/profile', {
      method: 'GET',
    });
  }

  async updateProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: profileData,
    });
  }

  async changePassword(senha_atual, nova_senha, confirmar_senha) {
    return this.request('/users/change-password', {
      method: 'POST',
      body: { senha_atual, nova_senha, confirmar_senha },
    });
  }

  async getHealthCard() {
    return this.request('/users/health-card', {
      method: 'GET',
    });
  }

  async validateBI(bi) {
    return this.request('/users/validate-bi', {
      method: 'POST',
      body: { bi },
    });
  }

  // Notificações
  async getNotifications() {
    return this.request('/notifications', {
      method: 'GET',
    });
  }

  async markNotificationAsRead(notificationId) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  async deleteNotification(notificationId) {
    return this.request(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  }

  async deleteAllNotifications() {
    return this.request('/notifications', {
      method: 'DELETE',
    });
  }

  // Procedimentos
  async getProcedimentos() {
    return this.request('/procedimentos', {
      method: 'GET',
    });
  }

  async createProcedimento(procedimentoData) {
    return this.request('/procedimentos', {
      method: 'POST',
      body: procedimentoData,
    });
  }

  // QR Code
  async generateQRCode(tipoUso = 'consulta', clinicaId = null) {
    return this.request('/qrcode/generate', {
      method: 'POST',
      body: { tipo_uso: tipoUso, clinica_id: clinicaId },
    });
  }

  async validateQRCode(qrCodeToken, clinicaId = null) {
    return this.request('/qrcode/validate', {
      method: 'POST',
      body: { qr_code_token: qrCodeToken, clinica_id: clinicaId },
    });
  }

  async invalidateQRCode(qrCodeToken) {
    return this.request('/qrcode/invalidate', {
      method: 'POST',
      body: { qr_code_token: qrCodeToken },
    });
  }

  async getQRCodeHistory() {
    return this.request('/qrcode/history', {
      method: 'GET',
    });
  }

  // Clínicas
  async getClinicas(tipo = null) {
    const url = tipo ? `/clinicas?tipo=${tipo}` : '/clinicas';
    return this.request(url, {
      method: 'GET',
    });
  }

  // Auditoria
  async getAuditoriaUsuario(limite = 100, offset = 0) {
    return this.request(`/auditoria/usuario?limite=${limite}&offset=${offset}`, {
      method: 'GET',
    });
  }
}

export default new ApiService();

