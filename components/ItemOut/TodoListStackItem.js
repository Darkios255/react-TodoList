import React from 'react';
import { TouchableOpacity } from 'react-native';
import Item from '../API/item';
import styles from '../../styles';

export default function TodoListStackItem(props) {
    return (
        <TouchableOpacity
            style={styles.card} 
            onPress={() => props.navigation.navigate('Details', { 
                id: props.item.id, 
                title: props.item.title 
            })}>
            <Item
                id={props.item.id}
                title={props.item.title}
                delete={() => props.delete(props.item.id)}
            />
        </TouchableOpacity>
    )
}