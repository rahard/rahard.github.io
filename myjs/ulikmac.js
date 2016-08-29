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
         getDeviceInfo();
         //.initKeys();
         //initAirSensors();
         //initAccelAndGyro();
      }); // end device.connect

      device.on('disconnect', function(onDisconnect){
         connected = false;
         console.log('Device disconnected');
         client.end();
      }); // end device.on disconnect

      device.on('simpleKeyChange', function(left, right) {
        console.log('key pressed');
      });

      function getDeviceInfo(){
        console.log('getting device info')
         device.readDeviceName(function(callback) {
           console.log('readDeviceName: '+callback);
         });
         device.readSystemId(function(callback) {
           console.log('readSystemId: '+callback);
     	   });
         device.readManufacturerName(function(callback) {
           console.log('readManufacturerName: '+callback);
         });
      }; // end getDeviceInfo()

      function initKeys() {
        device.notifySimpleKey(function(left, right) {
        });
      };

      function initAccelAndGyro() {
        device.enableAccelerometer();
      };

      function initAirSensors() {
        device.enableIrTemperature(function(err) {if (err) throw err;});
        //device.enableLuxometer(function(err) {if (err) throw err;});
      };

   }); // end SensorTag.discover



};



monitorSensorTag();
