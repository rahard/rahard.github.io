var macUtil = require('getmac');
var SensorTag = require('sensortag');

macUtil.getMac(function(err,macAddress) {
   if (err) throw err;
   var deviceId = macAddress.replace(/:/gi, '');
   //var deviceId = macAddress;
   console.log('Device MAC Address: ' + deviceId);
})

function monitorSensorTag() {
   console.log('Mulai');
   SensorTag.discover(function(device){
      console.log('Discovering');
      console.log('Discovered device with UUID: ' + device['uuid']);

      device.connect(function(){
         connected = true;
         console.log('Connected to SensorTag');
         device.discoverServicesAndCharacteristics(function(callback){});
      }); // end device.connect

      device.on('disconnect', function(onDisconnect){
         connected = false;
         console.log('Device disconnected');
         client.end();
      }); // end device.on disconnect
   }); // end SensorTag.discover



};



monitorSensorTag();
