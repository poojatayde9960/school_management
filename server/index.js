const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser") //backend mdhn  frontend la tokan access krnyasathi  cookie parser 
require("dotenv").config()
const app = express()

app.use(cookieParser())
app.use(express.json())


app.use(cors({
    origin: true,  // Exact frontend URL
    credentials: true,                // Allow credentials (cookies)
}));


app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/auth", require("./routes/admin.routes"))
app.use("/api/application", require("./routes/application.routes"))

app.use((req, res) => {
    res.status(404).json({ message: "Resouece Not Found" })
})

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message || "something Went Wrong" })
})
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MONGOOSE CONNECTION SUCCESS"))
    .catch((err) => console.log(err))

if (require.main === module) {
    mongoose.connection.once("open", () => {
        app.listen(process.env.PORT, console.log("SERVER RUNNING", process.env.PORT))
    })
}

module.exports = app




