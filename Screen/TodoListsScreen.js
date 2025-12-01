import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native'; // Plus besoin de Text ici

import { UsernameContext, TokenContext } from '../Context/Context';
import { getTodoLists, deleteTodoList }  from '../components/API/todoListAPI';

import Input from '../components/API/input';
import TodoListStack from '../components/ItemOut/TodoListStack';
import styles from '../styles';

export default function TodoListScreen({ navigation }) {
    const [token] = useContext(TokenContext);
    const [username] = useContext(UsernameContext);
    const [todoLists, setTodolists] = useState([]);

    useEffect (() => {
        getTodoLists(username, token)
            .then(todolists => setTodolists(todolists))
            .catch(err => console.error(err.message));
    }, []);

    const deleteTodoListS = (id) => {
        setTodolists(todoLists.filter(todoList => todoList.id !== id));
        deleteTodoList(id, token)
            .catch(err => console.error(err.message));
    };

    function refreshTodoLists(val) {
        setTodolists([...todoLists, val]);
    };

    return (
        <View style={styles.container}>
            
            {/* Zone de création épurée (Carte blanche) */}
            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 }}>
                {/* On passe la fonction refresh au composant Input */}
                <Input refresh={refreshTodoLists} />
            </View>

            {/* Liste des TodoLists */}
            <TodoListStack
                data={todoLists}
                delete={deleteTodoListS}
                navigation={navigation}
            />
        </View>
    );
};