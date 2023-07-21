import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getMenuItemDetail, updateMenuItem } from '../services/MenuService';
import { btn2, btntxt1, colors } from '../src/globals/style';
import HomeHeadNav from '../src/components/HomeHeadNav';
import BottomNav from '../src/components/BottomNav';
import { Picker } from 'react-native-web';

const EditMenuItemPage = ({navigation,route}) => {
    const id = route.params;
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMenuItem = async () => {
          try {
            const menuItemData = await getMenuItemDetail(id);
            setItemId(menuItemData.itemId);
            setItemName(menuItemData.itemName);
            setPrice(menuItemData.price.toString());
            setCategory(menuItemData.category);
            setDescription(menuItemData.description);
            setImgUrl(menuItemData.imgUrl);
          } catch (error) {
            console.error('Error while fetching menu item detail:', error);
          }
        };
    
        fetchMenuItem();
      }, [id]);

      const editMenuItem = async (e) => {
        if (!itemId || !itemName || !price || !category || !description) {
          setError('Please fill in all fields');
          return;
        }
    
        const updatedItem = {
          itemId,
          itemName,
          price: parseFloat(price),
          category,
          description,
          imgUrl,
        };
    
        try {
          await updateMenuItem(id, updatedItem);
          Alert.alert('Success', 'Menu item updated successfully');
          //alert('Menu item updated successfully');
          navigation.navigate('MenuItemDetail', id);
        } catch (error) {
          console.error('Error:', error);
          setError('An error occurred');
        }
      }; 

    return (
        <View style={styles.container}>
            <StatusBar />
            <HomeHeadNav navigation={navigation} title={`${itemName}`} />
            <BottomNav navigation={navigation} />
            <View style={styles.containerin}>
                {error ? <Text style={styles.error}>{error}</Text> : null}

                <Text style={styles.label}>Item Id</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor='gray'  
                    value={itemId}
                    onChangeText={(value) => setItemId(value)}
                    placeholder="Enter item Id"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Item Name</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor='gray'  
                    value={itemName}
                    //onChangeText={setItemName}
                    onChangeText={(value) => setItemName(value)}
                    placeholder="Enter item name"
                />

                <Text style={styles.label}>Price</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor='gray'
                    value={price}
                    //onChangeText={setPrice}
                    onChangeText={(value) => setPrice(value)}
                    placeholder="Enter price"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Category</Text>
                {/* <TextInput
                    style={styles.input}
                    placeholderTextColor='gray'
                    value={category}
                    //onChangeText={setCategory}
                    onChangeText={(value) => setCategory(value)}
                    placeholder="Enter category"
                /> */}
                <Picker
                    selectedValue={category}
                    onValueChange={(value) => setCategory(value)}
                    style={styles.picker}
                    itemStyle={styles.dropdown}
                >
                    <Picker.Item label="Select category" value="" />
                    <Picker.Item label="Entrees" value="Entrees" />
                    <Picker.Item label="Mains" value="Mains" />
                    <Picker.Item label="Drinks" value="Drinks" />
                    <Picker.Item label="Desserts" value="Desserts" />
                    <Picker.Item label="Sides" value="Sides" />
                    <Picker.Item label="Special" value="Special" />
                </Picker>

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor='gray' 
                    value={description}
                    //onChangeText={setDescription}
                    onChangeText={(value) => setDescription(value)}
                    placeholder="Enter description"
                    multiline
                />

                <Text style={styles.label}>Image url:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor='gray'
                    value={imgUrl}
                    //onChangeText={setImgUrl}
                    onChangeText={(value) => setImgUrl(value)}
                    placeholder="Upload Image"
                    // keyboardType="file"
                />

                <TouchableOpacity style={btn2} onPress={editMenuItem}>
                    <Text style={btntxt1}>Update</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default EditMenuItemPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.col1,
        width: "100%",
        alignItem: 'center',
    },
    containerin: {
        marginTop:30,
        width: '100%',
        alignItems: 'center',
        marginBottom:50,
    },
    error: {
        Color: colors.text1,
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
    label: {
        flexDirection: 'row',
        color: colors.text3,
        fontSize:18,
        fontWeight:'bold',
        marginLeft:40,
        marginRight:'auto',
    },
    input: {
        flexDirection: 'row',
        width: '80%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignSelf: 'center',
        boxShadow: '1px 1px 5px #888888',
    },
    picker:{
        width: '40%',
        height: 40,
        marginLeft:35,
        marginRight:'auto',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        boxShadow: '1px 1px 5px #888888',
    },
    dropdown: {
        flexDirection: 'row',
        width: 80,
        backgroundColor: colors.col1,
        fontSize: 14,
        borderRadius: 20,
        padding: 10,
        alignSelf: 'flex-start',
        boxShadow: '1px 1px 5px #888888',
    },
})