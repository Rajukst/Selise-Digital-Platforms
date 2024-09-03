import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../Firebase/firebase.config";

export default function Feed({ navigation }) {
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsCollection = collection(firestore, "Post");
    const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = timestamp.toDate(); 
      return date.toLocaleDateString();
    }
    return '';
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Pressable onPress={() => navigation.navigate("AddPost")}>
          <Text style={styles.addPostBtn}>Add A New Post</Text>
        </Pressable>
        <Text style={styles.profileName}>AB</Text>
      </View>

      {/* For Feed View */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View style={styles.nameHeading}>
              <View style={styles.names}></View>
              <View>
                <Text style={styles.nameText}>{item.userName}</Text>
                <Text style={styles.postedOn}>Posted On {formatDate(item.createdAt)}</Text>
              </View>
              <View>
                <Text>{item.content}</Text>
              </View>
              <View style={styles.thumpsUp}>
                <Text>20 Likes</Text>
                <FontAwesome style={styles.thumpsupIcon} name="thumbs-o-up" size={24} color="black" />
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.feedList}
      />
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
  },
  feedList:{
    marginTop: 10,
  },
  thumpsupIcon:{
    marginTop: 10,
  },
  nameText:{
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  postedOn:{
    marginBottom: 10,
  },
  userItem:{
    marginTop: 20
  }
});
