import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.secondary 
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
    backgroundColor: theme.colors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: theme.colors.white,
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
    backgroundColor: theme.colors.primary,
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
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    opacity: 0.8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  notifTitle: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notifDescription: {
    color: theme.colors.white,
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.9,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.white,
    fontSize: 16,
    opacity: 0.8,
  },
});
