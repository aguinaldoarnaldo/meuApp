import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editHeaderButton: {
    padding: 5,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 70, // Espaço para o avatar que fica "flutuando"
  },
  profileCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 35,
    paddingHorizontal: 50,
    paddingBottom: 40,
    alignItems: 'center',
    // Sombra
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  avatarContainer: {
    marginTop: -70,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 140,
    height: 140,
    backgroundColor: theme.colors.border,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 140,
    height: 140,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: theme.colors.white,
  },
  cameraBadge: {
    position: 'absolute',
    right: -5,
    top: 5,
    backgroundColor: theme.colors.primary,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  userName: {
    color: theme.colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    width: 100,
    height: 3,
    backgroundColor: theme.colors.secondary,
    marginVertical: 15,
    borderRadius: 2,
  },
  infoList: {
    width: '109%',
    marginBottom: 25,
  },
  infoRow: {
    marginBottom: 10,
  },
  infoLabel: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoValue: {
    fontWeight: 'normal',
    opacity: 0.9,
  },
  passwordButton: {
    backgroundColor: theme.colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: '100%',
  },
  passwordButtonText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    padding: 40,
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.white,
    fontSize: 16,
  },
});
