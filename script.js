// 1. OBTENER ELEMENTOS (MODIFICADO)
const mario = document.getElementById('mario');
const gameWorld = document.getElementById('game-world');
const messageBox = document.getElementById('message-box'); 
const closeButton = document.getElementById('close-button');
// Obtenemos el contenedor padre que ahora llenaremos dinámicamente
const messageContentWrapper = document.getElementById('message-content-wrapper');


// 2. CONSTANTES (MODIFICADO)
// const groundHeight = 85; // <-- Ya no es una constante
const groundHeightVH = 8.5;  // <-- NUEVO: 8.5vh (8.5% del alto)
let groundHeight;           // <-- NUEVO: El valor en píxeles se calculará

const gravity = -1;
const jumpStrength = 20;
const moveSpeed = 4;
const scale = 2;
const marioWidth = 32 * scale;  
const marioHeight = 32 * scale; 
const BOX_SIZE = 40; 

// --- NUEVA SECCIÓN: 2.5 ---
// 2.5 FUNCIÓN PARA CALCULAR ALTURA DEL SUELO
function updateGroundHeight() {
    // Calcula cuántos píxeles son 8.5vh
    groundHeight = (window.innerHeight * groundHeightVH) / 100;
}


// 3. MAPEO DE FRAMES
const FRAMES_IDLE = ["idle.png"];
const FRAMES_RUN = ["1.png", "2.png", "3.png", "4.png"];
const FRAME_JUMP = "jump.png";

// --- SONIDOS ---
const jumpSound = new Audio('salto.mp3');

