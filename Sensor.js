const mongoose = require('mongoose');
const db = 'mongodb://hoon:hoon123@ds137003.mlab.com:37003/nodedata';

mongoose
.connect(db, {useNewUrlParser: true})
 //Perform Promises
 .then(() =>  {
   console.log('mongoose connected to mongodb');
 })
 //Callback function
 .catch(error => {
   console.log('mongoose connection error:', error);

 });

 const sensorSchema = new mongoose.Schema({

     name: {
     type : String
 },
      value: {
      type : Number
 },
     humid: {
     type : String
    },
    value2: {
     type : Number
    },
    temperature: {
    type : String
    },
    value3: {
    type : Number
    }

});

const Sensor = mongoose.model('Sensor',sensorSchema,'sensorCollection');

module.exports = Sensor;
