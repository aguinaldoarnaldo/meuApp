import { TextInput, Text, StyleSheet } from "react-native";



const CustomInput = ({placeholder, value, onChangeText, keyboardType, token}) => {
    return (

    <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        token={token}
    />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: "100%",
        height: 40,
    },
    inputText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    inputPlaceholder: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    inputToken: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },  
    inputKeyboardType: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    inputValue: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    inputOnChangeText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    inputToken: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
})