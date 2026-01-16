import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  headerContainer: {
    height: 250,
    width: '100%',
  },
  imageBg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerImage: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 45, 94, 0.6)',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.white,
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 30,
    paddingTop: 40,
    marginTop: -40,
    minHeight: 500,
  },
  inputWrapper: {
    marginBottom: 25,
  },
  inputLabel: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 5,
    zIndex: 1,
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  loginButtonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  noAccountText: {
    color: theme.colors.textLight,
    fontSize: 14,
  },
  registerText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
});
