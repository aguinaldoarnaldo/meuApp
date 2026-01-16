import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  tabBackground: {
    flexDirection: 'row',
    backgroundColor: '#EAEAEA',
    width: '85%',
    height: 60,
    borderRadius: 30,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: theme.colors.secondary,
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  activeTabText: {
    color: theme.colors.primary, 
  },
  searchContainer: {
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 15,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: theme.colors.text,
  },
  listContent: {
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: 15,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  partnerLocation: {
    fontSize: 13,
    color: theme.colors.textLight,
    marginTop: 2,
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
    color: theme.colors.textLight,
    fontSize: 16,
    textAlign: 'center',
  },
});
