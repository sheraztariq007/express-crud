import express from "express";

import { userRouter } from "./users";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 4000;
app.use("/api/", userRouter);

app.listen(port, () => {
    // tslint:disable-next-line:no-console
   console.log(`Express is listening at http://localhost:${port}`);
});
