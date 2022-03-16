import ninjaSchemas from 'ninjaSchemas';
import config from 'config';
import timeCorrection from "../../../common/filters/dstHistCheck";

class tmContractsPendingCtrl {
  constructor($scope, tmListFactory) {

    var constructorArgs = {
      schema: ninjaSchemas.events.Contract,
      model: 'BookedContract',
      listView: 'root.contractsPending',
      detailView: 'root.contractDetail',
      printView: 'root.contracts.print',
      addHeaderText: 'Add New Bid',
      listTitle: 'Event Bids'
    };

    this.__proto__ = tmListFactory(constructorArgs);

    //http://localhost:3001/api/v1/events/contracts?where[status]=pending

    this.loadData({
      select: 'eventName eventDate startTime customer',
      'where[status]': 'pending',
      "populate[customer]": "firstName lastName"
    }, true);
    // this.loadData({sel: 'eventName eventDate startTime', 'where[status]': 'pending'}); 
    //this.loadData();

    /*
      This is used only for historical SQL imported data, as date and time stamps 
      were aved as strings, and are NOT Unix Epoch.

      startTime24 and endTime24 are 24hr time stamps that reflect the intended
      hour and minute as specified by an events manager at the time of contract
      creation.
    */
    this.afterLoad = () => {

      console.log("checking dst");

      let iIDs = [];


      this.items.map((contract) => {
        if (contract.hasOwnProperty("startTime24") && contract.hasOwnProperty("endTime24")) {
          contract = timeCorrection()(contract, "time", contract.startTime24);
          contract = timeCorrection()(contract, "endTime", contract.endTime24);
          // contract.startTime24 = "0";
          // contract.endTime24 = "0";
        }
      });

      console.log(`corrected ${iIDs.length} bad DST's.`);
      console.log(iIDs);
    };

    this.sortOptions = [{ value: "-eventDate", text: "Sort by Event Date Z-A" }, { value: "eventDate", text: "Sort by Event Date A-Z" }, { value: "eventName", text: "Sort by Event Name" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

    this.sortOrder = this.sortOptions[0].value;

    this.print = function (idVal) {

      let url = `${config.apiBase}/events/contracts/${idVal}/view/pdf`;
      var req = {
        method: 'GET',
        url: url,
        responseType: 'arraybuffer'
      };
      this.$http(req).then(function (result) {
        console.log(result);
        var file = new Blob([result.data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
    };

    this.addContract = function () {
      var self = this;
      var dialogConfig = {
        template: require('apply!../contracts/addContract.jade'),
        controller: 'tmAddContractCtrl as vm',
        locals: {
          model: this.Model,
          schema: this.constructorArgs.schema,
          listView: this.constructorArgs.listView,
          detailView: this.constructorArgs.detailView,
          headerText: this.constructorArgs.addHeaderText,
          hideCustomerInput: false,
          customerId: null
        }
      };
      console.log("hello");
      self.tmDialogSvc.showDialog(dialogConfig);
    };

  }

}

tmContractsPendingCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmContractsPendingCtrl;


