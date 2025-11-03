import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import {
  getSavedCharacters,
  deleteCharacter,
} from "../../../storage/link-storage";
import { styles } from "./styles";

export default function Personagens() {
  const [personagens, setPersonagens] = useState<string[]>([]);
  const router = useRouter();

  const carregarPersonagens = async () => {
    const data = await getSavedCharacters();
    if (data) {
      setPersonagens(data);
    } else {
      setPersonagens([]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarPersonagens();
    }, [])
  );

  const removerPersonagem = async (nome: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja remover ${nome} da sua lista?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            await deleteCharacter(nome);
            Alert.alert("Removido", `${nome} foi excluído.`);
            carregarPersonagens();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Personagens Salvos</Text>

      <FlatList
        data={personagens}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removerPersonagem(item)}
            >
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#999", textAlign: "center", marginTop: 20 }}>
            Nenhum personagem salvo
          </Text>
        }
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
