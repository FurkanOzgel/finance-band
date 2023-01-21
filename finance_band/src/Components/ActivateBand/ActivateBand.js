import React, { useState, useEffect, useRef } from "react";
import { Text, View, Switch } from "react-native";
import styles from "./ActivateBand.style"; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import setupPlayer from "./setupPlayer"
import TrackPlayer from "react-native-track-player";

export default function ActivateBand() {

    const [isEnabled, setIsEnabled] = useState(false);
    const isFirstRun = useRef(true);

    const toggleSwitch = () => {
        if(!isEnabled==true){
            setupPlayer()
        }else{
            TrackPlayer.reset()
        }
        setIsEnabled(previousState => !previousState)
    };

    useEffect(() => {
        if (isFirstRun.current) {
            try{
                TrackPlayer.getState().then((playerState) => {
                    console.log(playerState)
                    setIsEnabled(playerState == "playing" ? true: false)
                })
            }catch{
                setIsEnabled(false)
                }
            isFirstRun.current = false
            }
    })
    
    return(
        <View style={styles.container}>
            <View style={styles.card_icon}>
                <MaterialCommunityIcons name = {"watch-import-variant"} size={25} color={"black"}/>
            </View>
            <View style={styles.card_title_container}>
                <Text style={styles.card_title}>Activate Finance Band System</Text>
            </View>
                <View style={styles.switch_container}>
                <Switch
                    trackColor={{ false: "#AFAFAF", true: "#47DD7C" }}
                    thumbColor={isEnabled ? "#f1f1f1" : "#f1f1f1"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    );
  }