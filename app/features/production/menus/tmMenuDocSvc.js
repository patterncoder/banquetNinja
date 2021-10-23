import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';
import config from 'config';
import mongoose from "mongoose";

function tmMenuDocSvc(tmDocFactory, tmIdentity, $dataSource) {

    console.log("tmMenuDocSvc called!");

    this.__proto__ = tmDocFactory('Menu', ninjaSchemas.production.Menu);

    console.log("__proto__:", this.__proto__);

    this.doc.sections = this.doc["sections"] ? this.doc.sections : [];
    // this.doc.selArr = this.doc.sections;
    // console.log("selArr: ", this.doc.selArr);
    // this.doc.sections.map((item) => {
    //     item.visible = true;
    // });

    this.activeObj = {
        visible: 0,
        index: 0
    };

    this.categories = [];
    this.menugroups = [];
    this.assignedGroups = [];

    this.addableMenuItems = [];

    this.byNameEntry = "";
    this.selCategory = "";

    this.selectedIndex = 0;

    // this.selectedGroup = undefined;

    let self = this;

    //the term categories and sections is used interchangeably.
    this.getCategories = () => {
        let dfd = new Promise((resolve, reject) => {

            let mylookups = this.$dataSource.load("Lookups");

            console.log("mylookups:", mylookups);

            try {
                mylookups.query().then((data) => {
                    console.log("data:", data);
                    this.categories = data;
                    resolve(data.menuItemTags);
                });

            } catch (e) {
                // reject(e);
                console.log(e);
            }

        });

        return dfd;
    };

    //function assumes that id is string.
    let hasMenu = (group, id) => {

        let bool = false;
        group.menus.map((menu) => {
            // console.log("comparing:", menu.menuId, id);
            if (menu.menuId && id) {
                if (menu.menuId == id) {
                    bool = true;
                    return;
                }
            }
        });
        console.log("hasMenu result:", bool);
        return bool;
    };

    let svGroup = (group) => {
        let dfd = new Promise((resolve, reject) => {
            try {
                // console.log("inside try catch block scope, group:", group);

                let menuGroupModel = $dataSource.load("MenuGroup");
                menuGroupModel.update(group).then(() => {
                    console.log("update done!");
                    resolve(group);
                });
            } catch (e) {
                console.log("error on update:", e);
            }
        });

        return dfd;
    };

    // Ensure menu only shows up in one group at a time.
    // let clrGroups = () => {
    //     let dfd = new Promise((resolve, reject) => {

    //         getGroups().then((groups) => {
    //             groups.map((group) => {
    //                 group.menus.map((menu, indx) => {
    //                     if (menu.menuId == this.doc["_id"].toString()) {
    //                         //don't mess with the group we want to save!
    //                         if (group["_id"] != this.selectedGroup["_id"]) {
    //                             console.log("menu at index:", indx);
    //                             let removed = group.menus.splice(indx, 1);
    //                             svGroup(group).then((returned) => {
    //                                 console.log("saved!");
    //                             });
    //                         }
    //                     }
    //                 });
    //                 resolve(true);
    //             });
    //         });

    //     });

    //     return dfd;
    // };



    // set our menu ID to the selected group.
    this.setSelGroup = () => {
        // console.log("group?", this.selectedGroup);

        let menu = {
            //menuid: self.doc["_id"],
            menuId: mongoose.Types.ObjectId(this.doc["_id"]),
            title: this.doc.title,
            subtitle: this.doc.subtitle
        };

        console.log("obj:", menu);

        // clrGroups().then(() => {

        //passing in menuid as string.
        if (!hasMenu(this.selectedGroup, menu.menuId.toString())) {

            this.selectedGroup.menus.push(menu);
            // console.log("group to save:", this.selectedGroup);

            svGroup(this.selectedGroup).then((returned) => {
                console.log("saved!");
                //this.selectedGroup = returned;
                this.selGroup();
            });

        }
        // });
    };

    //Generic get: Gets all of the groups, so we can loop through them later.
    let getGroups = () => {
        let dfd = new Promise((resolve, reject) => {

            let Groups = this.$dataSource.load("MenuGroup");

            // groups.update()?
            console.log("Groups:", Groups);

            try {
                Groups.query().then((data) => {
                    console.log("data:", data);
                    // self.menugroups = data;
                    // selGroup(data);
                    resolve(data);
                });

            } catch (e) {
                // reject(e);
                console.log(e);
            }

        });

        return dfd;
    };

    // need to find all of the groups this menu is assigned to.
    this.findAssignedGroups = () => {
        getGroups().then((groups) => {
            //I don't think self.doc has finished loading by the time this code is run.
            console.log("self id:", this.doc["_id"], this.doc["_id"].toString());
            console.log("got groups!", groups);
            this.menugroups = groups; //dropdown select populates on this statement.

            //let selfObjectId = mongoose.Types.ObjectId(self.doc["_id"]);

            groups.map((group) => {
                //have the correct group appear as default.
                if (hasMenu(group, this.doc["_id"].toString())) {
                    // this.selectedGroup = this.menugroups.indexOf(group);
                    this.assignedGroups.push(group);
                    // this.selectedGroup = group;
                    // this.bkupGroup = group; //this variable doesn't change immediately on-blur.
                    // console.log("selected group:", this.selectedGroup);
                }
            });

            console.log("Assigned groups:", this.assignedGroups);
        });
    };


    // need to set the existing group as the visible default value IF one is set.
    // this.selGroup = () => {
    //     getGroups().then((groups) => {
    //         //I don't think self.doc has finished loading by the time this code is run.
    //         console.log("self id:", this.doc["_id"], this.doc["_id"].toString());
    //         console.log("got groups!", groups);
    //         this.menugroups = groups; //dropdown select populates on this statement.

    //         //let selfObjectId = mongoose.Types.ObjectId(self.doc["_id"]);

    //         groups.map((group) => {
    //             //have the correct group appear as default.
    //             if (hasMenu(group, this.doc["_id"].toString())) {
    //                 // this.selectedGroup = this.menugroups.indexOf(group);
    //                 this.selectedGroup = group;
    //                 this.bkupGroup = group; //this variable doesn't change immediately on-blur.
    //                 console.log("selected group:", this.selectedGroup);
    //             }
    //         });
    //     });
    // };

    // title, subtitle, items, footer
    this.addSection = function (section) {
        if (!this.hasOwnProperty("doc")) {
            this.doc.sections = [];
        }

        var newSection = {
            title: "Section Title",
            subtitle: "Section subtitle",
            items: [],
            footer: "section footer",
            printOrder: this.doc.sections.length + 1,
            //visible: true
        }

        this.doc.sections.push(newSection);
        this.secSort();
    };

    this.delItem = (item) => {
        console.log("removing this:", item);
        let selSection = this.doc.sections[this.activeObj.index];
        let indx = selSection.items.indexOf(item);
        if (indx > -1) {
            selSection.items.splice(indx, 1);
        }
    };

    this.addItem = (item) => {
        //vm.docSvc.doc.sections[vm.docSvc.activeObj.index].title
        console.log("add this:", item);
        console.log("section:", this.doc.sections[this.activeObj.index]);
        let selSection = this.doc.sections[this.activeObj.index];
        selSection.items.push(item);
    };

    let getDateLastYear = () => {
        let now = new Date();
        now.setFullYear(now.getFullYear() - 1);
        return now;
    };

    this.secSort = () => {
        let selectedObj = this.doc.sections[this.activeObj.index];
        let arr = [];
        let lastIndx = this.doc.sections.length - 1;
        for (let i = 0; i < this.doc.sections.length; ++i) {
            arr.push({}); //lets fill up the array with empty objs.
        }

        this.doc.sections.map((section) => {
            if (section.printOrder === undefined) {
                if (selectedObj == section) {
                    selectedObj.printOrder = lastIndx + 1;
                }
                section.printOrder = lastIndx + 1;
                arr[lastIndx] = section;
                --lastIndx;
            } else {
                arr[section.printOrder - 1] = section;
            }
        });

        this.doc.sections = arr;
        this.activeObj.index = selectedObj ? this.doc.sections.indexOf(selectedObj) : 0;
        this.activeObj.visible = selectedObj ? 1 : 0;
    };

    this.runSort = (objIndx) => {
        let tmp = this.doc.sections.splice(this.activeObj.index, 1);
        this.doc.sections.splice(objIndx, 0, tmp[0]);

        // this.doc.sections[this.activeObj.index].printOrder = objIndx;

        //lets make sure that we don't have two objects with the same printOrder
        this.doc.sections.map((obj, index) => {
            obj.printOrder = index + 1;
        });

        this.secSort();

        // console.log("before: ", this.doc.sections);

        // console.log("selected index: ", this.selectedIndex);

        // let tmp = this.doc.sections.splice(objIndx, 1);
        // this.doc.sections.splice(this.selectedIndex, 0, tmp[0]);

        // //make sure every object has an index set.
        // this.doc.sections.map((obj, index) => {
        //     obj.printOrder = index;
        // });

        // console.log("after: ", this.doc.sections);

        // let maxLoops = 0;
        // let sorted = this.doc.sections;
        // let isSorted = () => {
        //     let bool = false;
        //     sorted.map((obj, index) => {
        //         if (index > 0) {
        //             if (!sorted[index - 1].printOrder && obj.printOrder) {
        //                 bool = false;
        //             } else if (sorted[index - 1].printOrder > obj.printOrder) {
        //                 bool = false;
        //             }
        //         }
        //     });
        //     return bool;
        // };
        // let looping = () => {
        //     maxLoops++;
        //     if (!isSorted && maxLoops < 10000) {
        //         sorted.map((obj, index) => {
        //             if (index > 0) {
        //                 let move = (index) => {
        //                     let tmp = sorted.splice(index, 1);
        //                     sorted.splice((index - 1), 0, tmp);
        //                 };

        //                 if (!sorted[index - 1].printOrder && obj.printOrder) {
        //                     move(index);
        //                 } else if (sorted[index - 1].printOrder > obj.printOrder) {
        //                     move(index);
        //                 }
        //             }
        //         });
        //     }
        //     if (!isSorted) {
        //         looping();
        //     } else {
        //         this.doc.sections = sorted;
        //         console.log("after: ", this.doc.sections);
        //     }
        // }
    };

    this.runSearch = (type, value) => {
        let url = "";
        if (type == "category") {
            url = `${config.apiBase}/production/menuitems?where[categories]=${[value]}`;
        } else if(type == "name") {
            url = `${config.apiBase}/production/menuitems?like[name]=${value}`;
        }


        console.log("runSearch: url:", url);

        let request = {
            method: "GET",
            url: url
        };

        let filtered = [];
        this.$http(request).then((data) => {
            console.log("runSearch: data:", data);

            let tmp = data.data;

            console.log(getDateLastYear());

            let filter = (dta) => {
                dta.map((menItm) => {
                    // console.log("filter:", menItm);
                    // if(menItm.length) { //is menItm an array?
                    //     console.log("menItm is an array...");
                    //     filter(menItm);
                    // }
                    let dt = new Date(menItm.meta.dateLastMod);
                    console.log("dt:", dt);
                    if (dt.getTime() >= (getDateLastYear().getTime())) {
                        filtered.push(menItm);
                    }
                });
            };

            if (tmp.length) {
                filter(tmp);
            } else if (tmp.hasOwnProperty("data")) {
                filter(tmp.data);
            }

            console.log("menuItems:", filtered);
            this.addableMenuItems = filtered;
        });

    };

    this.editSection = (index) => {
        let doc = this.doc.sections[index];
        console.log("editSection", index, doc);
        //doc.visible = false;
        this.activeObj.visible = 1;
        this.activeObj.index = index;
    };

    this.setActiveTab = (index) => {
        this.activeObj.visible = index;
    };

    this.setIndex = (index) => {
        this.activeObj.index = index;
    };

    this.openAddGroup = () => {
        console.log("openAddGroup called.");
    };

    this.removeGroup = (index) => {
        console.log("remove group called, index:", index);
    };

    this.openAddFood = () => {
        console.log("openAddFood called");
        this.getCategories().then(() => {
            this.setActiveTab(2);
        });
        // this.getCategories().then((data) => {
        //     console.log("openAddFood data:", data);
        // });

        // this.setActiveTab(2);
    };

    this.deleteMenuItem =(index) => {
        this.doc.sections[this.activeObj.index].items.splice(index, 1);
    };

    this.closeAddFood = () => {
        this.setActiveTab(1);
    };

    this.openEditSection = () => {
        // this.getCategories();
        this.setActiveTab(1);
    };

    this.removeSection = function (index) {
        this.doc.sections.splice(index, 1);
    };

    this.setSelCategory = (category) => {
        this.selCategory = category;
    };

    this.updateSection = function (section) { };

    this.addMenuItem = function (section, menuItem) { };

    this.removeMenuItem = function (section, menuItem) { };

    this.updateMenuItem = function (section, menuItem) { };


    return this;

}


tmMenuDocSvc.$inject = ['tmDocFactory', "tmIdentity", "$dataSource"];

export default tmMenuDocSvc;