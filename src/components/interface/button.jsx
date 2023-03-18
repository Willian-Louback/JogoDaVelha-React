import '../styles/button.css'

const Dados = ({reiniciarJogo}) => {
    return(
    <>
        <div className="button">
            <button onClick={reiniciarJogo}>Reiniciar</button>
        </div>
    </>
    )
}

export default Dados;