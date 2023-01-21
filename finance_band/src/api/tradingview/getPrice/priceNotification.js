import notifee from "@notifee/react-native"

export default async function priceNotification(data) {

    var body = ""


    for(i = 0; i < data.length; i++) {
        body = body + `${data[i].symbol.split(":")[0]}:<br>${data[i].price}<br>${Math.round(data[i].percentage*100)/100}%<br><br>`
        }
    const channelId = await notifee.createChannel({
        id: "Price Notification",
        name: "Fiyat Bilgisi",
        vibration: false,
    });
    await notifee.displayNotification({
        id: "price",
        body:  body,
        android: {
            channelId,
        color: "#000080"
        },
        data:{ type: "price"}
    });
    
}