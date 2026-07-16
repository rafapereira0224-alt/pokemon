import { useState, useRef, useEffect } from "react";
import "./App.css";
import PokemonCard from "./Components/PokemonCard/PokemonCard";
import pokemons from "./Data/pokemons";
import { tocarSomEvolucao } from "./Utils/SomEvolucao";

const TIPOS = [
  "Todos",
  "Favoritos",
  "fogo",
  "agua",
  "planta",
  "eletrico",
  "normal",
  "fada",
  "fantasma",
  "psiquico",
  "dragao",
  "terra",
  "gelo",
  "sombrio",
  "aco",
  "veneno",
  "inseto",
  "voador",
  "lutador",
];

const CORES_TIPOS = {
  Todos: "#808080",
  Favoritos: "#ff4757",
  fogo: "#ff4500",
  agua: "#1e90ff",
  planta: "#2ecc71",
  eletrico: "#f4d02c",
  normal: "#a8a878",
  fada: "#ee99ac",
  fantasma: "#705898",
  psiquico: "#f85888",
  dragao: "#7038f8",
  terra: "#e0c068",
  gelo: "#98d8d8",
  sombrio: "#705848",
  aco: "#b8b8d0",
  veneno: "#a040a0",
  inseto: "#a8b820",
  voador: "#a890f0",
  lutador: "#c03028",
};

const NOMES_INICIAIS = [
  "Charmander",
  "Squirtle",
  "Bulbasauro",
  "Totodile",
  "Vulpix",
  "Cyndaquil",
  "Kyogre",
  "Popplio",
  "Froakie",
  "Magikarp",
  "Ho-Oh",
  "Litten",
  "Growlithe",
  "Chimchar",
  "Shaymin",
  "Exeggcute",
  "Treecko",
  "Zapdos",
  "Tapu Koko",
  "Pichu",
  "Shinx",
  "Arceus",
  "Rattata de Alola",
  "Munchlax",
  "Eevee",
  "Happiny",
  "Xerneas",
  "Tapu Lele",
  "Sylveon",
  "Ralts",
  "Togepi",
  "Giratina",
  "Lunala",
  "Gastly",
  "Mimikyu",
  "Litwick",
  "Mewtwo",
  "Raichu de Alola",
  "Abra",
  "Espeon",
  "Beldum",
  "Rayquaza",
  "Drampa",
  "Dratini",
  "Gible",
  "Bagon",
  "Groudon",
  "Diglett de Alola",
  "Trapinch",
  "Mudkip",
  "Drilbur",
  "Articuno",
  "Vulpix de Alola",
  "Lapras",
  "Sneasel",
  "Glaceon",
  "Darkrai",
  "Meowth de Alola",
  "Umbreon",
  "Larvitar",
  "Dialga",
  "Solgaleo",
  "Riolu",
  "Onix",
  "Nihilego",
  "Mareanie",
  "Nidoran Macho",
  "Zubat",
  "Genesect",
  "Grubbin",
  "Scyther",
  "Larvesta",
  "Caterpie",
  "Lugia",
  "Pidgey",
  "Starly",
  "Fletchling",
  "Terrakion",
  "Crabrawler",
  "Machop",
  "Mankey",
];

const LISTA_INICIAL = NOMES_INICIAIS.map((nome) => ({
  nome,
  nomeBase: nome,
  estagio: 1,
  caminhoImagem: pokemons[nome].imagem,
}));

const CHAVE_LISTA = "pokemonApp_lista";
const CHAVE_FAVORITOS = "pokemonApp_favoritos";

function carregarListaSalva() {
  try {
    const salvo = localStorage.getItem(CHAVE_LISTA);
    if (!salvo) return LISTA_INICIAL;

    const listaSalva = JSON.parse(salvo);
    if (
      !Array.isArray(listaSalva) ||
      listaSalva.length !== NOMES_INICIAIS.length
    ) {
      return LISTA_INICIAL;
    }

    return listaSalva.map((item) => ({
      nome: item.nome,
      estagio: item.estagio,
      caminhoImagem: pokemons[item.nome].imagem,
    }));
  } catch {
    return LISTA_INICIAL;
  }
}

function carregarFavoritosSalvos() {
  try {
    const salvo = localStorage.getItem(CHAVE_FAVORITOS);
    if (!salvo) return [];
    const favoritos = JSON.parse(salvo);
    return Array.isArray(favoritos) ? favoritos : [];
  } catch {
    return [];
  }
}

