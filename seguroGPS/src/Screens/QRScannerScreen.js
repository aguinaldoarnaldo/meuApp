import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal
} from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QRScannerScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [clientData, setClientData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Permissão da câmera (FORMA ATUAL)
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Leitura do QR Code
    const handleBarcodeScanned = ({ data }) => {
        if (scanned) return;

        setScanned(true);

        const mockClient = {
            nome: 'Délcio Manuel da Silva',
            apolice: data || '20251220',
            status: 'Válido',
            nascimento: '12/01/03',
            validade: '12/26'
        };

        setClientData(mockClient);
        setModalVisible(true);
    };

    if (hasPermission === null) {
        return <View style={styles.center}><Text>Solicitando permissão da câmera...</Text></View>;
    }

    if (hasPermission === false) {
        return <View style={styles.center}><Text>Sem acesso à câmera</Text></View>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr']
                }}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />

            {/* OVERLAY */}
            <View style={styles.overlay}>
                <View style={styles.topContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={30} color="#FFF" />
                    </TouchableOpacity>

                    <Text style={styles.instructionText}>
                        Posicione o QR Code{"\n"}dentro da área marcada
                    </Text>
                </View>

                <View style={styles.scanFrame} />

                <View style={styles.bottomContent}>
                    {scanned && (
                        <TouchableOpacity
                            style={styles.retryButton}
                            onPress={() => setScanned(false)}
                        >
                            <Text style={styles.retryText}>Tentar novamente</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* MODAL */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Ionicons name="checkmark-circle" size={50} color="#A6C838" />
                        <Text style={styles.modalTitle}>Cliente Validado</Text>

                        {clientData && (
                            <>
                                <DataRow label="Nome" value={clientData.nome} />
                                <DataRow label="Apólice" value={clientData.apolice} />
                                <DataRow label="Status" value={clientData.status} highlight />
                                <DataRow label="Nascimento" value={clientData.nascimento} />
                                <DataRow label="Válido até" value={clientData.validade} />
                            </>
                        )}

                        <TouchableOpacity
                            style={styles.closeModalButton}
                            onPress={() => {
                                setModalVisible(false);
                                setScanned(false);
                            }}
                        >
                            <Text style={styles.closeModalText}>Concluir Atendimento</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const DataRow = ({ label, value, highlight }) => (
    <View style={styles.dataRow}>
        <Text style={styles.dataLabel}>{label}</Text>
        <Text style={[styles.dataValue, highlight && { color: '#A6C838' }]}>
            {value}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 45, 94, 0.7)', // Azul marinho translúcido
        justifyContent: 'space-between',
        padding: 40
    },
    topContent: { alignItems: 'center', marginTop: 20 },
    backButton: { alignSelf: 'flex-start', marginBottom: 20 },
    instructionText: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '500',
        lineHeight: 24
    },
    scanFrame: {
        width: 250,
        height: 350,
        borderWidth: 2,
        borderColor: '#FFF',
        borderRadius: 20,
        backgroundColor: 'transparent', // Área central limpa para leitura
        alignSelf: 'center'
    },
    bottomContent: { alignItems: 'center', marginBottom: 20 },
    retryButton: { backgroundColor: '#A6C838', padding: 15, borderRadius: 25 },
    retryText: { color: '#002D5E', fontWeight: 'bold' },

    // Estilos do Modal de Dados
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        alignItems: 'center'
    },
    modalHeader: { alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#002D5E', marginTop: 10 },
    dataContainer: { width: '100%', marginVertical: 20 },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE'
    },
    dataLabel: { color: '#666', fontSize: 16 },
    dataValue: { color: '#002D5E', fontSize: 16, fontWeight: '600' },
    closeModalButton: {
        backgroundColor: '#002D5E',
        width: '100%',
        padding: 18,
        borderRadius: 15,
        alignItems: 'center'
    },
    closeModalText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});