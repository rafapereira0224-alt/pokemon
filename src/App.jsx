import { useState } from "react";
import "./App.css";
import PokemonCard from "./Components/PokemonCard/PokemonCard";
import pokemons from "./Data/pokemons";

function App() {
  const [listaPokemons, setListaPokemons] = useState([
    {
      nome: "Charmander",
      estagio: 1,
      caminhoImagem: pokemons["Charmander"].imagem,
    },
    {
      nome: "Squirtle",
      estagio: 1,
      caminhoImagem: pokemons["Squirtle"].imagem,
    },
    {
      nome: "Bulbasauro",
      estagio: 1,
      caminhoImagem: pokemons["Bulbasauro"].imagem,
    },
    {
      nome: "Totodile",
      estagio: 1,
      caminhoImagem: pokemons["Totodile"].imagem,
    },
    {
      nome: "Vulpix",
      estagio: 1,
      caminhoImagem: pokemons["Vulpix"].imagem,
    },

    {
      nome: "Cyndaquil",
      estagio: 1,
      caminhoImagem: pokemons["Cyndaquil"].imagem,
    },


  ]);

  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [busca, setBusca] = useState("");

  const qtdEvoluidos = listaPokemons.filter((p) => p.estagio > 1).length;

  const listaFiltrada = listaPokemons.filter((p) => {
    const filtroTipoOk =
      filtroTipo === "Todos" || pokemons[p.nome].tipo === filtroTipo;
    const filtroNomeOk = p.nome.toLowerCase().includes(busca.toLowerCase());
    return filtroTipoOk && filtroNomeOk;
  });

  const coresTipos = {
    Todos: "#808080",
    fogo: "#ff4500",
    agua: "#1e90ff",
    planta: "#2ecc71",
  };
  function evoluirPokemon(nomePokemon) {
    const novaLista = listaPokemons.map((pokemon) => {
      if (pokemon.nome === nomePokemon) {
        const proximaEvolucao = pokemons[pokemon.nome].evolucao;
        if (!proximaEvolucao) return pokemon;
        return {
          nome: proximaEvolucao,
          estagio: pokemon.estagio + 1,
          caminhoImagem: pokemons[proximaEvolucao].imagem,
        };
      }
      return pokemon;
    });
    setListaPokemons(novaLista);
  }

  return (
    <>
      <h1>Pokemons!</h1>
      <h2>Quantidade de pokemons evoluidos: {qtdEvoluidos}</h2>
      <br />
      <div
        className="busca-container"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "20px",
            border: "none",
            width: "250px",
          }}
        />
      </div>

      <div className="filtros">
        {["Todos", "fogo", "agua", "planta"].map((tipo) => (
          <button
            key={tipo}
            className={filtroTipo === tipo ? "ativo" : ""}
            onClick={() => setFiltroTipo(tipo)}
            style={{ backgroundColor: coresTipos[tipo] }}
          >
            {tipo.toUpperCase()}
          </button>
        ))}
      </div>

      <section id="center">
        {listaFiltrada.map((pokemon, index) => (
          <PokemonCard
            key={index}
            nome={pokemon.nome}
            estagio={pokemon.estagio}
            caminhoImagem={pokemon.caminhoImagem}
            tipo={pokemons[pokemon.nome].tipo}
            evoluirPokemon={() => evoluirPokemon(pokemon.nome)}
          />
        ))}
      </section>
    </>
  );
}

export default App;
