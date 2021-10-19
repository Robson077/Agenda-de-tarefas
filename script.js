let input = document.getElementById("input-principal")  //valor do input

let button = document.getElementById("adicionar")  //event button

let tarefa = document.getElementById("nome-tarefa-id") //nome da tarefa

let listaCompleta = document.getElementById("tarefas")  //ul

let arraydeTarefas = []  //começa vazio para o usuario ir adicionando conforme o valor do input

recarregarTarefas()

function mostrarTarefas() {
    let novaLi = ""  //adicionar as li 

    arraydeTarefas.forEach((tarefa, index) => {  //tarefa e posição
        //para nao sobre escrever uma li em outra ele vai adicionando li = li + 1
       novaLi = novaLi + `<li class="item-tarefa ${tarefa.concluida == true ? "concluido" : ""}">  
        <button class="foguete" onclick="concluirTarefa(${index})">
            <i class="fas fa-rocket"></i>
        </button>

        <p class="nome-tarefa ${tarefa.concluida == true ? "concluido" : ""}" id="nome-tarefa-id">${tarefa.tarefa}</p>

        <button class="delete" onclick="deletarTarefa(${index})">
            <i class="fas fa-trash"></i>
        </button>
    </li>
    `
    })//forEach(tarefa) = vai pegando o valor dos indices do array 0, 1, 2, 3... e adicionando nessa variavel tarefa dentro dos parenteses
    
    listaCompleta.innerHTML = novaLi  //adicionar essa nova li no pai ul
    
    localStorage.setItem("lista", JSON.stringify(arraydeTarefas)) //colocar intem no localstorage
    //json.stringify tranforma esse array em string
}

function deletarTarefa(index){
    arraydeTarefas.splice(index, 1)  //splice deleta intem do array

    mostrarTarefas()
}

function adicionarTarefas() {

    if(input.value){
        arraydeTarefas.push({
            tarefa: input.value,
            concluida: false
        })  //adicionar o valor da variavel no array
    }
    else{
        alert("Digite uma tarefa")
    }
    
    input.value = ""

    mostrarTarefas()

}

function concluirTarefa(index){
    arraydeTarefas[index].concluida = !arraydeTarefas[index].concluida  //valor do array pega o indece e muda o object concluida / se for false muda para true e vise e versa

    mostrarTarefas()
}

function recarregarTarefas(){
    let minhasTarefas = localStorage.getItem("lista")  //pegar o item da lista

    if(minhasTarefas){
        arraydeTarefas = JSON.parse(minhasTarefas)  //transformar no que ele era antes

        mostrarTarefas()
    } 
}

function adicionarEnter(teclas){
    if(teclas.key === "Enter"){
        adicionarTarefas()
    }
}

button.addEventListener("click", adicionarTarefas)  //adicionar um ouvinte de evento

document.addEventListener("keypress", adicionarEnter)