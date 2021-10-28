const sqlite3 = require('sqlite3').verbose()

const DB_SOURCE = "db.sqlite"

const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE queues (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            queue text
        )`, () => {
            return;
        });
    }
});


module.exports = db
