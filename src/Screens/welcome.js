import React from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen({ navigation }) {
  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 1. Parte Superior (Branca) - Logo e Ilustração */}
      <View style={[styles.topSection, { height: height * 0.40 }]}>
        
        {/* Espaço para sua Logo */}
        <Image 
          source={require('../../assets/icon_logo-sem.png')} // Substitua pelo caminho da sua logo
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Ilustração Central */}
        <Image 
          source={require('../../assets/welcomeScreen.png')} // Substitua pela sua ilustração
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    backgroundColor: '#002D5E',
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
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 45,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 45,
    lineHeight: 20,
    position: "relatiive",
    bottom: 30,
  },
  btnEntrar: {
    backgroundColor: '#FFF',
    width: '109%',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  textEntrar: {
    color: '#002D5E',
    fontSize: 18,
    fontWeight: '600',
  },
  btnRegistar: {
    backgroundColor: 'transparent',
    width: '109%',
    height: 55,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRegistar: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});