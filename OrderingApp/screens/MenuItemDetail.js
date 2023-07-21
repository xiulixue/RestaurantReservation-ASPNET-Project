import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, btn2, hr80 } from '../src/globals/style';
import Backbtn from '../src/components/Backbtn';
import HomeHeadNav from '../src/components/HomeHeadNav';
import { deleteItem, getMenuItemDetail } from '../services/MenuService';

const MenuItemDetail = ({ navigation, route }) => {
  console.log("route params", route.params)
  const id = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const menuItemData = await getMenuItemDetail(id);
        console.log("menuItemData", menuItemData)
        setData(menuItemData);
      } catch (error) {
        console.error('Error while fetching menu item detail:', error);
      }
    };

    fetchMenuItem();
  }, [id]);

  const deleteMenuItem = async () => {
    console.log(id);
    // Alert.alert(  //Alert only working in Android/IOS
    //   'Confirm Delete',
    //   'Are you sure you want to delete this menu item?',
    //   [
    //     {
    //       text: 'Cancel',
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'Delete',
    //       style: 'destructive',
    //       onPress: async () => {
    //         try {
    //           await deleteItem(id);
    //           navigation.navigate('MenuItemList'); 
    //         } catch (error) {
    //           console.error('Error while deleting menu item:', error);
    //           Alert.alert('Error', 'An error occurred while deleting the menu item.');
    //         }
    //       },
    //     },
    //   ],
    //   { cancelable: false }
    // );

    // const confirmDelete = window.confirm('Are you sure you want to delete this menu item?');

    // if (confirmDelete) {
    try {
      await deleteItem(id);
      Alert.alert('Success', 'Menu item deleted successfully');
      //alert('Menu item deleted successfully');
      navigation.navigate('MenuItemList');
    } catch (error) {
      alert('An error occurred');
    }
    // }
  };

  if (data) {
    return (
      <View style={styles.containerout}>
        <StatusBar />
        <HomeHeadNav title="Item Details" navigation={navigation} />
        <Backbtn navigation={navigation} redirectPage='MenuItemList' />
        <ScrollView style={styles.container}>
          <View style={styles.container1}>
            <View style={styles.s1}>
              <Image source={require(`../assets/${data.itemName}.png`)}
                alt={data.itemName}
                style={styles.cardimgin}
              />
            </View>
            <View style={styles.s2}>
              <View style={styles.s2in}>
                <Text style={styles.head1}>{data.itemName}</Text>
                <Text style={styles.head2}>Price: ${data.price} </Text>
              </View>
            </View>
            <View style={styles.s3}>
              <Text style={styles.head3}>Descriptions:</Text>
              <Text style={styles.head4}>{data.description}</Text>
              <View style={styles.s3in}>
                <Text>{data.category} </Text>
              </View>
            </View>
            <View style={hr80}></View>
            <View style={styles.btnout}>
              <TouchableOpacity style={btn2} title="Edit" onPress={(e) =>
                navigation.navigate('EditMenuItem', id)
              }>
                <Text style={styles.btntxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={btn2} title="Delete" onPress={
                //(e)=>navigation.navigate('Order')
                deleteMenuItem
              }>
                <Text style={styles.btntxt}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.btnsummary}>
          <TouchableOpacity style={btn2} title="StartOrder" onPress={() =>
            navigation.navigate("Order")}>
            <Text style={styles.btntxt}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItem:'center',
    width: "100%",
  },
  container1: {
    //position:'absolute',
    top: 5,
    flex: 1,
    backgroundColor: "#fff",
    alignItem: 'center',
    justifyContent: 'center',
  },
  s1: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardimgin: {
    width: '100%',
    height: '100%',
  },
  s2: {
    width: '100%',
    padding: 20,
  },
  s2in: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  head1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text1,
    width: 220,
    marginRight: 10,
  },
  head2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text3,
  },
  s3: {
    width: '95%',
    backgroundColor: colors.text1,
    padding: 20,
    borderRadius: 10,
    marginLeft: '2.5%',
  },
  head3: {
    fontSize: 30,
    fontWeight: '200',
    color: colors.col1,
  },
  head4: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '400',
    color: colors.col1,
  },
  s3in: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItem: 'center',
    fontWeight: 'bold',
  },
  head5: {
    color: colors.text3,
    fontSize: 20,
    fontWeight: '200',
    marginLeft: 10,
  },
  btnout: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop:10,
    flexDirection: 'row',
    marginTop: 80,
  },
  btntxt: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    borderRadius: 10,
    width: '90%',
    textAlign: 'center',
  },
  btnsummary: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
  },
  container2: {
    width: '90%',
    backgroundColor: colors.col1,
    padding: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 5,
    elevation: 10,
    alignItems: 'center',
  },

})

export default MenuItemDetail
