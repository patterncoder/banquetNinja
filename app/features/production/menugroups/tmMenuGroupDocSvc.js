import ninjaSchemas from 'ninjaSchemas';
import angular from 'angular';
import config from 'config';
import mongoose from "mongoose";

function tmMenuDocSvc(tmDocFactory, $dataSource) {

    this.__proto__ = tmDocFactory('MenuGroup', ninjaSchemas.production.MenuGroup);
    this.reloadPopulatedDocAfterSave = true;

    this.addMenu = (item) => {
        this.doc.menus.push(item);
    };

    this.addMenuToGroup = (item) => {
      this.doc.groupMenus.push(item)
    };

    this.removeGroupMenu = (id) => {
      let idx = this.doc.groupMenus.findIndex((obj) => obj.menuId._id === id);
      this.doc.groupMenus.splice(idx, 1);
    };
    
    this.removeMenu = (id) => {
      let idx = this.doc.menus.findIndex((obj) => obj._id === id);
      this.doc.menus.splice(idx, 1);
    };


    return this;

}


tmMenuDocSvc.$inject = ['tmDocFactory', '$dataSource'];

export default tmMenuDocSvc;