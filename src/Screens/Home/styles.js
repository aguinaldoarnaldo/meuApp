import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },

  // Seção Superior Fixa
  fixedTopSection: {
    backgroundColor: theme.colors.background,
    zIndex: 10,
  },
  header: {
    backgroundColor: theme.colors.primary,
    height: 180, // Altura fixa para o fundo azul
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  userName: { color: theme.colors.white, fontSize: 22, fontWeight: 'bold', marginTop: 5 },
  headerIcons: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  avatarCircle: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#DDD', justifyContent: 'center', alignItems: 'center' },

  cardContainer: {
    marginTop: -80, // Faz o cartão subir e ficar "em cima" do azul
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  healthCard: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 25,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { color: theme.colors.white, fontSize: 18, fontWeight: 'bold' },
  cardInfo: { marginTop: 15 },
  cardName: { color: theme.colors.white, fontSize: 16, fontWeight: '600' },
  cardSubText: { color: theme.colors.white, fontSize: 13, opacity: 0.9 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cardFooterLabel: { color: theme.colors.white, fontSize: 11, opacity: 0.8 },
  cardFooterValue: { color: theme.colors.white, fontSize: 14, fontWeight: 'bold' },

  // Seção de Scroll
  scrollableContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  actionRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 20 },
  actionItem: { alignItems: 'center', marginHorizontal: 15 },
  actionIconBox: { width: 50, height: 50, backgroundColor: '#F0F4F8', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  actionLabel: { fontSize: 11, color: theme.colors.primary, fontWeight: 'bold', marginTop: 6, textAlign: 'center', width: 65 },

  sectionTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 12 },
  updatesBox: { backgroundColor: '#F0F0F0', borderRadius: 20, overflow: 'hidden' },
  updateItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  updateClinic: { fontWeight: 'bold', fontSize: 15 },
  updateStatus: { color: theme.colors.textLight, fontSize: 12 },
  updateTime: { color: '#999', fontSize: 12 },

  // Menu Lateral (95% largura)
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.secondary,
    zIndex: 100,
    paddingHorizontal: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  menuLogo: { color: theme.colors.primary, fontSize: 28, fontWeight: 'bold' },
  menuItemsList: { marginTop: 50, alignItems: 'center' },
  menuItem: { paddingVertical: 15, width: '100%', alignItems: 'center' },
  menuItemActive: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 25 },
  menuItemText: { color: theme.colors.primary, fontSize: 18, fontWeight: '600' },
  logoutContainer: { position: 'absolute', bottom: 40, alignSelf: 'center' },
  logoutText: { color: theme.colors.primary, fontSize: 18, fontWeight: 'bold' },
  
  loadingContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 20,
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: theme.colors.textLight,
    fontSize: 14,
  },
});
