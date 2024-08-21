// App.tsx ou où vous définissez vos routes
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './index';
import AddTaskScreen from './addTask';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const Stack = createStackNavigator();

export default function App() {
  return (

      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Navigator>

  );
}