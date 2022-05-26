import { useState } from "react";
import styles from "./App.module.css";
import poweredImage from "./assets/powered.png";
import leftArrowImage from "./assets/leftarrow.png";
import {Griditem} from "./components/Griditem";

import {levels, calculateImc, Level} from "./helpers/imc"; //importando o array com os níveis de imc e a função que calcula o imc

const App = () => {

  const [heighField, setHeighField] = useState<number>(0);  //o <number> indica que o valor dessa variável sempre vai ser um number
  const [weightField, setWeightField] = useState<number>(0);
  //precisa de um lugar para armazenar qual dos levels vai ser exibido (de acordo com o imc):
  const [toShow, setToShow] = useState<Level | null>(null)  //sey type ou é Level ou é nulo (quando ainda não calculou e não tem o que exibir)

  function handleCalculateButton() {
    if (heighField && weightField) { //se o peso e a altura foram preenchidas
      setToShow(calculateImc(heighField, weightField));
    } else {
      alert ("Digite todos os campos!");
    }
  }

  function handleBackButton () { //função que vai voltar para o início (tudo que ela precisa fazer é limpar o toShow)
    setToShow(null);
    setHeighField(0);  //zera os campos
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" className={styles.headerImage}/>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input
            type="number"
            placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
            value={heighField > 0 ? heighField : ""}
            //quando heighField for maior do que zero (quando tiver um valor digitado), vai mostrar esse valor, caso contrário, mostra um texto vazio (para assim, mostrar o placeholder)
            onChange={e => setHeighField(parseFloat(e.target.value))}
            //aplicando um setHeighField no evento (valor digitado)
            //o setHeighField tem que receber um number e, via de regra, recebe uma string, por isso, aplica-se um parseFloat(pois pode ser um número decimal)
            //e.target.value = valor daquele evento (o que for digitado)
            disabled = {toShow ? true : false} //desabilitar quando tem algo no toShow (para precisar atualizar a página/voltar para inserir mais infos)
          />
          <input
            type="number"
            placeholder="Digite o seu peso. Ex: 75.5 (em kg)"
            value={weightField > 0 ? weightField : ""}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled = {toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled = {toShow ? true : false}>Calcular</button>

        </div>
        <div className={styles.rightSide}> 
          {!toShow &&
            <div className={styles.grid}>  
              {levels.map((item, key) => (
                <Griditem key={key} item={item}/>
              ))}
            </div>
          }

          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25}/>
              </div>
              <Griditem item={toShow}/>
            </div>
          }
        </div>
      </div>
    </div>
  );

}

 export default App;