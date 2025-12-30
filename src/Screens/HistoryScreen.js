import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ApiService from '../services/api';

// Funções auxiliares para status
const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'confirmado':
            return '#A6C838';
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
                    <Ionicons name="chevron-back" size={24} color="#002D5E" />
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
                        color={activeTab === 'procedimentos' ? '#002D5E' : '#999'}
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
                        color={activeTab === 'uso' ? '#002D5E' : '#999'}
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
                        <ActivityIndicator size="large" color="#002D5E" />
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
    const statusColor = status === 'Confirmado' ? '#A6C838' : '#FFA500';
    const statusIcon = status === 'Confirmado' ? 'checkmark-circle' : 'time-outline';

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                    <Ionicons name="medical-outline" size={24} color="#002D5E" />
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
                    <Ionicons name="qr-code-outline" size={24} color="#002D5E" />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#002D5E',
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        gap: 10,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
    },
    tabActive: {
        backgroundColor: '#F0F4F8',
    },
    tabText: {
        fontSize: 16,
        color: '#999',
        fontWeight: '600',
    },
    tabTextActive: {
        color: '#002D5E',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    loadingContainer: {
        padding: 40,
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    cardHeaderText: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#002D5E',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#666',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 15,
        gap: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        lineHeight: 20,
    },
    valorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    valorLabel: {
        fontSize: 14,
        color: '#666',
    },
    valorText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#002D5E',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#002D5E',
        marginTop: 20,
        marginBottom: 10,
    },
    emptyStateText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});