// --- ESTRUCTURA DE NIVELES (SIN CAMBIOS) ---
const levels = [
    {
        background: "fondo1.png", 
        boxes: [ 
            { 
                x: 325, 
                y: 250, 
                title: "La pintada de la AGS",
                content: [
                    {
                        type: 'image',
                        value: '1b.jpg'
                    },
                    { 
                        type: 'text', 
                        value: `Bajo el rayo del sol, un largo pasillo de paredes grises recibía a fans de videojuegos, música o animé. Entre las paredes de ladrillo que indicaban la entrada y salida de la AGS, el concepto de “normal” era relativo. Grupos de cosplayers, término derivado de costume play que se refiere a las personas que se caracterizan e interpretan a personajes de ficción, reían, cantaban y se sacaban fotos con admiradores que los llamaban por el nombre de sus personajes: “¡Furina, Salón Solitaire!” gritó una chica con un sombrero de Cinnamoroll a otra con un vestido azul y blanco extremadamente detallado, en el que se notaba que había invertido mucho tiempo en su confección. Hacia la derecha, dos chicos con cortes de pelo idénticos y pantalones baggy los miraban con una mezcla de risa y sorpresa. Detrás de ellos, caminaba un hombre morocho, alto y musculoso de barba espesa con una mochila que emulaba ser un caparazón de tortuga con pinchos largos y plateados. El hombre, que debía medir más de un metro 85, le agarraba la mano a una chica muy voluptuosa que solo vestía una malla enteriza violeta con unas medias de red.` 
                    },
                    {
                        type: 'image',
                        value: '1c.jpg'
                    },
                    {
                        type: 'text',
                        value: `Pronto, los ladrillos de las paredes se tiñeron de colores, y un joven sin remera al que le brillaba la transpiración por el sol sacó un pack de sprays de una mochila y se puso a pintar la pared. Otro hombre de gorra amarilla y bermudas camufladas le subió el volumen a un parlante que se iluminaba con los colores del arcoíris. Sonaba una canción en japonés. Serio, miró cómo otro chico de pelo largo y remera de Goku agitaba un spray que, como si fuera una varita mágica, coloreaba la pared a su paso. De a poco, en lo que supo ser una pared gris, ahora había una chica estilo animé muy voluptuosa que le tiraba un beso a quien se cruzara. Más adelante, un chico que vestía tres camperas flúo, una encima de la otra, pintó una llamarada de fuego. La transpiración le chorreaba por debajo de la gorra, sobre la frente. Daba calor verlo, y más aún cuando se agachaba, cambiaba de spray, se erguía y apretaba el gatillo, todo en cinco segundos. Repitió esa secuencia, cada vez más transpirado, y, de a poco, armó un rompecabezas visual que le dio vida a su graffiti.`
                    },
                    {
                        type: 'text',
                        value: `Pasó el tiempo y más gente se juntó a pintar y a ver las obras de otros. De a poco, los mismos que se presentaron a la edición 2025 de la AGS se volvieron parte del evento, y crearon una nueva atracción: la “pintada” del Argentina Game Show.`
                    }
                ],
                hit: false 
            }
        ]
    },
    {
        background: "fondo2.png", 
        boxes: [
            { 
                x: 150, 
                y: 250,
                title: "Escenario de Speed Unlimited",
                content: [
                    {
                        type: 'image',
                        value: '2a.jpg'
                    },
                    { 
                        type: 'text', 
                        value: `El evento contó con dos escenarios: uno al aire libre, sponsoreado por Speed Unlimited, y otro cubierto, sponsoreado por Visa. El primero era el principal, y allí se presentaron alrededor de 30 artistas que tocaron música en vivo, en su mayoría de trap. Lit Killah, Lucho SSJ, Seven Kayne y Bhavi fueron algunas de las figuras de alto perfil presentes a lo largo de los tres días.`
                    },
                    {
                        type: 'text',
                        value: 'Los shows musicales atrajeron a una multitud al centro del predio. La mayoría de los espectadores eran jóvenes de ropa urbana que cantaban las canciones de principio a fin, haciendo movimientos rítmicos y constantes con la cabeza. Un poco más atrás, y en menor cantidad, se veían algunos cosplayers que miraban el escenario sonriendo y moviéndose sutilmente al ritmo de la música.'
                    },
                    {
                        type: 'image',
                        value: '2b.jpg'
                    },
                    {
                        type: 'text',
                        value: `Por el escenario de Speed no solo pasaron traperos, sino que también hubo streamers. El primer día de la AGS, parte del panel de Paren la Mano, un programa de streaming de Vorterix, ocupó el escenario principal del festival para presentar el Cara a Cara de “Párense de Manos III”. El último se trata de un show de boxeo entre streamers, que tendrá lugar a fin de año, y que aprovechó a la AGS como antesala promocional. El sábado 11 subieron al escenario Coscu, Joaco Lopez y Espe, creadores de contenido, que hicieron de jurado para el BRG Talent Show: un concurso de talentos que se transmite por la plataforma Kick, otro de los sponsors del Argentina Game Show, y en el que participaron jóvenes por una computadora gamer.`
                    }
                ],
                hit: false 
            }
        ]
    },
    {
        background: "fondo3.png", 
        boxes: [
            { 
                x: 150, 
                y: 250,
                title: "Escenario VISA",
                content: [
                    {
                        type: 'text',
                        value: 'En el escenario de Visa se transmitieron competencias de e-sports y actividades que involucraron al público. Valorant, Counter y LOL fueron algunos de los títulos que pasaron por la pantalla grande y sirvieron de campo de batalla entre equipos compuestos por los presentes. También tuvieron lugar en ese escenario las “Findes Gamers Cups” de LOL y Valorant: torneos flash con inscripciones abiertas al público. Los ganadores del torneo fueron premiados con descuentos en juegos y tiendas gamers, y el primer premio consistía en  componentes de computadora.'
                    },
                    {
                        type: 'image',
                        value: '3a.jpg'
                    },
                    {
                        type: 'text',
                        value: `Además de las competencias de videojuegos, al escenario Visa también subieron cosplayers que compitieron por el disfraz más creativo, fiel y complejo. El evento duró tres días, y se presentaron más de 30 artistas que compitieron por una variedad de premios relacionados con el mundo del gaming. La magia de los cosplayers no sólo radicó en la complejidad de sus trajes, sino en el personaje que encarnaron durante el evento.`
                    },
                    {
                        type: 'image',
                        value: '3b.jpg'
                    },
                    {
                        type: 'text',
                        value: 'Al costado del escenario, M0chi, una chica de baja estatura que parecía un camaleón, posaba para los que le pedían una foto. “Estoy haciendo cosplay de Neeko, es un personaje del LOL”, dijo en medio de un tumulto de gente. Apenas terminó la oración, un chico con una cámara profesional se le puso enfrente y le gritó “¡foto!”. Ella se enroscó en una pose complicada, esperó al flash, y siguió hablando como si nada hubiera pasado: “Esto es goma eva, cancán y cartón. Todo lo comprás en una librería, el tema es el tiempo. Este traje me llevó alrededor de 12 horas en hacer”, explicó mientras mostraba cómo, en realidad, no se había pintado de verde, sino que tenía una “símil piel” hecha de cancán verde que le cubría todo el cuerpo. De la espalda baja de M0chi, que no quiso compartir su nombre real, salía una cola larga adornada con flores hechas de Goma Eva colorida. Parecía descalza, pero en realidad, se había pegado una plantilla a modo de zapato. A su lado había una chica llamada Larissa. Era muy voluptuosa y llevaba un vestido negro con un escote pronunciado. De los costados de su cabeza brotaban unos cuernos blancos que descansaban sobre una especie de velo de monja. Un chico robusto de chomba rosa se le acercó, le tocó el hombro, le dio una dona y la miró fijamente, expectante. La chica agradeció al desconocido con una risa. Cuando el chico se fue, desilusionado, la sonrisa de la cosplayer desapareció, y abandonó la dona en una mesa. Larissa hacía cosplay de RN Aquila de Azur Lane, y mirando seria al horizonte, explicó, “siempre me pasan estas cosas, te acostumbras”. “Vienen a pedirnos una foto y nos agarran de la cintura, nos tiran onda, nos hacen preguntas muy personales. A mi eso me cae mal, me molesta, pero hay mucha gente que se emociona por vernos, y eso es lo más lindo”, dijo sonriendo levemente. A diferencia de M0chi, que no cobraba por su tiempo, Larissa no hacía fotografías gratis, y explicó que para ella, esto es una forma de promoción: tiene un Only Fans que funciona como su única fuente de ingresos. “No sé exactamente cuánto estoy ganando, pero la suscripción es de 10 dólares por mes”, comentó, y confesó que este tipo de eventos aumentan sustancialmente su base de seguidores. M0chi, en cambio, dijo tímidamente que “vengo acá porque amo el cosplay y la comunidad. Hay algunos eventos a los que te pagan por ir o en los que podes competir por premios, pero es más difícil llegar hasta allá”. El diálogo fue abruptamente interrumpido por otro joven con una cámara grande y pesada que les pedía una foto para la AGS. Las cosplayers posaron inmediatamente, primero juntas y después separadas. Hicieron alrededor de tres fotos cada una, y, pronto, una multitud de hombres en sus veintes hicieron fila para compartir aunque sea un minuto con ellas.'
                    }
                ],
                hit: false 
            }
        ]
    },
    {
        background: "fondo4.png", 
        boxes: [
            { 
                x: 150, 
                y: 250,
                title: "El cosplay alley",
                content: [
                    {
                        type: 'image',
                        value: '4a.jpg'
                    },
                    {
                        type: 'text',
                        value: 'Había un pasillo entero dedicado a stands de cosplayers llamado “cosplay alley”. Allí podían encontrarse más de 50 puestos que ofrecían todo tipo de cosas relacionadas con el animé y videojuegos. En cada mesa se vendían cosas distintas. Algunas tenían álbumes de fotos promocionando al “dueño” del stand, otros vendían figuras en 3D, e incluso había algunos que hacían ilustraciones en vivo. Una chica de camisa pirata que llevaba un gran sombrero tipo Jack Sparrow promocionaba contenido para adultos en su stand. “A mi no me pagan por venir”, dijo, “los de la AGS te contactan por Instagram y te ofrecen ponerte un stand. Te pagan la entrada y la bebida, pero el resto me lo tuve que bancar yo, que encima vengo de provincia”. En su mesa, la chica tenía tres gruesos álbumes de fotos abiertos por la mitad, en los que había alrededor de cuatro imágenes por página. Cada una era distinta, cambiaba de cosplay y de pose: a veces miraba sugerentemente a la cámara con un traje de colegiala japonesa, otras, se agachaba de espaldas en una bikini fina, que se perdía entre su piel. “No sé exactamente cuánto hago en Only Fans”, continuó Hika mientras le daba la espalda a un chico que intentaba llamar su atención, “pero me dedico a eso full time”. Unos puestos de por medio al de Hika, un hombre con un sombrero negro dibujaba al Guasón. Había alrededor de siete personas ojeando los libros de la cosplayer mientras que en el puesto del dibujante sólo había tres personas. Sobre la mesa del hombre, que rondaría los 50 años, había señaladores, pósters, láminas y pequeños dibujos que rondaban los 10 mil pesos. Detrás de la mesa estaba Leo Batic, quien contó lo que lo motivó a presentarse en la AGS: “Lo hago por pasión. Soy ilustrador, y por suerte puedo vivir de esto”. Pero ese no es el caso de todos. Unos puestos a la derecha se encontraba Mauro, quien también es artista gráfico, pero le cuesta llegar a fin de mes: “Tengo una nena de cuatro años, no puedo dejar mi laburo y dedicarme a esto. Trabajo a la mañana, a la tarde estoy con ella, y a la noche dibujo”. Mientras pasaba lápices sobre papel rugoso, explicaba que todo en su stand era artesanal y original. Sin embargo, los que paseaban por el cosplay alley solo se detenían unos minutos a ver qué dibujaba Mauro, y luego se instalaban en el stand de Hika.'
                    },
                    {
                        type: 'image',
                        value: '4b.jpg'
                    },
                    {
                        type: 'text',
                        value: 'En otros puestos se solían ver figuras en 3D de Attack on Titan, llaveros de Hollow Knight, pins de Pokémon y dibujos de Demon Slayer, Jujutsu Kaisen, y más. Los cosplayers paseaban por el pasillo y charlaban entre ellos. “Entre nosotros nos conocemos casi todos, hay pocas caras nuevas, sobre todo en eventos como la AGS” dijo Caro, una chica de Entre Ríos que hacía cosplay de Evelynn, una demonio del League of Legends que seduce a sus presas y luego las tortura hasta la muerte. Ella llevaba una pollera negra ajustada con un corpiño acharolado del mismo color. Tenía una peluca lila que desafiaba las leyes de la gravedad, y permanecía en su cabeza recta y sintética a pesar de la transpiración y sus caminatas a lo largo del pasillo. “A mi me encanta venir por la gente: nos miran, nos charlan, nos piden fotos, es lo que más me gusta”, dijo mientras se masajeaba uno de sus pies, que estaban atrapados en tacos aguja negros hace más de 6 horas. “Eso sí, de la AGS no esperes más que el stand y la Speed. Nos hacen figurar en todos lados pero nadie nos paga por esto. Yo tuve que llegar como tres horas antes de que empiece y no nos ponen ni un aire acondicionado”. Lo que decía Caro era cierto, en el pasillo hacía un calor insoportable, y eso es un problema para los cosplayers: “Con la transpiración, la peluca se me arruina. A algunos los trajes se les empiezan a despegar, y hasta hay gente que le baja la presión. Encima es un asco tener que estar sacándose fotos con pibes todos chivados”, contaba mientras se reía. A pesar de todo los flashes no descansaban, y aún con la humedad aplastante, el cosplay alley era de las atracciones que más gente reunía. Desde curiosos hasta expertos, y para bien o para mal, todos estaban fascinados con la performance de los artistas del pasillo.'
                    },
                    {
                        type: 'image',
                        value: '4c.jpg'
                    }
                ],
                hit: false 
            }
        ]
    },
    {
        background: "fondo5.png", 
        boxes: [
            { 
                x: 150, 
                y: 250,
                title: "Stands Gamer",
                content: [ 
                    {
                        type: 'image',
                        value: '5a.jpg'
                    },
                    {
                        type: 'text',
                        value: 'En la parte cubierta del predio estaba lo más importante para la comunidad gamer: los stands de videojuegos. Eran 23 los puestos dedicados a vender componentes para computadoras, promocionar juegos, equipos de audio, sillas gamer, y todo lo relacionado con la comunidad. Marcas como Compra Gamer, JBL, Logitech, Intel, AMD y Nintendo proponían actividades a cambio de premios o tickets que se podían canjear por merch de las marcas. Las filas para participar de las actividades eran larguísimas, y el calor del lugar mezclado con una multitud que se multiplicaba, transformó al evento en una prueba de resistencia física.'
                    },
                    {
                        type: 'image',
                        value: '5b.jpg'
                    },
                    {
                        type: 'text',
                        value: `Muchas marcas se lucieron con sus stands. Por ejemplo, Mojang Studios, los creadores del videojuego Minecraft, plantearon una experiencia inmersiva y crearon un pequeño escenario ambientado en el mundo de Minecraft. Había un árbol, tierra y mesas de madera cuadradas sobre las que se apoyaban computadoras gamer con el juego del que trataba el stand. Ese era el otro atractivo del evento: había una gran variedad de equipos disponibles para probar. En el stand de Nintendo, que ocupaba gran parte del espacio dispuesto por la AGS, había ocho Nintendo Switch 2 para que el público del evento probara. Compra Gamer puso a disposición monitores curvos, y Shell computadores con volante y cambios. Sin embargo, para Jawer, un chico de 22 años de pelo largo y enrulado que visita la AGS desde su edición número ocho, esto no es suficiente: “antes habían más stands, juegos, premios. Para qué quiero probar computadoras si ya tengo una en mi casa”. Su crítica es válida: ¿Por qué la atracción principal de un evento de gaming destinado a gamers ofrece lo mismo de lo que ya disponen? Para Ariel, parte del grupo de amigos que acompañaba a Jawer, la respuesta es clara: “Es que nosotros ya no somos el público principal de la AGS. Están tratando de sumar más gente que le guste el trap”. Siguiendo con lo que planteaba Ariel, su amigo Matias agregó que “a nosotros no nos gusta la música que pasan ni lo que venden en los stands. Ya no es original, se nota que se volvió comercial y se llenó de gente que no juega”. A los chicos les interesaban las competencias de Valorant y LOL, pero había tanta gente que no pudieron conseguir un asiento para ver los torneos y tampoco pudieron jugar a nada. Este tipo de testimonios se repitieron en grupos de amigos gamers. El relato de las familias, era otro: “Nunca vinimos a nada parecido a esto, nos parece que está bueno para usar cosas que normalmente uno no tiene”. La AGS se plantea entonces como una novedad para unos y un fracaso para otros. A pesar de todo, este año marcaron un récord de concurrencia.`
                    }
                ],
                hit: false 
            }
        ]
    }
];
let currentLevelIndex = 0;

