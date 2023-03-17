import '../styles/boasVindas.css';
//import React, { useState } from 'react';

/*function useTesteState(){
    const [count, setCount] = React.useState(0);
    function incrementarContador(){
        setCount(count + 1);
    }

    return [count, incrementarContador];
}*/

function BemVindo({nome}){
    //const [count, incrementarContador] = useTesteState();

    return(
        <div className='main'>
            <h1 className='titulo'>Olá, {nome}!</h1>
        </div>
    )
}

export default BemVindo;