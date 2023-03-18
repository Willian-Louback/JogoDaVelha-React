import React from 'react';
import '../styles/tabuleiro.css';
import Dados from './dados';

export default class Tabuleiro extends React.Component{    

    constructor(props){
        super(props);
        this.targetRef = "";
        this.preenchidos = [];
        this.player = "X";
        //this.th = document.getElementsByTagName('th');
        this.state = {
            winX: 0,
            winY: 0,
            th: [],
            preenchidosX: [],
            preenchidosY: []
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

    win(target){
        const thisRef = this;
        this.targetRef = target;

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
            thisRef.preenchidos.push(parseInt(thisRef.targetRef.id));
            
            for(let i = 0; i < possiveisWin.length; i++){
                if(thisRef.targetRef.classList.contains('preenchidoX')){
                    await thisRef.setState(prevState => ({
                        preenchidosX: [...prevState.preenchidosX, parseInt(thisRef.targetRef.id)]
                    }));
                } else {
                    await thisRef.setState(prevState => ({
                        preenchidosY: [...prevState.preenchidosY, parseInt(thisRef.targetRef.id)]
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
                    if(thisRef.player !== "X"){ //Está trocado, mas funcinonando corretamente, arrumar depois
                        thisRef.atualizarWin("X");
                    } else {
                        thisRef.atualizarWin("Y");
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
            const tabuleiro = await document.getElementsByClassName('tabuleiro');

            tabuleiro[0].addEventListener('mousedown', function resposta(target){
                if(!document.getElementById(target.toElement.id).classList.contains('preenchido')){
                    document.getElementById(target.toElement.id).classList.add('preenchido');
                    thisRef.player === 'X' ? document.getElementById(target.toElement.id).classList.add('preenchidoX') : document.getElementById(target.toElement.id).classList.add('preenchidoY');
                    document.getElementById(target.toElement.id).innerHTML = thisRef.player;
                    thisRef.win( target.toElement);
                    thisRef.player === "X" ? thisRef.player = "O" : thisRef.player = "X";
                }
            })
        }
        validarMoves();
    }
    
    atualizarWin(X){
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
        return {
            winX: this.state.winX + (X === "X" ? 1 : 0),
            winY: this.state.winY + (X === "X" ? 0 : 1)
        }
    }

    reiniciarJogo(){
        const { th } = this.state;

        this.setState({
            preenchidosX: [],
            preenchidosY: [] 
        })
        

        Array.from(th).forEach((th, indice) => {
            th.classList.remove('preenchido');
            th.innerHTML = "";

            if(indice % 2 === 0){
                th.classList.remove('preenchidoX');
            } else {
                th.classList.remove('preenchidoY');
            }
        });

        
        this.player = "X";
    }

    render(){

        return(
            <>
                <div className='areaTabuleiro'>
                    <table className="tabuleiro">
                        {this.gerarTabuleiro()}
                        {this.moves()}
                    </table>
                </div>
                <div className="dados">
                    <Dados winX={this.state.winX} winY={this.state.winY} reiniciarJogo={this.reiniciarJogo}/>
                </div>
            </>
        )
    }
}

/*<Dados winX={this.state.winX} />
                <span id="resultadoAtual">Resultado: NaN.</span>
                <span id="historico">Histórico: {this.state.winX} x {this.state.winY}.</span>
                <button onClick={this.reiniciarJogo}>Reiniciar</button> */