import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, ScrollView, Image } from 'react-native';
import { TokenContext } from '../../Context/Context'
import { createTodo, updateTodo, deleteTodo} from '../API/todo'

import TodoItem from './TodoItem';
import styles from "../../styles";

// Helper ProgressBar (inchangé)
const CleanProgressBar = ({ total, done }) => {
    const percent = total > 0 ? (done / total) * 100 : 0;
    return (
        <View style={{marginBottom: 20}}>
             <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5}}>
                <Text style={styles.progressText}>{done} / {total} tâches complétées</Text>
             </View>
             <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${percent}%` }]} />
            </View>
        </View>
    )
}

export default function TodoListUi(props){
    const [todos, setTodos] = useState(props.data)
    const count = todos.filter((item)=>item.done).length;
    const [newTodoText, setTodoText] = useState("")
    const [todosFilter, setTodosFilter] = useState('all');
    const [token] = useContext(TokenContext)
    const [errorMsg, seterrorMsg] = useState('');

    useEffect(() => {
        setTodos(props.data)
    }, [props.data])

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
            }
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    }
    
    const change = (idTodo, state) => {
        updateTodo(idTodo, state, token)
        const newTodos = todos.map(item => {
             if (item.id === idTodo) return {...item, done: state};
             return item;
        })
        setTodos(newTodos)
    }

    const delTodo = (id) => {
        const newTodos = todos.filter((item) => item.id != id)
        deleteTodo(id, token)
        setTodos(newTodos)
    }

    const setDoneState = (value) => {
        const newTodos = todos.map(element => {
             if (element.done !== value) {
                 updateTodo(element.id, value, token)
                 return { ...element, done: value };
             }
             return element
        });
        setTodos(newTodos);
    }

    const filterTodos = () => {
        switch (todosFilter) {
            case 'done': return todos.filter(item => item.done)
            case 'active': return todos.filter(item => !item.done)
            default: return todos
    }}
    // ... (Fin des fonctions logiques) ...


    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 50}}>
            
            {/* Bouton Retour Custom */}
            <TouchableOpacity 
                onPress={() => props.navigation.goBack()} 
                style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}
            >
                <Text style={{fontSize: 20, marginRight: 5}}>←</Text> 
                <Text style={{fontSize: 16, fontWeight: '600', color: '#0F172A'}}>Retour</Text>
            </TouchableOpacity>

            {/* En-tête : Titre à gauche, Boutons à droite */}
            <View style={[styles.headerRow, {alignItems: 'flex-start'}]}>
                <View style={{flex: 1}}>
                    <Text style={styles.title}>{props.title}</Text> 
                </View>
                
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.outlineButton} onPress={() => setDoneState(true)}>
                        <Text style={styles.outlineButtonText}>✓ Tout cocher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.outlineButton} onPress={() => setDoneState(false)}>
                        <Text style={styles.outlineButtonText}>✕ Tout décocher</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <CleanProgressBar total={todos.length} done={count} />

            {/* Ajout de tâche */}
            <View style={{backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20}}>
                <Text style={{fontWeight:'500', marginBottom: 10}}>Ajouter une tâche</Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                    <TextInput 
                        style={[styles.input, {flex: 1, marginBottom: 0}]}
                        onChangeText={setTodoText}
                        placeholder='Nouvelle tâche...'
                        value={newTodoText}
                    />
                    <TouchableOpacity style={[styles.button, {width: 80, marginVertical: 0}]} onPress={addNewTodo}>
                        <Text style={styles.buttonText}>+ Ajouter</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.ErrorText}>{errorMsg}</Text>
            </View>

            {/* Filtres */}
            <View style={styles.choixMultiple}>
                <TouchableOpacity 
                    style={todosFilter === 'all' ? styles.filterPillActive : styles.filterPill} 
                    onPress={() => setTodosFilter('all')}
                >
                    <Text style={todosFilter === 'all' ? styles.filterTextActive : styles.filterText}>
                        Toutes ({todos.length})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={todosFilter === 'active' ? styles.filterPillActive : styles.filterPill} 
                    onPress={() => setTodosFilter('active')}
                >
                    <Text style={todosFilter === 'active' ? styles.filterTextActive : styles.filterText}>
                        Actives ({todos.filter(i => !i.done).length})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={todosFilter === 'done' ? styles.filterPillActive : styles.filterPill} 
                    onPress={() => setTodosFilter('done')}
                >
                    <Text style={todosFilter === 'done' ? styles.filterTextActive : styles.filterText}>
                        Complétées ({count})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Liste des items */}
            <View style={{backgroundColor: 'white', borderRadius: 10, overflow: 'hidden'}}>
                <FlatList
                    data={filterTodos()}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={{borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingVertical: 10, paddingHorizontal: 10}}>
                             <TodoItem item={item} change={change} deleteTodo={delTodo}/>
                        </View>
                    )}
                    scrollEnabled={false}
                />
            </View>
        </ScrollView>
    )
}