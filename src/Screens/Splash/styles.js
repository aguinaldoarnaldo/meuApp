import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white, 
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    // Garante que a imagem não distorça ao aumentar
    resizeMode: "contain",
  },
});
