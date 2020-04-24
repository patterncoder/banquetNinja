import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmMenuDocSvc(tmDocFactory) {

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

    this.getCategories = () => {
        //console.log("test", tmDocFactory("Lookups", ninjaSchemas.common.Lookups));

        // let url = `${config.apiBase}/common/lookups?where[meta.company]=${this.searchCategory}&like[name]=${this.searchName}`;
        // let request = {
        //     method: "GET",
        //     url: url
        // };
        // this.$http(request).then((data) => {
        //     console.log("categories", data);
        //     self.categories= data.data.data;
        // });

        // console.log("testing:", tmDocFactory);

        //let lookups = tmDocFactory("Lookups", ninjaSchemas.common.Lookups).$dataSource.load('Lookups');

        // not working yet, still trying to get lookups, so I can get a list of categories...
        // console.log("Lookups:", this.$dataSource.load("Lookups"));
        // this.getDetailTitle();
        console.log("lookups schema:", ninjaSchemas.common.Lookups);
        let mylookups = this.$dataSource.load("Lookups");
        console.log("mylookups:", mylookups);
        try {
            mylookups.getOne().then((data) => {
                console.log("data:", data);

                console.log(mylookups.List.menuItemTags);
            });
        } catch (e) {
            console.log(e);
        }

        // self.menuItemCategories = lookups.List.menuItemTags;
        // console.log("menuItemCategories:", self.menuItemCategories)
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
        this.setActiveTab(2);
    };

    this.openEditSection = () => {
        this.getCategories();
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


tmMenuDocSvc.$inject = ['tmDocFactory'];

export default tmMenuDocSvc;