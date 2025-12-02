import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { View, TextInput, Pressable, Text, FlatList } from "react-native";
import { TokenContext } from "../../Context/Context";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  updateAllTodos,
} from "../API/todo";

import TodoItem from "./TodoItem";
import styles from "../../styles";


/**
 * Composant barre de progression propre (car correction d'une ancienne veersion de progress bar j'en ai tester 2 :D)
 * 
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.total - Le nombre total de tâches
 * @param {number} props.done - Le nombre de tâches complétées
 * @returns {JSX.Element} Une barre de progression avec les statistiques des tâches
 * 
 * @example
 * <CleanProgressBar total={10} done={7} />
 */
const CleanProgressBar = ({ total, done }) => {
  const percent = total > 0 ? (done / total) * 100 : 0;
  return (
    <View style={styles.progressSection}>
      <View style={styles.statsRow}>
        <Text style={styles.statsText}>
          
          {done} / {total} tâches complétées
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percent}%` }]} />
      </View>
    </View>
  );
};

// Composant header de la todo list pour garder en memoire les controles sans re render a chaque fois
const TodoListHeader = React.memo(
  ({
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
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [styles.backRow, pressed && styles.pressed]}
      >
        <Text style={styles.backIcon}>←</Text>
        <Text style={styles.backLabel}>Retour</Text>
      </Pressable>

      <View style={[styles.headerRow, styles.headerRowTop]}>
        <View style={styles.flex1}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.inlineRow}>
          <Pressable
            style={({ pressed }) => [
              styles.outlineButton,
              pressed && styles.pressed,
            ]}
            onPress={() => setDoneState(true)}
          >
            <Text style={styles.outlineButtonText}>✓ Tout cocher</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.outlineButton,
              pressed && styles.pressed,
            ]}
            onPress={() => setDoneState(false)}
          >
            <Text style={styles.outlineButtonText}>✕ Tout décocher</Text>
          </Pressable>
        </View>
      </View>

      <CleanProgressBar total={totalCount} done={doneCount} />

      <View style={styles.surfaceCard}>
        <Text style={styles.sectionLabel}>Ajouter une tâche</Text>
        <View style={styles.inlineRowGap}>
          <TextInput
            style={[styles.input, styles.inputInline]}
            onChangeText={setTodoText}
            placeholder="Nouvelle tâche..."
            value={newTodoText}
          />
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.buttonCompact,
              pressed && styles.pressed,
            ]}
            onPress={addNewTodo}
          >
            <Text style={styles.buttonText}>Ajouter</Text>
          </Pressable>
        </View>
        <Text style={styles.ErrorText}>{errorMsg}</Text>
      </View>

      <View style={styles.choixMultiple}>
        <Pressable
          style={({ pressed }) => [
            todosFilter === "all" ? styles.filterPillActive : styles.filterPill,
            pressed && styles.pressed,
          ]}
          onPress={() => setTodosFilter("all")}
        >
          <Text
            style={
              todosFilter === "all"
                ? styles.filterTextActive
                : styles.filterText
            }
          >
            Toutes ({totalCount})
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            todosFilter === "active"
              ? styles.filterPillActive
              : styles.filterPill,
            pressed && styles.pressed,
          ]}
          onPress={() => setTodosFilter("active")}
        >
          <Text
            style={
              todosFilter === "active"
                ? styles.filterTextActive
                : styles.filterText
            }
          >
            Actives ({activeCount})
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            todosFilter === "done"
              ? styles.filterPillActive
              : styles.filterPill,
            pressed && styles.pressed,
          ]}
          onPress={() => setTodosFilter("done")}
        >
          <Text
            style={
              todosFilter === "done"
                ? styles.filterTextActive
                : styles.filterText
            }
          >
            Complétées ({doneCount})
          </Text>
        </Pressable>
      </View>
    </View>
  )
);

/**
 * Composant principal de la Todo List
 *
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.data - La liste des tâches
 * @param {string} props.title - Le titre de la liste de tâches
 * @param {number} props.listId - L'identifiant de la liste de tâches
 * @param {Object} props.navigation - L'objet de navigation pour la navigation entre les écrans
 * @returns {JSX.Element} Le composant TodoListUi
 */
export default function TodoListUi(props) {
  const [todos, setTodos] = useState(props.data);
  const count = todos.filter((item) => item.done).length;
  const [newTodoText, setTodoText] = useState("");
  const [todosFilter, setTodosFilter] = useState("all");
  const [token] = useContext(TokenContext);
  const [errorMsg, seterrorMsg] = useState("");

  useEffect(() => {
    setTodos(props.data);
  }, [props.data]);

  const addNewTodo = useCallback(async () => {
    if (newTodoText === "") {
      seterrorMsg("Le nom du Todo ne doit pas être vide");
      return;
    }
    try {
      seterrorMsg("");
      const res = await createTodo(newTodoText, props.listId, token);
      if (res.id) {
        setTodos((prev) => [...prev, res]);
        setTodoText("");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }, [newTodoText, props.listId, token]);

  // 
  const change = useCallback(
    (idTodo, state) => {
      // Mise à jour optimiste
      setTodos((prev) =>
        prev.map((item) => {
          if (item.id === idTodo) return { ...item, done: state };
          return item;
        })
      );

      // Appel API avec rollback en cas d'erreur
      updateTodo(idTodo, state, token).catch((error) => {
        console.error("Erreur mise à jour:", error);
        // Rollback
        setTodos((prev) =>
          prev.map((item) => {
            if (item.id === idTodo) return { ...item, done: !state };
            return item;
          })
        );
        seterrorMsg("Erreur lors de la mise à jour");
      });
    },
    [token]
  );

  const delTodo = useCallback(
    (id) => {
      // Sauvegarde pour rollback
      const todoToDelete = todos.find((item) => item.id === id);

      // Suppression optimiste
      setTodos((prev) => prev.filter((item) => item.id !== id));

      deleteTodo(id, token).catch((error) => {
        console.error("Erreur suppression:", error);
        // Rollback
        if (todoToDelete) {
          setTodos((prev) => [...prev, todoToDelete]);
        }
        seterrorMsg("Erreur lors de la suppression");
      });
    },
    [token, todos]
  );

  const setDoneState = useCallback(
    async (value) => {
      // Sauvegarde pour rollback
      const previousTodos = [...todos];

      setTodos((prev) => prev.map((element) => ({ ...element, done: value })));

      try {
        await updateAllTodos(props.listId, value, token);
      } catch (error) {
        console.error("Erreur lors de la mise à jour de masse", error);
        // Rollback
        setTodos(previousTodos);
        seterrorMsg("Erreur lors de la mise à jour");
      }
    },
    [props.listId, token, todos]
  );

  const filteredTodos = useMemo(() => {
    switch (todosFilter) {
      case "done":
        return todos.filter((item) => item.done);
      case "active":
        return todos.filter((item) => !item.done);
      default:
        return todos;
    }
  }, [todos, todosFilter]);

  const totalCount = todos.length;
  const activeCount = totalCount - count;

  const headerComponent = useMemo(
    () => (
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
    ),
    [
      activeCount,
      addNewTodo,
      count,
      errorMsg,
      newTodoText,
      props.navigation,
      props.title,
      setDoneState,
      todosFilter,
      totalCount,
    ]
  );

  // return de la flat list avec les todos filtres 
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContentPadding}
      data={filteredTodos} 
      keyExtractor={(item) => item.id.toString()} 
      ListHeaderComponent={headerComponent}
      renderItem={({ item }) => (
        <View style={styles.listItemContainer}>
          <TodoItem item={item} change={change} deleteTodo={delTodo} />
        </View>
      )}
    />
  );
}
