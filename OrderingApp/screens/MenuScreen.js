import React, { useState, useEffect } from 'react';
import { StatusBar, View, StyleSheet, FlatList, Text, Alert, Button, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import Backbtn from '../src/components/Backbtn';
import HomeHeadNav from '../src/components/HomeHeadNav';
import Categories from '../src/components/Categories';
import BottomNav from '../src/components/BottomNav';
import { useNavigation } from '@react-navigation/native';
import { startNewOrder } from '../services/OrderService';
import { getMenuData } from '../services/MenuService';
import { incdecbtn, incdecinput, incdecout, btn2 } from '../src/globals/style';
import { colors } from '../src/globals/style';
import Searchbar from '../src/components/Searchbar';

export default function MenuScreen({ route }) {
  const navigation = useNavigation();
  const { tableId } = route.params;
  const [products, setProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);

  const addItemToOrder = (item, quantity) => {
    setSelectedItems((prevItems) => [...prevItems, { ...item, qty: quantity }]);
  };

  const increaseQuantity = (itemId) => {
    setSelectedItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
    });
  };

  const decreaseQuantity = (itemId) => {
    setSelectedItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId && item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      });
    });
  };

  async function save() {
    const order = {
      TableId: tableId,
      Items: selectedItems,
    }
    try {
      const orderData = await startNewOrder(order);
      navigation.navigate('OrderDetail', { orderData });

      // update state for order data
      const newOrderData = data.concat(orderData);
      setData(newOrderData);
      Alert.alert('The order was saved successfully!');
    } catch (error) {
      // const validationErrors = error.validationErrors;
      // const errorMessage = validationErrors.join('\n');
      Alert.alert(error);
    }
  }

  useEffect(() => {
    getMenuData().then(setProducts).catch(e => Alert.alert(e));
  }, []);

  const renderProduct = p => {
    let item = p.item;
    const quantity = selectedItems.find(
      (selectedItem) => selectedItem.id === item.id)?.qty || 0;

    return <TouchableOpacity onPress={() => {
      addItemToOrder(item,quantity)
    }}>
    <View style={styles.cartcard}>
        
        <View style={styles.cartimgout}>
          <Image source={require(`../assets/${item.itemName}.png`)} 
                alt={item.itemName} 
                style={styles.cartimg} 
            />
        </View>
        <View style={styles.cartcardin}>
          <View style={styles.c1}>
            <Text style={styles.txt1}>{item.itemName}</Text>
            <Text style={styles.txt2}>${item.price} each</Text>
          </View>
          <View style={styles.c1}>
            <Text style={styles.head1}>{item.category}</Text>
            <Text style={styles.txt3}>{item.description}</Text>
          </View>
          <View style={styles.c2}>
            <View style={incdecout}>
              <Text style={incdecbtn} onPress={() => {
                increaseQuantity(item.id)
               
              }}>
                +
              </Text>
              <TextInput style={incdecinput} value={quantity.toString()} />
              <Text style={incdecbtn} onPress={() => {
                decreaseQuantity(item.id)
              }}>
                -
              </Text>
            </View>
          </View>
        </View>
      </View>
        </TouchableOpacity>
    }
    
  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} title={"Menu"} />
      <Backbtn navigation={navigation} redirectPage='Order' />
      <BottomNav navigation={navigation} />
      <Text style={styles.box}>Table ID: {tableId}</Text>
      <Categories />
      <Searchbar data={products}/>
      <ScrollView 
          style={styles.scrollview}
          contentContainerStyle={styles.contentContainer}>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
        /> 
      </ScrollView>
      <View style={styles.btnsummary}>
        <View style={styles.btnout}>
          <TouchableOpacity style={btn2} title="AddtoCart" onPress={save}>
            <Text style={styles.btntxt}>Place Order</Text>
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
