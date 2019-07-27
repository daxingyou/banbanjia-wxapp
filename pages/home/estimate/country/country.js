import { cities } from '../../../../utils/country';
Page({
    data : {
        cities : []
    },
    onChange(event){
        console.log(event.detail,'click right menu callback data')
    },
    onReady(){
        let storeCity = new Array(24);
        const words = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        words.forEach((item,index)=>{
            storeCity[index] = {
                key : item,
                list : []
            }
        })
        cities.forEach((item)=>{
            let firstName = item.en.substring(0,1);
            let index = words.indexOf( firstName ); 
            storeCity[index].list.push({
                name : item.cn+"  "+item.en,
                key : firstName
            });
        })
        this.data.cities = storeCity;
        this.setData({
            cities : this.data.cities
        })
		},
	onLoad: function (options) {
		console.log(this.data.cities)
	}
	
});