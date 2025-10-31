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

// --- ESTRUCTURA DE NIVELES (CON EPÍGRAFES) ---
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
                        type: 'text', 
                        value: `El fin de semana largo de octubre, un largo pasillo de paredes grises recibió a fans de videojuegos, música y animé en Tecnópolis. Entre las paredes de ladrillo que indicaban la entrada y salida del Argentina Game Show (AGS), el concepto de “normal” se volvía relativo. Grupos de cosplayers, término derivado de <i>costume play</i> que se refiere a las personas que se caracterizan e interpretan a personajes de ficción, reían, cantaban y se sacaban fotos con admiradores que los llamaban por el nombre de sus personajes: “¡Furina, Salón Solitaire!” gritó una chica con un sombrero de Hello kitty a otra con un vestido azul y blanco extremadamente detallado, en el que se notaba que había invertido mucho tiempo en confeccionarlo.` 
                    },
                    {
                        type: 'image',
                        value: '1b.jpg',
                        caption: 'El arte urbano fue protagonista en los pasillos de la AGS.' // EPÍGRAFE
                    },
                    {
                        type: 'text',
                        value: `Dos chicos con pantalones <i>baggy</i> y cortes de pelo muy prolijos miraban con una mezcla de risa y sorpresa a un hombre muy alto y musculoso que en su espalda llevaba una mochila verde loro que emulaba ser un caparazón de tortuga. De ella salían varios pinchos largos y plateados, que brillaban con el reflejo del sol. El hombre, que debía rondar los 30 años, le agarraba la mano a una chica muy voluptuosa que solo vestía una malla enteriza violeta muy cavada. Ella tenía tatuada una serpiente sobre sus glúteos, y daba envidia lo cómoda que parecía estar bajo el caluroso sol de octubre.`
                    },
                    {
                        type: 'text',
                        value: `Pronto, los ladrillos de las paredes se tiñeron de colores. Un joven sin remera, con la piel brillante por el sol, sacó un pack de sprays de la mochila y empezó a pintar. Otro hombre de gorra amarilla y bermudas camufladas le subió el volumen a un parlante que se iluminaba con los colores del arcoíris. Sonaba una canción en japonés. Serio, agitó un spray que, como si fuera una varita mágica, coloreaba la pared a su paso. De a poco, en lo que supo ser una pared gris ahora había una chica estilo animé muy voluptuosa que le tiraba un beso a quien se cruzara.`
                    },
                    {
                        type: 'image',
                        value: '1c.jpg',
                        caption: 'Un artista da vida a un mural mientras un cosplayer de Goku observa.' // EPÍGRAFE
                    },
                    {
                        type: 'text',
                        value: `Más adelante, un chico que vestía tres camperas flúo, una encima de la otra, pintó una llamarada de fuego. El graffiti estaba bien logrado, pero a la llamarada le faltaban varios grados para alcanzar la temperatura de su autor, al que le chorreaban gotas gordas de transpiración por debajo de la gorra. Daba calor verlo. Más aún cuando se agachaba, cambiaba de spray, se erguía y apretaba el gatillo, todo en cinco segundos, y sin descansos. Repitió esa secuencia, cada vez más transpirado, y, de a poco, armó un rompecabezas visual que le dio vida a su graffiti.`
                    },
                    {
                        type: 'text',
                        value: `Pasó el tiempo y más gente se juntó a pintar y a ver las obras de otros. De a poco, el público se volvió parte del evento y creó una nueva atracción: la “pintada” del Argentina Game Show.`
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
                        type: 'text', 
                        value: `El evento contó con dos escenarios: uno al aire libre, sponsoreado por Speed Unlimited, y otro cubierto, sponsoreado por Visa. El primero era el principal, y allí se presentaron alrededor de 30 artistas que tocaron música en vivo, en su mayoría de trap. Lit Killah, Lucho SSJ, Seven Kayne y Bhavi fueron algunas de las figuras de alto perfil presentes a lo largo de los tres días.`
                    },
                    {
                        type: 'text',
                        value: 'Los shows musicales atrajeron a una multitud al centro del predio. La mayoría de los espectadores eran jóvenes de ropa urbana que cantaban las canciones de principio a fin, haciendo movimientos rítmicos y constantes con la cabeza. Un poco más atrás, y en menor cantidad, se veían algunos cosplayers que miraban el escenario sonriendo y moviéndose sutilmente al ritmo de la música.'
                    },
                    {
                        type: 'image',
                        value: '2b.jpg',
                        caption: 'El público joven, principal audiencia de los artistas urbanos.' // EPÍGRAFE
                    },
                    {
                        type: 'text',
                        value: `Por el escenario de Speed no solo pasaron traperos, sino que también hubo streamers. El primer día de la AGS, parte del panel de Paren la Mano, un programa de streaming de Vorterix, ocupó el escenario principal del festival para presentar el Cara a Cara de “Párense de Manos III”. El último se trata de un show de boxeo entre streamers, que tendrá lugar a fin de año, y que aprovechó a la AGS como antesala promocional. El sábado 11 subieron al escenario Coscu, Joaco Lopez y Espe, creadores de contenido, que hicieron de jurado para el BRG Talent Show: un concurso de talentos que se transmite por la plataforma Kick, otro de los sponsors del Argentina Game Show, y en el que participaron jóvenes por una computadora gamer.`
                    },
                    {
                        type: 'text',
                        value: `El sábado 11 subieron al escenario Coscu, Joaco Lopez y Espe, creadores de contenido, que hicieron de jurado para el BRG Talent Show: un concurso de talentos que se transmite por la plataforma Kick, otro de los sponsors del Argentina Game Show, y en el que participaron jóvenes por una computadora gamer.`
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
                        value: 'En el escenario de Visa hubo competencias de e-sports en vivo y otras actividades que involucraron al público. <i>Valorant</i>, <i>Counter Strike</i> y <i>League of Legends</i> (LOL) fueron algunos de los títulos que pasaron por la pantalla grande del escenario, y sirvieron de campo de batalla entre equipos compuestos por los presentes. También se celebraron las “Findes Gamers Cups” de LOL y <i>Valorant</i>: torneos <i>flash</i> con inscripciones abiertas al público. Los ganadores de las competencias fueron premiados con descuentos en juegos, tiendas gamer y componentes de computadora.'
                    },
                    {
                        type: 'text',
                        value: `Además de las competencias de videojuegos, al escenario Visa también subieron cosplayers que compitieron por la puesta en escena más creativa, fiel y compleja. El evento duró los tres días de la AGS, y se presentaron más de 30 artistas que se enfrentaron por una variedad de premios relacionados con el mundo del <i>gaming</i>. La magia de los cosplayers no radicó solo en la complejidad de sus trajes, sino en la manera en la que encarnaron a sus personajes durante todo el evento.`
                    },
                    {
                        type: 'image',
                        value: '3b.jpg',
                        caption: 'M0chi (Neeko) y Larissa (RN Aquila) posan para las cámaras.' // EPÍGRAFE
                    },
                    {
                        type: 'text',
                        value: 'Al costado del escenario, M0chi, una chica de baja estatura que parecía un camaleón, posaba para los que le pedían una foto. “Estoy haciendo cosplay de Neeko, es un personaje del LOL”, dijo en medio de un tumulto de gente. Apenas terminó la oración, un chico con una cámara profesional se le puso enfrente y le gritó “¡foto!”. Ella se puso en cuclillas, apoyó una mano en el piso y le sonrió a la cámara. La cola larga que le brotaba de la espalda baja se asomaba por detrás de su cabeza, lo que le daba un toque exótico y surrealista, casi que no parecía humana. M0chi esperó al flash y luego se irguió y señaló su traje como si no hubiera pasado nada: “Esto es goma eva, cancán y cartón. Todo lo compras en una librería, el tema es el tiempo. Este traje me llevó alrededor de 12 horas en hacer” explicó. M0chi, que no quiso compartir su nombre real, estaba cubierta en cancán, lo que le dio la libertad de pintar sin manchar su cuerpo. Con esta técnica logró que los trazos verdes que la recorrían de pies a cabeza se integraran a ella.'
                    },
                    {
                        type: 'text',
                        value: 'La cosplayer-camaleón parecía descalza, pero en realidad, se había pegado una plantilla a modo de zapato. A su lado, una chica intentaba no pisarla con sus altos tacos negros. Se llamaba Larissa, y era muy alta y voluptuosa. Llevaba un vestido negro con un escote pronunciado y tenía piercings encima del labio y en las mejillas. Estaba haciendo cosplay de RN Aquila, de <i>Azur Lane</i>. A pesar de que no dejaba de sonreír, tenía un aire satánico, como si fuera una bruja: quizás era por los cuernos que le brotaban de los costados de su cabeza y que atravesaban una especie de velo de monja, o por sus piernas tatuadas con estrellas y calaveras. Pero eso no le impedía ser dulce con quienes se le acercaban a pedirle una foto.'
                    },
                    {
                        type: 'image',
                        value: '3a.jpg',
                        caption: 'Los torneos de e-sports se transmitieron en pantallas gigantes.' // EPÍGRAFE
                    },
                    {
                        type: 'text',
                        value: 'A unos metros se veía venir a un chico robusto de chomba rosa. Larissa hizo de cuenta que no veía al muchacho alto que la miraba desde hacía 10 minutos, y se dio vuelta. Cuando estuvo muy cerca, él le tocó el hombro y ella lo miró sonriendo. Sin dirigirle la palabra, el chico le dio una dona y le miró primero la boca y después los ojos, expectante. La cosplayer agradeció al desconocido, que, luego de un minuto, dio la vuelta y desapareció como la sonrisa de Larissa. “Siempre me pasan estas cosas, te acostumbras”, explicó, “vienen a pedirnos una foto y nos agarran de la cintura, nos tiran onda, nos hacen preguntas muy personales. A mi eso me cae mal, me molesta, pero hay mucha gente que se emociona por vernos, y eso es lo más lindo”, dijo sonriendo.'
                    },
                    {
                        type: 'text',
                        value: 'A diferencia de M0chi, que no cobraba por su tiempo, Larissa no posaba en fotos gratis, y explicó que para ella esto es una forma de promoción: tiene un Only Fans que funciona como su única fuente de ingresos. “No sé exactamente cuánto hago, pero la suscripción es de 10 dólares por mes”, comentó refiriéndose al precio a pagar para recibir fotos y videos pornográficos suyos. La cosplayer confesó que este tipo de eventos aumentan sustancialmente su base de seguidores tanto en redes sociales como en la plataforma para adultos.'
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
                        type: 'text',
                        value: 'En la parte cubierta del predio había un pasillo entero dedicado a stands de cosplayers llamado “cosplay alley”. Allí podían encontrarse más de 50 puestos que ofrecían todo tipo de productos relacionados con el animé y los videojuegos. Cada mesa vendía algo distinto: algunas ofrecían figuras en 3D, llaveros y cartas; otras tenían artistas que hacían ilustraciones en vivo; e incluso había mesas en las que descansaban libros de fotos explícitas de los cosplayers del stand.'
                    },
                    {
                        type: 'image',
                        value: '4b.jpg',
                        caption: 'El ilustrador Leo Batic en su puesto, dibujando por pasión.' // EPÍGRAFE
                    },
                    {
                        type: 'text',
                        value: 'Una chica con un traje negro tipo catsuit promocionaba su perfil de Only Fans en su stand. “A mi no me pagan por venir”, dijo, “los de la AGS te contactan por Instagram y te ofrecen ponerte un stand. Te pagan la entrada y la bebida, pero el resto me lo tuve que bancar yo”, comentó mientras miraba a los hombres que pasaban las páginas de sus álbumes, chequeando que no les sacaran fotos. En su mesa, Hika, que hacía cosplay de Bayonetta, la protagonista de la serie de videojuegos del mismo nombre, tenía dos gruesos álbumes abiertos por la mitad, en los que había de dos a cuatro imágenes por página. Cada una era distinta, y cambiaba el cosplay o la pose: a veces, miraba sugerentemente a la cámara con un traje de colegiala japonesa, otras, se agachaba de espaldas con un body ajustado que se clavaba en su piel. “No sé exactamente cuánto hago en Only Fans, pero me dedico a eso <i>full time</i>”, comentó.'
                    },
                    {
                        type: 'text',
                        value: 'Unos puestos a la derecha del de Hika había un stand de un hombre que dibujaba a Krilin, un personaje de Dragon Ball. Alrededor de siete personas ojeaban los libros de la cosplayer, mientras que en el puesto del dibujante solo había dos. Sobre la mesa del hombre, que rondaría los 40 años, había señaladores, pósters, cartas y pequeños dibujos. El artista se llamaba Mauro y, tímidamente, contó cómo le costaba llegar a fin de mes: “Tengo una nena de cuatro años, no puedo dejar mi laburo y dedicarme solo a esto”. “Trabajo a la mañana, a la tarde estoy con ella y a la noche dibujo”, explicó mientras pasaba el lápiz por un papel rugoso. Todo en su stand era artesanal; sin embargo, los que paseaban por el “cosplay alley” solo se detenían unos segundos a ver qué dibujaba Mauro y luego se instalaban en el puesto de Hika.'
                    },
                    {
                        type: 'image',
                        value: '4c.jpg',
                        caption: 'Caro (Evelynn) cuenta los desafíos del cosplay en el evento.' // EPÍGRAFE
                    },
                    {
                        type: 'text',
                        value: 'En otras mesas había figuras en 3D de <i>Attack on Titan</i>, llaveros de <i>Hollow Knight</i>, pins de Pokémon y dibujos de <i>Demon Slayer</i>, <i>Jujutsu Kaisen</i>, y más. Cosplayers y personas con ropa urbana paseaban por el pasillo y charlaban. “Entre nosotros nos conocemos casi todos, hay pocas caras nuevas, sobre todo en eventos como la AGS” dijo Caro, una chica  jóven de Entre Ríos que hacía cosplay de Evelynn, una demonio del LOL que seduce a sus presas y luego las tortura hasta la muerte. La entrerriana llevaba una pollera negra ajustada con un corpiño acharolado del mismo color. Tenía una peluca lila que desafiaba las leyes de la gravedad, y permanecía en su cabeza recta y sintética a pesar de la transpiración y sus caminatas por el largo pasillo. “A mi me encanta venir por la gente: nos miran, nos charlan, nos piden fotos, es lo que más me gusta”, dijo mientras se masajeaba un pie adolorido tras más de seis horas en tacos aguja. “Eso sí, de la AGS no esperes más que el stand y la Speed. Nos hacen figurar en todos lados pero nadie nos paga por esto. Yo tuve que llegar como tres horas antes de que empiece y no nos ponen ni un aire acondicionado”, se quejó.'
                    },
                    {
                        type: 'text',
                        value: 'Lo que decía Caro era cierto: en el pasillo hacía un calor insoportable, y eso es un problema para los cosplayers. “Con la transpiración, la peluca se me arruina; a algunos los trajes se les empiezan a despegar, y hasta hay gente que le baja la presión. Encima es un asco tener que estar sacándose fotos con pibes todos chivados”, contaba la entrerriana mientras se reía. A pesar de todo, los flashes de las cámaras no cesaban y, aún con la humedad aplastante, el “cosplay alley” era de las atracciones que más gente reunía. Desde curiosos hasta expertos, y para bien o para mal, todos estaban fascinados con la <i>performance</i> de los artistas del pasillo, y las fotos no dejaban de dispararse.'
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
                        type: 'text',
                        value: 'Pasando el “cosplay alley” estaba lo más importante para la comunidad <i>gamer</i>: los stands de videojuegos. Eran 23 los puestos dedicados a vender componentes para computadoras, promocionar juegos, equipos de audio, sillas gamer, y todo lo relacionado con la comunidad. Marcas como Compra Gamer, JBL, Logitech, KRÜ Store, AMD y Nintendo, proponían actividades a cambio de premios o tickets que se podían canjear por merch de las marcas. Las filas para participar de las actividades eran larguísimas, y el calor del lugar mezclado con una multitud que se multiplicaba, transformó al evento en una prueba de resistencia física.'
                    },
                    {
                        type: 'image',
                        value: '5b.jpg',
                        caption: 'El stand temático de Minecraft, uno de los más elaborados.' // EPÍGRAFE
                    },
                    {
                        type: 'text',
                        value: `Muchas marcas se lucieron con sus stands. Por ejemplo, Compra Gamer planteó una experiencia inmersiva y creó un pequeño escenario ambientado en el videojuego Minecraft, un juego de mundo abierto cuya peculiaridad es que todo está hecho de bloques. Justamente, el stand era cuadrado en su totalidad: el árbol, las sillas y las mesas. Las computadoras, en este caso dispuestas para jugar Minecraft, eran el corazón del evento, ya que en casi todos los stands se ofrecían equipos para probar.`
                    },
                    {
                        type: 'text',
                        value: `En el puesto de Nintendo, que ocupaba gran parte del espacio dispuesto por la AGS, había ocho Nintendo Switch 2 para que el público probara. Compra Gamer puso a disposición monitores curvos, y Shell computadores con volantes y cambios. Sin embargo, para Jawer, un chico de 23 años de pelo largo y enrulado que visita la AGS desde su edición número ocho, esto no es suficiente: “Antes habían más stands, juegos y premios. Para qué quiero probar computadoras si ya tengo una en mi casa”. Su crítica es válida: ¿Por qué la atracción principal de un evento de <i>gaming</i> destinado a <i>gamers</i> ofrece lo mismo de lo que ya disponen? Para Ariel, parte del grupo de amigos que acompañaba a Jawer, la respuesta es simple: “Es que nosotros ya no somos el público principal de la AGS. Están tratando de sumar más gente que le guste el trap”. Siguiendo con lo que planteaba Ariel, su amigo Matias agregó que, “a nosotros no nos gusta la música que pasan ni lo que venden en los stands. Ya no es original, se nota que se volvió comercial y se llenó de gente que no juega ni es parte de los <i>fandoms</i>”.`
                    },
                    {
                        type: 'image',
                        value: '5b.jpg',
                        caption: 'El stand temático de Minecraft, uno de los más elaborados.' // EPÍGRAFE
                    },
                    {
                        type: 'text',
                        value: `A Jawer y sus amigos les interesaban las competencias de <i>Valorant</i> y LOL, pero había tanta gente que no pudieron conseguir un asiento para ver los torneos, y tampoco pudieron jugar a nada. Este tipo de testimonios se repitieron en grupos de amigos <i>gamers</i>. Una chica con una enorme cabeza de cartón y papel de diario, inspirada en el personaje Isaac del juego <i>The Binding of Isaac</i>, contaba que el evento ya no era tan divertido como en las ediciones anteriores, porque “quieren llamar a otro tipo de gente”. “El chiste de la AGS es mezclar cosplay con juegos, cuando era en Costa Salguero habían muchos stands y se sorteaban un montón de premios, pero había menos cantantes”, finalizó la chica desde la pequeña abertura de su cabeza de cartón.`
                    },
                    {
                        type: 'text',
                        value: `El relato de las familias, sin embargo, era otro: “Nunca vinimos a nada parecido a esto, nos parece que está bueno para probar las compus”, decía una señora con una nena de vestido rosa que se le colgaba del brazo. Ambas hacían fila para tirar unos pinos con una pelotita de madera. Cuando llegaban al final de la fila, la nena jugaba su turno y el de su mamá, y volvía al principio emocionada por pasar otra vez.`
                    },
                    {
                        type: 'text',
                        value: `La AGS se plantea entonces como una novedad para unos y un fracaso para otros. En 2025 asistieron alrededor de 20.000 personas menos que la edición de 2023, pero la cifra de este año se mantuvo con respecto a la de 2024.`
                    }
                ],
                hit: false 
            }
        ]
    }
];
let currentLevelIndex = 0;

