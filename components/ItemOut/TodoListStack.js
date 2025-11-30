import React from 'react';
import { FlatList, View } from 'react-native';

import TodoListStackItem from './TodoListStackItem';
import styles from '../../styles';

export default function TodoListStack(props) {
    return (
        <View style={styles.border}>
        <FlatList //contentContainerStyle={styles.list}
            data={props.data}
            renderItem={
                ({ item }) => <TodoListStackItem 
                                item={item}
                                delete={props.delete}
                                navigation={props.navigation}
                                />
            }
        />
        </View>
    )
}