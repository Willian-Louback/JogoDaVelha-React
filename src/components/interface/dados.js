import '../styles/dados.css'

const Dados = ({winX, winY, reiniciarJogo}) => {
    return(
    <>
        <span id="resultadoAtual">Resultado: NaN.</span>
        <span id="historico">Histórico: {winX} x {winY}.</span>
        <button onClick={reiniciarJogo}>Reiniciar</button>
    </>
    )
}

export default Dados;