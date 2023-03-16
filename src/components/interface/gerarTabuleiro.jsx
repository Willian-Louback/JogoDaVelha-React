import React from 'react';
import '../styles/tabuleiro.css';
let targetRef = "";
let preenchidos = [];
let preenchidosX = [];
let preenchidosY = [];

class Tabuleiro extends React.Component{    

    constructor(props){
        super(props);
        this.state = {
            winX: 0,
            winY: 0
        }
    }
    

    gerarTabuleiro(){
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

    win(player, target){
        const thisRef = this;
        const playerRef = player; 
        targetRef = target;

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
            preenchidos.push(parseInt(targetRef.id));
            
            for(let i = 0; i < possiveisWin.length; i++){
                if(targetRef.classList.contains('preenchidoX')){
                    preenchidosX.push(parseInt(targetRef.id));
                } else {
                    preenchidosY.push(parseInt(targetRef.id));
                }
                if(
                    (preenchidosX.indexOf(possiveisWin[i][0]) !== -1 &&
                    preenchidosX.indexOf(possiveisWin[i][1]) !== -1 &&
                    preenchidosX.indexOf(possiveisWin[i][2]) !== -1) ||
                    (preenchidosY.indexOf(possiveisWin[i][0]) !== -1 &&
                    preenchidosY.indexOf(possiveisWin[i][1]) !== -1 &&
                    preenchidosY.indexOf(possiveisWin[i][2]) !== -1)
                )
                {
                    console.log(`Você ganhou ${playerRef}`);
                    if(playerRef === "X"){
                        thisRef.setState({ winX: this.state.winX + 1 });
                        console.log('passou')
                    } else {
                        thisRef.setState({ winY: this.state.winY + 1 });
                    }
                    //document.getElementById('resultado').innerHTML = `Resultado${playerRef}`
                    const th = document.getElementsByTagName('th');
                    Array.from(th).forEach((valor, indice) => {
                        th[indice].classList.add('preenchido');
                    })
                }
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
                    thisRef.win(player, target.toElement);
                    player === "X" ? player = "O" : player = "X";
                }
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
                <span id="resultado">Resultado: {this.state.winX} x {this.state.winY}.</span>
            </div>
        )
    }
}

export default Tabuleiro;