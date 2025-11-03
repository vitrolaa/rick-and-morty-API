import { Image, Text, View } from "react-native";
import { styles } from "./styles";

export type characteresProps = {
  id: number;
  name: string;
  status: string;
  species: string;
  location: {
    name: string;
  };
  image: string;
};

export function Card({
  name,
  status,
  species,
  image,
  location,
}: characteresProps) {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={{ uri: image }} />
      </View>

      <View style={styles.card}>
        <View style={styles.section}>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.status}>
            {status} - {species}
          </Text>
        </View>

        <View style={styles.location}>
          <Text style={styles.title}>Last know location:</Text>
          <Text style={styles.trueLocation}>{location.name}</Text>
        </View>
      </View>
    </View>
  );
}
