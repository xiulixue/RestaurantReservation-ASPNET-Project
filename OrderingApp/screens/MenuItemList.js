import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet, Text, Alert,  TouchableOpacity, ScrollView} from 'react-native';
import HomeHeadNav from '../src/components/HomeHeadNav';
import Categories from '../src/components/Categories';
import BottomNav from '../src/components/BottomNav';
import { getMenuData } from '../services/MenuService';
import { btn2 } from '../src/globals/style';
import { colors } from '../src/globals/style';
import MenuItemslider from '../src/components/MenuItemslider';
import Searchbar from '../src/components/Searchbar';

export default function MenuItemList({ navigation }) {
  //state
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    const fetchMenuData = async() =>{
      try {
        getMenuData().then(setProducts).catch(e => Alert.alert(e));
        console.log("productsData", products)
      } catch (error) {
        console.error('Error while fetching menu data:', error);
      }
    }
    fetchMenuData();
  }, []);
    
  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} title={"Menu"} />
      <BottomNav navigation={navigation} />
      <Categories />
      <Searchbar data={products}/>
      <ScrollView 
          style={styles.scrollview}
          contentContainerStyle={styles.contentContainer}>
        <MenuItemslider data={products} /> 
      </ScrollView>
      <View style={styles.btnsummary}>
        <View style={styles.btnout}>
          <TouchableOpacity style={btn2} title="CreateNew" onPress={() =>
                    navigation.navigate("CreateMenuItem")}>
            <Text style={styles.btntxt}>Create New</Text>
          </TouchableOpacity>
          <TouchableOpacity style={btn2} title="StartOrder" onPress={() =>
                    navigation.navigate("Order")}>
            <Text style={styles.btntxt}>Start Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
    alignItem: 'center',
  },
  box: {
    backgroundColor: colors.col1,
    width: '98%',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '2px 2px 10px #888888',
    textAlign: 'center',
    fontSize: 18,
  },
  scrollview: {
    flex: 1,
    width: "99%",
    margin:5,
    borderRadius: 10,
    marginBottom: 60,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartcard: {
    flexDirection: 'row',
    backgroundColor: colors.col1,
    margin: 5,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    alignItem: 'center',
    //elevation: 10, //only android
    boxShadow: '2px 2px 10px #888888',
  },
  cartimgout:{
    alignItems:'center',
    justifyContent:'center',
  },
  cartimg: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  cartcardin: {
    flexDirection: 'column',
    margin: 5,
    width: '58%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  c1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.col1,
  },
  c2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: colors.col1,
  },
  c3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt1: {
    fontSize: 16,
    color: colors.text1,
    width: '60%',
    fontWeight: 'bold',
  },
  txt2: {
    fontSize: 16,
    color: colors.text3,
    fontWeight: 'bold',
  },
  txt3: {
    color: colors.text3,
    fontSize: 14,
    fontWeight: '200',
    marginVertical: 10,
  },
  head1: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text1,
    width: 100,
  },
  card: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: colors.col1,
  },
  btnsummary:{
    alignItems:'center',
    justifyContent:'center',
    bottom:70,
  },
  btnout: {
    backgroundColor:'#fff',
    flexDirection:'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
  },
  btntxt: {
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    borderRadius: 10,
    width: '90%',
    textAlign: 'center',
  },
  txt5: {
    color: colors.text3,
    fontSize: 18,
    marginVertical: 5,
  },
  txt6: {
    color: colors.text3,
    fontSize: 25,
    marginVertical: 5,
    fontWeight:"bold",
  },
});
