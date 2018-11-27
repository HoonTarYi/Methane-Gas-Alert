const express = require('express');
const server = express();
const Sensor = require('./Sensor');


var value = 0;


//from nodemcu
server.get('/', (req, res) => {
  value = req.query.sensor1;
  value2 = req.query.humid;
  value3 =req.query.temperature;
  prune();
  prune2();
  prune3();
  const sensorData = new Sensor({
    name: 'sensor1',
    value: req.query.sensor1,
    humid: 'humid',
    value2: req.query.humid,
    temperature: 'temperature',
    value3: req.query.temperature
  });
  sensorData
    .save()
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//from react - get the current value
server.get('/getsensor1', (req, res) => {
  // res.status(200).send(JSON.stringify(value));
  res.status(200).json(value);
});

server.get('/gethumid', (req, res) => {
  // res.status(200).send(JSON.stringify(value));
  res.status(200).json(value2);
});

server.get('/gettemperature', (req, res) => {
  // res.status(200).send(JSON.stringify(value));
  res.status(200).json(value3);
});

//from react - get historical
server.get('/getallsensor1', (req, res) => {
  Sensor.find()
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(error => {
      console.log('Mongoose read error: ', error);
      res.status(400).json(error);
    });
});

//prune the collection to keep it at 10
prune = () => {
  Sensor.count({ name: 'sensor1' })
    .then(response => {
      if (response >= 20) {
        Sensor.deleteOne({ name: 'sensor1' })
          .then(response => {
            console.log('Pruned one document');
          })
          .catch(error => {
            console.log('Error pruning: ', error);
          });
      }
    })
    .catch(error => {
      res.status(200).json(error);
    });
};

prune2 = () => {
  Sensor.count({ name: 'humid' })
    .then(response => {
      if (response >= 20) {
        Sensor.deleteOne({ name: 'humid' })
          .then(response => {
            console.log('Pruned one document');
          })
          .catch(error => {
            console.log('Error pruning: ', error);
          });
      }
    })
    .catch(error => {
      res.status(200).json(error);
    });
};

prune3 = () => {
  Sensor.count({ name: 'temperature' })
    .then(response => {
      if (response >= 20) {
        Sensor.deleteOne({ name: 'temperature' })
          .then(response => {
            console.log('Pruned one document');
          })
          .catch(error => {
            console.log('Error pruning: ', error);
          });
      }
    })
    .catch(error => {
      res.status(200).json(error);
    });
};

server.get('/count', (req, res) => {
  Sensor.count({ name: 'sensor1' })
    .then(response => {
      if (response === 9) console.log('Count is: ', response);
      res.status(200).send(response.data);
    })
    .catch(error => {
      res.status(200).json(error);
    });
});

server.get('/deleteall', (req, res) => {
  Sensor.deleteMany({})
  .then((response)=>{
    res.status(200).send(response);
  })
  .catch((error)=>{
    res.status(400).send(error);
  })
});



server.listen(5000, () => {
  console.log('server started on port 5000');
});
