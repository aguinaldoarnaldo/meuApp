import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.colors.white
  },
  logoContainer: { flex: 1, alignItems: 'center' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  avatarMini: { width: 35, height: 35, borderRadius: 17.5, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DDD' },
  
  scrollContent: { padding: 20 },

  doctorCard: {
    backgroundColor: theme.colors.secondary, // Verde limão
    borderRadius: 20,
    padding: 20,
    marginBottom: 20
  },
  doctorInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  doctorName: { marginLeft: 10, fontSize: 16, fontWeight: 'bold' },
  scanButton: {
    backgroundColor: theme.colors.primary, // Azul escuro
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
  },
  scanButtonText: { color: theme.colors.white, fontSize: 16, fontWeight: 'bold', flex: 1, textAlign: 'center' },

  sectionContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    // Sombra leve
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { marginLeft: 10, fontSize: 15, fontWeight: 'bold' },
  badgeCount: { backgroundColor: theme.colors.primary, borderRadius: 12, width: 30, height: 24, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: theme.colors.white, fontSize: 12, fontWeight: 'bold' },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  itemName: { fontSize: 15, fontWeight: '600', color: '#333' },
  itemSubRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  itemTime: { fontSize: 13, color: '#666', marginLeft: 5 },
  statusContainer: { flexDirection: 'row', alignItems: 'center' },
  statusText: { fontSize: 12, marginLeft: 5, fontWeight: '600' },

  pendingCard: {
    backgroundColor: '#FDEBD0', // Tom leve de laranja para pendentes
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F5CBA7'
  },
  confirmButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10
  },
  confirmButtonText: { color: theme.colors.white, fontWeight: 'bold', fontSize: 14 }
});
