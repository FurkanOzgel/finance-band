import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor:"#efefef",
        flexDirection: "row",
        margin: 11,
        height: 42,
        borderRadius:4,
        alignItems:"center",
        justifyContent: 'center'
    },
    searchBar: {
        flex:1,
        fontSize: 16,
        color:"black"
    },
    searchIcon: {
        padding: 10
    },
    cancelIcon: {
        padding:10,
        paddingLeft:0
    },
    loading: {
        height:60,
        width:60,
        alignItems:"center",
        justifyContent:"center"
    }
});
