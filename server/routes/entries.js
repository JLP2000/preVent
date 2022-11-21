const express = require('express');
const router = express.Router(); // a router instance is a complete middleware and routing system
const Entry = require("../models/entries")

router.get('/', (req, res) => {
    const entries = Entry.all;
    res.send(entries);
}) 

router.post('/', (req, res) => {
    const data = req.body;
    const newEntry = Entry.createEntry(data);
    res.status(201).send(newEntry)
})

router.get("/category/:category", (req, res) => {
    try{
        const category = req.params.category;
        const selectedCategory = Entry.findByCategory(category)
        if(!selectedCategory){
            throw new Error("There are no entries in this category")
        }
        else{
            res.send(selectedCategory)
        }
    } catch(err) {
        console.log(err);
        res.status(404).send({message: err.message})
    }
})

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const newEntry = req.body;
    const changingEntry = Entry.findById(id)
    const changedEntry = changingEntry.update(newEntry);
    res.status(200).send(changedEntry);
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const targetEntry = Entry.findById(id)
    targetEntry.delete()
    res.status(204).send();
})

module.exports = router;
