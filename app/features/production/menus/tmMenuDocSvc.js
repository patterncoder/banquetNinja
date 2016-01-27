import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';

function tmMenuDocSvc (tmDocFactory) {
    
    this.__proto__ = tmDocFactory('Menu', ninjaSchemas.production.Menu);
    
    // title, subtitle, items, footer
    this.addSection = function(section){
        var newSection = {
            title: "Section Title",
            subtitle: "Section subtitle",
            items: [],
            footer: "section footer"
        }
        this.doc.sections.push(newSection);
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