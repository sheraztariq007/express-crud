import express, { Router, Response } from "express";
import VError from "verror";
import { PrismaClient } from "@prisma/client";
import { ResponseWrapper } from "./Domain/Response";
import { User } from "./Domain/User";

const userRouter: Router = express.Router();
const prisma = new PrismaClient();

userRouter.post("/user", async (req, res: Response<ResponseWrapper<User>>) => {
  try {
    const user: User = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
      },
    });
    const object: ResponseWrapper<User> = { error: null, response: user };
    res.json(object);
  } catch (error) {
    const cause = new VError(error, null, error.message);
    res.json({ error: cause, response: null });
  }
});

userRouter.delete(
  "/user/:user_id",
  async (req, res: Response<ResponseWrapper<User>>) => {
    try {
      const user: User = await prisma.user.delete({
        where: {
          id: +req.params.user_id,
        },
      });
      res.json({ error: null, response: user });
    } catch (error) {
      const cause = new VError(error, null, error.message);
      res.json({ error: cause, response: null });
    }
  }
);

userRouter.put(
  "/user/:user_id",
  async (req, res: Response<ResponseWrapper<User>>) => {
    try {
      const user: User = await prisma.user.update({
        where: {
          id: +req.params.user_id,
        },
        data: {
          email: req.body.email,
          name: req.body.name,
        },
      });
      res.json({ error: null, response: user });
    } catch (error) {
      const cause = new VError(error, null, error.message);
      res.json({ error: cause, response: null });
    }
  }
);

userRouter.get(
  "/users",
  async (req, res: Response<ResponseWrapper<User[]>>) => {
    try {
      const users: User[] = await prisma.user.findMany();
      res.json({ error: null, response: users });
    } catch (error) {
      const cause = new VError(error, null, error.message);
      res.json({ error: cause, response: null });
    }
  }
);

export { userRouter };
