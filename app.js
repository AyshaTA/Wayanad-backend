const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const adminModel = require("./models/admin")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://ayshata2002:ayshata2002@cluster0.zqsv2.mongodb.net/wayanaddb?retryWrites=true&w=majority&appName=Cluster0")


app.post("/viewall", (req, res) => {
    let token = req.headers.token
    jwt.verify(token, "rescue-app",
        (error, decoded) => {
            if (decoded && decoded.email) {
                peopleModel.find().then(
                    (items) => {
                        res.json(items)
                    }
                ).catch(
                    (error) => {
                        res.json({ "status": "error" })
                    }
                )

            } else {
                res.json({ "status": "invalid authentication" })
            }

        }
    )
})



app.post("/addPeople", (req, res) => {
    let input = req.body
    let token = req.headers.token
    jwt.verify(token, "rescue-app",
        (error, decoded) => {
            if (decoded && decoded.email) {
                let result = new peopleModel(input)
                result.save()
                res.json({ "status": "success" })
            } else {
                res.json({ "status": "failed" })
            }
        }
    )
})



app.post("/adminSignUp", (req, res) => {
    let input = req.body
    let hashedPassword = bcrypt.hashSync(input.password, 10)
    input.password=hashedPassword
    console.log(input)
    let result = new adminModel(input)
    result.save()
    res.json({ "status": "succes" })
})

app.post("/adminSignIn",async(req,res) => {
    let input = req.body
    let result = adminModel.find({ email: input.email }).then(
        (response) => {
            if (response.length > 0) {
                const validator = bcrypt.compareSync(input.password, response[0].password)
                if (validator) {
                    jwt.sign({ email: input.email }, "rescue-app", { expiresIn: "2d" },
                        (error, token) => {
                            if (error) {
                                res.json({ "status": "invalid authentication" })
                            } else {
                                res.json({ "status": "success", "token": token })
                            }
                        }
                    )
                } else {
                    res.json({ "status":"invalid password"})
                }
            } else {
                res.json({ "status": "invalid email" })
            }
        }
    ).catch(
        (error) => {
            res.json({ "status": "error" })
        }
    )
})

app.listen(8080, () => {
    console.log("server started")
})