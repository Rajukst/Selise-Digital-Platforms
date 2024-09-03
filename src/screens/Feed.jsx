import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function Feed({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Pressable onPress={() => navigation.navigate("AddPost")}>
          <Text style={styles.addPostBtn}>Add A New Post</Text>
        </Pressable>
        <Text style={styles.profileName}>AB</Text>
      </View>

      {/* For Feed View */}
      <View style={styles.postHeader}>
        <Text>Raju Ahammed</Text>
        <Text>Posted On 2 Jan 2024</Text>
      </View>
      <View>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam
          perspiciatis sed sapiente dolorum rerum necessitatibus omnis maiores
          harum veritatis perferendis.
        </Text>
        <View style={styles.thumpsUp}>
            <Text>20 Likes</Text>
        <Pressable><FontAwesome name="thumbs-o-up" size={24} color="black" /></Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    flex: 1,
  },
  addPostBtn: {
    backgroundColor: "blue",
    width: 140,
    padding: 10,
    color: "white",
    textAlign: "center",
    borderRadius: 5,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileName: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  thumpsUp:{
    marginTop: 10,
  }
});
