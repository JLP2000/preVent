const app = require("../app");
const request = require("supertest");

describe("Testing the entries API", () => {
    let api;
    let testEntry = {
        id: 2,
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
                category: "general",
                entry: "I work on weekends",
                emoji: {
                    happy: 0,
                    laughing: 0,
                    unhappy: 0
                },
                dnt: "",
                comments: []
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
                  category: 'general',
                  entry: 'I work on weekends',
                  emoji: { happy: 0, laughing: 0, unhappy: 0 },
                  dnt: '',
                  comments: [ 'Thats so unlucky, could never be me tho hahahahaha' ]
                },
                {
                  id: 2,
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
        expect(updatedEntries.body.length).toBe(1)
    })

    it("testing posting to /entries expect code 201 and test entry", (done) => {
        request(api)
            .post("/entries")
            .send(testEntry)
            .expect(201)
            .expect({id:3, ...testEntry}, done);
    });
})
