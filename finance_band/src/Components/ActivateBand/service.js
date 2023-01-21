import TrackPlayer from 'react-native-track-player';
import { Event } from 'react-native-track-player';
import getPrice from './../../api/tradingview/getPrice';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

module.exports = async function () {

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play()
    })

    TrackPlayer.addEventListener(Event.RemotePause, () => {
        AsyncStorage.getItem("list_array").then((item) => getPrice(JSON.parse(item)));
        TrackPlayer.pause()
        BackgroundTimer.setTimeout(() => {
            TrackPlayer.play()
        }, 300);
    })   
}