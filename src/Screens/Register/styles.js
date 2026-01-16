import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.primary,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'ios' ? 10 : 30,
    backgroundColor: theme.colors.white,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
  },
  backIcon: { fontSize: 32, color: theme.colors.primary, fontWeight: '300', marginBottom: 5 },
  title: { color: theme.colors.white, fontSize: 28, fontWeight: 'bold' },
  subtitle: { color: theme.colors.white, fontSize: 16, opacity: 0.8, marginTop: 4 },
  
  formWrapper: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  scrollContent: {
    paddingHorizontal: '9%',
    paddingTop: 60,
    paddingBottom: 20,
  },
  inputGap: {
    marginBottom: 10,
  },
  inputWrapper: {
    marginBottom: 28,
    borderWidth: 1.2,
    borderColor: '#333',
    borderRadius: 15,
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 8,
  },
  label: { 
    fontSize: 13, 
    color: '#333', 
    fontWeight: 'bold' 
  },
  input: { 
    fontSize: 16, 
    color: '#000',
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: { 
    color: theme.colors.white, 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
