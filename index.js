const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

// middleware
app.use(cors())
app.use(express.json())//req.body

//ROUTES//

//create a list item (POST)
app.post("/santaslist", async(req,res) => {
    try {
        const { name, street, city, state, zipcode, naughty, nice } = req.body
        const newListItem = await pool.query("INSERT INTO listitems(name, street, city, state, zipcode, naughty, nice) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",[name, street, city, state, zipcode, naughty, nice])

        res.json(newListItem.rows[0])
    } catch (err){
        console.error(err.message)
    }
})

//get all list items (GET)

app.get("/santaslist", async(req, res) => {
    try {
        const allListItems = await pool.query("SELECT * FROM listitems")

        res.json(allListItems.rows)
    } catch(err){
        console.error(err.message)
    }
})

// get a single list item

app.get("/santaslist/:id", async(req, res) => {
    try {
        const {id} = req.params
         const listItem = await pool.query("SELECT * FROM listitems WHERE listitem_id = $1", [id])
       
         res.json(listItem.rows[0])
    } catch(err){
        console.error(err.message)
    }
})
//update a  list item

app.put("/santaslist/:id", async(req, res) => {
    try {
        const {id} = req.params
        const { name, street, city, state, zipcode, naughty, nice } = req.body
        const updateItem = await pool.query("UPDATE listitems SET (name, street, city, state, zipcode, naughty, nice) = ($1, $2, $3, $4, $5, $6, $7) WHERE listitem_id = $8", [name, street, city, state, zipcode, naughty, nice, id])

        res.json("santaslist was updated")
    } catch(err){
        console.error(err.message)
    }
})

//delete a list item

// app.destroy("/santaslist/:id", async(req, res) => {
//     try {
//         console.log(req.params)
//     } catch(err){
//         console.error(err.message)
//     }
// })

app.listen(5000, () => {
    console.log("Server has been started on port 5000")
})