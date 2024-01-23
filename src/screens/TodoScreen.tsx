// TodoScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

interface Todo {
  id: string;
  text: string;
}

const TodoScreen: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos(prevTodos => [
      ...prevTodos,
      {id: Math.random().toString(), text: newTodo.trim()},
    ]);
    setNewTodo('');
  };

  const removeTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          value={newTodo}
          onChangeText={text => setNewTodo(text)}
        />
        <Button title="Add" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.todoItem}>
            <Text>{item.text}</Text>
            <Button title="Remove" onPress={() => removeTodo(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
    width: '100%',
  },
});

export default TodoScreen;
