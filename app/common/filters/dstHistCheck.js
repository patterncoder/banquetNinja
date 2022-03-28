export default () => {

    let timeCorrection = (contract, property, strTime) => {
        //check and see if historical data was saved with epoch or not.
        //if contract was previously saved correctly, 24hr stamp will be 0.
        if (strTime && strTime != "0" && strTime != undefined) {
            let hr = strTime.slice(0, 2);
            let min = strTime.slice(2, 4);

            let dbHr = contract[property].getHours() == 0 ? "00" : contract[property].getHours();
            let dbMn = contract[property].getMinutes() == 0 ? "00" : contract[property].getMinutes();

            let checkHr = hr == dbHr;
            let checkMin = min == dbMn;

            if (!(checkHr && checkMin)) {
                // if (iIDs.indexOf(contract["_id"]) == -1) {
                //     iIDs.push(contract["_id"]);
                // }
                // console.log("from db hrs: ", dbHr, "from 24hr: ", hr);
                // console.log("from db min: ", dbMn, "from 24hr: ", min);
                contract[property].setHours(hr);
                contract[property].setMinutes(min);
            }

            //historical data must have this flag set, or it will not save correctly!
            //flag indicates that this function was run on this contract.
            contract.hrMinFix = true;
        }
        return contract;
    };

    return timeCorrection;
}