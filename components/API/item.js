import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../../styles';

export default function Item (props) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
            <Text style={{flex: 1}}>{props.title}</Text>
            <TouchableOpacity 
                onPress={() => {
                    props.delete()
            }}>
                <Image source={require('../../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </View>
    );
};