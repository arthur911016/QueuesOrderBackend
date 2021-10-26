
const QUEUES_DATA = require('./utils/mocksDB')
const calculateBribes = require('./utils/calculateBribes');

const getAllQueues = () => {
    return QUEUES_DATA;
}

const getQueueDataById = (id) => {
    const queue = QUEUES_DATA.find(queue => queue.id === id);
    if (!queue) {
        return {};
    }
    return {
        id: queue.id,
        orderedQueue: queue.queue.map((el, index) => index + 1),
        originalQueue: queue.queue,
        bribedData: calculateBribes(queue.queue)
    }
}

const Methods = {
    getAllQueues,
    getQueueDataById
}

module.exports = Methods;