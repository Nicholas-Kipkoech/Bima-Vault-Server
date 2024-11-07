"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const database_config_1 = require("./config/database-config");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 8080;
//connect to the database
database_config_1.MongodbConnection.connect(process.env.DATABASE_URL);
app.get("/", (req, res) => {
    res
        .status(200)
        .json({ success: true, message: "Bima Vault API is running successfully" });
});
app.use("/user", user_routes_1.default);
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});
