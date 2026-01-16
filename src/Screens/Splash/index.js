import React, { useEffect } from "react";
import { View, Image, useWindowDimensions } from "react-native";
import { styles } from "./styles";

// Certifique-se de que o caminho da imagem está correto
import Logo from "../../../assets/seguro_logo-removebg-preview.png";

export default function SplashScreen({ navigation }) {
  const { width } = useWindowDimensions();

  // Aumentei de 0.6 para 0.85 (85% da largura da tela)
  // Isso fará a logo ocupar quase toda a largura lateral, dando mais destaque
  const logoSize = width * 0.99;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome"); // Ou LoginScreen dependendo do fluxo
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      
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
