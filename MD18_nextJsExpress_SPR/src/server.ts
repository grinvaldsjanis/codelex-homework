import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import multer from "multer";
import Connection from "mysql2/typings/mysql/lib/Connection";

const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123456",
  database: "psr_db",
});
//----------------------------------

//-------------------GET RESULTS
app.get("/results", (req: Request, res: Response) => {
  pool.getConnection((err: Error, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM results ORDER BY created_at DESC LIMIT 25", function (err, result, fields) {
      connection.release();
      if (err) throw err;
      res.send(result);
    });
  });
});

//-------------------ADD RESULT

app.post('/results', (req:Request, res:Response) => {
  const data = req.body;

  // Check that winnerLives has a value, is a number, and is an integer
  if (!data.hasOwnProperty('winnerLives') || isNaN(data.winnerLives) || !Number.isInteger(data.winnerLives)) {
    return res.status(400).send('Invalid winnerLives value');
  }

  pool.getConnection((err:Error, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    connection.query('INSERT INTO results SET ?', data, (err, result) => {
      if (err) {
        console.error(err);
        connection.release(); // release the connection back to the pool
        return res.status(500).send('Internal Server Error');
      }
      const insertedId = result.insertId;
      connection.query('SELECT * FROM results WHERE id = ?', [insertedId], (err, results) => {
        connection.release(); // release the connection back to the pool
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        res.status(201).json(results[0]);
      });
    });
  });
});



// app.post('/results', (req:Request, res:Response) => {
//   const data = req.body;
//   pool.getConnection((err:Error, connection) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Internal Server Error');
//     }
//     connection.query('INSERT INTO results SET ?', data, (err, result) => {
//       if (err) {
//         console.error(err);
//         connection.release(); // release the connection back to the pool
//         return res.status(500).send('Internal Server Error');
//       }
//       const insertedId = result.insertId;
//       connection.query('SELECT * FROM results WHERE id = ?', [insertedId], (err, results) => {
//         connection.release(); // release the connection back to the pool
//         if (err) {
//           console.error(err);
//           return res.status(500).send('Internal Server Error');
//         }
//         res.status(201).json(results[0]);
//       });
//     });
//   });
// });

