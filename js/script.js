if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('Service Worker instalado.', registration.scope);
            })
            .catch((error) => {
                console.log('Falha ao instalar Service Worker.', error);
            });
    });
} else {
    console.log('Service Worker não é compatível com seu navegador.');
}

document.addEventListener('DOMContentLoaded', () => {
    fetch("./candidatos.json")
        .then((response) => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then((dados) => {
            const barraPesquisa = document.querySelector('.search input');
            const divCandidatos = document.querySelector('.candidatos');

            barraPesquisa.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    buscaCandidatos(dados, barraPesquisa, divCandidatos);
                }
            });
        })
        .catch((error) => {
            console.error('Erro ao buscar dados', error);
        });
});

function buscaCandidatos(dados, barraPesquisa, divCandidatos) {
    const termoBuscado = barraPesquisa.value.toLowerCase().trim();

    if (termoBuscado !== '') {
        const candidatosEncontrados = filtrarCandidatos(dados.candidatos, termoBuscado);
        mostrarCandidatos(candidatosEncontrados, divCandidatos);
    } else {
        limparTela(divCandidatos);
    }
}

function filtrarCandidatos(candidatos, termoBuscado) {
    return candidatos.filter((candidato) => {
        const nomeUrna = candidato.nomeUrna.toLowerCase();
        const numUrna = candidato.numUrna.toString();
        const cidade = candidato.cidade.toLowerCase();

        return (
            nomeUrna.includes(termoBuscado) || 
            numUrna.includes(termoBuscado) ||
            cidade.includes(termoBuscado)
        );
    });
}

function mostrarCandidatos(candidatos, divCandidatos) {
    limparTela(divCandidatos);
    candidatos.forEach((candidato) => {
        const perfil = criarInfoCand(candidato.linkFoto, 'foto', candidato);
        perfil.className = 'candidatos';
        divCandidatos.appendChild(perfil);
    });
}

function limparTela(divCandidatos) {
    divCandidatos.innerHTML = '';
}


function criarInfoCand(fotoCandidato, alt, candidato) {
    const img = document.createElement('img');
    img.src = fotoCandidato;
    img.alt = alt;

    const foto = criarElementoImg(candidato.linkFoto, 'foto candidato', 'foto');
    const nomeUrna = criarElementoTexto('span', candidato.nomeUrna.toUpperCase(), 'nomeUrna');
    const numeroUrna = criarElementoTexto('span', candidato.numUrna, 'numeroUrna');
    const nomeCompleto = criarElementoTexto('span', formatarNome(candidato.nomeCompleto), 'nomeCompleto');
    const cidade = criarElementoTexto('span', candidato.cidade, 'cidade');
    const partidoSigla = criarElementoTexto('span', `${candidato.partido} - ${candidato.siglaPartido.toUpperCase()}`, 'partidoSigla');
    
    const infos = document.createElement('div');

    infos.appendChild(foto);
    infos.appendChild(nomeUrna);
    infos.appendChild(numeroUrna);
    infos.appendChild(nomeCompleto);
    infos.appendChild(cidade);
    infos.appendChild(partidoSigla);

    if (candidato.instagram) {
        const linkInstagram = criarRedeSocial(candidato.instagram, 'img/instagram.svg', 'instagram');
        infos.appendChild(linkInstagram);
    }

    if (candidato.facebook) {
        const linkFacebook = criarRedeSocial(candidato.facebook, 'img/facebook.svg', 'facebook');
        infos.appendChild(linkFacebook);
    }

    return infos;
}

function criarRedeSocial(url, caminhoImg, alt) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank'; // Abre o link em uma nova aba.

    const img = criarElementoImg(caminhoImg, alt, alt);
    link.appendChild(img);

    return link;
}

function criarElementoImg(caminho, alt, id) {
    const img = document.createElement('img');
    img.src = caminho;
    img.alt = alt;
    img.id = id;

    return img;
}

function criarElementoTexto(tag, conteudoTexto, id) {
    const elemento = document.createElement(tag);
    elemento.textContent = conteudoTexto; 
    elemento.id = id;
    return elemento;
}

function formatarNome(nomeCompleto) {
    return nomeCompleto.replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase());
}