// 4. ESTADO DEL JUEGO (MODIFICADO)
let posX = 50;
// let posY = groundHeight; // <-- Se asignará al iniciar
let posY;                   // <-- NUEVO

let velY = 0;
let isJumping = false;
let direction = 'right';
let activeBoxIndex = null; 

let currentFrameIndex = 0;
let frameDelay = 0;
const animationSpeed = 5;

// 5. MANEJO DE INPUT
let keys = { ArrowLeft: false, ArrowRight: false, Space: false };
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        keys[e.key === ' ' ? 'Space' : e.key] = true;
    }
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') {
        keys[e.key === ' ' ? 'Space' : e.key] = false;
    }
});

// --- NUEVO EVENT LISTENER: Ajusta el suelo si la ventana cambia de tamaño ---
window.addEventListener('resize', () => {
    updateGroundHeight();
    // Si Mario está en el suelo, lo "pega" al nuevo suelo
    if (!isJmuping) {
        posY = groundHeight;
    }
});


// 6. FUNCIÓN DE ANIMACIÓN
function updateAnimation() {
    frameDelay++;
    if (frameDelay < animationSpeed) return;
    frameDelay = 0;

    if (isJumping) {
        mario.src = FRAME_JUMP;
    } else if (keys.ArrowLeft || keys.ArrowRight) {
        currentFrameIndex = (currentFrameIndex + 1) % FRAMES_RUN.length;
        mario.src = FRAMES_RUN[currentFrameIndex];
    } else {
        mario.src = FRAMES_IDLE[0];
        currentFrameIndex = 0;
    }
}

