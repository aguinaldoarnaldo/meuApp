import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    Alert,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"

const COR_1 = "#1E293B"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    function handleLogin() {
        if (!email || !password) {
            Alert("Erro", "Preencha todos os campos!")
            return;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Bem-Vindo de Volta</Text>
            <Text style={styles.subtitle}>Entra com a  sua conta</Text>

            <View style={styles.mainContainer}>

                <Text style={styles.inpuLabel}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Seu Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Text style={styles.inpuLabel}>Senha</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Sua Senha"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}

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
                <Pressable style={styles.Botao}>
                    <Text style={styles.Botaotext}>Entrar</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COR_1,
    },

    mainContainer: {
        flex: 0.90,
        width: "100%",
        margin: "auto",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        position: "relative",
        top: "30%",
    },

    title: {
        color: "#fff",
        left: 79,
        top: 140,
        fontSize: 24,
        marginBottom: 2,
        fontWeight: "500",
    },

    subtitle:{
        left: 91,
        top: 140,
        bottom: 100,
        marginLeft: 20,
        color: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    inpuLabel: {
        position: "relative",
        right: "34%",
        fontSize: 15,
        fontWeight: "600",
        bottom: 108,
    },
    textInput: {
        height: 60,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "#ccc",
        paddingHorizontal: 15,
        marginBottom: "10%",
        width: 300,
        bottom: 100,
    },
    inputIconRight:{
        marginLeft: 240,
        bottom: 177,
    },
    Botao:{
        border: 24,
        backgroundColor: "blue",
        borderRadius: 10,
        height: 60,
        width: "80%",
        bottom: 100,
        borderWidth: 1,
    },
    Botaotext:{
        color: "#fff",
        textAlign: "center",
        justifyContent: "center",
        margin: "auto",
        fontSize: 16,
        fontWeight: "900",
        
    }
    

})