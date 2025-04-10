const express = require("express")

const user = require("./routes/user")
const product = require("./routes/product")
// const cookieParser = require("cookie-parser")

const app = express()

if (process.env.MODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" })
}

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "20mb", extended: true }))

// app.use(cookieParser())

// app.use("/eshop/", product)
app.use("/eshop/user",user)


module.exports = app