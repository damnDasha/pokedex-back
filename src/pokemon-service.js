const PokemonsService = {
  getAllPokemons(knex) {
    return knex.select("*").from("pokemons");
  },

  insertPokemon(knex, newPokemon) {
    return knex
      .insert(newPokemon)
      .into("pokemons")
      .returning("*")
      .then((pokemon) => {
        return pokemon[0];
      });
  },

  getByPokemonId(knex, id) {
    return knex.from("pokemons").select("*").where("id", id).first();
  },

  deletePokemon(knex, id) {
    return knex("pokemons")
      .where({
        id,
      })
      .delete();
  },

  updatePokemon(knex, id, newPokemonFields) {
    return knex("pokemons")
      .where({
        id,
      })
      .update(newPokemonFields);
  },
};

module.exports = PokemonsService;
