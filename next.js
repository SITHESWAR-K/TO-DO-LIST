const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlproject@1234',
    database: 'rec'
});
connection.connect(err => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});
app.post('/add-task', (req, res) => {
    const { title, taskk, descriptions } = req.body;
    console.log("Received data:", { title, taskk, descriptions });
    if (!title || !taskk || !descriptions) {
        console.error('Received blank data');
        return res.status(400).json({ success: false, message: 'Blank data cannot be inserted' });
    }
    const query = 'INSERT INTO tasks (title, taskk, descriptions) VALUES (?, ?, ?)';
    connection.query(query, [title, taskk, descriptions], (error, results) => {
        if (error) {
            console.error('Error inserting data: ' + error.stack);
            return res.status(500).json({ success: false });
        }

        res.status(200).json({ success: true, data: results });
    });
});
app.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (error, results) => {
        if (error) {
            return res.status(500).json({ success: false });
        }
        res.json({ success: true, tasks: results });
    });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Task.html'));
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// // Endpoint to handle deleting a task
// app.delete('/delete-task/:id', (req, res) => {
//     const taskId = req.params.id;

//     const query = 'DELETE FROM tasks WHERE id = ?';
//     connection.query(query, [taskId], (error, results) => {
//         if (error) {
//             console.error('Error deleting data: ' + error.stack);
//             return res.status(500).json({ success: false });
//         }

//         if (results.affectedRows > 0) {
//             res.status(200).json({ success: true });
//         } else {
//             res.status(404).json({ success: false, message: 'Task not found' });
//         }
//     });
// });

