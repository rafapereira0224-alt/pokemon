import './PokemonButton.css'

function PokemonButton({titulo='Botão Padrão', cor='white', corDaLetra='black'}){
    return (
        <button
        className="pokemonButton" 
        style={{backgroundColor: cor, color: corDaLetra}}>
         {titulo}
        </button>
    )
}

export default PokemonButton