import React from 'react';
import '../styles/tabuleiro.css';

class Tabuleiro extends React.Component{

    gerarTabuleiro(){
        //const teste = "Oi, boa tarde!";


        return (
            <>
                <tr id="tr1">
                    <th id='1'></th>
                    <th id='2'></th>
                    <th id='3'></th>
                </tr>
                <tr id="tr2">
                    <th id='4'></th>
                    <th id='5'></th>
                    <th id='6'></th>
                </tr>
                <tr id="tr3">
                    <th id='7'></th>
                    <th id='8'></th>
                    <th id='9'></th>
                </tr>
            </>
        );
    }

    render(){

        return(
            <table className="tabuleiro">
                {this.gerarTabuleiro()}
            </table>
        )
    }
}

export default Tabuleiro;