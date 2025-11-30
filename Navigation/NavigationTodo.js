import React, { useState } from 'react'

import TodoListsScreen from '../Screen/TodoListsScreen'
import TodoListDetailsScreen from '../Screen/TodoListDetailsScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function NavigationTodo () {
    return (
        <Stack.Navigator initialRouteName='List'>
          <Stack.Screen name='List' component={TodoListsScreen} />
          <Stack.Screen name='Details' component={TodoListDetailsScreen} />
        </Stack.Navigator>
    )
  }
  