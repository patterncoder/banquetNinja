/*
    loadData imported from app\common\tmListFactory.js
*/

import ninjaSchemas from 'ninjaSchemas';

class tmMenuGroupsCtrl {
    constructor($scope, tmListFactory) {

        var constructorArgs = {
            schema: ninjaSchemas.customer.Customer,
            model: 'Customer',
            listView: 'root.customers',
            detailView: 'root.customerDetail',
            addHeaderText: 'Add Customer',
            listTitle: 'Our Customers'
        };
        this.sortOptions = [{ value: "lastName", text: "Sort by Last Name" }, { value: "firstName", text: "Sort by First Name" }, { value: "meta.datecreated", text: "Sort by Date Created" }];
        this.sortOrder = this.sortOptions[0].value;
        this.__proto__ = tmListFactory(constructorArgs);
        this.loadData({
            select: "firstName lastName phoneNumbers",
            "startsWith[lastName]": "A",
            "sort[lastName]": 1
        });

        this.afterLoad = function () {
            console.log("done loading...");
            console.log("total items: " + this.items.length);
            console.log("items:", this.items);
            // this.setPagination();
            // this.pageChanged();
        };

        this.changeFilter = function (value) {
            console.log(value);
            var filter = {
                select: "firstName lastName phoneNumbers",
                "startsWith[lastName]": value.value,
                "sort[lastName]": 1
            };
            this.loadData(filter, true);
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

tmMenuGroupsCtrl.$inject = ['$scope', 'tmListFactory'];

export default tmMenuGroupsCtrl;



