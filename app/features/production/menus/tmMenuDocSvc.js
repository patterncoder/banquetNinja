import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';
import config from 'config';

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

    this.addableMenuItems = [];

    this.selCategory = "";

    this.selectedGroup = "";

    let self = this;

    //the term categories and sections is used interchangeably.
    this.getCategories = () => {
        let dfd = new Promise((resolve, reject) => {

            let mylookups = this.$dataSource.load("Lookups");

            console.log("mylookups:", mylookups);

            try {
                mylookups.query().then((data) => {
                    console.log("data:", data);
                    self.categories = data;
                    resolve(data.menuItemTags);
                });

            } catch (e) {
                // reject(e);
                console.log(e);
            }

        });

        return dfd;
    };

    // set our menu ID to the selected group.
    this.setSelGroup = () => {
        console.log("group?", self.doc.selGroup);
        //need to update the menus array.
        let group = self.menugroups[self.menugroups.indexOf(self.doc.selGroup)];
        group.menus.map((menu) => {
            if(menu.id == self.doc.id) {

            }
        })
    };


    let getGroups = () => {
        let dfd = new Promise((resolve, reject) => {

            let groups = this.$dataSource.load("MenuGroup");

            // groups.update()?
            console.log("groups:", groups);

            try {
                groups.query().then((data) => {
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

    // need to set the existing group as the visible default value IF one is set.
    this.selGroup = () => {
        getGroups().then((groups) => {
            console.log("got groups!", groups);
            self.menugroups = groups;
        });
        // console.log("self:", self);
        // if(self.doc.hasOwnProperty("groupID")) {
        //     if(groups.indexOf(self.doc.groupID)){
        //         //select the appropriate object in the dropdown.
        //     }
        // }
        // console.log(groups);
        // groups.map((obj) => {
        //     if(obj)
        // })
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

    this.addItem = (item) => {
        //vm.docSvc.doc.sections[vm.docSvc.activeObj.index].title
        console.log("add this:", item);
        console.log("section:", self.doc.sections[self.activeObj.index]);
        let selSection = self.doc.sections[self.activeObj.index];
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
            self.addableMenuItems = filtered;
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
            self.setActiveTab(2);
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