import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
const db = new sqlite3.Database("./database/todo.sqlite");

// Create a table (if not exists)
db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 0
)`);

// Get todos
app.get("/todos", (req, res) => {
	db.all("SELECT * FROM todos", (err, rows) => {
		if (err) return res.status(500).send(err);
		res.json(rows);
	});
});

// Add todo
app.post("/todos", (req, res) => {
	const { title, completed } = req.body;
	db.run(
		"INSERT INTO todos (title, completed) VALUES (?, ?)",
		[title, completed],
		function (err) {
			if (err) return res.status(500).send(err);
			res.json({ id: this.lastID, title, completed });
		}
	);
});

// Update todo
app.put("/todos/:id", (req, res) => {
	const { id } = req.params;
	const { completed } = req.body;

	db.run(
		"UPDATE todos SET completed = ? WHERE id = ?",
		[completed, id],
		function (err) {
			if (err) return res.status(500).send(err);
			res.json({ id, completed });
		}
	);
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
	const { id } = req.params;
	db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
		if (err) return res.status(500).send(err);
		res.json({ id });
	});
});

// Delete completed todos
app.delete("/todos", (req, res) => {
	db.run("DELETE FROM todos WHERE completed = 1", function (err) {
		if (err) return res.status(500).send(err);
		res.json({ deleted: this.changes });
	});
});

// Start the server
app.listen(3001, () => console.log("Server running on port 3001"));