// 7. MOSTRAR Y OCULTAR MENSAJE
function showMessage(boxData) {
    // 1. Limpiar el contenido anterior
    messageContentWrapper.innerHTML = '';
    
    // 2. Crear y añadir el título
    const titleEl = document.createElement('h1');
    titleEl.textContent = boxData.title;
    messageContentWrapper.appendChild(titleEl);
    
    // 3. Recorrer el array de contenido y crear elementos
    boxData.content.forEach(item => {
        if (item.type === 'text') {
            const textEl = document.createElement('p');
            textEl.textContent = item.value;
            messageContentWrapper.appendChild(textEl);
        } 
        else if (item.type === 'image') {
            const imgEl = document.createElement('img');
            imgEl.src = item.value;
            imgEl.alt = boxData.title; // Alt text descriptivo
            messageContentWrapper.appendChild(imgEl);
        }
    });
    
    // 4. Mostrar la caja y resetear el scroll
    messageBox.classList.add('show');
    messageContentWrapper.scrollTop = 0;
}

function hideMessage() {
    messageBox.classList.remove('show');
    
    if (activeBoxIndex !== null) {
        levels[currentLevelIndex].boxes[activeBoxIndex].hit = false;
        
        const boxEl = document.querySelector(`.q-box[data-index='${activeBoxIndex}']`);
        if (boxEl) {
            boxEl.classList.remove('hit');
        }
        
        activeBoxIndex = null;
    }
}

