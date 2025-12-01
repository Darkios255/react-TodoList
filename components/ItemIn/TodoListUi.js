import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import { TokenContext } from '../../Context/Context'
import { createTodo, updateTodo, deleteTodo, updateAllTodos } from '../API/todo'

import TodoItem from './TodoItem';
import styles from "../../styles";

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

const TodoListHeader = React.memo(({
    title,
    totalCount,
    doneCount,
    activeCount,
    todosFilter,
    setTodosFilter,
    newTodoText,
    setTodoText,
    addNewTodo,
    setDoneState,
    errorMsg,
    navigation,
}) => (
  <View>
            {/* Bouton Retour Custom */}
            <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}
            >
                <Text style={{fontSize: 20, marginRight: 5}}>←</Text> 
                <Text style={{fontSize: 16, fontWeight: '600', color: '#0F172A'}}>Retour</Text>
            </TouchableOpacity>

            {/* En-tête : Titre à gauche, Boutons à droite */}
            <View style={[styles.headerRow, {alignItems: 'flex-start'}]}>
                <View style={{flex: 1}}>
                    <Text style={styles.title}>{title}</Text> 
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

            <CleanProgressBar total={totalCount} done={doneCount} />

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
                    <TouchableOpacity style={[styles.button, {paddingHorizontal: 15, marginVertical: 0}]} onPress={addNewTodo}>
                        <Text style={styles.buttonText}>Ajouter</Text>
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
                        Toutes ({totalCount})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={todosFilter === 'active' ? styles.filterPillActive : styles.filterPill} 
                    onPress={() => setTodosFilter('active')}
                >
                    <Text style={todosFilter === 'active' ? styles.filterTextActive : styles.filterText}>
                        Actives ({activeCount})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={todosFilter === 'done' ? styles.filterPillActive : styles.filterPill} 
                    onPress={() => setTodosFilter('done')}
                >
                    <Text style={todosFilter === 'done' ? styles.filterTextActive : styles.filterText}>
                        Complétées ({doneCount})
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
));

export default function TodoListUi(props) {
    const [todos, setTodos] = useState(props.data)
    const count = todos.filter((item)=>item.done).length;
    const [newTodoText, setTodoText] = useState("")
    const [todosFilter, setTodosFilter] = useState('all');
    const [token] = useContext(TokenContext)
    const [errorMsg, seterrorMsg] = useState('');

    useEffect(() => {
        setTodos(props.data)
    }, [props.data])

    const addNewTodo = useCallback(async () => {
        if (newTodoText === '') {
            seterrorMsg("Le nom du Todo ne doit pas être vide")
            return
        } try {
            seterrorMsg('')
            const res = await createTodo(newTodoText, props.listId, token);
            if (res.id) {
                setTodos((prev) => [...prev, res]);
                setTodoText("");
            }
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    }, [newTodoText, props.listId, token])
    
    const change = useCallback((idTodo, state) => {
        updateTodo(idTodo, state, token)
        setTodos(prev => prev.map(item => {
             if (item.id === idTodo) return {...item, done: state};
             return item;
        }))
    }, [token])

    const delTodo = useCallback((id) => {
        deleteTodo(id, token)
        setTodos(prev => prev.filter((item) => item.id != id))
    }, [token])

    const setDoneState = useCallback(async (value) => {
        // 1. Mise à jour optimiste de l'UI
        setTodos(prev => prev.map(element => ({ ...element, done: value })));

        try {
            // 2. Appel API unique pour tout mettre à jour
            await updateAllTodos(props.listId, value, token);
            console.log("Toutes les tâches ont été mises à jour avec succès");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de masse", error);
        }
    }, [props.listId, token])

    const filteredTodos = useMemo(() => {
        switch (todosFilter) {
            case 'done':
                return todos.filter(item => item.done)
            case 'active':
                return todos.filter(item => !item.done)
            default:
                return todos
        }
    }, [todos, todosFilter])

    const totalCount = todos.length
    const activeCount = totalCount - count

        const headerComponent = useMemo(() => (
        <TodoListHeader
          title={props.title}
          totalCount={totalCount}
          doneCount={count}
          activeCount={activeCount}
          todosFilter={todosFilter}
          setTodosFilter={setTodosFilter}
          newTodoText={newTodoText}
          setTodoText={setTodoText}
          addNewTodo={addNewTodo}
          setDoneState={setDoneState}
          errorMsg={errorMsg}
          navigation={props.navigation}
        />
            ), [activeCount, addNewTodo, count, errorMsg, newTodoText, props.navigation, props.title, setDoneState, todosFilter, totalCount])

    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={{paddingBottom: 50}}
            data={filteredTodos}
            keyExtractor={(item) => item.id.toString()}
                        ListHeaderComponent={headerComponent}
            renderItem={({item}) => (
                <View style={{
                    backgroundColor: 'white',
                    borderBottomWidth: 1, 
                    borderBottomColor: '#F1F5F9', 
                    paddingVertical: 10, 
                    paddingHorizontal: 10
                }}>
                    <TodoItem item={item} change={change} deleteTodo={delTodo}/>
                </View>
            )}
        />
    )
}