import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Card, type characteresProps } from "../../components/card";
import { styles } from "./styles";
import {
  getCharactersCache,
  setCharactersCache,
  clearCharactersCache,
} from "../../../storage/link-storage";

export default function Index() {
  const [error, setError] = useState(false);
  const [characteres, setCharacteres] = useState<characteresProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCharacteres() {
    try {
      const stored = await getCharactersCache();

      if (stored && stored.length > 0) {
        setCharacteres(stored);
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      const data = response.data.results;
      setCharacteres(data);

      await setCharactersCache(data);
    } catch (error) {
      setError(true);
      console.error("Erro ao buscar personagens:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleClearStorage() {
    await clearCharactersCache();
    setCharacteres([]);
    alert(
      "Cache de personagens limpo! Recarregue a tela para buscar novamente."
    );
  }

  useEffect(() => {
    fetchCharacteres();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "black" }}>Erro ao carregar personagens</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={handleClearStorage}
        style={{
          backgroundColor: "#222",
          padding: 10,
          margin: 10,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Limpar Cache</Text>
      </TouchableOpacity>

      <FlatList
        data={characteres}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            name={item.name}
            location={item.location}
            image={item.image}
            species={item.species}
            status={item.status}
          />
        )}
      />
    </View>
  );
}
