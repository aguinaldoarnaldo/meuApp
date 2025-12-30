import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons'; // Importação para ícones

// Cor principal (Escuro) baseada na imagem de UI
const PRIMARY_COLOR = '#1E293B';
const INPUT_BG_COLOR = '#F0F0F0';
const LINK_COLOR = '#888';

export default function Sign_in({ navigation }) {
    const [email, setEmail] = useState(''); // Valores de exemplo para replicar o design
    const [password, setPassword] = useState('******'); // Valores de exemplo
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    function handleSignIn() {
        if (!email || !password) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }

        // Lógica de autenticação
        // navigation.replace('HomeScreen'); 
        Alert.alert('Sucesso', 'Login efetuado com Email: ' + email);
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* HEADER COM BOTÃO VOLTAR */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#fff" paddingTop="40" />
                </TouchableOpacity>
            </View>

            {/* Fundo escuro (Parte superior) */}
            <View style={styles.darkBackground}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to your account</Text>
            </View>

            {/* Container do Formulário Branco */}
            <View style={styles.contentContainer}>

                <Text style={styles.signInText}>Sign In</Text>

                {/* Formulário de login */}
                <View style={styles.inputSection}>

                    {/* INPUT DE EMAIL (simulando CustomInput) */}
                    <Text style={styles.inputLabel}>Your Email</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Seu Email"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        {/* Ícone de verificação (se o email for válido) */}
                        <Ionicons name="checkmark-circle" size={20} color="#007AFF" style={styles.inputIconRight} />
                    </View>

                    {/* INPUT DE PASSWORD (simulando CustomInput) */}
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Sua senha"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible} // Alterna visibilidade
                        />
                        {/* Ícone de Alternar Senha */}
                        <TouchableOpacity
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            style={styles.inputIconRight}
                        >
                            <Ionicons
                                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* CHECKBOX E FORGOT PASSWORD */}
                    <View style={styles.optionsRow}>
                        {/* Checkbox "Remember me" */}
                        <Pressable
                            style={styles.checkboxContainer}
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <Ionicons
                                name={rememberMe ? 'checkbox' : 'square-outline'}
                                size={20}
                                color={rememberMe ? PRIMARY_COLOR : LINK_COLOR}
                                style={styles.checkboxIcon}
                            />
                            <Text style={styles.checkboxText}>Remember me</Text>
                        </Pressable>

                        {/* Link "Forgot password?" */}
                        <Text style={styles.forgotPasswordText}>Forgot you password?</Text>
                    </View>

                </View>

                {/* BOTÃO DE LOGIN (simulando BotaoPersonalizado) */}
                <Pressable style={styles.signInButton} onPress={handleSignIn}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </Pressable>

                {/* Link "I'm a new user. Sign In" (Deve ser 'Sign Uhap') */}
                <Text style={styles.newUserText}>
                    I'm a new user. <Text
                        style={styles.linkText}
                        onPress={() => navigation.navigate('SignUpScreen')}
                    >
                        Sign Up
                    </Text>
                </Text>

            </View>
        </SafeAreaView>

    )
}

// ----------------------------------------------------------------------
// Estilos
// ----------------------------------------------------------------------

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
    },
    header: {
        position: 'absolute', // Coloca o botão Voltar sobre o fundo escuro
        top: 0,
        left: 0,
        padding: 30,
        zIndex: 10, // Garante que o botão fique acima de tudo
    },
    darkBackground: {
        flex: 0.35, // Aumentei um pouco para caber o título
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        color: '#ccc',
        fontSize: 16,
    },
    // Container do Formulário Branco
    contentContainer: {
        flex: 0.65,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
    },
    signInText: {
        color: PRIMARY_COLOR,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left', // Alinhamento à esquerda, como no design
    },
    inputSection: {
        marginBottom: 30,
    },
    inputLabel: {
        color: '#555',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 5,
    },
    // Estilo de Input Refatorado
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: INPUT_BG_COLOR, // Fundo cinza claro para o input
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1,
        borderColor: INPUT_BG_COLOR,
    },
    textInput: {
        flex: 1,
        color: PRIMARY_COLOR,
        fontSize: 16,
        height: '100%',
    },
    inputIconRight: {
        marginLeft: 10,
    },

    // Linha de Opções (Checkbox e Esqueci Senha)
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxIcon: {
        marginRight: 5,
    },
    checkboxText: {
        color: LINK_COLOR,
        fontSize: 14,
    },
    forgotPasswordText: {
        color: LINK_COLOR,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    // Botão de Login
    signInButton: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Link para Registro
    newUserText: {
        marginTop: 10,
        textAlign: 'center',
        color: LINK_COLOR,
        fontSize: 14,
    },
    linkText: {
        color: PRIMARY_COLOR, // Destaque para o link
        fontWeight: 'bold',
    },
});