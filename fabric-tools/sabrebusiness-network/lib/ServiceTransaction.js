'use strict';
/**
 * Write your transction processor functions here
 */



/**
 * Track the trade of a aircraft from one trader to another
 * @param {org.sabre.biznet.ServiceTransaction} trade - the trade to be processed
 * @transaction
 */
function serviceTansaction(trade) {
    try{
    if(trade.transactionType == "ServiceRequest"){
      trade.aircraftComponent.flightMode = "Maintainence Mode"
    }else if(trade.transactionType == "ServiceDone"){
       trade.aircraftComponent.flightMode  = "Ready Mode"
    }
    return getAssetRegistry('org.sabre.biznet.AircraftComponents')
        .then(function (assetRegistry) {
            return assetRegistry.update(trade.aircraftComponent)
        });
  }catch(e){
	console.log("Exception",e);
}
}

