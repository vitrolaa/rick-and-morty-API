import AsyncStorage from "@react-native-async-storage/async-storage";
import { characteresProps } from "../src/components/card";

const CACHE_KEY = "@characters_cache";
const SAVED_KEY = "@saved_characters";

export async function getCharactersCache(): Promise<characteresProps[] | null> {
  try {
    const data = await AsyncStorage.getItem(CACHE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Erro ao carregar cache de personagens:", error);
    return null;
  }
}

export async function setCharactersCache(characters: characteresProps[]) {
  try {
    const data = JSON.stringify(characters);
    await AsyncStorage.setItem(CACHE_KEY, data);
  } catch (error) {
    console.error("Erro ao salvar cache de personagens:", error);
  }
}

export async function clearCharactersCache() {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.error("Erro ao limpar cache de personagens:", error);
  }
}

export async function getSavedCharacters(): Promise<string[] | null> {
  try {
    const data = await AsyncStorage.getItem(SAVED_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erro ao carregar personagens salvos:", error);
    return [];
  }
}

export async function deleteCharacter(nome: string) {
  try {
    const data = await getSavedCharacters();
    if (data) {
      const newData = data.filter((item) => item !== nome);
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem(SAVED_KEY, jsonValue);
    }
  } catch (error) {
    console.error("Erro ao deletar personagem:", error);
  }
}

export async function saveCharacter(nome: string) {
  try {
    const data = await getSavedCharacters();
    let newData: string[] = data ? data : [];

    if (!newData.includes(nome)) {
      newData.push(nome);
      const jsonValue = JSON.stringify(newData);
      await AsyncStorage.setItem(SAVED_KEY, jsonValue);
    }
  } catch (error) {
    console.error("Erro ao salvar personagem:", error);
  }
}
