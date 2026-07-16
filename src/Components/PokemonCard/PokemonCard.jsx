import { useState, useEffect, useRef, useMemo } from "react";
import "./PokemonCard.css";
import pokemons from "../../Data/pokemons";

const CORES_CONFETE = [
  "#ff4757",
  "#ffa502",
  "#2ed573",
  "#1e90ff",
  "#a55eea",
  "#f8f8f8",
];

const CORES_TIPOS = {
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

function gerarParticulas(qtd = 14) {
  return Array.from({ length: qtd }, (_, i) => {
    const angulo = Math.random() * 360;
    const distancia = 60 + Math.random() * 50;
    const tamanho = 5 + Math.random() * 5;
    const atraso = Math.random() * 0.15;
    const cor = CORES_CONFETE[Math.floor(Math.random() * CORES_CONFETE.length)];
    return {
      id: i,
      style: {
        "--angulo": `${angulo}deg`,
        "--distancia": `${distancia}px`,
        "--atraso": `${atraso}s`,
        width: `${tamanho}px`,
        height: `${tamanho}px`,
        background: cor,
      },
    };
  });
}

function calcularTotalEstagios(nomeAtual, estagioAtual) {
  let total = estagioAtual;
  let atual = nomeAtual;
  while (pokemons[atual] && pokemons[atual].evolucao) {
    atual = pokemons[atual].evolucao;
    total++;
  }
  return total;
}

function construirCadeiaEvolutiva(nomeBase) {
  const cadeia = [];
  let atual = nomeBase;
  while (atual && pokemons[atual]) {
    cadeia.push({ nome: atual, imagem: pokemons[atual].imagem });
    atual = pokemons[atual].evolucao;
  }
  return cadeia;
}

function PokemonCard({
  nome,
  nomeBase,
  caminhoImagem,
  estagio,
  evoluirPokemon,
  tipo,
  favorito,
  aoFavoritar,
}) {
  const [animando, setAnimando] = useState(false);
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const estagioAnterior = useRef(estagio);
  const imgRef = useRef(null);
  const particulas = useMemo(() => gerarParticulas(), [animando]);

  useEffect(() => {
    if (estagio > estagioAnterior.current) {
      setAnimando(true);
      const timer = setTimeout(() => setAnimando(false), 1000);
      estagioAnterior.current = estagio;
      return () => clearTimeout(timer);
    }
    estagioAnterior.current = estagio;
  }, [estagio]);

  useEffect(() => {
    setImagemCarregada(false);

    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setImagemCarregada(true);
      return;
    }

    const timeoutSeguranca = setTimeout(() => {
      setImagemCarregada(true);
    }, 300);

    return () => clearTimeout(timeoutSeguranca);
  }, [caminhoImagem]);

  useEffect(() => {
    if (!modalAberto) return;
    function handleEsc(e) {
      if (e.key === "Escape") setModalAberto(false);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [modalAberto]);

  const corBorda = CORES_TIPOS[tipo] || "gray";
  const totalEstagios = calcularTotalEstagios(nome, estagio);
  const progresso = (estagio / totalEstagios) * 100;
  const cadeiaEvolutiva = useMemo(
    () => construirCadeiaEvolutiva(nomeBase),
    [nomeBase]
  );

  function pararPropagacao(fn) {
    return (e) => {
      e.stopPropagation();
      fn();
    };
  }

  return (
    <>
      <div
        className={`CardPokemon ${animando ? "evoluindo" : ""}`}
        style={{
          borderColor: corBorda,
          borderStyle: "solid",
          borderWidth: "3px",
          cursor: "pointer",
        }}
        onClick={() => setModalAberto(true)}
      >
        <div className="imagem-wrapper">
          {/* a <img> em si NUNCA é animada diretamente — quem anima
              é a div .imagem-anim que a envolve. onAnimationEnd força
              um reflow manual pra driblar o bug do Chrome de não
              repintar a imagem depois que a animação termina. */}
          <div
            className={`imagem-anim ${animando ? "img-evoluindo" : ""}`}
            onAnimationEnd={(e) => {
              void e.currentTarget.offsetHeight;
            }}
          >
            <img
              key={caminhoImagem}
              ref={imgRef}
              src={caminhoImagem}
              alt={nome}
              onLoad={() => setImagemCarregada(true)}
            />
          </div>

          {!imagemCarregada && <div className="skeleton-imagem" />}

          {animando && <div className="flash-evolucao" />}

          {animando && (
            <div className="confete-container">
              {particulas.map((p) => (
                <span key={p.id} className="confete" style={p.style} />
              ))}
            </div>
          )}
        </div>

        <h3>{nome}</h3>
        <p>
          Estágio {estagio} de {totalEstagios}
        </p>

        <div className="barra-progresso-wrapper">
          <div
            className="barra-progresso-preenchida"
            style={{ width: `${progresso}%`, backgroundColor: corBorda }}
          />
        </div>

        <div className="acoes-card">
          <button
            className="btn-evoluir"
            onClick={pararPropagacao(evoluirPokemon)}
            title="Clique para evoluir!"
          >
            Evoluir ✨
          </button>

          <button
            className={`btn-favorito ${favorito ? "favoritado" : ""}`}
            onClick={pararPropagacao(aoFavoritar)}
            title={
              favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
          >
            {favorito ? "❤️" : "🤍"}
          </button>
        </div>
      </div>

      {modalAberto && (
        <div className="modal-overlay" onClick={() => setModalAberto(false)}>
          <div
            className="modal-conteudo"
            style={{ borderColor: corBorda }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-fechar"
              onClick={() => setModalAberto(false)}
              title="Fechar"
            >
              ✕
            </button>

            <img src={caminhoImagem} alt={nome} className="modal-imagem" />

            <h2>{nome}</h2>

            <span
              className="modal-badge-tipo"
              style={{ backgroundColor: corBorda }}
            >
              {tipo.toUpperCase()}
            </span>

            <p className="modal-estagio">
              Estágio {estagio} de {totalEstagios}
            </p>

            <div className="barra-progresso-wrapper">
              <div
                className="barra-progresso-preenchida"
                style={{ width: `${progresso}%`, backgroundColor: corBorda }}
              />
            </div>

            <h4 className="modal-titulo-cadeia">Linha evolutiva</h4>

            <div className="modal-cadeia-evolutiva">
              {cadeiaEvolutiva.map((etapa, idx) => (
                <div key={etapa.nome} className="modal-cadeia-item-wrapper">
                  <div
                    className={`modal-cadeia-item ${
                      etapa.nome === nome ? "cadeia-atual" : ""
                    } ${idx + 1 < estagio ? "cadeia-passada" : ""}`}
                  >
                    <img src={etapa.imagem} alt={etapa.nome} />
                    <span>{etapa.nome}</span>
                  </div>
                  {idx < cadeiaEvolutiva.length - 1 && (
                    <span className="modal-cadeia-seta">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default PokemonCard;