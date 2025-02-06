const { default: mongoose } = require("mongoose");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT;

(async () => {
    await mongoose.connect(process.env.DB_URI)
    console.log("Database Connected Successfully :)")
})()

app.listen(port , () => {
    console.log(`Server Listening On Port ${port}...`);
})