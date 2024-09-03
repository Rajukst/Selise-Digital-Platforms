import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  increment,
} from "firebase/firestore";
import { firestore } from "../Firebase/firebase.config";

export default function Feed({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const postsCollection = collection(firestore, "Post");
    const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);

      // Initialize like counts for new posts
      const newLikes = {};
      postsList.forEach(post => {
        newLikes[post.id] = post.likes || 0; // Assuming posts might have an initial likes field
      });
      setLikes(newLikes);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = timestamp.toDate();
      return date.toLocaleDateString();
    }
    return "";
  };

  const handleLikePress = async (postId) => {
    try {
      // Update likes count in Firestore
      const postRef = doc(firestore, "Post", postId);
      await updateDoc(postRef, {
        likes: increment(1)
      });

      // Optimistically update the likes state
      setLikes(prevLikes => {
        const newLikes = { ...prevLikes, [postId]: (prevLikes[postId] || 0) + 1 };
        return newLikes;
      });
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
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
      {posts.length > 0 ? <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.userItem}>
          <View style={styles.nameHeading}>
            <View style={styles.names}></View>
            <View>
              <Text style={styles.nameText}>{item.userName}</Text>
              <Text style={styles.postedOn}>
                Posted On {formatDate(item.createdAt)}
              </Text>
            </View>
            <View>
              <Text>{item.content}</Text>
            </View>
            <View style={styles.thumpsUp}>
              <Text>{likes[item.id] || 0} Likes</Text>
              <FontAwesome onPress={() => handleLikePress(item.id)}
                style={styles.thumpsupIcon} name="thumbs-up" size={28} color="black" />
            </View>
          </View>
        </View>
      )}
      contentContainerStyle={styles.feedList}
    /> :
    <View style={styles.noPostContainer}>
    <Text style={styles.noPost}>No Post to Show</Text>
  </View>   
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
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
  thumpsUp: {
    marginTop: 10,
  },
  feedList: {
    marginTop: 10,
    marginBottom: 10,
  },
  thumpsupIcon: {
    marginTop: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  postedOn: {
    marginBottom: 10,
  },
  userItem: {
    marginTop: 20,
    marginBottom: 20,
  },
  
  noPostContainer: {
    flex: 1, // Takes up the full height of the screen
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
  },
  noPost: {
    fontSize: 18,
    color: 'gray',
  },
});
