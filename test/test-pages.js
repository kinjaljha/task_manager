var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);

before(function(done) {
    chai.request(server)
        .post("/users/login")
        .send({ email: "arya@gmail.com", password: "arya" })
        .end(function(err, res) {
            res.status.should.equal(200);
            token = res.body.token;
            res.type.should.equal("application/json");
            done();
        });
});

describe("CRUD OPERATIONS", function() {
    var tasks = [
        {
            task_name: "task3",
            assigned_member: "john",
            email: "arya@gmail.com",
            status: "Pending"
        }
    ];
    it("Should add Task in DB", done => {
        for (task in tasks) {
            chai.request(server)
                .post("/tasks")
                .set("x-access-token", token)
                .send(tasks[task])
                .end((err, res) => {
                    res.should.have.status(201);
                    console.log("Response Body:", res.body);
                });
        }
        done();
    });
});

describe("/GET tasks", () => {
    it("it should GET all the tasks", done => {
        chai.request(server)
            .get("/tasks")
            .set("x-access-token", token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                // res.body.data.should.have.lengthOf(1);
                done();
            });
    });
});
