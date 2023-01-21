import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React, {useState, useEffect} from "react";
import ActivateBand from "./Components/ActivateBand";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from "./Components/SearchBar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import WatchList from "./Components/WatchList";

const styles =  StyleSheet.create({
    watch_list_container:{
        flexDirection:"row",
        height:50
    },
    card_icon:{
        padding:10,
        justifyContent:"center",
    },
    card_title:{
        fontSize:16,
        color:"black"
    },
    add_icon:{
        justifyContent:"center",
        width:60,
        alignItems:"center",
    },
    card_title_container:{
        flex:1,
        justifyContent:"center",
    }
})


export default function App() {
    const [addMode, SetAddMode] = useState(false)
    async function addItemWatchList(name) {
        try{        
            if (await AsyncStorage.getItem("list_array") == null){
                var oldList = [];
            }else{
                var oldList = JSON.parse(await AsyncStorage.getItem("list_array"))
            }

            var sameValue = false
            oldList.filter( item => {
                if(item[1] == name){
                    sameValue = true
                }
            console.log(sameValue)
            })
            
            if(!sameValue) {
                oldList.push([Math.floor((Math.random() * 9999)), name])
                AsyncStorage.setItem("list_array",JSON.stringify(oldList))
            }
            SetAddMode(false)
        }catch{
            null
        }
    };

    return (
        <View style={{flex:1, backgroundColor:"white"}}>
            <Text style={{fontWeight:"bold", color:"black", fontSize:22, alignSelf:"center"}}>Finance Band</Text>
            <ActivateBand/>
            <View style={styles.watch_list_container}>
                <View style={styles.card_icon}>
                    <Ionicons name={"md-list-outline"} size={25} color={"black"}/>
                </View>
                <View style={styles.card_title_container}>
                    <Text style={styles.card_title}>Follow List</Text>
                </View>
                <TouchableOpacity style={styles.add_icon} onPress={() => {
                    SetAddMode(!addMode);
                    }}>
                    <Ionicons name={addMode ? "remove" : "add"} size={25} color={"black"}/>
                </TouchableOpacity>
            </View>
            <View>
                { addMode ? <SearchBar onPress={addItemWatchList}/>: <WatchList />}
            </View>
        </View>        
);
}