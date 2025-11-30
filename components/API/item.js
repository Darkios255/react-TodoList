import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../../styles';

export default function Item (props) {
    return (
        <View style={styles.TodoLists}>
            <Text style={{marginLeft: 20, width: '90%'}}>{props.title}</Text>
            <TouchableOpacity style={styles.deleteIcon}
                onPress={() => {
                    props.delete()
            }}>
                <Image source={require('../../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </View>
    );
};