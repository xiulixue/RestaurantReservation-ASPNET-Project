import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AntDesign, Octicons } from '@expo/vector-icons'
import { colors } from '../globals/style'

const BottomNav = ({navigation}) => {
  return (
    <View style={styles.bottomnav}>
        <View style={styles.container}>
            <View style={styles.btncon1}>
                <AntDesign name="home" size={24} color="black" 
                    style={styles.icon1} 
                    onPress={()=>{navigation.navigate('Order')}}/>
            </View>

            <View style={styles.btncon1}>
                <AntDesign name="search1" size={28} color="black" 
                    style={styles.icon1} 
                    onPress={()=>{navigation.navigate('MenuItemList')}}/>
            </View>

            <View style={styles.btncon1}>
                <AntDesign name="shoppingcart" size={28} color="black" 
                    style={styles.icon1} 
                    onPress={()=>{navigation.navigate('Order')}}/>
            </View>

            <View style={styles.btncon1}>
                <Octicons name="checklist"  
                    size={24} 
                    color="black" 
                    style={styles.icon1} 
                    onPress={()=>{navigation.navigate('OrderList')}}/>
            </View>
        </View>
    </View>
  )
}

export default BottomNav

const styles = StyleSheet.create({
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width:'100%',
        backgroundColor: colors.col1,
        zIndex:20,
    },
    container:{ 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff',
        width:'100%',
        //elevation: 10,
        boxShadow: '2px 2px 10px #888888', //web use
        borderTopColor:colors.col1,
        borderTopWidth: 1,
        borderTopEndRadius:10,
        borderTopStartRadius: 10,
        height: 70,
    },
    icon1:{
        color: colors.text1,
    },
    icon2:{
        color:'#fff',
    },
    btncon2:{
        alignItems:'center',
        justifyContent: 'center',
        position: 'relative',
        top: -15,
        backgroundColor: colors.text1,
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    btncon1:{
        backgroundColor: '#fff',
        //elevation: 10,
        boxShadow: '2px 2px 10px #888888', //web use
        width: 40,
        height:40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})