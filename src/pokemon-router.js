const express = require("express");
const pokemonsRouter = express.Router();
const PokemonsService = require("./pokemons-service");

const serializePokemons = (pokemon) => ({
  id: pokemon.id,
  title: pokemon.title,
  superpower: pokemon.superpower,
  age: pokemon.age,
});

pokemonsRouter
  .route("/:id")
  .all(requireAuth)
  .get((req, res, next) => {
    PokemonsService
      // .getAllPokemons(req.app.get('db'))
      .getByPokemonId(req.app.get("db"), req.params.id)
      .then((pokemon) => {
        if (!pokemon)
          return res.status(404).json({
            error: {
              message: "pokemon does not exist...im cry",
            },
          });
        else {
          res.status(201).json(pokemon);
        }
      })
      .catch(next);
  })
  .post((req, res, next) => {
    const { title, superpower, age } = req.body;
    const pokemon = {
      title,
      superpower,
      age,
    };
    if (!title) {
      return res.status(404).json({
        error: "must include pokemon name",
      });
    }
    if (!superpower) {
      return res.status(404).json({
        error:
          "must include pokemon superpower, like, what can they do... and stuff",
      });
    }
    if (!age) {
      return res.status(404).json({
        error: "must include age i guess.. do they even age?",
      });
    }
    PokemonsService.updatepokemon(req.app.get("db"), pokemon).catch(next);
  })

  .delete((req, res, next) => {
    console.log(req.params.id);

    PokemonsService.deletepokemon(req.app.get("db"), req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

pokemonsRouter
  .route("/")
  .get((req, res, next) => {
    PokemonsService.getAllPokemons(req.app.get("db"))
      .then((pokemons) => {
        res.json(pokemons.map(serializePokemons));
      })
      .catch(next);
  })
  .post((req, res, next) => {
    const { title } = req.body;
    const newPokemon = {
      title,
      superpower,
      age,
    };
    if (!title) {
      return res.status(404).json({
        error: {
          message: "must include pokemon",
        },
      });
    }

    if (!superpower) {
      return res.status(404).json({
        error:
          "must include pokemon superpower, like, what can they do... and stuff",
      });
    }
    if (!age) {
      return res.status(404).json({
        error: "must include age i guess.. do they even age?",
      });
    }

    (newPokemon.title = title),
      (newPokemon.superpower = superpower),
      (newPokemon.age = age);

    pokemonsService
      .insertpokemon(req.app.get("db"), newPokemon)
      .then((pokemon) => {
        res.status(201).json(serializePokemons(pokemon));
      })
      .catch(next);
  });

module.exports = pokemonsRouter;
