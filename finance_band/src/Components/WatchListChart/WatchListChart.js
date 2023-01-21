import React, { useState } from "react";
import { View, Text} from "react-native";
import styles from "./WatchListChart.style";
import Client from "../../api/tradingview/client";

export default function WatchListChart({item}) {

    const [symbol, setSymbol] = useState() 
    const [description, setDescription] = useState() 
    const [price, setPrice] = useState() 
    const [percentage, setPercentage] = useState()
    const [listedExchange, setLlistedExchange] = useState()
    const [type, settype] = useState("") 
    
    const client = new Client();
    const chart = new client.Session.Chart();
    chart.setMarket(item.split(":")[1]);
    chart.setSeries("1D")
    
    chart.onUpdate( () => {
        if (!chart.periods[0]) return;
        var price = chart.periods[0].close*100;
        price = parseInt(price)/100
        const responseData = {
            symbol: item.split(":")[1],
            description: chart.infos.description,
            local_description: chart.infos.local_description,
            price: `${price} ${chart.infos.currency_id}`,
            percentage: Math.round(((chart.periods[0].close - chart.periods[1].close)*100/
                chart.periods[1].close)*100)/100,
            type: chart.infos.type,
            listed_exchange: chart.infos.listed_exchange,
            country : chart.infos.country
        }

        setSymbol(responseData.symbol)
        setDescription(responseData.description)
        setPrice(responseData.price)
        settype(responseData.type)
        setPercentage(responseData.percentage)
        setLlistedExchange(responseData.listed_exchange)

        client.end()
        chart.delete();
        });

    
    return(
        <View style={styles.container}>        
            <View style={styles.view}>
                <Text style={[styles.name, {flex:1}]}>{description}</Text>
                <Text style={styles.name}>{price}</Text>
            </View>
            <View style={styles.view}>
                <View style={styles.bottomView}>
                    <Text style={styles.type}>{type.charAt(0).toUpperCase() + type.slice(1)} - </Text>
                    <Text style={styles.exchange}>{listedExchange} | </Text>
                    <Text style={styles.name}>{symbol}</Text>
                </View>
                <Text style={percentage > 0 ? {fontWeight:"bold", color:"green"}:{fontWeight:"bold",
                        color:"red"}}>{percentage}%</Text>
            </View>
        </View>
    )
};