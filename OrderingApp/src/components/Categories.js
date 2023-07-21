import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../globals/style'
import { FontAwesome5, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { ScrollView } from 'react-native'

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Categories</Text>

      <ScrollView horizontal showHorizontalScrollIndicator={false}>
        <View style={styles.box}>
        <FontAwesome5 name="fish" size={24} color="black" style={styles.menuicon}/>
          <Text style={styles.text}>Entrees</Text>
        </View>
        
        <View style={styles.box}>
          <MaterialCommunityIcons name="food-steak" size={24} color="black" style={styles.menuicon}/>
          <Text style={styles.text}>Mains</Text>
        </View>
        
        <View style={styles.box}>
        <MaterialCommunityIcons name="cupcake" size={24} color="black" style={styles.menuicon}/>
          <Text style={styles.text}>Desserts</Text>
        </View>
        
        <View style={styles.box}>
        <Entypo name="drink" size={24} color="black" style={styles.menuicon}/>
          <Text style={styles.text}>Drinks</Text>
        </View>
        
        <View style={styles.box}>
        <MaterialCommunityIcons name="noodles" size={24} color="black" style={styles.menuicon}/>
          <Text style={styles.text}>Sides</Text>
        </View>

        <View style={styles.box}>
        <MaterialCommunityIcons name="tea-outline" size={24} color="black" style={styles.menuicon}/>
          <Text style={styles.text}>Special</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.col1,
    width: '98%',
    margin:5,
    //elevation:10,
    boxShadow: '2px 2px 10px #888888', //web use
    borderRadius:5,
  },
  head:{
    color: colors.text1,
    fontSize: 25,
    fontWeight: '300',
    margin:10,
    alignSelf:'center',
    paddingBottom:5,
    borderBottomColor: colors.text1,
    borderBottomWidth:1,
  },
  menuicon:{
    marginRight:10,
    color: colors.text3,
  },
  text:{
    color: colors.text3,
  },
  box: {
    backgroundColor: colors.col1,
    margin:10,
    padding:10,
    borderRadius: 10,
    //elevation: 10,
    boxShadow: '1px 1px 5px #888888', //web use
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },
})