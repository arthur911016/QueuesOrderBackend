const calculateBribes = require('../../utils/calculateBribes');
const db = require('../database/database')

const getAllQueues = (req, res) => {
    const sql = "select * from queues"
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        const data = rows.map(row => ({...row, queue: JSON.parse(row.queue)}))
        res.status(200).json({
            "message":"success",
            "data": data
        })
    });
};

const getQueueDataById = (req, res) => {
    const sql = "select * from queues where id = ?"
    const params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err || !row || !row.id) {
            res.status(400).json({"error":err && err.message || 'Invalid Row'});
            return;
        }
        const {id, queue: unparsedQueue} = row
        const queue = JSON.parse(unparsedQueue || '[]');
        res.json({
            "message":"success",
            "data": {
                id,
                orderedQueue: queue.map((el, index) => index + 1),
                originalQueue: queue,
                bribedData: calculateBribes(queue)
            }
        })
    });
};

const deleteQueue = (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM queues WHERE id = ?', id,
        (err, result) => {
            console.log(result);
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", "data": { id }})
        });
}

const updateQueue = (req, res) => {
    const unparsedQueue = req.body.queue;
    const queue = `[${unparsedQueue}]`;
    const id = req.params.id;
    db.run(
        `UPDATE queues set queue = COALESCE(?,queue) WHERE id = ?`,
        [queue, id],
        (err) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: { id, queue: unparsedQueue }
            })
        });
}

const createNewQueue = (req, res) => {
    const unparsedQueue = req.body.queue;
    const queue = `[${unparsedQueue}]`;
    if (!unparsedQueue || !unparsedQueue.length){
        res.status(400).json({"error": "Queue invalid"});
        return;
    }
    const sql ='INSERT INTO queues (queue) VALUES (?)'
    const params =[queue]
    db.run(sql, params, (err, result) => {
        console.log(result);
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": {
                queue: unparsedQueue
            },
        })
    });
}

const Services = {
    getAllQueues,
    getQueueDataById,
    deleteQueue,
    updateQueue,
    createNewQueue
}

module.exports = Services;