// 4. ESTADO DEL JUEGO
let posX = 50;
let posY; // Se asignará al iniciar

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

// Ajusta el suelo si la ventana cambia de tamaño
window.addEventListener('resize', () => {
    updateGroundHeight();
    // --- ¡CORRECCIÓN! ---
    // El error estaba aquí: decía 'isJmuping'
    if (!isJumping) { 
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

// 7. MOSTRAR Y OCULTAR MENSAJE (MODIFICADO PARA EPÍGRAFES)
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
            textEl.innerHTML = item.value;
            messageContentWrapper.appendChild(textEl);
        } 
        else if (item.type === 'image') {
            const imgEl = document.createElement('img');
            imgEl.src = item.value;
            imgEl.alt = boxData.title;
            messageContentWrapper.appendChild(imgEl);

            // --- NUEVO: Añadir epígrafe ---
            if (item.caption && item.caption.trim() !== "") {
                const captionEl = document.createElement('p');
                captionEl.className = 'caption'; // Se aplica el estilo .caption de style.css
                captionEl.textContent = item.caption;
                messageContentWrapper.appendChild(captionEl);
            }
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

// 11. GAME LOOP (LÍMITES DE NIVEL MODIFICADOS)
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

    // --- LÓGICA DE CAMBIO DE NIVEL (SIN LOOP) ---
    
    // 1. Ir al nivel ANTERIOR (Izquierda)
    if (posX < -marioWidth) { 
        if (currentLevelIndex > 0) { // Si NO es el primer nivel (0)
            currentLevelIndex--; 
            loadLevel(); 
            posX = worldWidth - marioWidth - 10; // Aparece a la derecha
        } else {
            posX =  10 ; // Se traba en el borde izquierdo
        }
    } 
    // 2. Ir al nivel SIGUIENTE (Derecha)
    else if (posX > worldWidth - marioWidth) { 
        if (currentLevelIndex < levels.length - 1) { // Si NO es el último nivel
            currentLevelIndex++;
            loadLevel(); 
            posX = 10; // Aparece a la izquierda
        } else {
            posX = worldWidth - marioWidth; // Se traba en el borde derecho
        }
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
updateGroundHeight(); // Calcula el suelo por primera vez
posY = groundHeight;  // Asigna la posición inicial de Mario
loadLevel(); 
setInterval(gameLoop, 1000 / 60);




