import express from "express"
import "dotenv/config"
import cors from "cors"
import mongoose from "mongoose"
import { UserRoute } from "./routes/user.route.js"

const app = express()
const PORT = process.env.PORT || 3000

// middlewares
app.use(express.json())
app.use(cors())

// apis / routes
app.use("/", UserRoute)

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
  console.log("DB Connected")
  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
  })
})
.catch((err) => {
  console.error("MongoDB connection error:", err)
  process.exit(1)
})