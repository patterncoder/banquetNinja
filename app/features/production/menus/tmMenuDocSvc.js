import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmMenuDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('Menu', ninjaSchemas.production.Menu);

    this.doc.sections = this.doc["sections"] ? this.doc.sections : []; 
    // this.doc.sections.map((item) => {
    //     item.visible = true;
    // });

    this.activeObj = {
        visible: 0,
        index: 0
    };
    
    // title, subtitle, items, footer
    this.addSection = function(section){
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
    
    this.removeSection = function(index){
        this.doc.sections.splice(index, 1);
    };
    
    this.updateSection = function(section){};
    
    this.addMenuItem = function(section, menuItem){};
    
    this.removeMenuItem = function(section, menuItem){};
    
    this.updateMenuItem = function(section, menuItem){};
    
    
    
    return this;
    
}


tmMenuDocSvc.$inject = ['tmDocFactory'];

export default tmMenuDocSvc;