import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Platform,TouchableOpacity } from 'react-native';
import { colors, titles } from "../src/globals/style";
import { AntDesign, Octicons, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../services/AuthContext';
import { button2 } from '../src/globals/button';

export default function LoginScreen() {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [showpassword, setShowpassword] = useState(false);
  const [emailfocus, setEmailFocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const { signIn } = React.useContext(AuthContext);

  async function attemptLogin() {
    try {
      await signIn({ username, password });
    } catch (error) {
      if (Platform.OS !== "web") {
        Alert.alert(error.toString());
      } else {
        alert(error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
            <Text style={styles.head1}>Sign In</Text>
            <View style={styles.inputout}>
                <AntDesign name="user" size={24} color={emailfocus === true ? colors.text1 : colors.text2} />
                <TextInput style={styles.input} placeholder='Email/Username'
                    placeholderTextColor='gray' 
                    onFocus={()=>{
                        setEmailFocus(true)
                        setPasswordfocus(false)
                        setShowpassword(false)
                    }}
                    onChangeText={(text) => setUsername(text)}
                    />
            </View>
            <View style={styles.inputout}>
                <MaterialIcons name="lock-outline" size={24} color={passwordfocus === true ? colors.text1 : colors.text2} />
                <TextInput style={styles.input} placeholder='Password'
                    placeholderTextColor='gray'  
                    onFocus={()=>{
                        setEmailFocus(false)
                        setPasswordfocus(true)
                    }}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry = {showpassword === false ? true : false }
                    />
                <Octicons name={showpassword == false ?"eye-closed" : "eye"} size={24} color="gray" onPress={()=> setShowpassword(!showpassword)} />
            </View>
            <TouchableOpacity style = {button2}            
                onPress={() => {
                    attemptLogin()
                  }}
            >
                <Text style={{ color: "#fff", fontSize: titles.btntxt, fontWeight: "bold" }}> Log In </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 10,
  },
  inputout: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: 'center',
    //elevation: 10, //only android
    boxShadow: '2px 2px 10px #888888', //web use
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
    outlineStyle: "none",
  }
});
