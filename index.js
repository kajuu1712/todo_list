const express = require("express");
const app = express();
const {v4: uuidv4} = require("uuid");
const methodOverride = require("method-override");
let port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

app.use(methodOverride("_method"));

let tasks = [
    
];
app.listen(port, () => {
    console.log("Listining to port : ",port);
});
app.get("/tasks", (req, res) => {
    res.render("index.ejs", {tasks});
});
app.post("/tasks", (req, res) => {
    let task = req.body.task;
    let id = uuidv4();
    tasks.push({task, id});
    res.redirect("/tasks");
});
app.delete("/tasks/:id", (req, res) => {
    let {id} = req.params;
    tasks = tasks.filter((t) => id !== t.id);
    res.redirect("/tasks");
});