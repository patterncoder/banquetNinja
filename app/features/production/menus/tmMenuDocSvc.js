import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';
import config from 'config';
import mongoose from "mongoose";

function tmMenuDocSvc(tmDocFactory, tmIdentity, $dataSource) {

    this.__proto__ = tmDocFactory('Menu', ninjaSchemas.production.Menu);

    console.log("__proto__:", this.__proto__);

    this.doc.sections = this.doc["sections"] ? this.doc.sections : [];
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

    this.selCategory = "";

    this.selectedGroup = undefined;

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
    let clrGroups = () => {
        let dfd = new Promise((resolve, reject) => {

            getGroups().then((groups) => {
                groups.map((group) => {
                    group.menus.map((menu, indx) => {
                        if (menu.menuId == this.doc["_id"].toString()) {
                            //don't mess with the group we want to save!
                            if (group["_id"] != this.selectedGroup["_id"]) {
                                console.log("menu at index:", indx);
                                let removed = group.menus.splice(indx, 1);
                                svGroup(group).then((returned) => {
                                    console.log("saved!");
                                });
                            }
                        }
                    });
                    resolve(true);
                });
            });

        });

        return dfd;
    };



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

        clrGroups().then(() => {

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
        });
    };


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
    this.selGroup = () => {
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
                    this.selectedGroup = group;
                    this.bkupGroup = group; //this variable doesn't change immediately on-blur.
                    console.log("selected group:", this.selectedGroup);
                }
            });
        });
    };

    // title, subtitle, items, footer
    this.addSection = function (section) {
        var newSection = {
            title: "Section Title",
            subtitle: "Section subtitle",
            items: [],
            footer: "section footer",
            //visible: true
        }
        this.doc.sections.push(newSection);
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

    this.runSearch = () => {

        let url = `${config.apiBase}/production/menuitems?where[categories]=${[this.selCategory]}`;
        let request = {
            method: "GET",
            url: url
        };

        let filtered = [];
        this.$http(request).then((data) => {
            data.data.data.map((menItm) => {
                let dt = new Date(menItm.meta.dateLastMod);
                if (dt.getTime() >= (getDateLastYear().getTime())) {
                    filtered.push(menItm);
                }
            });
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

    this.openAddFood = () => {
        this.getCategories().then(() => {
            this.setActiveTab(2);
        });
        // this.getCategories().then((data) => {
        //     console.log("openAddFood data:", data);
        // });

        // this.setActiveTab(2);
    };

    this.openEditSection = () => {
        // this.getCategories();
        this.setActiveTab(1);
    };

    this.removeSection = function (index) {
        this.doc.sections.splice(index, 1);
    };

    this.updateSection = function (section) { };

    this.addMenuItem = function (section, menuItem) { };

    this.removeMenuItem = function (section, menuItem) { };

    this.updateMenuItem = function (section, menuItem) { };


    return this;

}


tmMenuDocSvc.$inject = ['tmDocFactory', "tmIdentity", "$dataSource"];

export default tmMenuDocSvc;