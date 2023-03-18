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
            cells: [],
            preenchidosX: [],
            preenchidosY: [],
            target: "",
            player: "X"
        }
        this.reiniciarJogo = this.reiniciarJogo.bind(this);
    }

    componentDidMount() {
        const cells = document.getElementsByClassName('cells')
        this.setState({ cells });
    }

    gerarTabuleiro(){
        return (
            <div className='grid'> 
                <div className="cells" id='1'></div>
                <div className="cells" id='2'></div>
                <div className="cells" id='3'></div>
                <div className="cells" id='4'></div>
                <div className="cells" id='5'></div>
                <div className="cells" id='6'></div>
                <div className="cells" id='7'></div>
                <div className="cells" id='8'></div>
                <div className="cells" id='9'></div>
            </div>
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
                    
                    Array.from(thisRef.state.cells).forEach(valor => {
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
            const tabuleiro = await document.getElementsByClassName('cells');

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
            this.state.cells[winA[i]-1].classList.add('win');
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
        const { cells } = this.state;

        this.setState({
            preenchidosX: [],
            preenchidosY: [],
            target: "",
            player: "X"
        })
        

        Array.from(cells).forEach(cells => {
            cells.classList.remove('preenchido');
            cells.innerHTML = "";
            cells.classList.remove('preenchidoX');
            cells.classList.remove('preenchidoY');
            cells.classList.remove('win');
        });

    }

    render(){

        return(
            <>
                <div className='areaTotal'>
                    <div className="areaTabuleiro">
                        <div className="tabuleiro">
                            {this.gerarTabuleiro()}
                            {this.moves()}
                        </div>
                    </div>
                    <Dados winX={this.state.winX} winY={this.state.winY} />
                </div>
                <Button reiniciarJogo={this.reiniciarJogo} />
            </>
        )
    }
}
