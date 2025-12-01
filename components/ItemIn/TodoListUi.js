import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import { TokenContext } from '../../Context/Context'; // Attention au chemin, vérifiez s'il faut remonter de 1 ou 2 niveaux
import { createTodo, updateTodo, deleteTodo } from '../API/todo';
import TodoItem from './TodoItem';
import styles from "../../styles";

// Petit helper pour la barre de progression (Bonus: design plus propre)
const CleanProgressBar = ({ total, done }) => {
    const percent = total > 0 ? (done / total) * 100 : 0;
    return (
        <View>
             <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.progressText}>{done} / {total} tâches complétées</Text>
             </View>
             <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${percent}%` }]} />
            </View>
        </View>
    )
}

export default function TodoListUi(props){
    const [todos, setTodos] = useState(props.data);
    // Calcul dynamique du count basé sur l'état actuel des todos
    const count = todos.filter((item) => item.done).length;
    
    const [newTodoText, setTodoText] = useState("");
    const [todosFilter, setTodosFilter] = useState('all'); // 'all', 'done', 'active'
    const [token] = useContext(TokenContext);
    const [errorMsg, seterrorMsg] = useState('');

    useEffect(() => {
        setTodos(props.data);
    }, [props.data]);

    // --- Logique Serveur (Inchangée) ---
    const addNewTodo = async () => {
        if (newTodoText === '') {
            seterrorMsg("Le nom du Todo ne doit pas être vide");
            return;
        } 
        try {
            seterrorMsg('');
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
        updateTodo(idTodo, state, token);
        const newTodos = todos.map(item => {
            if (item.id === idTodo) return {...item, done: state};
            return item;
        });
        setTodos(newTodos);
    }

    const delTodo = (id) => {
        const newTodos = todos.filter((item) => item.id !== id);
        deleteTodo(id, token);
        setTodos(newTodos);
    }

    const setDoneState = (value) => {
        // Optimistic UI update
        const newTodos = todos.map(element => {
            // On ne déclenche l'API que si l'état change vraiment pour éviter le spam
            if (element.done !== value) {
                updateTodo(element.id, value, token);
                return { ...element, done: value };
            }
            return element;
        });
        setTodos(newTodos);
    }

    // --- Filtres ---
    const filterTodos = () => {
        switch (todosFilter) {
            case 'done': return todos.filter(item => item.done);
            case 'active': return todos.filter(item => !item.done);
            default: return todos;
        }
    }

    // --- Rendu ---
    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 50}}>
            
            {/* 1. En-tête : Titre + Actions globales (Tout cocher/décocher) */}
            <View style={styles.headerRow}>
                <View>
                    {/* On simule le titre de la liste récupéré via props ou contexte si dispo, sinon générique */}
                    <Text style={styles.title}>Liste de tâches</Text> 
                    <CleanProgressBar total={todos.length} done={count} />
                </View>
                
                <View style={styles.actionsRow}>
                     {/* Boutons "Tout cocher" style outline */}
                    <TouchableOpacity style={styles.outlineButton} onPress={() => setDoneState(true)}>
                        <Text style={styles.outlineButtonText}>✓ Tout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.outlineButton} onPress={() => setDoneState(false)}>
                        <Text style={styles.outlineButtonText}>✕ Rien</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 2. Zone d'ajout (Card blanche) */}
            <View style={{backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20}}>
                <Text style={styles.inputLabel}>Ajouter une tâche</Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                    <TextInput 
                        style={[styles.input, {flex: 1, marginBottom: 0}]} // Override margin
                        onChangeText={setTodoText}
                        placeholder='Nouvelle tâche...'
                        value={newTodoText}
                    />
                    <TouchableOpacity style={[styles.button, {paddingHorizontal: 15, margin: 0, marginVertical: 0}]} onPress={addNewTodo}>
                        <Text style={styles.buttonText}>ajouter</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.ErrorText}>{errorMsg}</Text>
            </View>

            {/* 3. Filtres (Pills) */}
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

            {/* 4. La Liste */}
            <View style={{backgroundColor: 'white', borderRadius: 10, overflow: 'hidden'}}>
                <FlatList
                    data={filterTodos()}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        // On passe une prop style container pour que TodoItem ressemble à une ligne de tableau
                        <View style={{borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingVertical: 5}}>
                             <TodoItem item={item} change={change} deleteTodo={delTodo}/>
                        </View>
                    )}
                    scrollEnabled={false} // Car on est déjà dans une ScrollView
                />
            </View>

        </ScrollView>
    )
}