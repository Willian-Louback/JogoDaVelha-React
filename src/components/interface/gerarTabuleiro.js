import React from 'react';
import '../styles/tabuleiro.css';

class Tabuleiro extends React.Component{

    gerarTabuleiro(){
        //const teste = "Oi, boa tarde!";


        return (
            <thead className="thead">
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
            </thead>
        );
    }

    win(){
        const possiveisWin = [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,5,9],
            [3,5,7],
            [1,4,7],
            [2,5,8],
            [3,6,9]
        ]
        
        async function validarWin(){
            const preenchido = await document.getElementsByClassName('preenchido');
            let preenchidos = [];

            for(let i = 0; i < preenchido.length; i++){
                preenchidos.push(preenchido[i].id);
                console.log(preenchidos.toString())
                console.log(possiveisWin[0].toString())
                if(!preenchidos.toString().indexOf(possiveisWin[0].toString())){
                    console.log("oi")
                }

                /*if(
                    !preenchidos.toString().indexOf(possiveisWin[0].toString()) ||
                    !preenchidos.toString().indexOf(possiveisWin[1].toString()) ||
                    !preenchidos.toString().indexOf(possiveisWin[2].toString()) ||
                    !preenchidos.toString().indexOf(possiveisWin[3].toString()) ||
                    !preenchidos.toString().indexOf(possiveisWin[4].toString()) ||
                    !preenchidos.toString().indexOf(possiveisWin[5].toString()) ||
                    !preenchidos.toString().indexOf(possiveisWin[6].toString())||
                    !preenchidos.toString().indexOf(possiveisWin[7].toString())
                )
                {
                    console.log("Você ganhou");
                }*/
            }
        }

        validarWin();
    }

    moves(){
        let player = "X";
        const thisRef = this; //fazer referencia ao this para poder usar na function
        async function validarMoves(){
            const tabuleiro = await document.getElementsByClassName('tabuleiro');

            tabuleiro[0].addEventListener('mousedown', function resposta(target){
                if(!document.getElementById(target.toElement.id).classList.contains('preenchido')){
                    document.getElementById(target.toElement.id).innerHTML = player;
                    document.getElementById(target.toElement.id).classList.add('preenchido');
                    player === 'x' ? document.getElementById(target.toElement.id).classList.add('preenchidoX') : document.getElementById(target.toElement.id).classList.add('preenchidoY');
                    player === "X" ? player = "O" : player = "X";
                }
                thisRef.win();
            })
        }
        validarMoves();
    }

    render(){

        return(
            <div className='areaTabuleiro'>
                <table className="tabuleiro">
                    {this.gerarTabuleiro()}
                    {this.moves()}
                </table>
            </div>
        )
    }
}

export default Tabuleiro;