//seleção  de dados
const baseURL = "6328fa0a4b8038333b021e60a631d64f"
//serve para pegar o 'dado' que será chamado ou não na API
const valueInput = document.querySelector("#value-input")
const btnPesquisar = document.querySelector("#btn-pesquisar")

//vai servir para mostrar os dados ao usuario
//sempre que vc puxar um valor de  uma api, vc tem que ter um local para mostrar esses dados
const cidade = document.querySelector("#cidade")
const temperatura = document.querySelector("#temperatura span") //span pois é um paragramo e o quea gente vai imprimir vindo da api vai esta dentro o samp
const descricao = document.querySelector("#descricao")
const imgDescricao = document.querySelector("#img-descricao")
const umidade = document.querySelector("#umidade span") //span pois é um paragramo e o quea gente vai imprimir vindo da api vai esta dentro o samp
const vento = document.querySelector("#vento span") //span pois é um paragramo e o quea gente vai imprimir vindo da api vai esta dentro o samp
const resultadoContainer = document.querySelector("#box-resultado")


//Função:

//função que vai conferir la na api
const verificaAPI = async(value) => { //value = nome da cidade
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${baseURL}&lang=pt_br`;

    //O fetch(url) vai fazer uma solicitação a API, vai la da uma olhada nela
    //O await é para so continuar, ou seja, ir para outra linha quando a chamada da api for concluida
    const resposta = await fetch(url);
    //apos a verificação da api que vai ser armazenada em 'resposta'  vai ser transformada em formato json()
    //O await vai servir para so ir para proxima linha quando toda essa api estiver em formato json 
    const data = await resposta.json()
    //vai mostrar os dados = 'data' com o formato json()
    return data
}


//mostrar o valor pro usuario: 
const mostrarValue = async (value) => {
    const data = await verificaAPI(value)
    cidade.innerHTML = data.name
    temperatura.innerHTML = parseInt(data.main.temp)
    descricao.innerHTML = data.weather[0].description
    imgDescricao.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    umidade.innerHTML = `${data.main.humidity}%`
    vento.innerHTML = `${data.wind.speed}km/h`

    resultadoContainer.classList.remove("hide")
}
//tratamento de erro
const verificarbtn = (value) => {
    if(value === ''){
        alert('Preencha o campo com a sua cidade')
    }else{
        mostrarValue(value)
    }
}


//Eventos:

//Ao clicar no botão, vai ser chamada uma função que vai verificar a API pelo nome da cidade
//Como a função no evento tem como parametro o valor do que foi escrito no input, quando é chamada a função, os seus parametros são os mesmo
//deixa as coisas conectadas
btnPesquisar.addEventListener("click", async (e) => {
    e.preventDefault();

    const value = valueInput.value

    verificarbtn(value)
})
btnPesquisar.addEventListener("keyup", async (e) => {
    if(e.code === "Enter"){
        const value = e.target.value
        verificarbtn(value)
    }
})