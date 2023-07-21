import React from 'react';
import { View, StyleSheet, StatusBar, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors, hr80 } from '../src/globals/style';
import HomeHeadNav from '../src/components/HomeHeadNav';
import Backbtn from '../src/components/Backbtn';
import BottomNav from '../src/components/BottomNav';


export default function OrderDetails({ navigation }) {

  const route = useRoute();
  const { orderData } = route.params;
  console.log(orderData);

  const totalprice = orderData.items.reduce((total, orderItem) => {
    return total + orderItem.price * orderItem.qty;
  }, 0);

  return (
    <View style={styles.containerout}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} title={"Order"} />
      <Backbtn navigation={navigation} redirectPage='Order' />
      <BottomNav navigation={navigation} />
      <View style={styles.container}>
        <Text style={styles.head1}>Your Order has been placed!</Text>
        <Text style={hr80}></Text>
        <View style={styles.containerin}>
          <Text style={styles.head1}>Order Detail</Text>
          <View style={styles.row}>
            <Text style={styles.left}>Order ID:</Text>
            <Text style={styles.right}>{orderData.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.left}>Table ID:</Text>
            <Text style={styles.right}>{orderData.tableId}</Text>
          </View>
        </View>
        <View style={styles.containerin}>
          <Text style={hr80}></Text>
          <Text style={styles.head1}>Items:</Text>
        </View>
        <ScrollView 
                style={styles.scrollview}
                contentContainerStyle={styles.contentContainer}
          >
            {orderData.items.map((item) => (
              <View key={item.id} style={styles.rowout}>
                <View style={styles.row}>
                  <View style={styles.left}>
                    <Text style={styles.qty}>{item.qty}X</Text>
                    <Text style={styles.title}>{item.itemName}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.totalprice}>
                      ${parseInt(item.qty) * parseInt(item.price)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
      </View>
      <View style={styles.btnsummary}>
            <View style={hr80}></View>
            <View style={styles.btnout}>
              <View style={styles.c3}>
                <Text style={styles.txt5}>Total: </Text>
                <Text style={styles.txt6}>${totalprice}
                </Text>
              </View>
            </View>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent:'center',
    top:20,
    bottom:20,
  },
  containerin: {
    width: '100%',
    alignItems: 'center',
  },
  scrollview: {
    flex: 1,
    width: "98%",
    margin:5,
    borderRadius: 10,
    marginBottom: 80,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  head1: {
    fontSize: 30,
    fontWeight: '200',
    color: colors.text1,
    margin: 10,
    textAlign: 'center',
  },
  c1: {
    width: '95%',
  },
  c3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
    flexGrow:1,
  },
  rowout: {
    flexDirection: 'column',
    margin: 10,
    //elevation: 10,
    boxShadow: '2px 2px 5px #888888', //web use
    backgroundColor: colors.col1,
    padding: 5,
    borderRadius: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qty: {
    width: 40,
    height: 30,
    backgroundColor: colors.text1,
    borderRadius: 5,
    textAlign: 'center',
    // textAlignVertical:'center',
    marginRight: 10,
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 10,
    color: colors.text1,
  },
  totalprice: {
    fontSize: 17,
    fontWeight: 'bold',
    borderColor: colors.text1,
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
  },
  btntext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    margin: 10,
    whiteSpace: 'nowrap',
  },
  btnsummary:{
    alignItems:'center',
    justifyContent:'center',
    bottom:80,
  },
  btnout: {
    backgroundColor:'#fff',
    flexDirection:'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
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
