import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { Appearance } from 'react-native';
import { NavigationProp } from '@react-navigation/native';


export default function AddTaskScreen({ navigation, route }: { navigation: NavigationProp<any>; route: any }) {
  const [newTask, setNewTask] = useState('');

  const colorScheme = Appearance.getColorScheme();

  const addTask = () => {
    if (newTask.trim()) {
      const addTaskFunction = route.params.addTask;
      addTaskFunction(newTask);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { color: colorScheme === 'dark' ? 'white' : 'black' }]}
        placeholder="Nouvelle tâche"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Ajouter" width={150} onPress={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    height: 40,
    width: '100%',
  },
});