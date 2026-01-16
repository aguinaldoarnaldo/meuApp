import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  overlay: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mainCard: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: 350,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#EEE',
  },
  clientImage: {
    width: '100%',
    height: '100%',
  },
  dataBox: {
    width: '100%',
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
  },
  infoGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#AAA',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  startButton: {
    backgroundColor: theme.colors.secondary,
    flex: 1.2,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#AAA',
    flex: 0.8,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
