"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { MongodbConnection } from "./config/database-config";
const dotenv_1 = require("dotenv");
const user_routes_1 = __importDefault(require("./routes/user-routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 8080;
//connect to the database
// MongodbConnection.connect(process.env.DATABASE_URL as string);
app.get("/", (req, res) => {
    res
        .status(200)
        .json({ success: true, message: "Bima Vault API is running successfully" });
});
app.use("/user", user_routes_1.default);
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});