function App() {
  const [listaPokemons, setListaPokemons] = useState(LISTA_INICIAL);
  const [favoritos, setFavoritos] = useState(carregarFavoritosSalvos);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("nome");

  const filtrosRef = useRef(null);
  const larguraBlocoRef = useRef(0);
  const timeoutScrollRef = useRef(null);
  const arrastandoRef = useRef(false);
  const posInicialXRef = useRef(0);
  const scrollInicialRef = useRef(0);

  useEffect(() => {
    const container = filtrosRef.current;
    if (!container) return;
    const largura = container.scrollWidth / 3;
    larguraBlocoRef.current = largura;
    container.scrollLeft = largura;
  }, []);

  useEffect(() => {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
  }, [favoritos]);

  function scrollFiltros(direcao) {
    if (filtrosRef.current) {
      filtrosRef.current.scrollBy({ left: direcao * 220, behavior: "smooth" });
    }
  }

  function ajustarLoop() {
    const container = filtrosRef.current;
    const largura = larguraBlocoRef.current;
    if (!container || !largura) return;

    if (container.scrollLeft <= 0) {
      container.scrollLeft += largura;
    } else if (container.scrollLeft >= largura * 2) {
      container.scrollLeft -= largura;
    }
  }

  function handleScrollFiltros() {
    clearTimeout(timeoutScrollRef.current);
    timeoutScrollRef.current = setTimeout(ajustarLoop, 120);
  }

  function iniciarArraste(clientX) {
    arrastandoRef.current = true;
    posInicialXRef.current = clientX;
    scrollInicialRef.current = filtrosRef.current.scrollLeft;
    filtrosRef.current.classList.add("arrastando");
  }

  function moverArraste(clientX) {
    if (!arrastandoRef.current) return;
    const delta = clientX - posInicialXRef.current;
    filtrosRef.current.scrollLeft = scrollInicialRef.current - delta;
  }

  function pararArraste() {
    if (!arrastandoRef.current) return;
    arrastandoRef.current = false;
    filtrosRef.current.classList.remove("arrastando");
    handleScrollFiltros();
  }

  function handleMouseDown(e) {
    iniciarArraste(e.clientX);
  }
  function handleMouseMove(e) {
    if (arrastandoRef.current) e.preventDefault();
    moverArraste(e.clientX);
  }
  function handleMouseUp() {
    pararArraste();
  }
  function handleMouseLeave() {
    pararArraste();
  }
  function handleTouchStart(e) {
    iniciarArraste(e.touches[0].clientX);
  }
  function handleTouchMove(e) {
    moverArraste(e.touches[0].clientX);
  }
  function handleTouchEnd() {
    pararArraste();
  }

  function alternarFavorito(index) {
    setFavoritos((atual) =>
      atual.includes(index)
        ? atual.filter((i) => i !== index)
        : [...atual, index],
    );
  }

  const qtdEvoluidos = listaPokemons.filter((p) => p.estagio > 1).length;

  const contagemPorTipo = TIPOS.reduce((acc, tipo) => {
    if (tipo === "Todos") {
      acc[tipo] = listaPokemons.filter((p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase()),
      ).length;
    } else if (tipo === "Favoritos") {
      acc[tipo] = listaPokemons.filter(
        (p, i) =>
          favoritos.includes(i) &&
          p.nome.toLowerCase().includes(busca.toLowerCase()),
      ).length;
    } else {
      acc[tipo] = listaPokemons.filter(
        (p) =>
          pokemons[p.nome].tipo === tipo &&
          p.nome.toLowerCase().includes(busca.toLowerCase()),
      ).length;
    }
    return acc;
  }, {});

  const listaFiltrada = listaPokemons
    .map((p, index) => ({ ...p, index }))
    .filter((p) => {
      const filtroNomeOk = p.nome.toLowerCase().includes(busca.toLowerCase());
      if (filtroTipo === "Todos") return filtroNomeOk;
      if (filtroTipo === "Favoritos")
        return favoritos.includes(p.index) && filtroNomeOk;
      return pokemons[p.nome].tipo === filtroTipo && filtroNomeOk;
    });

  const listaOrdenada = [...listaFiltrada].sort((a, b) => {
    if (ordenacao === "nome") {
      return a.nome.localeCompare(b.nome);
    }
    if (ordenacao === "tipo") {
      return pokemons[a.nome].tipo.localeCompare(pokemons[b.nome].tipo);
    }
    if (ordenacao === "estagio") {
      return b.estagio - a.estagio;
    }
    return 0;
  });

  function evoluirPokemon(nomePokemon) {
    const novaLista = listaPokemons.map((pokemon) => {
      if (pokemon.nome === nomePokemon) {
        const proximaEvolucao = pokemons[pokemon.nome].evolucao;
        if (!proximaEvolucao) return pokemon;

        tocarSomEvolucao();

        return {
          nome: proximaEvolucao,
          nomeBase: pokemon.nomeBase,
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
      <h1>Pokemons</h1>
      <h2>Quantidade de pokemons evoluidos: {qtdEvoluidos}</h2>
      <br />
      <div
        className="busca-container"
        style={{
          textAlign: "center",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
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

        <select
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          <option value="nome">Ordenar por Nome</option>
          <option value="tipo">Ordenar por Tipo</option>
          <option value="estagio">Ordenar por Estágio</option>
        </select>
      </div>

      <div className="filtros-wrapper">
        <button
          className="seta seta-esquerda"
          onClick={() => scrollFiltros(-1)}
        >
          ‹
        </button>

        <div
          className="filtros"
          ref={filtrosRef}
          onScroll={handleScrollFiltros}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {[...TIPOS, ...TIPOS, ...TIPOS].map((tipo, idx) => (
            <button
              key={`${tipo}-${idx}`}
              className={filtroTipo === tipo ? "ativo" : ""}
              onClick={() => setFiltroTipo(tipo)}
              style={{ backgroundColor: CORES_TIPOS[tipo] }}
            >
              {tipo.toUpperCase()}
              <span className="badge-contador">{contagemPorTipo[tipo]}</span>
            </button>
          ))}
        </div>

        <button className="seta seta-direita" onClick={() => scrollFiltros(1)}>
          ›
        </button>
      </div>

      <section id="center">
        {listaOrdenada.map((pokemon) => (
          <PokemonCard
            key={pokemon.index}
            nome={pokemon.nome}
            nomeBase={pokemon.nomeBase}
            estagio={pokemon.estagio}
            caminhoImagem={pokemon.caminhoImagem}
            tipo={pokemons[pokemon.nome].tipo}
            evoluirPokemon={() => evoluirPokemon(pokemon.nome)}
            favorito={favoritos.includes(pokemon.index)}
            aoFavoritar={() => alternarFavorito(pokemon.index)}
          />
        ))}
      </section>
    </>
  );
}

export default App;
