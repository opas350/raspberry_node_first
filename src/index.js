const express = require('express');
const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');
const led2 = new Gpio(25, 'in', 'both');

const app = express();
const port = 3000;

const interv = setInterval(() => led.writeSync(led.readSync()^1), 200);

setTimeout( _ => {
    clearInterval(iv);
    led.unexport();
}, 5000);

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

app.get('/status', (req, res) => {
    console.log('Getting the status of GPIO 27')
    // led2.readSync()
    res.send(`Status of GPIO27 ${led2.readSync()}` )
});

app.listen(port, () => console.log(`App running on port ${port}`));