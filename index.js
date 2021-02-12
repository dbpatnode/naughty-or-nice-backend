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
        console.log(err.message)
    }
})

//get all list items

// get a single list item

//update a  list item

//delete a list item

app.listen(5000, () => {
    console.log("Server has been started on port 5000")
})