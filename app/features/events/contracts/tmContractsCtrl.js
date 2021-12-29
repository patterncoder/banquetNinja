import ninjaSchemas from 'ninjaSchemas';
import config from 'config';
import timeCorrection from "../../../common/filters/dstHistCheck";

class tmContractsCtrl {
  constructor($scope, tmListFactory) {

    var constructorArgs = {
      schema: ninjaSchemas.events.Contract,
      model: 'Contract',
      listView: 'root.contracts',
      detailView: 'root.contractDetail',
      printView: 'root.contracts.print',
      addHeaderText: 'Add New Bid',
      listTitle: 'Upcoming Contracts'
    };

    this.__proto__ = tmListFactory(constructorArgs);

    this.loadData({
      "select": "eventName eventDate time endTime startTime24 endTime24 customer venues",
      "where[status]": "booked",
      "populate[customer]": "firstName lastName"
    }, true);

    console.log("this: ", this);

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


    this.sortOptions = [{ value: "eventDate", text: "Sort by Event Date A-Z" }, { value: "-eventDate", text: "Sort by Event Date Z-A" }, { value: "eventName", text: "Sort by Event Name" }, { value: "meta.datecreated", text: "Sort by Date Created" }];

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
    }

    this.addContract = function () {
      var self = this;
      var dialogConfig = {
        template: require('apply!./addContract.jade'),
        controller: 'tmAddContractCtrl as vm',
        locals: {
          model: this.Model,
          schema: this.constructorArgs.schema,
          listView: "root.contractsPending",
          detailView: this.constructorArgs.detailView,
          headerText: this.constructorArgs.addHeaderText,
          hideCustomerInput: false,
          customerId: null
        }
      };
      self.tmDialogSvc.showDialog(dialogConfig);
    };

  }

}

tmContractsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmContractsCtrl;

