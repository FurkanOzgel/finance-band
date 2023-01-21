import React, { useState, useRef } from 'react';
import { TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import styles from './SearchBar.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useSearch from "./../../api/tradingview/useSearch";
import SearchChart from '../SearchChart';
import LottieView from "lottie-react-native"

export default function SearchBar({onPress,state}) {
    
    const [onFocus, setOnFocus] = useState(false)
    const [text, setText] = useState("")
    const textInput = useRef() 
    var {data: searchList, loading: loading} = useSearch(text,text)

    const handleClose = () => {
        searchList = []
        setText("")
        textInput.current.clear()
    }

    return(
        <View>
            <View style={styles.container}>
                <Ionicons style={styles.searchIcon} name={"search"} size={18} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Ekle..." 
                    onFocus = {() => setOnFocus(true)}
                    onBlur = {() => setOnFocus(false)}
                    onChangeText= {(input) => setText(input)}
                    ref={textInput}
                    autoFocus={true}
                    />
                {!loading && onFocus == true && text ?
                        <TouchableOpacity onPress={handleClose}>
                            <Ionicons style={styles.cancelIcon} name={"close"} size={20} />
                        </TouchableOpacity>
                        :
                        <View style={{alignItems:"center", justifyContent:"center"}} >
                            {loading?
                            <LottieView
                            source={require('./../../assets/loading.json')}
                            style= {{height:50, width:50 }}
                            loop= {true}
                            autoPlay={true}
                            />:null
                        }
                            </View>
                }
                </View>
                <FlatList 
                    style={{bottom:0}}
                    data={searchList.filter(item => item.type != "futures")} 
                    renderItem={({item}) =>{ return <SearchChart item = {item} pressFunc = {onPress} state={state}/> }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'
                    />
        </View>
    )
}