    const html = document.querySelector('html');
    const focoBt = document.querySelector('.app__card-button--foco');
    const curtoBt = document.querySelector('.app__card-button--curto');
    const longoBt = document.querySelector('.app__card-button--longo');
    const banner = document.querySelector('.app__image'); //variável para pegar o seletor que possui a classe ".app__image"
    const titulo = document.querySelector('.app__title');
    const botoes = document.querySelectorAll('.app__card-button');
    const iniciarOuPausarBt = document.querySelector('span');
    const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');
    const temporizador = document.getElementById('timer');
    const musicaFocoInput = document.getElementById('alternar-musica');
    const musica = new Audio('./sons/luna-rise-part-one.mp3');
    let tempoCorridoEmSegundos = 1500;
    const startPauseBt = document.getElementById('start-pause');
    let intervaloId = null;
    musica.loop = true;
    const musicaInicio = new Audio('./sons/play.wav');
    const musicaPause = new Audio('./sons/pause.mp3');
    const musicaFinal = new Audio('./sons/beep.mp3');

    musicaFocoInput.addEventListener('change', function()
    {
        if(musica.paused){
            musica.play();
        }
        else
        musica.pause();
    });
    console.log(musicaFocoInput);
    focoBt.addEventListener('click', function()
    {
    //  html.setAttribute('data-contexto', 'foco');
        //banner.setAttribute('src', './imagens/foco.png');
        tempoCorridoEmSegundos = 1500;
        alterarContexto('foco');
        focoBt.classList.add('active')
    });
    curtoBt.addEventListener('click', ()=>{
    //  html.setAttribute('data-contexto', 'descanso-curto');
    // banner.setAttribute('src', './imagens/descanso-curto.png');
        tempoCorridoEmSegundos = 5 * 60;
        alterarContexto('descanso-curto');
        curtoBt.classList.add('active');
    });
    longoBt.addEventListener('click', function(){
        // html.setAttribute('data-contexto', 'descanso-longo');
        // banner.setAttribute('src', './imagens/descanso-longo.png');
        tempoCorridoEmSegundos = 15*60; 
        alterarContexto('descanso-longo');
        longoBt.classList.add('active');
    });

    function alterarContexto(contexto){
        mostrarTempo();
        botoes.forEach(function (contexto){
            contexto.classList.remove('active');
        }); 
        html.setAttribute('data-contexto', contexto)
        banner.setAttribute('src', `./imagens/${contexto}.png`); //para templates string eu uso crase e não aspas simpless
        switch (contexto){
            case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong"> mergulhe no que importa.</strong>`
            break; 

            case 'descanso-curto': 
            titulo.innerHTML = `Que tal dar uma respirada?,<br>
            <strong class="app__title-strong"> Faça uma pausa curta.</strong>`
            break; 

            case 'descanso-longo':
                titulo.innerHTML = `Hora de voltar à superficie,<br>
                <strong class="app__title-strong"> Faça uma pausa longa. </strong>`
            break;
            default:
                break;
        }
    }
    function mostrarPause(){
    iniciarOuPausarBt.addEventListener('click', function()
        {
            iniciarOuPausarBt.innerHTML = '<strong> Pausar </strong>';
            iniciarOuPausarBtIcone.setAttribute('src', `./imagens/pause.png`);
        });
    }
    mostrarPause();
    const contagemRegressiva = () =>{
        // iniciar();
        if(tempoCorridoEmSegundos <= 0){
            musicaFinal.play();
            musicaFinal.currentTime = 4;
            alert('tempo finalizado');
            zerar();
            return;
        }
        while(EventTarget == 'click');
        {
            mostrarPause();
        /* iniciarOuPausarBt.addEventListener('click', function()
            {
                iniciarOuPausarBt.innerHTML = `<strong> Pausar </strong>`;
                iniciarOuPausarBtIcone.setAttribute('src', `./imagens/pause.png`);
            }); */ 
        tempoCorridoEmSegundos -= 1;
        mostrarTempo();
        }
    }
    startPauseBt.addEventListener('click', iniciarOuPausar);

    function iniciarOuPausar(){
        if(intervaloId!=null){
            musicaPause.play();
            zerar();
            //console.log(intervaloId);
            return; //return para interromper a execução do código
        }
        musicaInicio.play();
        /*
        iniciarOuPausarBt.addEventListener('click', function()
        {
        iniciarOuPausarBt.innerHTML = '<strong> Pausar </strong>';
        });
        */
        intervaloId = setInterval(contagemRegressiva, 1000);
    }
    function zerar(){
        clearInterval(intervaloId);
        iniciarOuPausarBt.innerHTML = '<strong> Começar </strong>';
        iniciarOuPausarBtIcone.setAttribute('src', `./imagens/play_arrow.png`);
        intervaloId = null;
    }
    function mostrarTempo(){
    const tempo = new Date(tempoCorridoEmSegundos*1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${tempoFormatado}`;
    }
    mostrarTempo();