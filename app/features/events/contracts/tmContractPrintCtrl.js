function tmContractPrintCtrl ($dataSource, $state, $window) {
    var $ctrl = this;

    function init() {
        var Contract = $dataSource.load('Contract');
        var contractId = $state.params.id;
        
        Contract.getOne(contractId, true).then(function(data){
            $ctrl.doc = data;
            storeContactInfo($ctrl.doc.customer);
            calculateTotals($ctrl.doc);
        });
    };
    
    function add(a, b) {
        return (a + b);
    }
    function multiply(a, b) {
        return (a * b);
    }
    function calculateTotals(contract) {
        var taxRate = 0.08;
        var gratuityRate = 0.2;
        $ctrl.totals = {
            "Food Total" : 0.00,
            "Rental Total" : 0.00,
            "Tax" : 0.00,
            "20% Gratuity" : 0.00,
            "Sub Total" : 0.00,
            "Discount" : 0.00,
            "Total" : 0.00,
            "Deposit" : 0.00,
            "Total Due" : 0.00
        };
        $ctrl.totals['Food Total'] = 0.00;
        $ctrl.totals['Rental Total'] = 0.00;

        // food total
        if (contract.menuItems) {
            $ctrl.totals['Food Total'] = contract.menuItems.map((food) => multiply(food.quantity,food.price)).reduce(add,0);
        } 

        // rental total
        if (contract.rentalItems) {
            $ctrl.totals['Rental Total'] = contract.rentalItems.map((item) => item.price).reduce(add,0);
        }         

        // tax
        $ctrl.totals['Tax'] = ($ctrl.totals['Food Total'] + $ctrl.totals['Rental Total']) * taxRate;  

        // 20% Gratuity
        $ctrl.totals['20% Gratuity'] = ($ctrl.totals['Food Total'] + $ctrl.totals['Rental Total']) * gratuityRate; 

        // subtotal
        $ctrl.totals['Sub Total'] =  ($ctrl.totals['Food Total'] + $ctrl.totals['Rental Total'] + $ctrl.totals['Tax']+ $ctrl.totals['20% Gratuity']);

        // discount (HOW SHOULD THIS BE HANDLED does this need to be added to schema)
        $ctrl.totals['Discount'] = 0.00;
        
        // total
        $ctrl.totals['Total'] = $ctrl.totals['Discount'] + $ctrl.totals['Sub Total'];

        // deposit(HOW SHOULD THIS BE HANDLED does this need to be added to schema)
        $ctrl.totals['Deposit'] = 0.00;        

        // total due
        $ctrl.totals['Total Due'] =  $ctrl.totals['Total'] - $ctrl.totals['Deposit'];
    }

    function storeContactInfo(customer) {
        $ctrl.phoneNumbers = {
            "Cell Phone" : "",
            "Home Phone" : "",
            "Work Phone" : "",
            "Other Phone" : ""
        };

        if (customer.phoneNumbers) {
            $ctrl.phoneNumbers["Cell Phone"] = 
                customer.phoneNumbers.filter((phoneNumber)=>phoneNumber.contactType==="cell").map((match)=> match.number);
            $ctrl.phoneNumbers["Home Phone"] = 
                customer.phoneNumbers.filter((phoneNumber)=>phoneNumber.contactType==="home").map((match)=> match.number);
            $ctrl.phoneNumbers["Work Phone"] = 
                customer.phoneNumbers.filter((phoneNumber)=>phoneNumber.contactType==="work").map((match)=> match.number);
            $ctrl.phoneNumbers["Other Phone"] = 
                customer.phoneNumbers.filter((phoneNumber)=>phoneNumber.contactType==="other").map((match)=> match.number);
        }

        $ctrl.noPhoneNumbers = true;
        for (var key in $ctrl.phoneNumbers) {
            if ($ctrl.phoneNumbers.hasOwnProperty(key)) {
                if($ctrl.phoneNumbers[key].length){
                    console.log('set flag');
                    $ctrl.noPhoneNumbers = false;
                }
            }
        }

        $ctrl.emailAddresses = { 
            "Personal Email" : "",
            "Work Email" : "",
            "Other Email" : ""
        }
        if (customer.emailAddresses) {
            $ctrl.emailAddresses["Personal Email"] = 
                customer.emails.filter((emailAddress)=>emailAddress.emailType==="personal").map((match)=> match.email),
            $ctrl.emailAddresses["Work Email"] = 
                customer.emails.filter((emailAddress)=>emailAddress.emailType==="work").map((match)=> match.email),
            $ctrl.emailAddresses["Other Email"] = 
                customer.emails.filter((emailAddress)=>emailAddress.emailType==="other").map((match)=> match.email)
        }
             
        $ctrl.noEmailAddress = true;
        for (var key in $ctrl.emailAddresses) {
            if ($ctrl.emailAddresses.hasOwnProperty(key)) {
                if($ctrl.emailAddresses[key].length){
                    $ctrl.noEmailAddress = false;
                }
            }
        }
                  
    }

    $ctrl.back = function() {
        $state.go($state.back.fromState.name, $state.back.fromParams);
    };
    
    $ctrl.print = function(){
        $window.print();
    };
    
    init();

    
}

tmContractPrintCtrl.$inject = ['$dataSource', '$state', '$window'];

export default tmContractPrintCtrl;