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

    win(player){
        let playerRef = player; 

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
            let preenchidosX = [];
            let preenchidosY = [];
            
            
            for(let i = 0; i < preenchido.length; i++){
                preenchidos.push(preenchido[i].id);
                if(preenchido[i].classList.contains("preenchidoX")){
                    preenchidosX.push(preenchido[i].id);
                } else {
                    preenchidosY.push(preenchido[i].id);
                }
            }

            if(
                preenchidosX.toString().indexOf(possiveisWin[0].toString()) !== -1 || preenchidosY.toString().indexOf(possiveisWin[0].toString()) !== -1 ||
                preenchidosX.toString().indexOf(possiveisWin[1].toString()) !== -1 || preenchidosY.toString().indexOf(possiveisWin[0].toString()) !== -1 ||
                preenchidosX.toString().indexOf(possiveisWin[2].toString()) !== -1 || preenchidosY.toString().indexOf(possiveisWin[0].toString()) !== -1 ||
                preenchidosX.toString().indexOf(possiveisWin[3].toString()) !== -1 || preenchidosY.toString().indexOf(possiveisWin[0].toString()) !== -1 ||
                preenchidosX.toString().indexOf(possiveisWin[4].toString()) !== -1 || preenchidosY.toString().indexOf(possiveisWin[0].toString()) !== -1 ||
                preenchidosX.toString().indexOf(possiveisWin[5].toString()) !== -1 || preenchidosY.toString().indexOf(possiveisWin[0].toString()) !== -1 ||
                preenchidosX.toString().indexOf(possiveisWin[6].toString()) !== -1 || preenchidosY.toString().indexOf(possiveisWin[0].toString()) !== -1 ||
                preenchidosX.toString().indexOf(possiveisWin[7].toString()) !== -1 || preenchidosY.toString().indexOf(possiveisWin[0].toString()) !== -1 
            )
            {
                console.log("Você ganhou");
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
                    player === 'X' ? document.getElementById(target.toElement.id).classList.add('preenchidoX') : document.getElementById(target.toElement.id).classList.add('preenchidoY');
                    player === "X" ? player = "O" : player = "X";
                }
                thisRef.win(player);
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