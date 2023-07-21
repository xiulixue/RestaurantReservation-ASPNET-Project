import { StyleSheet, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { navbtn, navbtnin, navbtnout } from '../globals/style'
import { Ionicons } from '@expo/vector-icons'

const Backbtn = ({navigation, redirectPage}) => {
  return (
    <TouchableOpacity style={navbtnout} onPress={() => 
        navigation.navigate(redirectPage)}
      >
        <View style={navbtn}>
          <Ionicons name="arrow-back-circle-outline" size={24} color="black" style={navbtnin}/>
        </View>
    </TouchableOpacity>
  )
}

export default Backbtn

const styles = StyleSheet.create({})