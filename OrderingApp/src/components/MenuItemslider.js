import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { colors } from "../globals/style";

const MenuItemslider = ({ data }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => {
          navigation.navigate('MenuItemDetail', item.id)
        }}>
          <View style={styles.cartcard}>

            <View style={styles.cartimgout}>
              <Image source={require(`../../assets/${item.itemName}.png`)}
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
                <TouchableOpacity style={styles.btn1} title="ViewDetails" onPress={(e) =>
                  navigation.navigate('MenuItemDetail',item.id)
                }>
                  <Text style={styles.btntxt}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn1} title="BuyNow" onPress={() =>
                  navigation.navigate("Order")
                }>
                  <Text style={styles.btntxt}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>)}
    />
  )
};

export default MenuItemslider;

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
    margin: 5,
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
  cartimgout: {
    alignItems: 'center',
    justifyContent: 'center',
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
  btnsummary: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 70,
  },
  btn1: {
    width: 100,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    //elevation:10, //only android
    boxShadow: '2px 2px 10px #888888', //web use
    color: '#fff',
  },
  btntxt: {
    color: '#fff',
    padding: 5,
    fontSize: 16,
    width: '85%',
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
    fontWeight: "bold",
  },
});
