import '../styles/boasVindas.css';

function BemVindo({nome}){
    return(
        <div className='main'>
            <h1 className='titulo'>Olá, {nome}!</h1>
        </div>
    )
}

export default BemVindo;