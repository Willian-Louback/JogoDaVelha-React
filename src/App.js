import './App.css';
import Tabuleiro from './components/interface/gerarTabuleiro';
import BoasVindas from './components/scripts/boasVindas';

function App(){
  return(
    <>
      <BoasVindas nome="Willian"/>
      <Tabuleiro />
    </>
  )
}

export default App;
