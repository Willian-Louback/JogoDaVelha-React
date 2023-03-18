import '../styles/dados.css'

const Dados = ({winX, winY}) => {
    return(
    <>
        <div className="dados">
            <span id="resultadoAtual">Resultado: NaN.</span>
            <span id="historico">Histórico: {winX} x {winY}.</span>
        </div>
    </>
    )
}

export default Dados;