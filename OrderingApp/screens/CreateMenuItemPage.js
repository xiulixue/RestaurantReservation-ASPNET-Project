import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CreateNewItem } from '../services/MenuService';
import { btn2, btntxt1, colors } from '../src/globals/style';
import HomeHeadNav from '../src/components/HomeHeadNav';
import BottomNav from '../src/components/BottomNav';
import { Picker } from 'react-native-web';

const CreateMenuItemPage = ({navigation}) => {
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [error, setError] = useState('');

    const createMenuItem = async (e) => {
        e.preventDefault()
        if (!itemId || !itemName || !price || !category || !description) {
            setError('Please fill in all fields');
            return;
        }

        const newItem = {
            itemId,
            itemName,
            price: parseFloat(price),
            category,
            description,
            imgUrl,
        };
        try {
            await CreateNewItem(newItem);
            Alert.alert('Success', 'Menu item created successfully');
            //alert('Menu Item Created!')
            navigation.navigate('MenuItemList');
            //navigation.navigate('MenuItemDetail',newItem.id);
            console.log('after',  newItem.id)
          } catch (error) {
            console.error('Error:', error);
            setError('An error occurred');
        }
    };
 //console.log(itemId);
    return (
        <View style={styles.container}>
            <StatusBar />
            <HomeHeadNav navigation={navigation} title={"Create Item"} />
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
                    onChange={(e)=>{setItemName(e.target.value)}}
                    placeholder="Enter item name"
                />

                <Text style={styles.label}>Price</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor='gray'
                    value={price}
                    //onChangeText={setPrice}
                    onChange={(e)=>{setPrice(e.target.value)}}
                    placeholder="Enter price"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Category</Text>
                {/* <TextInput
                    style={styles.input}
                    placeholderTextColor='gray'
                    value={category}
                    //onChangeText={setCategory}
                    onChange={(e)=>{setCategory(e.target.value)}}
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
                    onChange={(e)=>{setDescription(e.target.value)}}
                    placeholder="Enter description"
                    multiline
                />

                <Text style={styles.label}>Image url:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor='gray'
                    value={imgUrl}
                    //onChangeText={setImgUrl}
                    onChange={(e)=>{setImgUrl(e.target.value)}}
                    placeholder="Upload Image"
                    // keyboardType="file"
                />

                <TouchableOpacity style={btn2} onPress={createMenuItem}>
                    <Text style={btntxt1}>Create</Text>
                </TouchableOpacity>

            </View>

        </View>

    )
}

export default CreateMenuItemPage

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