import React from "react";
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import crispychicken from '../../assets/crispychicken.webp';
import { colors } from "../globals/style";

const Cardslider = ({title, data, navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.cardouthead}>{title}</Text>
      <FlatList
        style={styles.cardout}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
            <TouchableOpacity key={item.index} onPress={()=>{
              navigation.navigate('MenuItemDetail',data.id)
            }}>
                <View style={styles.card}>               
                  <View style={styles.s1}> 
                      <Image source={crispychicken} style={styles.cardimgin}/>
                  </View>
                  <View style={styles.s2}>
                      <Text style={styles.txt1}>{item.name}</Text>
                      <View style={styles.s2in}>
                          <Text style={styles.txt2}> ${item.price}/service</Text>
                      </View>
                  </View>
                  <View style={styles.s3}>
                      <Text style={styles.buybtn}>
                          Add to Cart
                      </Text>
                  </View>
                </View>
            </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Cardslider;

const styles = StyleSheet.create({
  container: {
    marginVertical:20,
  },
  cardouthead: {
    color: colors.text3,
    width:'100%',
    fontSize: 30,
    fontWeight: '200',
    borderRadius: 10,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  cardout: {
    width:"100%",
    //backgroundColor:'red',
  },
  card: {
    //backgroundColor: 'aqua',
    width: 300,
    height:300,
    margin:10,
    borderRadius:10,
    borderWidth:1,
    borderColor:'#e8e8e8',
    backgroundColor: colors.col1,

  },
  cardimgin: {
    width:'100%',
    height: 200,
    borderRadius: 10,
  },
  s1: {},
  s2: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignContent:'center',
    //backgroundColor:'aqua',
  },
  s2in:{
    flexDirection: 'row',
    alignItems:'center',
    marginHorizontal: 10,
  },
  txt1:{
    fontSize:18,
    color: colors.text3,
    marginHorizontal: 5,
    width:150,
  },
  txt2: {
    fontSize: 20,
    color: colors.text2,
    marginRight: 10,
  },
  s3:{
    alignItems:'center',
    position:'absolute',
    bottom:1,
    width:'100%',
  },
  buybtn:{
    backgroundColor: colors.text1,
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical:5,
    fontSize: 18,
    borderRadius:10,
    width:'100%',
    textAlign:'center',
  }
});
