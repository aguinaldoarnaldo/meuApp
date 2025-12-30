import { StyleSheet, View, Image, useWindowDimensions, StatusBar } from "react-native";
import React, { useEffect } from "react";

// Certifique-se de que o caminho da imagem está correto
import Logo from "../../assets/seguro_logo-removebg-preview.png";

export default function SplashScreen({ navigation }) {
  const { width } = useWindowDimensions();

  // Aumentei de 0.6 para 0.85 (85% da largura da tela)
  // Isso fará a logo ocupar quase toda a largura lateral, dando mais destaque
  const logoSize = width * 0.99;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("WelcomeScreen");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#002D5E" />
      
      <Image
        source={Logo}
        style={[
          styles.logo,
          { width: logoSize, height: logoSize }, // Mantém a proporção quadrada
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    // Garante que a imagem não distorça ao aumentar
    resizeMode: "contain",
  },
});