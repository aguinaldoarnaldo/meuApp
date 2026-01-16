import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 45, 94, 0.7)',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: Platform.OS === 'ios' ? 0 : 20,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    color: theme.colors.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 80,
  },
  viewFinder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: 260,
    height: 350,
    borderWidth: 3,
    borderColor: theme.colors.white,
    borderRadius: 25,
    overflow: 'hidden',
  },
  scanLine: {
    width: '100%',
    height: 3,
    backgroundColor: theme.colors.secondary,
    shadowColor: theme.colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  retryButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
  },
  retryText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
