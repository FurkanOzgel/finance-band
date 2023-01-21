import { useEffect, useState } from 'react';
import axios from 'axios';

export default function getPrice(searchStr, state = null) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, SetError] = useState(null);

    const url = "https://symbol-search.tradingview.com/symbol_search/?text="

    const fetchData = async() => {
        try {
            const {data: responseData} = await axios.get(url + searchStr);
            setData(responseData)
            setLoading(false);
        }
        catch (err) {
            SetError(err.message);
            setLoading(false);
        }
    }
    
    useEffect(()=> {
        setLoading(true)
        if(!(searchStr=="")){
            const delayDebounceFn = setTimeout(() => {
                fetchData()
            },1000)
            return () => clearTimeout(delayDebounceFn)
        }else{
            setLoading(false)
            setData([])
        }
        
    },[state]);

    return {data, loading, error};
};