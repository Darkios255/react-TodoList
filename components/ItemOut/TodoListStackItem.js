import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Item from '../API/item';
import styles from '../../styles';

export default function TodoListStackItem(props) {
    return (
        // On applique le style "card" ici pour créer l'effet "Carte"
        <TouchableOpacity
            style={styles.card} 
            onPress={() => props.navigation.navigate('Details', { id: props.item.id })}>
            <Item
                id={props.item.id}
                title={props.item.title}
                delete={() => props.delete(props.item.id)}
            />
        </TouchableOpacity>
    )
}