import { Request, Response } from "express";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/planets");

const setupDb = async () => {
  await db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets (
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);

  const planets = await db.many(`SELECT * FROM planets;`);
};
setupDb();

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  res.json(planets);
};

const getOneById = async (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id, 10);
  const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1`, planetId);
  res.json(planet);
};

const create = (req: Request, res: Response) => {
  const newPlanet = req.body;
  //planets.push(newPlanet);
  res.status(201).json({ msg: "Planet created successfully" });
};

const updateById = (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id, 10);
  //const planetIndex = planets.findIndex((p) => p.id === planetId);
  //planets[planetIndex] = req.body;
  res.json({ msg: "Planet updated successfully" });
};

const deleteById = (req: Request, res: Response) => {
  const planetId = req.params.id;
  //planets = planets.filter((planet) => String(planet.id) !== planetId);
  res.json({ msg: "Planet deleted successfully" });
};

export { getAll, getOneById, create, updateById, deleteById };
