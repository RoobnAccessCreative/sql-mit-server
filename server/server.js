import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.listen(8080, () => {
  console.log("Der Port ist 8080, wilkommen!");
});

const db = new pg.Pool({
  connectionString: process.env.DB_URL,
});

app.get("/", (req, res) => {
  res.json({
    sender: "The Table",
    message: "I'm not just the greatest, I'm the..",
    goTo: "/synonyms",
  });
});

app.get("/synonyms", async (req, res) => {
  const query = await db.query(
    "SELECT syn_name FROM the_best_table_of_them_all WHERE rating > 5"
  );
  res.json(query.rows);
});

app.get("/gimme", async (req, res) => {
  const query = await db.query("SELECT * FROM the_best_table_of_them_all");
  res.json(query.rows);
});

app.post("/flatterMe", (req, res) => {
  const insert = req.body;
  insert.example = insert.example ? insert.example : "";
  const query = db.query(
    `INSERT INTO the_best_table_of_them_all (syn_name, example, rating) VALUES($1, $2, $3)`,
    [insert.syn_name, insert.example, insert.rating]
  );
  const response = res.json(query);
});

app.get("/pokemon", (req, res) => {
  const colqry = req.query.colour;
  const monqry = req.query.name;
  console.log(colqry);
  let allPokemon = [
    { name: "Pikachu", colour: "yellow" },
    { name: "Charmander", colour: "red" },
    { name: "Squirtle", colour: "blue" },
    { name: "Horsea", colour: "blue" },
    { name: "Jolteon", colour: "yellow" },
  ];

  colqry
    ? (allPokemon = allPokemon.filter((mon) => mon.colour === colqry))
    : null;

  console.log(allPokemon);

  monqry
    ? (allPokemon = allPokemon.filter(
        (mon) => mon.name.toLowerCase() === monqry
      ))
    : null;

  console.log(allPokemon);

  res.json(allPokemon);
});
