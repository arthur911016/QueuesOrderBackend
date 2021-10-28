const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { getQueueDataById, getAllQueues, deleteQueue, updateQueue, createNewQueue } = require('./src/core/services/services');


const app = express();
const port = 3005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/queues', getAllQueues);

app.post("/queues", createNewQueue);

app.get('/queues/:id', getQueueDataById);

app.delete("/queues/:id", deleteQueue);

app.put("/queues/:id", updateQueue);

app.listen(port, () => console.log(`Bribes calculator on port ${port}!`));