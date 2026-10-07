// Contenido de "El Truco de las Brasileñas" — reto de 21 días.
// Todo el texto visible está aquí. Los videos son de YouTube: para cambiar uno, cambia su `yt` (el código del video).

window.APP = {
  nombre: 'El Truco de las Brasileñas',
  total: 21,
  // Mensaje que se comparte por WhatsApp al terminar un día.
  compartir: '¡Acabo de completar el día {dia} del reto El Truco de las Brasileñas! 💪',

  // ---------------------------------------------------------------- EJERCICIOS
  ejercicios: {
    puente:     { nombre: 'Puente de glúteos',                         yt: 'oj0Lv6EclL0' },
    pulsos:     { nombre: 'Pulsos de puente de glúteos',               yt: 'YUZKx8s07ww' },
    abduccion:  { nombre: 'Abducción de cadera en posición de sentadilla', yt: 'GWkLs_ATGxY' },
    patada_der: { nombre: 'Patadas de glúteo (pierna derecha)',        yt: 'KBKl7pIrXxM' },
    patada_izq: { nombre: 'Patadas de glúteo (pierna izquierda)',      yt: '8G9YHGnMc_A' },
    sentadilla: { nombre: 'Sentadillas',                               yt: 'Cw9q-eGlrPg' },
    plie:       { nombre: 'Sentadilla plié',                           yt: '-hTEd4x4Zu8' },
    curtsy:     { nombre: 'Zancada curtsy alternando',                 yt: 'SIgAH-LFc7c' },
    laterales:  { nombre: 'Zancadas laterales',                        yt: 'DH2PyYnR8Tw' },
    talones:    { nombre: 'Elevación de talones',                      yt: '61rYA9mCbjE' },
  },

  // Tres entrenamientos de 5 ejercicios.
  entrenos: {
    gluteo: ['puente', 'pulsos', 'abduccion', 'patada_der', 'patada_izq'],
    pierna: ['sentadilla', 'plie', 'curtsy', 'laterales', 'talones'],
    express: ['plie', 'puente', 'patada_der', 'curtsy', 'laterales'],
  },

  // Calentamiento del entrenamiento guiado (30 s por etapa).
  calentamiento: [
    { icono: '🌬️', titulo: 'Respiración activadora', texto: '5 respiraciones profundas: manos en la cintura, inspira por la nariz llenando la barriga y exhala por la boca vaciando todo. Prepara el oxígeno y activa el foco.' },
    { icono: '🦵', titulo: 'Rotación de tobillos y rodillas', texto: '10 rotaciones de cada tobillo hacia cada lado y después 10 semiflexiones suaves de rodillas. Lubrica las articulaciones antes de empezar.' },
    { icono: '💃', titulo: 'Círculos de cadera', texto: 'Manos en la cintura, haz 10 círculos amplios con la cadera hacia cada lado. Suelta la zona lumbar y despierta el abdomen: la base de todo lo que viene.' },
    { icono: '🙆', titulo: 'Brazos y hombros', texto: 'Brazos estirados hacia los lados: 10 círculos hacia adelante y 10 hacia atrás. Después sube los brazos por encima de la cabeza y bájalos, 10 veces. Abre el pecho.' },
    { icono: '🏃', titulo: 'Elevación de rodillas en el lugar', texto: 'Trota en el lugar subiendo las rodillas hasta la altura de la cadera, a ritmo suave y sin apuro. Acelera el corazón para el entrenamiento.' },
  ],

  // ---------------------------------------------------------------- SEMANAS Y DÍAS
  semanas: [
    { n: 1, nombre: 'Adaptación', foco: 'Aprender el movimiento correcto, sin buscar fatiga máxima.' },
    { n: 2, nombre: 'Construcción', foco: 'Ganar volumen. Más series, mismo movimiento.' },
    { n: 3, nombre: 'Recta Final', foco: 'Superar límites. La última semana es donde los glúteos se firman de verdad.' },
  ],

  // tipo: gluteo | pierna | express | cardio | descanso | final
  dias: [
    { tipo: 'gluteo',  etiqueta: 'GLÚTEO PROFUNDO', titulo: '¡A empezar! Glúteo Profundo', texto: '¡Primer día! Enfoque en el glúteo medio y máximo. Calienta cadera y tobillos por 2 minutos antes y después sigue los 5 ejercicios.', min: 22, reps: 12, series: 2 },
    { tipo: 'pierna',  etiqueta: 'PIERNA Y COLA', titulo: 'Pierna y Cola completo', texto: 'Ejercicios compuestos para trabajar cuádriceps, isquiotibiales, aductores y glúteos juntos. Es el entreno que más "quema".', min: 22, reps: 12, series: 2 },
    { tipo: 'express', etiqueta: 'EXPRESS · CIRCUITO', titulo: 'Express en circuito', texto: 'Entrenamiento corto e intenso para no saltarte el día ocupado. Sin descanso entre ejercicios, solo entre vueltas.', min: 15, reps: 10, series: 2 },
    { tipo: 'gluteo',  etiqueta: 'GLÚTEO PROFUNDO', titulo: 'Glúteo Profundo repite', texto: 'Vuelves al entrenamiento 1: ya conoces los movimientos. Apunta a hacerlo mejor que el día 1, apretando el glúteo arriba.', min: 22, reps: 12, series: 2 },
    { tipo: 'pierna',  etiqueta: 'PIERNA Y COLA', titulo: 'Pierna y Cola repite', texto: 'Segunda pasada. Cadencia lenta y controlada: el pilates es conexión, no prisa. Siente el músculo trabajando.', min: 22, reps: 12, series: 2 },
    { tipo: 'cardio',  etiqueta: 'CARDIO', titulo: 'Cardio suave', texto: 'Caminata de 20 minutos en zona 2 (puedes conversar mientras caminas). Activa el cuerpo sin sobrecargar las piernas.', min: 20, nota: 'Camina 20 min en zona 2.' },
    { tipo: 'descanso', etiqueta: 'DESCANSO', titulo: 'Descanso total', texto: 'Día de recuperación. Tu cuerpo necesita este intervalo para construir músculo. Aprovecha para hidratarte bien y dormir temprano.' },

    { tipo: 'gluteo',  etiqueta: 'GLÚTEO PROFUNDO', titulo: 'Glúteo Profundo + 1 serie', texto: '¡Segunda semana, más volumen! Subes a 15 repeticiones × 3 series. Eres más fuerte que en la semana 1. (Opcional: tobillera liviana de 1 kg.)', min: 25, reps: 15, series: 3 },
    { tipo: 'express', etiqueta: 'EXPRESS · CIRCUITO', titulo: 'Express con más vueltas', texto: 'Express sube a 3 vueltas en circuito. El ritmo continúa y la intensidad sube.', min: 18, reps: 12, series: 3 },
    { tipo: 'pierna',  etiqueta: 'PIERNA Y COLA', titulo: 'Pierna y Cola + volumen', texto: 'Pierna y glúteo con 3 series. Ya estás a la mitad del reto: aguanta firme.', min: 25, reps: 15, series: 3 },
    { tipo: 'gluteo',  etiqueta: 'GLÚTEO PROFUNDO', titulo: 'Glúteo Profundo con más carga', texto: 'Repites el entrenamiento 1 con volumen creciente. Podrás ver tu evolución en cada serie.', min: 25, reps: 15, series: 3 },
    { tipo: 'pierna',  etiqueta: 'PIERNA Y COLA', titulo: 'Pierna y Cola con más carga', texto: 'Última repetición de este entrenamiento esta semana. Apunta a mantener la postura incluso cuando te canses.', min: 25, reps: 15, series: 3 },
    { tipo: 'cardio',  etiqueta: 'CARDIO', titulo: 'Cardio suave', texto: 'Caminata o baile durante 25 minutos: lo que más te guste. Mueve el cuerpo de otra manera.', min: 25, nota: 'Camina o baila 25 min.' },
    { tipo: 'descanso', etiqueta: 'DESCANSO', titulo: 'Descanso total', texto: '¡Dos tercios del reto completados! Descansa el cuerpo y la mente para la recta final que viene.' },

    { tipo: 'gluteo',  etiqueta: 'GLÚTEO PROFUNDO', titulo: 'Glúteo Profundo al límite 🔥', texto: '¡Recta final! 4 series de 15 repeticiones. Es aquí donde los glúteos se firman de verdad. Ve con todo.', min: 28, reps: 15, series: 4 },
    { tipo: 'pierna',  etiqueta: 'PIERNA Y COLA', titulo: 'Pierna y Cola al límite', texto: '4 series con más carga. Los músculos ya conocen el movimiento: ahora toca fortalecer más.', min: 28, reps: 15, series: 4 },
    { tipo: 'express', etiqueta: 'EXPRESS · CIRCUITO', titulo: 'Express intenso', texto: 'Express con 15 repeticiones por ejercicio y 3 vueltas. Máxima quema en poco tiempo.', min: 18, reps: 15, series: 3 },
    { tipo: 'gluteo',  etiqueta: 'GLÚTEO PROFUNDO', titulo: 'Glúteo Profundo recta final', texto: 'Penúltimo entrenamiento de glúteo. ¿Recuerdas el día 1? Ahora haces el triple de volumen.', min: 28, reps: 15, series: 4 },
    { tipo: 'pierna',  etiqueta: 'PIERNA Y COLA', titulo: 'Pierna y Cola recta final', texto: 'Última pasada de Pierna y Cola. Vas a notar la diferencia en tu próxima foto.', min: 28, reps: 15, series: 4 },
    { tipo: 'cardio',  etiqueta: 'CARDIO', titulo: 'Cardio suave antes del final', texto: 'Caminata de 30 minutos para preparar el cuerpo para el desafío final de mañana. Hidrátate bien.', min: 30, nota: 'Camina 30 min.' },
    { tipo: 'final',   etiqueta: 'DESAFÍO FINAL · CIRCUITO', titulo: '🏆 Desafío final', texto: 'Glúteo Profundo completo en circuito × 4 vueltas. 30 segundos de descanso solo entre vueltas, sin descanso entre ejercicios. Terminaste los 21 días: es hora de demostrártelo a ti misma.', min: 25, reps: 12, series: 4 },
  ],

  logros: [
    { icono: '🔥', nombre: 'CHISPA', texto: 'Completa 3 entrenamientos', n: 3 },
    { icono: '⭐', nombre: 'COMPROMISO', texto: 'Completa 7 entrenamientos', n: 7 },
    { icono: '🚀', nombre: 'MITAD VENCIDA', texto: 'Completa 14 entrenamientos', n: 14 },
    { icono: '🏆', nombre: 'TRANSFORMACIÓN', texto: 'Completa los 21 entrenamientos', n: 21 },
  ],

  // ---------------------------------------------------------------- PROTOCOLOS (gratuitos)
  // secciones: { h, intro, items:[{t,d}], lista:[...], texto, plegable }
  grupos: [
    { nombre: 'ALIMENTACIÓN', ids: ['te', 'guia'] },
    { nombre: 'BELLEZA Y RITUALES', ids: ['masaje'] },
  ],
  protocolos: {
    te: {
      etiqueta: 'BONO GRATIS · RITUAL DE TÉS',
      icono: '🍵',
      titulo: 'Té Asiático Antirretención',
      desc: '7 tés para sentirte menos hinchada en 3-5 días. Cuando la hinchazón baja, la piel se ve más lisa.',
      intro: '¡Hola! Si te despiertas hinchada, con el pantalón marcándote, la cara más llena y esa sensación de piernas pesadas al final del día, este protocolo es para ti. Gran parte de lo que se ve como "celulitis marcada" puede empeorar con la retención de líquidos. Aquí tienes 7 tés simples y baratos, que encuentras en cualquier mercado o tienda de productos naturales, con la preparación, el mejor momento para tomarlos y cuándo NO tomarlos.',
      stats: [['7', 'TÉS'], ['3-5', 'DÍAS PARA NOTARLO'], ['5 min', 'DE PREPARACIÓN']],
      secciones: [
        { h: 'Los tés del ritual', intro: 'Cada té tiene un efecto distinto. Elige 2 o 3 favoritos o sigue el cronograma de la semana.', plegable: true, items: [
          { t: 'Té de Hibisco (jamaica)', d: 'El favorito para sentirte menos hinchada. Es un diurético natural suave que ayuda a eliminar el exceso de líquido. En pocos días muchas personas sienten la barriga menos abultada y el pantalón más suelto en la cintura.' },
          { t: 'Té de Cola de Caballo', d: 'El más fuerte de esta lista, usado con moderación. Ayuda a eliminar líquido y es ideal si tienes hinchazón en piernas y tobillos al final del día, cuando el zapato aprieta por la tarde.' },
          { t: 'Té Verde', d: 'Ayuda a acelerar el metabolismo y tiene un efecto drenante suave. Es rico en antioxidantes y te da energía para el entrenamiento.' },
          { t: 'Té de Diente de León', d: 'Un clásico para reducir la hinchazón "general" del cuerpo. Tiene efecto diurético y ayuda a la digestión.' },
          { t: 'Té de Jengibre con Limón', d: 'La dupla favorita. El jengibre da sensación de calor y activa el metabolismo, y el limón es refrescante y drenante. Va muy bien para la hinchazón de la mañana.' },
          { t: 'Té de Hinojo', d: 'El favorito para la barriga hinchada. Ayuda con gases, cólicos y la sensación de pesadez después de comer. Además relaja y ayuda a dormir.' },
          { t: 'Té de Carqueja', d: 'Amargo, pero muy útil cuando te excediste en las comidas del fin de semana y quieres "reiniciar" el lunes. Ayuda a la digestión de las grasas y tiene efecto diurético.' },
        ] },
        { h: 'Cronograma de la semana', intro: 'Una sugerencia para variar todos los días sin repetir el mismo té dos veces seguidas. Guárdala en favoritos.', plegable: true, items: [
          { t: 'Lunes', d: 'Jengibre con limón (en ayunas) + té verde (antes del entrenamiento). Empieza la semana encendiendo el metabolismo.' },
          { t: 'Martes', d: 'Hibisco (en ayunas) + hinojo (después de la cena). Hibisco para desinflamar temprano y hinojo para cerrar el día y dormir bien.' },
          { t: 'Miércoles', d: 'Diente de león (antes del almuerzo) + té verde (después del almuerzo). Mitad de semana: ayuda a la digestión y evita la hinchazón de la tarde.' },
          { t: 'Jueves', d: 'Cola de caballo (media mañana) + hinojo (después de la cena). La cola de caballo ayuda a eliminar líquido acumulado y el hinojo calma el intestino.' },
          { t: 'Viernes', d: 'Jengibre con limón (en ayunas) + hibisco (tarde). Un empujón extra para llegar al fin de semana más ligera.' },
          { t: 'Sábado', d: 'Carqueja (en ayunas) + té verde (antes del entrenamiento). Si te excediste el viernes, ayuda a reiniciar la digestión.' },
          { t: 'Domingo', d: 'Hinojo (mañana) + hibisco (tarde). Día más ligero: sin diuréticos fuertes, solo lo esencial.' },
        ] },
        { h: 'Potencia el efecto', intro: 'El té solo ayuda. Combinado con estos hábitos, el resultado se nota mucho más.', plegable: true, items: [
          { t: '💚 Reduce el sodio escondido', d: 'No es solo la sal del salero: snacks, embutidos (jamón, salchicha, mortadela), sazonadores en polvo, salsa de soya y comida congelada llevan mucha sal. Cámbialos por ajo, cebolla, limón y hierbas frescas.' },
          { t: '💚 Toma suficiente agua', d: 'Una referencia útil: unos 35 ml de agua por kilo de peso (si pesas 70 kg, unos 2,4 litros al día). Los tés cuentan para esa meta. Truco: llena una botella de 1 litro en la mañana y otra en la tarde.' },
          { t: '💚 Camina más, siéntate menos', d: 'La retención en las piernas empeora cuando pasamos mucho tiempo quietas. Pon una alarma para levantarte cada hora y dar unos 50 pasos. Si trabajas sentada, haz movimientos de punta y talón bajo el escritorio.' },
          { t: '💚 Duerme bien', d: 'Dormir mal sube el cortisol y favorece la retención de líquidos y el antojo de dulce. Acuéstate 30 minutos antes de lo habitual y deja el celular fuera de la cama.' },
          { t: '💚 Piernas arriba 10 minutos al día', d: 'Acuéstate en el piso con las piernas estiradas apoyadas en la pared (formando una L) y respira 10 minutos. Hazlo de noche y te despertarás con las piernas más ligeras.' },
          { t: '💚 Desayuno con proteína', d: 'Un desayuno solo de pan y café con leche te deja con hambre y antojos. Agrega huevo, yogur natural o queso fresco: la proteína te mantiene saciada y estabiliza la energía.' },
        ] },
        { h: 'Preguntas frecuentes', plegable: true, items: [
          { t: '¿Puedo endulzar los tés?', d: 'Mejor sin azúcar. Si necesitas un toque dulce, usa unas gotas de limón o un poco de canela.' },
          { t: '¿Puedo tomarlos fríos cuando hace calor?', d: 'Sí. Prepáralos con calma, déjalos enfriar y sírvelos con hielo.' },
          { t: '¿En cuánto tiempo se notan los resultados?', d: 'Muchas personas notan menos hinchazón en 3 a 5 días, pero depende de cada cuerpo y de tus hábitos de agua, sal y sueño.' },
          { t: '¿Puedo usarlos en lugar de un diurético de farmacia?', d: 'No. Estos tés son una ayuda de bienestar y no reemplazan ningún medicamento. Si tomas un diurético recetado, no lo cambies ni lo dejes sin hablar con tu médico.' },
          { t: '¿Puedo tomarlos durante la menstruación?', d: 'En general sí, con moderación. Si tienes flujo abundante, cólicos fuertes o te sientes mal, pausa y consulta a tu médico.' },
          { t: '¿Puedo tomarlos si estoy embarazada o en lactancia?', d: 'No sin consultar antes a tu médico. Varias de estas hierbas no se recomiendan en el embarazo ni en la lactancia.' },
          { t: '¿Puedo tomar todos los tés el mismo día?', d: 'No hace falta ni conviene. Elige 2 o 3 al día y sigue el cronograma; más no significa mejor.' },
        ] },
      ],
      aviso: 'Son infusiones de bienestar, no un tratamiento. Si estás embarazada o en lactancia, tomas medicación (en especial para la presión o diuréticos) o tienes alguna condición de salud, consulta primero a tu médico.',
    },

    guia: {
      etiqueta: 'BONO GRATIS · ALIMENTACIÓN',
      icono: '🥑',
      titulo: 'Alimentos que Activan el Glúteo',
      desc: 'Qué poner en el plato para que el músculo responda al entrenamiento, sin dietas.',
      intro: 'El entrenamiento hace la mitad del trabajo. Esta guía te muestra qué poner en el plato para que tu cuerpo tenga la materia prima para construir unos glúteos firmes. No se trata de comer menos, sino de comer mejor y suficiente.',
      stats: [['3', 'GRUPOS CLAVE'], ['1', 'PLATO MODELO'], ['2 L', 'DE AGUA AL DÍA']],
      secciones: [
        { h: 'La idea principal', texto: 'Un músculo que se entrena necesita proteína para recuperarse y energía para rendir. Comer muy poco frena el resultado.' },
        { h: 'Proteínas (en cada comida)', lista: ['Huevos', 'Pollo y pavo', 'Pescado y atún', 'Carne magra', 'Yogur natural y queso fresco', 'Legumbres: frijoles, lentejas, garbanzos'] },
        { h: 'Carbohidratos para tener energía', lista: ['Arroz, quinoa y avena', 'Camote, papa y yuca', 'Frutas: plátano, manzana, frutos rojos', 'Pan integral'] },
        { h: 'Grasas buenas', lista: ['Aguacate', 'Frutos secos y semillas', 'Aceite de oliva', 'Pescados grasos como el salmón'] },
        { h: 'Verduras y fibra', texto: 'Llena media porción de tu plato con verduras de colores. Te ayudan a sentirte satisfecha y cuidan tu digestión.' },
        { h: 'Para limitar, sin prohibir', lista: ['Bebidas azucaradas y jugos industriales', 'Ultraprocesados y frituras todos los días', 'Alcohol'] },
        { h: 'Tu plato modelo', texto: 'Media porción de verduras, un cuarto de proteína y un cuarto de carbohidrato, con un poco de grasa buena. Funciona para casi cualquier comida.' },
        { h: 'Hidratación', texto: 'Apunta a 2 litros de agua al día, repartidos. Si pesas más o sudas mucho, un poco más.' },
      ],
      aviso: 'Esta guía es orientativa y no reemplaza la consulta con un profesional de la salud. Si tienes alguna condición médica, alergia o estás embarazada, consulta antes de cambiar tu alimentación.',
    },

    masaje: {
      etiqueta: 'BONO GRATIS · BELLEZA Y RITUALES',
      icono: '💆‍♀️',
      titulo: 'Guía de Masaje Modelador en Casa',
      desc: 'Un ritual de 7 minutos para cuidar la piel de glúteos y muslos.',
      intro: 'Un automasaje suave que se hace después del baño. Ayuda a que la piel se sienta más lisa y firme, y es un momento para conectar con tu cuerpo. No reemplaza el entrenamiento: lo acompaña.',
      stats: [['7 min', 'POR SESIÓN'], ['3x', 'POR SEMANA'], ['0', 'EQUIPO NECESARIO']],
      secciones: [
        { h: 'Lo que necesitas', lista: ['Aceite corporal (de almendras, de coco o el que ya uses) o crema hidratante', 'Una toalla para apoyar el pie o sentarte', '7 minutos sin apuro'] },
        { h: 'Cuándo hacerlo', texto: '3 veces por semana, después del baño, con la piel todavía tibia. Va muy bien en los días de descanso o al terminar el entrenamiento.' },
        { h: 'El ritual (7 minutos)', lista: ['Minuto 1 · Calienta: reparte el aceite con las palmas, de las rodillas hacia arriba, con movimientos largos y suaves.', 'Minutos 2 y 3 · Muslos (parte de atrás y de afuera): círculos amplios con las palmas, subiendo hacia el glúteo. Presión media.', 'Minutos 4 y 5 · Glúteos: círculos firmes con la palma abierta, de afuera hacia adentro y de abajo hacia arriba.', 'Minuto 6 · Amasado suave: toma la piel entre los dedos y la palma y "amasa" sin pellizcar. Si molesta, baja la presión.', 'Minuto 7 · Cierre: pasadas largas de las rodillas hacia la cadera, cada vez más suaves, y respira profundo.'] },
        { h: 'Consejos', lista: ['La presión es media, nunca dolorosa.', 'Siempre de abajo hacia arriba, nunca al revés.', 'Toma un vaso de agua al terminar.', 'La constancia pesa más que la fuerza: 3 veces por semana rinde más que un masaje largo de vez en cuando.'] },
      ],
      aviso: 'Es un cuidado cosmético y de bienestar, no un tratamiento médico. No lo hagas sobre piel irritada, con heridas o quemaduras, ni si tienes várices marcadas, trombosis o alguna condición de la piel. Si estás embarazada, consulta antes a tu médico. Si sientes dolor, para.',
    },
  },
};
