require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

app.get("/usuarios", (req, res) => {

    db.query(
        "SELECT * FROM usuarios",
        (error, resultados) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json(resultados);

        }
    );

});

app.listen(3000, () => {
    console.log("Servidor iniciado en puerto 3000");
});