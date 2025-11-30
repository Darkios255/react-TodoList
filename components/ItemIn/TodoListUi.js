import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, ScrollView  } from 'react-native';
import { TokenContext } from '../../Context/Context'
import ProgressBar from './progressBar';
import { createTodo, updateTodo, deleteTodo} from '../API/todo'

import TodoItem from './TodoItem';
import styles from "../../styles";

export default function TodoListUi(props){
    const [todos, setTodos] = useState(props.data)
    const [count, setCount] = useState(todos.filter((item)=>item.done).length);
    const [newTodoText, setTodoText] = useState("")
    const [todosFilter, setTodosFilter] = useState('');
    const [token] = useContext(TokenContext)
    const [errorMsg, seterrorMsg] = useState('');

    useEffect(() => {
        setTodos(props.data)
        setCount(props.data.filter((item)=>item.done).length)
    }, [props.data])

    // Server interacting functions
    const addNewTodo = async () => {
        if (newTodoText === '') {
            seterrorMsg("Le nom du Todo ne doit pas être vide")
            return
        } try {
            seterrorMsg('')
            const res = await createTodo(newTodoText, props.listId, token);
            if (res.id) {
                setTodos([...todos, res]);
                setTodoText("");
            } else {
                console.error("API response came back incorrect :", res);
            }
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    }
    
    const change = (idTodo, state) => {
        updateTodo(idTodo, state, token)
        todos.find((item) => item.id === idTodo).done = state
        if (state) {
            setCount(count + 1)
        } else {
            setCount(count - 1)
        }
    }

    const delTodo = (id) => {
        const newTodos = todos.filter((item) => item.id != id)
        deleteTodo(id, token)
        setTodos(newTodos)
        setCount(newTodos.filter((item) => item.done).length)
    }

    const setDoneState = (value) => {
        setTodos(todos.map(element => {
            change(element.id, value)
            return element
        }));
        setCount(value ? todos.length : 0)
    }

    // Client side functions
    const filterTodos = () => {
        switch (todosFilter) {
            case 'done':
                return todos.filter(item => item.done)
            case 'undone':
                return todos.filter(item => !item.done)
            default:
                return todos
    }}

    return (
        <ScrollView >
            <ProgressBar progressVal={((count/todos.length)*100).toFixed(0)}/>
            <View style={styles.container}>
            <FlatList
                style={{ paddingLeft: 10 }}
                data={filterTodos()}
                renderItem={({item}) => <TodoItem item={item} change={change} deleteTodo={delTodo}/>}/>
            <Text>Nombre d'action fini : {count}</Text>
            <Text style={styles.ErrorText}>{errorMsg}</Text>
            <TextInput style={styles.input}
                onChangeText={setTodoText}
                placeholder='TYPE HERE'
                onSubmitEditing={addNewTodo}
                value={newTodoText}
            />
            
            <TouchableOpacity style={styles.button} onPress={() => addNewTodo()}
            >
                <Text style={styles.buttonText}>Nouveau Todo</Text>
            </TouchableOpacity>
            <View style={styles.choixMultiple}>
                <TouchableOpacity style={styles.choix} onPress={() => setTodosFilter('')}>
                    <Text style={styles.choixText}>Tous</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.choix} onPress={() => setTodosFilter('done')}>
                    <Text style={styles.choixText}>Terminés</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.choix} onPress={() => setTodosFilter('undone')}>
                    <Text style={styles.choixText}>En cours</Text>
                </TouchableOpacity>

                {/* Séparateur visuel ou juste de l'espace géré par flexWrap */}
                
                <TouchableOpacity style={styles.choix} onPress={() => setDoneState(true)}>
                    <Text style={styles.choixText}>Tout cocher</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.choix} onPress={() => setDoneState(false)}>
                    <Text style={styles.choixText}>Tout décocher</Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView >
    )
}