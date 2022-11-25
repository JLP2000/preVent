const app = require("../app");
const request = require("supertest");

describe("Testing the entries API", () => {
    let api;
    let testEntry = {
        id: 2,
        gif: "",
        category: "general",
        entry: "I dislike the flavour of carrots",
        emoji: {
            happy: 0,
            laughing: 2,
            unhappy: 1
        },
        dnt: "",
        comments: []
    };

    let updatedEntry = {
        id: 1,
        gif: "",
        category: "general",
        entry: "I work on weekends",
        emoji: {
            happy: 0,
            laughing: 0,
            unhappy: 0
        },
        dnt: "",
        comments: ["Thats so unlucky, could never be me tho hahahahaha"]
    };


    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log("testing is on port 5000");
        });
    });

    afterAll((done) => {
        console.log("closing the testing server");
        api.close(done);
    });

    it("Testing the base URL expect code 200", (done) => {
        request(api)
            .get("/")
            .expect(200,done);
    });

    it("Testing the route /entries expect code 200 and initial data", (done) => {
        request(api)
            .get("/entries")
            .expect(200)
            .expect([{
                id: 1,
                gif: "https://media.giphy.com/media/3o6ZtaiPZNzrmRQ6YM/giphy.gif",
                category: "general",
                entry: "I work on weekends",
                emoji: {
                    happy: 0,
                    amused: 0,
                    shocked: 0,
                    angry: 0,
                    sad:0
                },
                dnt: "yesterday",
                comments: []
            },
            {
                id: 2,
                gif: "https://media.giphy.com/media/RKS1pHGiUUZ2g/giphy.gif",
                category: "relationships",
                entry: "I just bored",
                emoji: {
                    happy: 0,
                    amused: 0,
                    shocked: 0,
                    angry: 0,
                    sad:0
                },
                dnt: "today",
                comments: ["lol", "Try being entertained????"]
            },
            {
                id: 3,
                gif: "https://media.giphy.com/media/mTvM5tmcZa99s6IdOJ/giphy.gif",
                category: "school",
                entry: "Random data chicken nuggets mildred mildred",
                emoji: {
                    happy: 0,
                    amused: 0,
                    shocked: 0,
                    angry: 0,
                    sad:0
                },
                dnt: "yesterday",
                comments: ["this is so sad","i feel sorry for you", "random data i have no cleue waht to write i really need to have better creativity something oskemthing something not sire", "hello yall"]
            },
            {
                id: 4,
                gif: "https://media.giphy.com/media/iGYMk6qdeYby5uVqOe/giphy.gif",
                category: "family",
                entry: "Family",
                emoji: {
                    happy: 0,
                    amused: 0,
                    shocked: 0,
                    angry: 0,
                    sad:0
                },
                dnt: "yesterday",
                comments: ["this is so sad","i feel sorry for you", "random data i have no cleue waht to write i really need to have better creativity something oskemthing something not sire", "hello yall"]
            }], done);
    });

    it("testing posting to /entries expect code 201 and test entry", (done) => {
        request(api)
            .post("/entries")
            .send(testEntry)
            .expect(201)
            .expect({id:2, ...testEntry}, done);
    });

    it("updated", (done) => {
        request(api)
            .put("/entries/1")
            .send(updatedEntry)
            .expect(200)
            .expect(updatedEntry, done);
    });

    it("testing the catagories route expect 200 and catagories in general", (done) => {
        request(api)
            .get("/entries/category/general")
            .expect(200)
            .expect([
                {
                  id: 1,
                  gif: "",
                  category: 'general',
                  entry: 'I work on weekends',
                  emoji: { happy: 0, laughing: 0, unhappy: 0 },
                  dnt: '',
                  comments: [ 'Thats so unlucky, could never be me tho hahahahaha' ]
                },
                {
                  id: 2,
                  gif: "",
                  category: 'general',
                  entry: 'I dislike the flavour of carrots',
                  emoji: { happy: 0, laughing: 2, unhappy: 1 },
                  dnt: '',
                  comments: []
                }
              ], done);
    })

    it("Deletes an entry", async() => {
        await request(api)
                .delete("/entries/1")
                .expect(204);

        const updatedEntries = await request(api).get("/entries")
        expect(updatedEntries.body.length).toBe(4)
    })


    it ("Testing the route /entries/2 expect code 200 and correct info", (done) => {
        request (api)
            .get("/entries/2")
            .expect(200)
            .expect({
                id: 2,
                gif: "https://media.giphy.com/media/RKS1pHGiUUZ2g/giphy.gif",
                category: "relationships",
                entry: "I just bored",
                emoji: {
                    happy: 0,
                    amused: 0,
                    shocked: 0,
                    angry: 0,
                    sad:0
                },
                dnt: "today",
                comments: ["lol", "Try being entertained????"]
            }, done);
    });

    it("testing if the error is thrown when /entries/10 expect code 404", (done) => {
        request(api)
            .get("/entries/10")
            .expect(404)
            .expect({message: "There are no entries for this id"}, done);
    });

    it("testing if the error is thrown when /entries/category/hello expect code 404", (done) => {
        request(api)
            .get("/entries/category/hello")
            .expect(404)
            .expect({message: "There are no entries in this category"}, done);
    });

})
