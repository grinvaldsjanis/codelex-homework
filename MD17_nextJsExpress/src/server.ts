import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import multer from "multer";
import { writeFileSync, readdirSync } from "fs";
import { uuid } from "uuidv4";
import Connection from "mysql2/typings/mysql/lib/Connection";
// import getArticlesFromFile from "./utils/getArticlesFromFile";

const app = express();

app.use(bodyparser.json());



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
  database: "blog_db",
});

//--------------MULTER IMAGE UPLOAD-------


const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors({ origin: "*" }));
app.use("/static", express.static("public"));

app.post(
  "/send-image",
  upload.single("photo"),
  (req: Request, res: Response) => {
    // console.log(JSON.stringify(req.file))
    res.send("send-image works!");
  }
);

//----------------------------------

//-------------------GET ARTICLES
app.get("/articles", (req: Request, res: Response) => {
  pool.getConnection((err: Error, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM articles", function (err, result, fields) {
      connection.release();
      if (err) throw err;
      res.send(result);
    });
  });
});
//-------------------GET ARTICLE
app.get('/articles/:id', (req:Request, res:Response) => {
  const id = req.params.id;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    connection.query('SELECT * FROM articles WHERE id = ?', [id], (err, results) => {
      connection.release(); // release the connection back to the pool
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      if (results.length === 0) {
        return res.status(404).send('Article not found');
      }
      res.json(results[0]);
    });
  });
});
//-------------------GET COMMENTS
app.get('/comments', (req:Request, res:Response) => {
  const articleId = req.query.articleId;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    connection.query('SELECT * FROM comments WHERE articleId = ?', [articleId], (err, results) => {
      connection.release(); // release the connection back to the pool
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.json(results);
    });
  });
});
//-------------------ADD ARTICLE
app.post('/articles', (req:Request, res:Response) => {
  const data = req.body;
  pool.getConnection((err:Error, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    connection.query('INSERT INTO articles SET ?', data, (err, result) => {
      if (err) {
        console.error(err);
        connection.release(); // release the connection back to the pool
        return res.status(500).send('Internal Server Error');
      }
      const insertedId = result.insertId;
      connection.query('SELECT * FROM articles WHERE id = ?', [insertedId], (err, results) => {
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
//-------------------ADD COMMENT
app.post('/comments', (req:Request, res:Response) => {
  const data = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    connection.query('INSERT INTO comments SET ?', data, (err, result) => {
      if (err) {
        console.error(err);
        connection.release(); // release the connection back to the pool
        return res.status(500).send('Internal Server Error');
      }
      const insertedId = result.insertId;
      connection.query('SELECT * FROM comments WHERE id = ?', [insertedId], (err, results) => {
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
//-------------------UPDATE ARTICLE
app.patch('/articles/:id', (req:Request, res:Response) => {
  const id = req.params.id;
  const data = req.body;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    
    connection.query('UPDATE articles SET ? WHERE id = ?', [data, id], (err, result) => {
      connection.release(); // release the connection back to the pool
      
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).send('Article not found');
      }
      
      res.send(`Article updated with ID: ${id}`);
    });
  });
});
//-------------------DELETE ARTICLE
app.delete('/articles/:id', (req:Request, res:Response) => {
  const id = req.params.id;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    
    connection.query('DELETE FROM articles WHERE id = ?', id, (err, result) => {
      connection.release(); // release the connection back to the pool
      
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).send('Article not found');
      }
      
      res.send(`Article deleted with ID: ${id}`);
    });
  });
});
//-------------------DELETE COMMENT
app.delete('/comments/:id', (req:Request, res:Response) => {
  const id = req.params.id;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    
    connection.query('DELETE FROM comments WHERE id = ?', id, (err, result) => {
      connection.release(); // release the connection back to the pool
      
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).send('Comment not found');
      }
      
      res.send(`Comment deleted with ID: ${id}`);
    });
  });
});

//get("/article");---
//get(`/comments?articleId=${articleId}`);-----
//get("/articles");---
//post("/articles", data);----
//post("/comments", data);---
//patch(`/articles/${id}`, data);
//delete(`/articles/${id}`);
//delete(`/comments/${id}`);

// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//   host: "localhost",
//   port: "3306",
//   user: "root",
//   password: "123456",
//   database: "blog_db",
// });

// // READ ALL POSTS
// app.get("/articles", (req: Request, res: Response) => {
//   connection.connect(function (err) {
//     if (err) throw err;
//     connection.query("SELECT * FROM articles", function (err, result, fields) {
//       if (err) throw err;
//       res.send(result);
//     });
//   });
// });


// //get(`/articles/${Number(id)}`);
// app.get('/articles/:id', (req: Request, res: Response) => {
//   const id = req.params.id;
//   connection.connect(function (err) {
//     if (err) throw err
//   connection.query('SELECT * FROM articles WHERE id = ?', [id], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Internal Server Error');
//     }
//     if (results.length === 0) {
//       return res.status(404).send('Article not found');
//     }
//     res.json(results[0]);
//   });
//   });
// });