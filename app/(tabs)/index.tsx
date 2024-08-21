import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/Button';
import { Task } from '@/models/Task';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  const saveTasksToStorage = async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to storage', error);
    }
  };

  const loadTasksFromStorage = async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString) {
        setTasks(JSON.parse(tasksString));
      }
    } catch (error) {
      console.error('Failed to load tasks from storage', error);
    }
  };

  const addTask = (newTask: string) => {
    const updatedTasks = [...tasks, { id: Date.now().toString(), text: newTask }];
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const startEditingTask = (id: string, text: string) => {
    setEditingTask(id);
    setEditingText(text);
  }

  const editTask = (id: string, newText: string) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, text: newText } : task);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    setEditingTask(null);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button
          title="Ajouter"
          width={200}
          onPress={() => navigation.navigate('AddTask', { addTask })}
        />
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              {editingTask === item.id ? (
                <TextInput
                  style={[styles.input, { maxWidth: 90 }]}
                  value={editingText}
                  onChangeText={setEditingText}
                  onBlur={() => editTask(item.id, editingText)}
                />
              ) : (
                <Text style={styles.taskText}>{item.text}</Text>
              )}
              <View style={styles.buttons}>
                <Button
                  title={editingTask === item.id ? "Enregistrer" : "Modifier"}
                  width={100}
                  onPress={() => {
                    if (editingTask === item.id) {
                      editTask(item.id, editingText);
                    } else {
                      startEditingTask(item.id, item.text);
                    }
                  }}
                />
                <Button title="Supprimer" width={100} onPress={() => deleteTask(item.id)} />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    height: 40,
  },
  taskContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 80,
    gap: 10,
  },
  taskText: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
});