const entries = require("../data")

class Entry{   
    constructor(data){
        this.id = data.id
        this.category = data.category
        this.entry = data.entry
        this.emoji = data.emoji
        this.dnt = data.dnt
        this.comments = data.comments
    }

    static get all(){
        const allEntries = entries.map((entry) => new Entry(entry))
        return allEntries
    }

    static findById(id){
        const entryID = entries.filter((entry) => entry.id == id)[0]
        if(!id){
            return;
        }
        const foundEntry = new Entry(entryID)
        return foundEntry;
    }

    static findByCategory(target){
        const category = entries.filter((entry) => entry.category == target)
        if(!category){
            return;
        }
        const entries1 = category.map((entry) => new Entry(entry))
        return entries1;
    }

    static createEntry(entry){
        const EntryID = entry.length + 1
        const newEntry = new Entry({id: EntryID, ...entry})
        entries.push(newEntry);

        return newEntry;
    }

    update(EntryData){
        const changingEntry = entries.find((entry) => this.id == entry.id)
        const entryID = changingEntry.id;
        const updatedEntry = new Entry({id: entryID, ...EntryData})
        entries.splice(entries.indexOf(changingEntry), 1 , updatedEntry)
        return updatedEntry
    }

    // static updateComments(comment){
    //     const targetEntry = entries.find((entry) => entry.id === this.id)
    //     targetEntry.comments.push(comment)
        
    //     return targetEntry;
    // }

    // static updateEmojiCount(emojiType){
    //     const targetEntry = entries.find((entry) => entry.id === this.id)
    //     targetEntry.emoji[emojiType]++;

    //     return targetEntry;
    // }
}

module.exports = Entry;
