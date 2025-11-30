import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native'; // Ajout Text

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
            <View>
                <Text style={styles.title}>Mes Listes</Text>
                <Text style={styles.subTitle}>Gérez vos listes de tâches</Text>
            </View>

            {/* L'Input est maintenant en HAUT (Comme sur le screen) */}
            <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 }}>
                <Text style={{marginBottom: 10, fontWeight: '500'}}>Créer une nouvelle liste</Text>
                <Input refresh={refreshTodoLists} />
            </View>

            {/* La liste en dessous */}
            <TodoListStack
                data={todoLists}
                delete={deleteTodoListS}
                navigation={navigation}
            />
        </View>
    );
};