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

  const change = useCallback(
    (idTodo, state) => {
      updateTodo(idTodo, state, token);
      setTodos((prev) =>
        prev.map((item) => {
          if (item.id === idTodo) return { ...item, done: state };
          return item;
        })
      );
    },
    [token]
  );

  const delTodo = useCallback(
    (id) => {
      deleteTodo(id, token);
      setTodos((prev) => prev.filter((item) => item.id !== id));
    },
    [token]
  );

  const setDoneState = useCallback(
    async (value) => {
      setTodos((prev) => prev.map((element) => ({ ...element, done: value })));

      try {
        await updateAllTodos(props.listId, value, token);
        console.log("Toutes les tâches ont été mises à jour avec succès");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de masse", error);
      }
    },
    [props.listId, token]
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
