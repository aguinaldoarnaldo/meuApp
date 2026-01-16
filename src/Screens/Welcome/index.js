import React from 'react';
import { 
  View, Image, TouchableOpacity, useWindowDimensions, Text 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

export default function WelcomeScreen({ navigation }) {
  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 1. Parte Superior (Branca) - Logo e Ilustração */}
      <View style={[styles.topSection, { height: height * 0.40 }]}>
        
        {/* Espaço para sua Logo */}
        <Image 
          source={require('../../../assets/icon_logo-sem.png')} // Caminho ajustado
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Ilustração Central */}
        <Image 
          source={require('../../../assets/welcomeScreen.png')} // Caminho ajustado
          style={[styles.illustration, { width: width * 0.8 }]}
          resizeMode="contain"
        />
      </View>

      {/* 2. Parte Inferior (Azul) - Textos e Botões */}
      <View style={styles.bottomSection}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Cuidando de você,{"\n"}todos dias.</Text>
          
          <Text style={styles.subtitle}>
            Gerencie sua Saúde com facilidade e segurança, onde estiver
          </Text>

          {/* Botão Entrar (Sólido) */}
          <TouchableOpacity 
            style={styles.btnEntrar}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.textEntrar}>Entrar</Text>
          </TouchableOpacity>

          {/* Botão Registar (Outlined/Borda) */}
          <TouchableOpacity 
            style={styles.btnRegistar}
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Text style={styles.textRegistar}>Registar</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}
