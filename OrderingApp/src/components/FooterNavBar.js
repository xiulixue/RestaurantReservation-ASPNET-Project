import React from 'react'
import { StyleSheet, Text, View } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../globals/style';

const FooterNavBar = () => {
  return (
    <View style={styles.container}>
        <Fontisto name="nav-icon-list-a" size={20} color="black" style={styles.myicon} />
        <View style={styles.containerin}>
            <Text style={styles.mytext}>Menu</Text>
            <MaterialCommunityIcons name="food-turkey" size={28} color="black" style={styles.myicon}/>
        </View>
        <FontAwesome name="user-circle" size={24} color="black" style={styles.myicon}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        padding:10,
        alignItems:'center',
        backgroundColor:colors.col1,
        //elevation: 10,
        boxShadow: '2px 2px 10px #888888', //web use
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    containerin:{
        flexDirection:'row',
        alignItems:'center',
    },
    myicon:{
        color: colors.text1,
    },
    mytext:{
        color: colors.text1,
        fontSize:20,
    },
})

export default FooterNavBar