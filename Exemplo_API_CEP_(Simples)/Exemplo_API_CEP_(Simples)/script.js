//pega botao "buscae cep" do HTML pelo ID
const botao = document.getElementById("btnBuscar");

//Pega a área onde o resultado da consulta será exibido 
const resultado = document.getElementById("resultado");

//quando o usuário clicar no botão
//a função deverá ser executada      
botao.addEventListener("click", buscarCep);

//função responsavel por consultar o cep
async function buscarCep() {

    //pega o CEP digitado pelo usuario
    //replace (/\D/g, "") remove tudo o que nao for numero
    const cep = document
    .getElementById("cep")
    .value
    .replace(/\D/g,"");

    //verifica se o cep possui exatamente 8 numeros
    if(cep.length !== 8){
        //exibe uma mensagem de erro na página
        resultado.innerHTML =
        "<p>Digite um CEP válido com 8 números.</p>";

        //encerra a função
        return;
    }

    //mostra mensagem enquanto a consulta é realizada
    resultado.innerHTML = "<p>Consultando...</p>";

    try{
        //Faz uma requisição para a API BrasilAPI
        //CEP digitado é colocado no final da URL 

        const resposta = await fetch(
            `https://brasilapi.com.br/api/cep/v1/${cep}`
        );

        if (!resposta.ok){

            //se houver algum problema 
            //gera um erro que será tratado pelo catch
            throw new Error("CEP não encontrado");

        }

        //converte a resposta da API para JSON
        const dados = await resposta.json();

        //Exibe os dados recebidos da API na página 
        resultado.innerHTML = `

        <p>
            <strong>Rua:</strong>
            ${dados.street || "Não informado"}
            
        </p>

        <p> 
            <strong>Bairro:</strong>
             ${dados.neighborhood || "Não informado"}
        </p>
       
        <p> <strong> Cidade: </strong>
        ${dados.city}</p>

        <p><strong>Estado</strong>
        ${dados.state}</p>`
 `;`
    } catch (erro) {

        resultado.innerHTML = `<p>CEP não encontrado ou erro na consulta</p>`;

    }
}