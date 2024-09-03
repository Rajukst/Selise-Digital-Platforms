
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feed from './src/screens/Feed';
import AddPost from './src/screens/AddPost';


const Stack= createNativeStackNavigator()
export default function App() {
  return (

    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} options={{headerShown: false}}  />
      <Stack.Screen name="AddPost" component={AddPost} options={{headerShown: false}}  />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
