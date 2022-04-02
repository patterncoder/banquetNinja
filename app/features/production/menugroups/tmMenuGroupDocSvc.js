import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';
import config from 'config';
import mongoose from "mongoose";

function tmMenuDocSvc(tmDocFactory, $dataSource) {

    this.__proto__ = tmDocFactory('MenuGroup', ninjaSchemas.production.MenuGroup);

    this.allMenus = [];
    this.displayedMenus = [];

    //set to last two years currently. set 2 to 1 in prod.
    let getDateLastYear = () => {
        let now = new Date();
        now.setFullYear(now.getFullYear() - 1);
        return now;
    };

    let calc = (dmlen, allen) => {
        let tmp = dmlen + 25; //load 25 at a time...
        if (tmp <= allen) {
            return tmp;
        } else {
            return allen;
        }
        return 0;
    };

    /*
        get localhost:3001/api/v1/production/menugroups/active
        put localhost:3001/api/v1/production/menugroups/active/6226dd3ff5de8511e092bc76

        we need to get the active group, and we need to set active.
    */

    //now angular will show more menus.
    this.loadMore = () => {
        let dmlen = this.displayedMenus.length;
        let allen = this.allMenus.length;

        if (dmlen < allen) {
            let index = dmlen;

            let stop = calc(dmlen, allen);

            for (let i = index; i < stop; ++i) {
                this.displayedMenus.push(this.allMenus[i]);
            }
        }
    };

    this.addMenu = (item) => {
        this.doc.menus.push(item);
    };

    this.editGroup = (input) => {
        console.log("editGroup: ", this.doc.menus[input]);
    };

    this.removeMenu = (input) => {
        console.log("remove group clicked: ", input);
        this.doc.menus.splice(input, 1);
    };

    // //ensures that we are not showing menus from over two years ago.
    // let filter = (dta) => {
    //     let filtered = [];
    //     dta.map((menObj) => {
    //         let dt = new Date(menObj.meta.dateLastMod);
    //         console.log("dt:", dt);
    //         if (dt.getTime() >= (getDateLastYear().getTime())) {
    //             filtered.push(menObj);
    //         }
    //     });
    //     return filtered;
    // };

    // //simply takes an array of menu items, and adds it to the end of our list.
    // let addMenItms = (arr) => {
    //     arr.map((menItm) => {
    //         this.allMenus.push(menItm);
    //     });
    // };

    let fillDisplayMenus = (menus) => {
        for(let i = 0; i < 25; ++i) {
            this.displayedMenus.push(menus[i]);
        }
    };

    this.getMenus = () => {
        let dfd = new Promise((resolve, reject) => {

            let Menus = this.$dataSource.load("Menu");

            console.log("menus:", Menus);

            if (this.allMenus.length) {
                this.allMenus = [];
            }

            try {
                Menus.query().then((data) => {

                    data.map((dta) => {
                        let dt = new Date(dta.meta.dateLastMod ? dta.meta.dateLastMod : dta.meta.dateCreated);
                        if (dt.getTime() >= (getDateLastYear().getTime())) {
                            this.allMenus.push(dta);
                            // if (this.displayedMenus.length < 25) {
                            //     this.displayedMenus.push(dta); //store the top 25
                            // }
                        }
                    });

                    this.allMenus.reverse() //objects come in sorted by oldest to newest, we want to reverse that...
                    fillDisplayMenus(this.allMenus);

                    resolve(data);
                });

            } catch (e) {
                // reject(e);
                console.log(e);
            }

        });

        return dfd;
    };

    return this;

}


tmMenuDocSvc.$inject = ['tmDocFactory', '$dataSource'];

export default tmMenuDocSvc;