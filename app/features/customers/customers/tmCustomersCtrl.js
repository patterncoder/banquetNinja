/*
    loadData imported from app\common\tmListFactory.js
*/

import ninjaSchemas from 'ninjaSchemas';

class tmCustomersCtrl {
    constructor($scope, tmListFactory) {

        var constructorArgs = {
            schema: ninjaSchemas.customer.Customer,
            model: 'Customer',
            listView: 'root.customers',
            detailView: 'root.customerDetail',
            addHeaderText: 'Add Customer',
            listTitle: 'Our Customers'
        };


        this.__proto__ = tmListFactory(constructorArgs);
        var self = this;

        let loadDataConfig = {
          select: "firstName lastName phoneNumbers",
          "startsWith[lastName]": self.$stateParams.alpha || 'A',
          "sort[lastName]": 1
        }

        this.loadData(loadDataConfig, true);
        
        this.changeFilter = function (value) {
            self.$state.go(self.constructorArgs.listView, { alpha: value.value });
            var filter = {
                select: "firstName lastName phoneNumbers",
                "startsWith[lastName]": value.value,
                "sort[lastName]": 1
            };
            this.loadData(filter, true);
        };

        this.sortOptions = [{ value: "lastName", text: "Sort by Last Name" }, { value: "firstName", text: "Sort by First Name" }, { value: "meta.datecreated", text: "Sort by Date Created" }];
        this.sortOrder = this.sortOptions[0].value;

        this.afterLoad = function () {
            // this.setPagination();
            // this.pageChanged();
        };





        this.setPagination = function () {
            // function pageCount () {
            //     return Math.ceil(this.items.length / this.itemsPerPage);
            // }
            this.itemsPerPage = 100;
            this.totalItems = this.items.length;
            // this.totalPages = pageCount();
            this.currentPage = 1;
            this.setPage = function (pageNo) {
                this.currentPage = pageNo;
            };
            this.pageChanged = function () {
                console.log("page changed to " + this.currentPage);
                var begin = ((this.currentPage - 1) * this.itemsPerPage),
                    end = begin + this.itemsPerPage;

                this.pagedItems = this.items.slice(begin, end);
            };
            this.maxSize = 5;
            this.bigTotalItems = 175;
            this.bigCurrentPage = 1;
        };



    }

}

tmCustomersCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmCustomersCtrl;



