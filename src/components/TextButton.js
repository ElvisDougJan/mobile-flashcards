import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { amber_darken_3, white } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: amber_darken_3,
    fontSize: 18,
    marginTop: 30,
  }
})