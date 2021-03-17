import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';
import config from 'config';
import mongoose from "mongoose";

function tmMenuDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('MenuGroup', ninjaSchemas.production.MenuGroup);
    
    
    
    let getDateLastYear = () => {
        let now = new Date();
        now.setFullYear(now.getFullYear() - 2);
        return now;
    };

    this.getMenus = () => {
        console.log("this:", this);
        return this.doc.menus;
    };

    // this.runSearch = () => {

    //     let url = `${config.apiBase}/production/menugroups?where[categories]=${[this.selCategory]}`;
    //     console.log("runSearch: url:", url);

    //     let request = {
    //         method: "GET",
    //         url: url
    //     };

    //     let filtered = [];
    //     this.$http(request).then((data) => {
    //         console.log("runSearch: data:", data);

    //         let tmp = data.data;

    //         console.log(getDateLastYear());

    //         let filter = (dta) => {
    //             dta.map((menItm) => {
    //                 // console.log("filter:", menItm);
    //                 // if(menItm.length) { //is menItm an array?
    //                 //     console.log("menItm is an array...");
    //                 //     filter(menItm);
    //                 // }
    //                 let dt = new Date(menItm.meta.dateLastMod);
    //                 console.log("dt:", dt);
    //                 if (dt.getTime() >= (getDateLastYear().getTime())) {
    //                     filtered.push(menItm);
    //                 }
    //             });
    //         };

    //         if(tmp.length) {
    //             filter(tmp);
    //         } else if(tmp.hasOwnProperty("data")) {
    //             filter(tmp.data);
    //         }

    //         console.log("menuItems:", filtered);
    //         this.addableMenuItems = filtered;
    //     });

    // };
    
    
    return this;
    
}


tmMenuDocSvc.$inject = ['tmDocFactory'];

export default tmMenuDocSvc;