const express = require('express');
const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');
const led2 = new Gpio(27, 'in', 'both');

const request = require('request');
const app = express();
const port = 3000;

const interv = setInterval(() => led.writeSync(led.readSync()^1), 200);

setTimeout( _ => {
    clearInterval(interv);
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

app.post('/lightsoff', async (req, res) => {
    await request.post({
        url: 'http://IPADDRESS/api/USERNAME/lights/N/state',
        body: {
            on: true,
            bri: 0
        }
    });

    res.send('Shutting down lights');
});


app.post('/lightson', async (req, res) => {
    await request.post({
        url: 'http://IPADDRESS/api/USERNAME/lights/N/state',
        body: {
            on: true,
            bri: 254
        }
    });

    res.send('Shutting down lights');
});

app.listen(port, () => console.log(`App running on port ${port}`));