const deepClone = require('deep-clone')

const calculateBribes = (queue) => {
    let currentQueue = deepClone(queue).reverse();
    const rightArray = queue.map((el, index) => index + 1);
    let totalBribes = 0;
    const returnObject = {};
    while (areSomeTicketBribed(deepClone(currentQueue).reverse())){
        currentQueue.forEach((ticket, index) => {
            if (index < currentQueue.length - 1) {
                if (ticket < currentQueue[index + 1]) {
                    const bribedTicket = currentQueue[index + 1];
                    const queueStatus = deepClone(currentQueue).reverse();
                    const save = currentQueue[index + 1];
                    currentQueue[index + 1] = ticket;
                    currentQueue[index] = save;
                    totalBribes++;
                    if (!returnObject.hasOwnProperty(`${bribedTicket}`)) {
                        returnObject[`${bribedTicket}`] = [queueStatus];
                    } else {
                        returnObject[`${bribedTicket}`].push(queueStatus);
                    }
                }
            }
        })
    }
    return parseResponseBribedQueue(returnObject, rightArray, totalBribes);
}

const areSomeTicketBribed = (queue) => {
    return queue.some((ticket, index) => ticket !== index + 1)
}

const parseResponseBribedQueue = (bribesObject, rightArray, totalBribes) => {
    return {
        totalBribes,
        bribesDetails: Object.keys(bribesObject).map(ticket => (
            {
                ticket,
                bribedDoneArray: bribesObject[ticket].map(() => deepClone(switchPlaces(rightArray, ticket)))
            }))
    };
}

const switchPlaces = (queue, ticket) => {
    queue.forEach((el, index) => {
        if (el === Number(ticket)) {
            if (index !== 0 ) {
                queue[index] = queue[index - 1];
                queue[index - 1] = el;
            }
        }
    });
    return queue
}

module.exports = calculateBribes