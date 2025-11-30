import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function TodoItem(props) {
    
    const [done, setDone] = useState(props.item.done);
    useEffect(() => {
        setDone(props.item.done)
    }, [props.item.done])

    const stateChange = (id, state) => {
        setDone(state)
        props.change(id, state)
    }

    return (
        <View style={styles.content}>
            <Switch value={done} onValueChange={(state) => stateChange(props.item.id, state)} />
            <Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>{props.item.content}</Text>
            <TouchableOpacity onPress={() => props.deleteTodo(props.item.id)}>
                <Image source={require('../../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row'
    },
    text_item: {
        marginLeft: 10,
        width: 150
    }
})