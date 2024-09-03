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
            createdAt: bdTime,  
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
            placeholder="Name"
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
        
        rules={{ maxLength: { value: 1500, message: 'Maximum length is 1500 characters.' } , required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textarea}
            placeholder="What's on your mind? Post it!!"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={true}
          />
        )}
        name="content"
      />
      {errors.content && <Text>This field is required</Text>}
      {errors.content && <Text style={styles.errorText}>{errors.content.message}</Text>}
      
      <View style={styles.postBtn}>
      <Button title="Post" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 15,
    flex: 1,
  },
  textInpt: {
    borderWidth: 1,
    borderColor: "#A9A9A9",
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
  },
  textarea: {
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#A9A9A9",
    marginBottom: 20,
  },
  postContainer: {
    marginTop: 30,
  },
  postBtn: {
    marginTop: 20,
    width: 100,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
});
