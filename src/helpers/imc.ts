//type das categorias de imc
export type Level = {
    title: string;
    color: string;
    icon: "down" | "up"; //ou um ou outro
    imc: number[];   //vai ser um array de numbers
    yourImc?: number; //o imc do indivíduo
}

//Categorias de imc
export const levels: Level[] = [    //o levels é um array de Level
    {title: "Magreza", color: "#96a3ab", icon: "down", imc: [0, 18.59]},
    {title: "Peso ideal", color: "#0ead69", icon: "up", imc: [18.6, 24.99]},
    {title: "Sobrepeso", color: "#e2b039", icon: "down", imc: [25, 30]},
    {title: "Obesidade", color: "#c3423f", icon: "down", imc: [30.1, 99]}
];

//Função para calcular o imc
//recebe a altura e o peso como parâmetro (que são numbers)
export const calculateImc = (height: number, weight: number) => {
    const imc = weight / Math.round((height * height));    //imc = peso dividido pela raiz da altura/ usa-se o math para arredondar e o cálculo não dar erro

    //com o valor do imc, precisa ver em qual dos levels ele se encaixa
    for (let i in levels) {
        if (imc >= levels[i].imc[0] && imc <= levels[i].imc[1]) {

            //criando uma cópia do levels para poder ser modificada (pois não pode modificar diretamente no levels):
            let levelsCopy: Level = {...levels[i]}

            levelsCopy.yourImc = parseFloat(imc.toFixed(2));  //quando achar o imc, coloca-se ele dentro de yourImc
            //arredonda com o tofixed e transforma em number novamente com o parseint (pois o tofixed transforma em string)
            return levelsCopy; //retorna a própria cópia do level (levelsCopy), pois se enquadrou na sua faixa de peso
        }
    }

    return null;
}