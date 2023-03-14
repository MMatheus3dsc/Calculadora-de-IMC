const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal ou Adequado",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];
                 //   selecionando os elementos
//os containers
   const result = document.querySelector("#result");
   const calcContainer = document.querySelector("#calc-container");
  
// os inputs
  const heightInput = document.querySelector("#height");
  const weightInput = document.querySelector("#weight");

  //os botoes 
  const clearBtn = document.querySelector("#clear-btn");
  const calcBtn = document.querySelector("#calc-btn");
  const backBtn = document.querySelector("#back-btn")
 
// imc
  const imcResult = document.querySelector("#imc-result span")
  const imcInfo = document.querySelector("#imc-info span")
  const imcTable = document.querySelector("#imc-table");

  //funcoes 
  function hideResult(){
    result.classList.toggle("hide");
    calcContainer.classList.toggle("hide");
  }

  function createTable(data){
    data.forEach(item => {
      
      const div = document.createElement("div");
      div.classList.add("table-data"); //criando a div table data no HTML via js

      // inserindo paragrafos dentro das divs
      const classification = document.createElement("p");
      classification.innerText =item.classification;

      const info = document.createElement("p");
      info.innerText =item.info;

      const obesity = document.createElement("p");
      obesity.innerText =item.obesity;
      //
      div.appendChild(classification); // incluindo as propriedades do array na div
      div.appendChild(info);
      div.appendChild(obesity);

      imcTable.appendChild(div); // colocando na tabela
    });
  }
  
  
    function validDigits(text) { //validando os campos dos inputs peso e altura 
        return text.replace(/[^0-9,]/g, "");}
          
    function cleanInputs (){
      heightInput.value = "";
      weightInput.value = "";
      imcResult.className="";
      imcInfo.className="";
      }

    function calcImc(weight, height){
      const imc = (weight / (height * height)).toFixed(1); // metodo toFixed para aredondar o imc
      return imc;
    }  
 

  //Eventos
  [heightInput, weightInput].forEach((el) =>{ //validando os campos dos inputs peso e altura 
    el.addEventListener("input",(e) => {
     const updatedValue = validDigits(e.target.value);
    
     e.target.value = updatedValue;
  }) 
    })

  clearBtn.addEventListener("click",(e) =>{ //limpando os inputs
  e.preventDefault();
  cleanInputs();
  })

  calcBtn.addEventListener("click",(e) =>{
    e.preventDefault();

    const weight = +weightInput.value.replace("," , ".");
    const height = +heightInput.value.replace("," , ".");
  
    if(!weight || !height) return;

    const imc = calcImc(weight , height);

    let info;

    data.forEach((item) => {
     if(imc >= item.min && imc <= item.max){
      info =item.info;
     }
    
    })
    if (!info)return;
    
    imcResult.innerText = imc;
    imcInfo.innerText = info;

    switch (info) {
      case "Magreza":
        imcResult.classList.add("low");
        imcInfo.classList.add("low");
        break;
      case "Normal ou Adequado":
        imcResult.classList.add("good");
        imcInfo.classList.add("good");
        break;
      case "Sobrepeso":
        imcResult.classList.add("low");
        imcInfo.classList.add("low");
        break;
      case "Obesidade":
        imcResult.classList.add("medium");
        imcInfo.classList.add("medium");
        break;
      case "Obesidade grave":
        imcResult.classList.add("high");
        imcInfo.classList.add("high");
        break;
    }

    hideResult();
  })

  backBtn.addEventListener("click", (e) => {
    cleanInputs();
    hideResult();
  })
 //Inicializando
 createTable(data);