import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { StatusBar, Alert, View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { getTableData } from '../services/OrderService';
import { colors } from '../src/globals/style';
import HomeHeadNav from '../src/components/HomeHeadNav';
import BottomNav from '../src/components/BottomNav';


export default function OrderScreen({ navigation }) {
    //const [data, setData] = useState([])
    //const [tableId, setTableId] = useState([]);

    // async function fetchData() {
    //     try {
    //         const orderData = await getOrderData();
    //         setData(orderData);
    //     } catch (error) {
    //         Alert.alert(error.toString());
    //     }
    // }

    // useFocusEffect(
    //     React.useCallback(() => {
    //         fetchData();
    //         return () => { };
    //     }, [])
    // );

    const [Tabledata, setTableData] = useState([])
    async function fetchTableData() {
        try {
            const tableData = await getTableData();
            setTableData(tableData);
        } catch (error) {
            Alert.alert(error.toString());
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchTableData();

            return () => { };
        }, [])
    );

    return (
        <View style={styles.container}>
            <StatusBar />
            <HomeHeadNav navigation={navigation} title={"Table"} />
            <BottomNav navigation={navigation} />
            <Text style={styles.box}>Select a Table: </Text>
            <FlatList
                data={Tabledata}
                numColumns={5} // Set the number of columns to 2 for a row layout
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatlistContent}
                renderItem={({ item }) => (
                    <View style={styles.containerin}>
                        <TouchableOpacity
                            style={styles.cardout}
                            onPress={() => {
                                navigation.navigate("Menu", { tableId: item.number });
                            }}
                        >
                            <View style={styles.box1}>
                                <Text style={styles.txt1}>{item.number}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    containerin: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flatlistContent: {
        alignItems: 'center',
        justifyContent: "space-around",
    },
    red: {
        color: 'red',
    },
    tableContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    tableItem: {
        width: '5%', // Adjust the width based on your desired layout
        aspectRatio: 1, // Maintain a square aspect ratio for the table item
        backgroundColor: 'lightblue',
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableItemText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardout: {
        display: 'flex',
    },
    box: {
        backgroundColor: colors.col1,
        width: '95%',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        //elevation: 10,
        boxShadow: '1px 1px 5px #888888', //web use
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 18,
    },
    box1: {
        width: 60,
        height: 60,
        backgroundColor: colors.col1,
        margin: 5,
        padding: 20,
        borderRadius: 5,
        //elevation: 10,
        boxShadow: '1px 1px 5px #888888', //web use
        alignItems: 'center',
        fontSize: 18,
    },
    footerout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
});
