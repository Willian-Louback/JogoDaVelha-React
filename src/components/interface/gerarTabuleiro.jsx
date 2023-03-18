import React from 'react';
import '../styles/tabuleiro.css';
import Dados from './dados';
import Button from './button';

export default class Tabuleiro extends React.Component{    

    constructor(props){
        super(props);
        this.preenchidos = [];
        this.state = {
            winX: 0,
            winY: 0,
            th: [],
            preenchidosX: [],
            preenchidosY: [],
            target: "",
            player: "X"
        }
        this.reiniciarJogo = this.reiniciarJogo.bind(this);
    }

    componentDidMount() {
        const th = document.getElementsByTagName("th");
        this.setState({ th });
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

    win(){
        const thisRef = this;

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
            thisRef.preenchidos.push(parseInt(thisRef.state.target.id));
            
            for(let i = 0; i < possiveisWin.length; i++){
                if(thisRef.state.target.classList.contains('preenchidoX')){
                    await thisRef.setState(prevState => ({
                        preenchidosX: [...prevState.preenchidosX, parseInt(thisRef.state.target.id)]
                    }));
                } else {
                    await thisRef.setState(prevState => ({
                        preenchidosY: [...prevState.preenchidosY, parseInt(thisRef.state.target.id)]
                    }));
                }
                if(
                    (thisRef.state.preenchidosX.indexOf(possiveisWin[i][0]) !== -1 &&
                    thisRef.state.preenchidosX.indexOf(possiveisWin[i][1]) !== -1 &&
                    thisRef.state.preenchidosX.indexOf(possiveisWin[i][2]) !== -1) ||
                    (thisRef.state.preenchidosY.indexOf(possiveisWin[i][0]) !== -1 &&
                    thisRef.state.preenchidosY.indexOf(possiveisWin[i][1]) !== -1 &&
                    thisRef.state.preenchidosY.indexOf(possiveisWin[i][2]) !== -1)
                )
                {
                    const win1 = possiveisWin[i][0];
                    const win2 = possiveisWin[i][1];
                    const win3 = possiveisWin[i][2];
                    
                    if(thisRef.state.player !== "X"){ //Está trocado, mas funcinonando corretamente, arrumar depois
                        thisRef.atualizarWin("X", win1, win2, win3);
                    } else {
                        thisRef.atualizarWin("Y", win1, win2, win3);
                    }
                    
                    Array.from(thisRef.state.th).forEach(valor => {
                        valor.classList.add('preenchido');
                    })
                }
            }
        }

        validarWin();
    }

    moves(){
        const thisRef = this; //fazer referencia ao this para poder usar na function
        async function validarMoves(){
            const tabuleiro = await document.getElementsByTagName('th');

            for(let i = 0; i < tabuleiro.length; i++){
                tabuleiro[i].addEventListener('mousedown', function resposta(targetRef){
                    if(!document.getElementById(targetRef.toElement.id).classList.contains('preenchido')){
                        document.getElementById(targetRef.toElement.id).classList.add('preenchido');
                        thisRef.state.player === 'X' ? document.getElementById(targetRef.toElement.id).classList.add('preenchidoX') : document.getElementById(targetRef.toElement.id).classList.add('preenchidoY');
                        document.getElementById(targetRef.toElement.id).innerHTML = thisRef.state.player;
                        thisRef.state.target = targetRef.toElement;
                        thisRef.win();
                        thisRef.state.player === "X" ? thisRef.state.player = "O" : thisRef.state.player = "X";
                    }
                })
            }
        }
        validarMoves();
    }
    
    atualizarWin(X, win1, win2, win3){
        const winA = [win1, win2, win3];
        for(let i = 0; i < winA.length; i++){
            this.state.th[winA[i]-1].classList.add('win');
        }
        
        if(X === "X"){
            this.setState(
                (state)=>(
                    {winX: state.winX + 1}
                )
            )
            document.getElementById('resultadoAtual').innerHTML = `Resultado: O "X" ganhou!`;
        } else {
            this.setState(
                (state)=>(
                    {winY: state.winY + 1}
                )
            )
            document.getElementById('resultadoAtual').innerHTML = `Resultado: A "O" ganhou!`;
        }
    }

    reiniciarJogo(){
        const { th } = this.state;

        this.setState({
            preenchidosX: [],
            preenchidosY: [],
            target: "",
            player: "X"
        })
        

        Array.from(th).forEach(th => {
            th.classList.remove('preenchido');
            th.innerHTML = "";
            th.classList.remove('preenchidoX');
            th.classList.remove('preenchidoY');
            th.classList.remove('win');
        });

    }

    render(){

        return(
            <>
                <div className='areaTotal'>
                    <div className="areaTabuleiro">
                        <table className="tabuleiro">
                            {this.gerarTabuleiro()}
                            {this.moves()}
                        </table>
                    </div>
                    <Dados winX={this.state.winX} winY={this.state.winY} />
                </div>
                <Button reiniciarJogo={this.reiniciarJogo} />
            </>
        )
    }
}
