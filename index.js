const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
// const bodyParser = require("body-parser").json()

// middleware
app.use(cors())
app.use(express.json())//req.body
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: true
//   }))

//ROUTES//

//create a list item (POST)
app.post("/santaslist", async(req,res) => {

    console.log(req)
    try {
        const { name, street, city, state, zipcode, naughty, nice } = req.body


        const newListItem = await pool.query("INSERT INTO listitems(name, street, city, state, zipcode, naughty, nice) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",[name, street, city, state, zipcode, naughty, nice])

        res.json(newListItem.rows)
    } catch (err){

        console.error(err.message)
    // }
}})

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
//update a  list item(PUT)

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

//delete a list item (DELETE)

app.delete("/santaslist/:id", async(req, res) => {
    try {
        const { id } = req.params

        const deleteItem = await pool.query("DELETE FROM listitems WHERE listitem_id = $1", [id]) 
        
        console.log(deleteItem)
        res.json(`person was deleted from santas list`)
    } catch(err){
        console.error(err.message)
    }
})


// app.delete("/santaslist", async(req, res) => {
//     try {
//         // const { id } = req.params

//         const deleteAll = await pool.query("TRUNCATE listitems") 
        
//         res.json("everyone was deleted")
//     } catch(err){
//         console.error(err.message)
//     }
// })
app.listen(process.env.PORT || 5000, () => {
    console.log("Server has been started on port 5000")
})

