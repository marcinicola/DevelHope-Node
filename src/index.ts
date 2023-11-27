import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import Joi from "joi";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./controllers/planets";
import "express-async-errors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const planetSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

const validatePlanet = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", validatePlanet, create);

app.put("/api/planets/:id", validatePlanet, updateById);

app.delete("/api/planets/:id", deleteById);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
