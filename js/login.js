fetch('../data.json')
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
    }
    return response.json();
})
.then(data => {
    // Faça algo com os dados JSON
    verificarJson(data)
})
.catch(error => console.error('Erro:', error));

function verificarJson(data){
    const btn = document.querySelector("#btn")

    btn.addEventListener('click', (event) => {
        event.preventDefault()
        const user = document.getElementById('usuario').value
        const passaword = document.getElementById('senha').value

        const login = data.find((objeto) => objeto.usuario === user && objeto.senha === passaword)

        if(login){
            window.location = '../pages/pagina-clima.html'
        }else{
            alert('Usúario não encontrado')
        }

        

        





    })
}