closeButton.addEventListener('click', hideMessage);

// 8. DIBUJAR CAJAS
function renderBoxes() {
    const oldBoxes = document.querySelectorAll('.q-box');
    oldBoxes.forEach(b => b.remove());

    const currentBoxes = levels[currentLevelIndex].boxes;
    currentBoxes.forEach((boxData, index) => {
        const boxEl = document.createElement('div');
        boxEl.className = 'q-box';
        boxEl.style.left = `${boxData.x}px`;
        boxEl.style.bottom = `${boxData.y}px`;
        boxEl.style.width = `${BOX_SIZE}px`;
        boxEl.style.height = `${BOX_SIZE}px`;
        boxEl.dataset.index = index; 
        
        if (boxData.hit) {
            boxEl.classList.add('hit');
        }
        
        gameWorld.appendChild(boxEl);
    });
}

// 9. CARGAR NIVEL
function loadLevel() {
    hideMessage(); 

    const level = levels[currentLevelIndex];
    gameWorld.style.backgroundImage = `url('${level.background}')`;
    renderBoxes();
}

// 10. CHEQUEO DE COLISIONES
function checkCollisions() {
    const marioRect = {
        left: posX,
        right: posX + marioWidth,
        bottom: posY,
        top: posY + marioHeight
    };

    const currentBoxes = levels[currentLevelIndex].boxes;
    
    currentBoxes.forEach((boxData, index) => {
        if (boxData.hit) return; 

        const boxRect = {
            left: boxData.x,
            right: boxData.x + BOX_SIZE,
            bottom: boxData.y,
            top: boxData.y + BOX_SIZE
        };

        const isOverlappingX = marioRect.right > boxRect.left && marioRect.left < boxRect.right;
        const isHittingFromBelow = marioRect.top > boxRect.bottom && marioRect.bottom < boxRect.bottom;
        const isJumpingUp = velY > 0;

        if (isOverlappingX && isHittingFromBelow && isJumpingUp) {
            velY = -1; 
            boxData.hit = true;
            
            activeBoxIndex = index;

            const boxEl = document.querySelector(`.q-box[data-index='${index}']`);
            if (boxEl) {
                boxEl.classList.add('hit');
            }
            
            showMessage(boxData);
        }
    });
}

