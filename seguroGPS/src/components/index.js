import React from "react";
import { Text, StyleSheet,TouchableOpacity } from "react-native";


const BotaoPersonalizado = ({ texto, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disabled}>
            <Text style={styles.buttonText}>{texto}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 10,
        width: "100%",
        height: 40,
    },
    buttonOnPress: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
})