import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, View, StyleSheet, FlatList, Text, StatusBar, ScrollView } from 'react-native';
import { getOrderData } from '../services/OrderService';
import HomeHeadNav from '../src/components/HomeHeadNav';
import Backbtn from '../src/components/Backbtn';
import BottomNav from '../src/components/BottomNav';
import { colors } from '../src/globals/style';
import Searchbar from '../src/components/Searchbar';

export default function OrderScreen({ navigation }) {
  const [data, setData] = useState([])

  async function fetchData() {
    try {
      const orderData = await getOrderData();
      setData(orderData);
    } catch (error) {
      Alert.alert(error.toString());
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => { };
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} title={"Order List"} />
      <Backbtn navigation={navigation} redirectPage='Order' />
      <Searchbar />
      <BottomNav navigation={navigation} />
      <Text style={styles.head1}>Current Order:</Text>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.contentContainer}
      >
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => {

            const totalprice = item.items.reduce((total, orderItem) => {
              return total + orderItem.price * orderItem.qty;
            }, 0);

            return(
            <View style={styles.ordercard}>
              <Text style={styles.head1}>Order ID: {item.tableId}</Text>
              <Text style={styles.ordertxt2}>order date: {item.date}</Text>
              <Text style={styles.ordercompleted}>order table: {item.tableId}</Text>
              <View style={styles.row1}>
              {item.items.map((orderItem, index) => (
                <View key={index} style={styles.rowout}>
                  <View style={styles.row}>
                    <View style={styles.left}>
                      <Text style={styles.qty}>{orderItem.qty}</Text>
                      <Text style={styles.title}>{orderItem.itemName}</Text>
                      <Text style={styles.price}>${orderItem.price}</Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.totalprice}>
                        {parseFloat(orderItem.qty) * parseFloat(orderItem.price)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
              </View>
              <Text style={styles.total}>Total: {totalprice}</Text>
            </View>
          )}}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  scrollview: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  ordercard: {
    width: '98%',
    margin: 5,
    borderRadius: 10,
    //elevation: 10,
    boxShadow: "2px 2px 10px #888888", //web use
  },
  orderindex: {
    fontSize: 20,
    color: colors.col1,
    backgroundColor: colors.text1,
    textAlign: 'center',
    borderRadius: 20,
    padding: 5,
    width: 30,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  orderotw: {
    width: '100%',
    fontSize: 18,
    color: '#fff',
    padding: 5,
    textAlign: 'center',
    backgroundColor: 'orange',
    textAlign: 'center',
    alignSelf: 'center',
  },
  ordercompleted: {
    width: '100%',
    fontSize: 18,
    color: '#fff',
    padding: 5,
    textAlign: 'center',
    backgroundColor: 'blue',
    textAlign: 'center',
    alignSelf: 'center',
  },
  ordercancelled: {
    width: '100%',
    fontSize: 18,
    color: '#fff',
    padding: 5,
    textAlign: 'center',
    backgroundColor: 'gray',
    textAlign: 'center',
    alignSelf: 'center',
  },
  orderpending: {
    width: '100%',
    fontSize: 18,
    color: '#fff',
    padding: 5,
    textAlign: 'center',
    backgroundColor: 'green',
    textAlign: 'center',
    alignSelf: 'center',
  },
  order: {
    margin: 10,
    elevation: 10,
    boxShadow: "2px 2px 5px #888888", //web use
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 5,
  },
  head1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 10,
  },
  ordertxt1: {
    fontSize: 20,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 10,
  },
  ordertxt2: {
    fontSize: 18,
    color: colors.text3,
    textAlign: 'center',
    marginVertical: 5,
  },
  ordertxt3: {
    fontSize: 18,
    color: colors.text3,
    textAlign: 'center',
    marginVertical: 5,
    borderColor: colors.text3,
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
  },
  cancelbtn: {
    backgroundColor: colors.text1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'center',
  },
  cancelbtnin: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row1: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    margin: 5,
    marginTop: 10,
    backgroundColor: colors.col1,
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    //flexGrow:1,
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  rowout: {
    flexDirection: "column",
    margin: 5,
    backgroundColor: colors.col1,
    borderRadius: 10,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  qty: {
    width: 40,
    height: 30,
    backgroundColor: colors.text1,
    borderRadius: 5,
    textAlign: "center",
    marginRight: 10,
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 10,
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 10,
    color: colors.text1,
  },
  totalprice: {
    fontSize: 17,
    fontWeight: "bold",
    borderColor: colors.text1,
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
  },
  total: {
    fontSize: 20,
    color: colors.text3,
    textAlign: 'right',
    marginVertical: 10,
    marginRight: 20,
  },
  btntext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    margin: 10,
    whiteSpace: "nowrap",
  },
});