// 11. GAME LOOP (Corregido)
function gameLoop() {
    // --- Lógica de movimiento ---
    if (keys.ArrowLeft) {
        posX -= moveSpeed;
        direction = 'left';
    }
    if (keys.ArrowRight) {
        posX += moveSpeed;
        direction = 'right';
    }

    const worldWidth = gameWorld.offsetWidth;

    // --- LÓGICA DE CAMBIO DE NIVEL (CORREGIDA) ---
    // 1. Ir al nivel ANTERIOR (Izquierda)
    if (posX < -marioWidth) { 
        currentLevelIndex--; 
        if (currentLevelIndex < 0) {
            currentLevelIndex = levels.length - 1; 
            levels.forEach(lvl => lvl.boxes.forEach(b => b.hit = false));
        }
        loadLevel(); 
        posX = worldWidth - marioWidth - 10; 
    } 
    // 2. Ir al nivel SIGUIENTE (Derecha)
    else if (posX > worldWidth - marioWidth) { 
        currentLevelIndex++;
        if (currentLevelIndex >= levels.length) {
            currentLevelIndex = 0;
            levels.forEach(lvl => lvl.boxes.forEach(b => b.hit = false));
        }
        loadLevel(); 
        posX = 10; 
    }

    // --- Lógica de Salto ---
    if (keys.Space && !isJumping) {
        velY = jumpStrength;
        isJumping = true;
        keys.Space = false;
        
        jumpSound.currentTime = 0;
        jumpSound.play();
    }
    velY += gravity;
    posY += velY;

    // --- Colisión con el suelo ---
    // (Usa la variable 'groundHeight' calculada)
    if (posY <= groundHeight) { 
        posY = groundHeight;
        velY = 0;
        isJumping = false;
    }

    // --- Resto de la lógica ---
    checkCollisions();

    mario.style.left = `${posX}px`;
    mario.style.bottom = `${posY}px`;

    let scaleX = (direction === 'left') ? -scale : scale;
    mario.style.transform = `scaleX(${scaleX}) scaleY(${scale})`;

    updateAnimation();
}


// Iniciar (MODIFICADO)
updateGroundHeight(); // <-- NUEVO: Calcula el suelo por primera vez
posY = groundHeight;  // <-- NUEVO: Asigna la posición inicial de Mario
loadLevel(); 
setInterval(gameLoop, 1000 / 60);
