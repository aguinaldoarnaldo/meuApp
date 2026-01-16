import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../../services/api';
import { styles } from './styles';
import { theme } from '../../styles/theme';

// Funções auxiliares para status
const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'confirmado':
            return theme.colors.secondary;
        case 'pendente':
            return '#FFA500';
        case 'rejeitado':
            return '#FF6B6B';
        case 'suspeito':
            return '#FF6B6B';
        default:
            return '#666';
    }
};

const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
        case 'confirmado':
            return 'checkmark-circle';
        case 'pendente':
            return 'time-outline';
        case 'rejeitado':
            return 'close-circle';
        case 'suspeito':
            return 'warning';
        default:
            return 'help-circle-outline';
    }
};

export default function HistoryScreen({ navigation }) {
    const [procedimentos, setProcedimentos] = useState([]);
    const [registrosUso, setRegistrosUso] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState('procedimentos');

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            setLoading(true);
            const [procedimentosData, auditoriaData] = await Promise.all([
                ApiService.getProcedimentos(),
                ApiService.getAuditoriaUsuario(100, 0),
            ]);
            setProcedimentos(procedimentosData.procedimentos || []);
            setRegistrosUso(auditoriaData.registros || []);
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadHistory();
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return '--/--/---- --:--';
        const date = new Date(dateString);
        return date.toLocaleString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Histórico</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'procedimentos' && styles.tabActive]}
                    onPress={() => setActiveTab('procedimentos')}
                >
                    <Ionicons
                        name="medical-outline"
                        size={20}
                        color={activeTab === 'procedimentos' ? theme.colors.primary : '#999'}
                    />
                    <Text style={[
                        styles.tabText,
                        activeTab === 'procedimentos' && styles.tabTextActive
                    ]}>
                        Procedimentos
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'uso' && styles.tabActive]}
                    onPress={() => setActiveTab('uso')}
                >
                    <Ionicons
                        name="list-outline"
                        size={20}
                        color={activeTab === 'uso' ? theme.colors.primary : '#999'}
                    />
                    <Text style={[
                        styles.tabText,
                        activeTab === 'uso' && styles.tabTextActive
                    ]}>
                        Uso do Cartão
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                    </View>
                ) : (
                    <>
                        {activeTab === 'procedimentos' ? (
                            <>
                                {procedimentos.length > 0 ? (
                                    procedimentos.map((proc) => (
                                        <ProcedimentoCard
                                            key={proc.id}
                                            clinica={proc.clinica}
                                            status={proc.status}
                                            data={proc.data_procedimento_formatada}
                                            tempo={proc.tempo_relativo}
                                            descricao={proc.descricao}
                                        />
                                    ))
                                ) : (
                                    <EmptyState
                                        icon="medical-outline"
                                        title="Nenhum procedimento encontrado"
                                        text="Seus procedimentos aparecerão aqui"
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {registrosUso.length > 0 ? (
                                    registrosUso.map((registro) => (
                                        <RegistroUsoCard
                                            key={registro.id}
                                            clinica={registro.clinica_nome || 'Clínica Parceira'}
                                            tipo={registro.tipo_uso}
                                            status={registro.status}
                                            data={formatDateTime(registro.created_at)}
                                            valor={registro.valor}
                                        />
                                    ))
                                ) : (
                                    <EmptyState
                                        icon="list-outline"
                                        title="Nenhum registro de uso encontrado"
                                        text="Seus registros de uso aparecerão aqui"
                                    />
                                )}
                            </>
                        )}
                    </>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

// Componente para card de procedimento
const ProcedimentoCard = ({ clinica, status, data, tempo, descricao }) => {
    const statusColor = status === 'Confirmado' ? theme.colors.secondary : '#FFA500';
    const statusIcon = status === 'Confirmado' ? 'checkmark-circle' : 'time-outline';

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                    <Ionicons name="medical-outline" size={24} color={theme.colors.primary} />
                    <View style={styles.cardHeaderText}>
                        <Text style={styles.cardTitle}>{clinica}</Text>
                        <Text style={styles.cardSubtitle}>{data} • {tempo}</Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                    <Ionicons name={statusIcon} size={16} color={statusColor} />
                    <Text style={[styles.statusText, { color: statusColor }]}>
                        {status}
                    </Text>
                </View>
            </View>
            {descricao && (
                <Text style={styles.cardDescription}>{descricao}</Text>
            )}
        </View>
    );
};

// Componente para card de registro de uso
const RegistroUsoCard = ({ clinica, tipo, status, data, valor }) => {
    const statusColor = getStatusColor(status);
    const statusIcon = getStatusIcon(status);

    const getTipoLabel = (tipo) => {
        const tipos = {
            consulta: 'Consulta',
            medicamento: 'Medicamento',
            exame: 'Exame',
        };
        return tipos[tipo] || tipo;
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                    <Ionicons name="qr-code-outline" size={24} color={theme.colors.primary} />
                    <View style={styles.cardHeaderText}>
                        <Text style={styles.cardTitle}>{clinica}</Text>
                        <Text style={styles.cardSubtitle}>{getTipoLabel(tipo)} • {data}</Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                    <Ionicons name={statusIcon} size={16} color={statusColor} />
                    <Text style={[styles.statusText, { color: statusColor }]}>
                        {status}
                    </Text>
                </View>
            </View>
            {valor && (
                <View style={styles.valorContainer}>
                    <Text style={styles.valorLabel}>Valor:</Text>
                    <Text style={styles.valorText}>{valor} AOA</Text>
                </View>
            )}
        </View>
    );
};

// Componente para estado vazio
const EmptyState = ({ icon, title, text }) => (
    <View style={styles.emptyState}>
        <Ionicons name={icon} size={64} color="#CCC" />
        <Text style={styles.emptyStateTitle}>{title}</Text>
        <Text style={styles.emptyStateText}>{text}</Text>
    </View>
);
