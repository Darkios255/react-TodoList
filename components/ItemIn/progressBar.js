import React, {useEffect, useRef, useState} from "react";
import {View, Text, StyleSheet, Animated} from 'react-native';
import styles from "../../styles";

export default function ProgressBar({progressVal}) {
    // Init the anim using ref
    const animateVal = useRef(new Animated.Value(0)).current;
    const [displayAnimatedText, setDisplayAnimatedText] = useState('none')
    const [displayOuterAnimatedText, setDisplayOuterAnimatedText] = useState('block')

    const switchDisplay = () => {
        if (isNaN(progressVal) ? 0 : progressVal == 0) {
            setDisplayAnimatedText('none')
            setDisplayOuterAnimatedText('block')
        } else {
            setDisplayAnimatedText('block')
            setDisplayOuterAnimatedText('none')
        }
    }

    useEffect(() => {
        const normalizedProgress = isNaN(progressVal) ? 0 : progressVal;
        console.log(normalizedProgress)
        Animated.timing(animateVal, {
            toValue: normalizedProgress,
            duration: 300,
            useNativeDriver: false,
        }).start();
        switchDisplay();
    }, [progressVal])

    return (
        <View style={styles.progressBarContainer}>
        <Animated.View 
            style={
                [styles.progressBar, { 
                    width: animateVal.interpolate({ 
                        inputRange: [0, 100], outputRange: ['0%', '100%'] 
                    }),
                }]
            }>
            <Text style={[styles.progressText, {display:displayAnimatedText}]}>{isNaN(progressVal) ? 0 : progressVal}%</Text>
        </Animated.View>
        <Text style={[styles.progressText, {display:displayOuterAnimatedText, left: '10px'}]}>{isNaN(progressVal) ? 0 : progressVal}%</Text>
        </View>
    );
}