const express = require('express');
const bodyParser = require('body-parser');
const Methods = require('./src/methods')


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/queues', (req, res) => {
    res.send(Methods.getAllQueues());
});

app.get('/queues/:id', (req, res) => {
    res.send(Methods.getQueueDataById(Number(req.params.id) || 0));
});

app.listen(port, () => console.log(`Bribes calculator on port ${port}!`))