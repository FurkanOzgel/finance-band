import Client from "./../../../api/tradingview/client";
import priceNotification from './priceNotification';

export default async function getPrice(symbol) {

    var responseList = []
    const fetchData = async() => {
        try {
            for(i=0; i < symbol.length; i++) {
                const client = new Client();
                const chart = new client.Session.Chart();
                const name = symbol[i][1].split(":")[1]

                chart.setMarket(name);
                chart.setSeries("1D")

                chart.onUpdate( () => {
                    if (!chart.periods[0]) return;
                    var price = chart.periods[0].close*100;
                    price = parseInt(price)/100
                    const responseData = {
                        symbol: name,
                        description: chart.infos.description,
                        local_description: chart.infos.local_description,
                        price: `${price} ${chart.infos.currency_id}`,
                        percentage: Math.round(((chart.periods[0].close - chart.periods[1].close)*100/
                            chart.periods[1].close)*100)/100,
                        type: chart.infos.type,
                        listed_exchange: chart.infos.listed_exchange,
                        country : chart.infos.country
                    };
                    responseList = responseList.concat(responseData)
                    if(responseList.length == symbol.length) {
                        priceNotification(responseList)
                    }
                    client.end()
                    chart.delete();
                    });
                }
        }
        catch (err) {
            SetError(err.message);
        }
    }
    
    fetchData()
};