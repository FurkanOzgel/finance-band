import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import styles from "./SearchChart.style";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchChart({item, pressFunc}) {
    
    return(
        <View style={styles.container}>
            <View style={styles.left}>        
                <View style={styles.view}>
                    <Text style={styles.name}>{item.description}</Text>

                </View>
                <View style={styles.view}>
                    <Text style={styles.type}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)} - </Text>
                    <Text style={styles.exchange}>{item.exchange} | </Text>
                    <Text style={styles.name}>{item.symbol}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => {
                pressFunc(item.exchange+":"+item.symbol)
                }}>
                <Ionicons name={"add"} size={25} color={"black"}/>
            </TouchableOpacity>
        </View>
    )
};