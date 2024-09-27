//v1
let selectCidades = document.querySelector('#cidades');
let listaCidades = [];
let divCandidatos = document.querySelector('.candidatos');


    document.addEventListener('DOMContentLoaded', () => {
    fetch("./candidatos.json").then((response) => {
        response.json().then((dados) => {
        let barraPesquisa = document.querySelector('#barraPesquisa');
        let iconePesquisa = document.querySelector('#iconePesquisa');
        let candidatosFiltro = [];

        iconePesquisa.addEventListener('click',() =>{
            let dadoPesquisa = barraPesquisa.value.toLowerCase();
                candidatosFiltro = dados.candidatos.filter((candidato) => {
                let nomePesquisado = candidato.nomeUrna.toLowerCase();
                let cidadePesquisada = candidato.cidade.toLowerCase();
                return nomePesquisado.includes(dadoPesquisa) || cidadePesquisada.includes(dadoPesquisa);
            })

                candidatosFiltro.forEach((candidato) => {
                    console.log('sei la');        
                    // Variáveis de elementos do perfil
                    const perfilDiv = document.createElement('div');
                    const foto = document.createElement('img');
                    const nomeUrna = document.createElement('span');
                    const numeroUrna = document.createElement('span');
                    const nomeCompleto = document.createElement('span');
                    const cidade = document.createElement('span');
                    const partido = document.createElement('span');
                    const instagramLink = document.createElement('a');
                    const instagramImg = document.createElement('img');
                    const facebookLink = document.createElement('a');
                    const facebookImg = document.createElement('img');
    
                    // Definindo id dos elementos do perfil
                    instagramImg.id = 'instagram';
                    facebookImg.id = 'facebook';
                    nomeUrna.id = 'nomeUrna';
                    numeroUrna.id = 'numeroUrna';
                    nomeCompleto.id = 'nomeCompleto';
                    cidade.id = 'cidade';
                    partido.id = 'partidoSigla';
                    
                    // Escrevendo os dados nas variaveis
                    foto.src = candidato.linkFoto;
                    nomeUrna.textContent = candidato.nomeUrna.toUpperCase();
                    numeroUrna.textContent = candidato.numUrna;
                    cidade.textContent = candidato.cidade;
                    partido.textContent = `${candidato.partido} - ${candidato.siglaPartido.toUpperCase()}`;
    
                    // Expressão Regular para deixar as primeiras letras maiusculas do NomeCompleto
                    capitalize = candidato.nomeCompleto.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
                    nomeCompleto.textContent = capitalize
    
                    // Verificar se o Instagram esta definido
                    if (candidato.instagram) {
                        instagramLink.href = candidato.instagram;
                        instagramImg.src = 'images/instagram.svg';
                        instagramLink.appendChild(instagramImg);
                        perfilDiv.appendChild(instagramLink);
                    } else {
                        facebookImg.id = 'uniqueIcon'
                    }
    
                    // Verificar se o Facebook esta definido
                    if (candidato.facebook) {
                        facebookLink.href = candidato.facebook;
                        facebookImg.src = 'images/facebook.svg';
                        facebookLink.appendChild(facebookImg);
                        perfilDiv.appendChild(facebookLink);
                    } else {
                        instagramImg.id = 'uniqueIcon'
                    }
    
                    // Joga os dados tudo dentro da div 'perfildiv'
                    perfilDiv.appendChild(foto);
                    perfilDiv.appendChild(nomeUrna);
                    perfilDiv.appendChild(numeroUrna);
                    perfilDiv.appendChild(nomeCompleto);
                    perfilDiv.appendChild(cidade);
                    perfilDiv.appendChild(partido);
    
                    divCandidatos.appendChild(perfilDiv); // Exibi tudo na tela
                
            })
        })

        // candidatosFiltro.sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto));

                    
        divCandidatos.innerHTML = ''; // Limpando as div para atualizar os dados exibidos

        // Itereando por cada candidato
        
                    
        })
    })
})