import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 20,
  },
  illustration: {
    flex: 1,
    maxHeight: 250,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 45,
  },
  subtitle: {
    color: theme.colors.white,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 45,
    lineHeight: 20,
    position: 'relative',
    bottom: 30,
  },
  btnEntrar: {
    backgroundColor: theme.colors.white,
    width: '109%',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  textEntrar: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  btnRegistar: {
    backgroundColor: 'transparent',
    width: '109%',
    height: 55,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRegistar: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
