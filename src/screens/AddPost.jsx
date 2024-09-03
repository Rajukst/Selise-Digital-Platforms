import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../Firebase/firebase.config";




export default function AddPost({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          userName: '',
          content: '',
        },
      });
    
      const onSubmit = async (data) => {
        console.log(data);
        const now = new Date();
      const bdTime = new Date(now.getTime() + 6 * 60 * 60 * 1000);
        try {
          await addDoc(collection(firestore, 'Post'), {
            userName: data.userName,
            content: data.content,
            createdAt: bdTime,  // Incbdlude timestamp here
          });
          Alert.alert("Post added successfully");
          navigation.goBack();
        } catch (err) {
          console.error("Error adding post: ", err);
          Alert.alert("Error adding post, please try again.");
        }
      };

  return (
    <View style={styles.container}>
      <Text>Add A Post</Text>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInpt}
            placeholder="User name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="userName"
      />
      {errors.userName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{ maxLength: 1500, required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textarea}
            placeholder="What's on your mind? Post it!!"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={true}
            numberOfLines={4}
          />
        )}
        name="content"
      />
      {errors.content && <Text>This is required.</Text>}
      
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    flex: 1,
  },
  textInpt: {
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
  },
  textarea: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 20,
  },
  postContainer: {
    marginTop: 30,
  },
  postBtn: {
    marginTop: 20,
    backgroundColor: "blue",
    width: 80,
    padding: 10,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
});
