$(document).ready(function() {
  const $pokemonList = $('#pokemonList');

  function renderPokemonList(pokemonList) {
    $pokemonList.empty();

    pokemonList.forEach(function(pokemon) {
      const $card = $('<div class="col-md-4 mb-4">');
      const $cardBody = $('<div class="card-body">');
      const $cardTitle = $('<h5 class="card-title">').text(pokemon.name);
      const $cardText = $('<p class="card-text">').text('Tipo: ' + pokemon.type.join(', '));
      const $cardLink = $('<a href="#" class="card-link">').text('Ver detalles');

      $cardLink.click(function() {
        showDetails(pokemon);
      });

      $cardBody.append($cardTitle, $cardText, $cardLink);
      $card.append($cardBody);
      $pokemonList.append($card);
    });
  }

  function showDetails(pokemon) {
    $('#modalTitle').text(pokemon.name);
    $('#modalImage').attr('src', pokemon.ThumbnailImage);
    $('#modalWeight').text(pokemon.weight);
    $('#modalType').text(pokemon.type.join(', '));
    $('#modalAbilities').empty();
    $('#modalWeaknesses').empty();

    pokemon.abilities.forEach(function(ability) {
      $('#modalAbilities').append($('<li>').text(ability));
    });

    pokemon.weakness.forEach(function(weakness) {
      $('#modalWeaknesses').append($('<li>').text(weakness));
    });

    $('#pokemonModal').modal('show');
  }

  $.getJSON('data.json', function(data) {
    renderPokemonList(data);
  });
});
