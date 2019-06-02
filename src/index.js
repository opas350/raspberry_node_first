const express = require('express');
const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World'));

app.post('/off', (req, res) => {
    console.log('Turning off LED on GPIO17');

    res.send('Turning off LED');
    led.writeSync(0);
});

app.post('/on', (req, res) => {
    console.log('Turning on LED on GPIO17');

    res.send('Turning on LED');
    led.writeSync(1);
});

app.listen(port, () => console.log(`App running on port ${port}`));