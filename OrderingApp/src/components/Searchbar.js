import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../globals/style';

const Searchbar = ({data}) => {
  const[search, setSearch] = useState('');

  return (
    <View style={styles.searchboxout}>
        <View style={styles.searchbox}>
                    <AntDesign name="search1" size={24} color="black" style={styles.searchicon}/>            
                    <TextInput style={styles.input} placeholder='Search'
                        placeholderTextColor='gray'
                        onChangeText={(text)=>{setSearch(text)}}
                    />
            </View>
                {search != ''
                && <View style={styles.searchresultsout}>
                    <FlatList style={styles.searchresultsin}
                        data={data}
                        renderItem={({item})=>{
                            if(item.name.toLowerCase().includes(search.toLowerCase())){
                                return(
                                    <View style={styles.searchresults}>
                                        <AntDesign name="arrowright" size={24} color="black" />
                                        <Text style={styles.searchresultstext}>{item.name}</Text>
                                    </View>
                                )
                            }
                        }}
                    />
                    </View>
                }
    </View>
  )
}

export default Searchbar

const styles = StyleSheet.create({
    searchboxout:{
        width:'100%',
    },
    searchicon: {
        color: colors.text1,
    },
    input:{
        marginLeft:10,
        width:'100%',
        fontSize:18,
        color: colors.col1,
        outlineStyle: "none",
    },
    searchbox:{
        flexDirection:'row',
        width:'95%',
        backgroundColor: colors.col1,
        borderRadius:10,
        alignItems:'center',
        padding:10,
        margin:10,
        //elevation:10,
        boxShadow: '2px 2px 10px #888888', //web use
    },
    searchresultsout:{
        width:'100%',
        marginHorizontal:10,
        //height:'100%',
        backgroundColor: colors.col1,

    },
    searchresultsin:{
        width:'100%',
    },
    searchresults:{
        width:'100%',
        flexDirection: 'row',
        alignItems:'center',
        padding: 5,
    },
    searchresultstext:{
        marginLeft: 10,
        fontSize: 18,
        color: colors.text1,
    },
})