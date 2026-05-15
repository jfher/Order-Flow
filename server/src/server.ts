import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes/app.routes";
import { errorHandler } from "./middlewares/error.middleware";


dotenv.config();

const PORT = process.env.PORT || 3001;
const rootPath = process.env.ROOT_PATH;

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: "*", // en dev
    credentials: true,
}));

app.use(`${rootPath}`, router);
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})