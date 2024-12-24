// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "student"
// }); 
// db.connect((err) => {
//     if (err){
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL database.');
// }); 
// app.post('/', (req, res) => {
//     const sql = "SELECT *FROM login_admin WHERE username = ? and password1 = ?";
//     db.query(sql, [req.body.username , req.body.password], (err, result) => {
//         if (err) {
//             console.error('Error fetching data from MySQL:', err);
//             return res.json(err);
//         }
//         if (result.length > 0) {
//             return res.json({Login: true});
//         } else {
//             return res.json({Login: false});
//         }
//     });
// });
// const port = 8081;
// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });