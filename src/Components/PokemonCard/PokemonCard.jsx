import "./PokemonCard.css";

function PokemonCard({ nome, caminhoImagem, estagio, evoluirPokemon, tipo }) {
  const cores = {
    fogo: "#ff4500",
    agua: "#1e90ff",
    planta: "#2ecc71",
  };

  const corBorda = cores[tipo] || "gray";

  return (
    <div
      className="CardPokemon"
      style={{
        borderColor: corBorda,
        borderStyle: "solid",
        borderWidth: "3px",
      }}
    >
      <img src={caminhoImagem} alt={nome} />
      <h3>{nome}</h3>
      <p>Estágio: {estagio}</p>

      <button
        className="btn-evoluir"
        onClick={evoluirPokemon}
        title="Clique para evoluir!"
      >
        Evoluir ✨
      </button>
    </div>
  );
}
export default PokemonCard;
