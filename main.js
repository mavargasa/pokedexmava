$(document).ready(function() {
  const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
  const $pokemonList = $('#pokemonList');
  const $pokeName = $('#pokeName');
  const $searchPokemon = $('#searchPokemon');
  const $borrarPokemon = $('#borrarPokemon');
  const $app = $('#app');
  const displayedPokemons = []; // Array para almacenar los Pokémon mostrados en pantalla

  $searchPokemon.click(insertarPokemon);
  $borrarPokemon.click(borrarPokemon);

  function insertarPokemon() {
    const pokemonName = $pokeName.val().toLowerCase();

    // Comprobar si el Pokémon ya está en pantalla
    if (displayedPokemons.includes(pokemonName)) {
      alert('Este Pokémon ya está en pantalla');
      return;
    }

    $.getJSON(`${baseURL}${pokemonName}`)
      .done(function(data) {
        const $card = $('<div class="col-md-4 mb-4">');
        const $cardBody = $('<div class="card-body">');
        const $cardTitle = $('<h5 class="card-title">').text(data.name);
        const $cardText = $('<p class="card-text">').text('Tipo: ' + data.types.map(type => type.type.name).join(', '));
        const $cardLink = $('<a href="#" class="card-link">').text('Ver detalles');

        $cardLink.click(function() {
          showDetails(data);
        });

        $cardBody.append($cardTitle, $cardText, $cardLink);
        $card.append($cardBody);
        $pokemonList.append($card);

        displayedPokemons.push(pokemonName); // Agregar el Pokémon al array de mostrados en pantalla
      })
      .fail(function() {
        alert('Este Pokémon no está disponible');
      });
  }

  function showDetails(pokemon) {
    $('#modalTitle').text(pokemon.name);
    $('#modalImage').attr('src', pokemon.sprites.front_default);
    $('#modalWeight').text(pokemon.weight);
    $('#modalType').text(pokemon.types.map(type => type.type.name).join(', '));
    $('#modalAbilities').empty();
    $('#modalWeaknesses').empty();

    pokemon.abilities.forEach(function(ability) {
      $('#modalAbilities').append($('<li>').text(ability.ability.name));
    });

    $.getJSON(`${baseURL}${pokemon.id}`)
      .done(function(data) {
        data.types.forEach(function(typeData) {
          $.getJSON(typeData.type.url)
            .done(function(typeInfo) {
              typeInfo.damage_relations.double_damage_from.forEach(function(weakness) {
                $('#modalWeaknesses').append($('<li>').text(weakness.name));
              });
            });
        });
      });

    $('#pokemonModal').modal('show');
  }

  function borrarPokemon() {
    $pokemonList.empty();
    displayedPokemons.length = 0; // Vaciar el array de mostrados en pantalla
  }
});
