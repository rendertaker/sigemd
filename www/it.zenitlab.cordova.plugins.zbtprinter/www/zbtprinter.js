var exec = require('cordova/exec');

exports.print = function( str, mac, successCallback, errorCallback) {
  parametros = str + "<<" + mac; cordova.exec(successCallback, errorCallback, 'ZebraBluetoothPrinter', 'print', [parametros]);
};



