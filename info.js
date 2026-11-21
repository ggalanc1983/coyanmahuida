// Contenido informativo del recorrido. Puedes editar estos textos libremente.
// Cada punto (id = número de la foto) tiene una lista de botones informativos.
// yaw / pitch: posición en grados dentro de la foto 360 (yaw 0 = centro de la imagen,
// positivo hacia la derecha; pitch positivo hacia arriba).
// type: flora | fauna | historia | paisaje | visita | aviso  (cambia el ícono, el color y la etiqueta)

export const INTRO = {
  title: 'Parque Coyanmahuida',
  subtitle: 'Bosque de robles · Florida, Región del Biobío',
  paragraphs: [
    'Coyanmahuida significa “bosque de robles” en mapudungún (<i>coyán</i>, roble; <i>mahuida</i>, monte o bosque). El parque está a unos 38 km al este de Concepción y a 5 km de Florida, junto a la ruta que une ambas ciudades.',
    'Es un relicto del bosque caducifolio de Concepción, la formación que antes cubría la cordillera de la Costa de la zona. Mezcla especies del bosque mediterráneo y del valdiviano, adaptadas a inviernos lluviosos y veranos secos: robles, peumos, laureles, lingues, naranjillos y boldos, entre lianas, musgos, líquenes, helechos y hongos.',
    'El 25 de enero de 2017 un incendio forestal arrasó cerca del 80 % del parque. Tras seis años de restauración, en la que participaron Arauco, Conaf, la Municipalidad de Florida, la Universidad de Concepción y la comunidad, el parque reabrió en septiembre de 2023. Hoy la vegetación se ha recuperado en torno a un 90 %.',
  ],
  stats: [
    ['108', 'hectáreas'],
    ['30', 'ha de bosque adulto'],
    ['21', 'especies de aves'],
    ['34+', 'especies de plantas'],
  ],
  // Sección "Antes de ir" (aparece en la introducción y en el cierre)
  tips: [
    { icon: 'nivel', title: 'Dificultad', value: 'Baja',
      text: 'El tramo de este recorrido es casi plano, con barandas, pasarelas y un puente colgante. Hay hojarasca, raíces y algunas pendientes cortas. El sendero completo del parque se considera de dificultad fácil a moderada.' },
    { icon: 'reloj', title: 'Duración', value: '20–30 min',
      text: 'El circuito de este recorrido mide unos 400 m según el GPS de las fotos: a paso tranquilo toma unos 20 a 30 minutos (estimación; la sesión de fotos tomó 50 min con paradas). El sendero completo, de cerca de 1,7 km, toma alrededor de 1 h 30 min.' },
    { icon: 'ruta', title: 'Altura', value: '178–290 m',
      text: 'El sendero completo va entre los 178 y 290 metros sobre el nivel del mar. Incluye una antigua mina de cuarzo, miradores, zonas de picnic y baños.' },
    { icon: 'ropa', title: 'Ropa y calzado', value: 'Cómodo y cerrado',
      text: 'Usa calzado cerrado con buena suela (zapatillas de trekking idealmente), pantalón largo para protegerte de ramas e insectos y ropa en capas. En invierno hay lluvia y neblina: lleva cortaviento o chaqueta impermeable.' },
    { icon: 'sol', title: 'Sol y agua', value: 'Sombra casi todo el tramo',
      text: 'La mayor parte del sendero va bajo el dosel del bosque, pero la entrada, el estacionamiento y algunos claros tienen sol directo. En verano lleva bloqueador, gorro y agua: los veranos de la zona son secos.' },
    { icon: 'cuida', title: 'Cuida el parque', value: 'No dejes huella',
      text: 'Llévate tu basura, no hagas fuego, no extraigas plantas ni hongos, mantente en el sendero y respeta la señalética. El parque no tiene zona de camping.' },
  ],
  sources: [
    ['Arauco — Parque Coyanmahuida', 'https://arauco.com/mo/?p=65'],
    ['BioBioChile (2023) — Reapertura tras los incendios de 2017', 'https://www.biobiochile.cl/noticias/nacional/region-del-bio-bio/2023/08/26/parque-coyanmahuida-de-florida-reabrira-en-septiembre-tras-ser-afectado-por-incendios-del-2017.shtml'],
    ['Sabes.cl (2024) — Restauración tras la reapertura', 'https://sabes.cl/2024/10/09/parque-coyanmahuida-florida-restauracion-continua-avanzando-tras-reapertura-publico'],
    ['Ladera Sur — Un refugio de biodiversidad en el Biobío', 'https://laderasur.com/articulo/parque-coyanmahuida-un-refugio-de-biodiversidad-que-resiste-y-se-renueva-en-el-biobio/'],
    ['Wikipedia — Parque Coyanmahuida', 'https://es.wikipedia.org/wiki/Parque_Coyanmahuida'],
    ['Paseos en Concepción (2013) — Distancia, altura y duración del sendero', 'https://paseosconce.blogspot.com/2013/01/parque-coyanmahuida.html'],
    ['iNaturalist — Roble (Nothofagus obliqua)', 'https://www.inaturalist.org/guide_taxa/1181825'],
  ],
};

export const OUTRO = {
  title: '¡Recorrido completado!',
  text: 'Caminaste por uno de los últimos fragmentos de bosque nativo de la zona: un bosque que sobrevivió al fuego y que sigue renovándose. Si lo visitas en persona, mantente en el sendero, no extraigas plantas ni hongos y llévate tu basura.',
  visit: 'Según información publicada en 2024, el parque abre de martes a sábado, de 10:00 a 17:00 h. El acceso está junto a la Ruta N-48 (Concepción–Florida). Confirma horarios y condiciones antes de ir.',
};

export const INFO = {
  '158': [
    { yaw: -12, pitch: 26, type: 'aviso', title: 'Zona con sol directo',
      text: 'La entrada y el estacionamiento no tienen sombra. En días de verano usa bloqueador y gorro, y lleva agua: dentro del bosque la sombra es casi continua, pero aquí el sol pega fuerte.' },
    { yaw: 100, pitch: 2, type: 'visita', title: 'El sendero completo',
      text: 'Este recorrido virtual muestra un circuito corto. El sendero completo del parque mide cerca de 1,7 km, va entre los 178 y 290 m de altura y toma alrededor de 1 h 30 min. En él hay una antigua mina de cuarzo, tres miradores, tramos de plantación de pino insigne, zonas de picnic y baños (datos de una guía de 2013; algunos tramos pueden haber cambiado tras el incendio).' },
    { yaw: -84, pitch: 2, type: 'visita', title: 'Bienvenida al parque',
      text: 'Aquí comienza el sendero. Los tableros de la entrada muestran el mapa del parque y su red de senderos. Arauco administra este predio desde mediados de los años 90 y lo abrió al público como espacio de educación ambiental, investigación y recreación.' },
    { yaw: 31, pitch: 22, type: 'historia', title: '¿Por qué “Coyanmahuida”?',
      text: 'En mapudungún, <i>coyán</i> es el roble y <i>mahuida</i>, el monte. El nombre recuerda los bosques de robles que cubrían los cerros de la zona antes de que fueran reemplazados casi por completo por plantaciones forestales. Este parque es uno de sus últimos fragmentos continuos.' },
  ],
  '161': [
    { yaw: -104, pitch: 24, type: 'flora', title: 'Roble o hualle', sci: 'Nothofagus obliqua',
      text: 'El árbol que da nombre al parque. Es caducifolio: pierde sus hojas en otoño, por eso el bosque cambia de color con las estaciones. Puede llegar a 50 metros de altura y 2 metros de diámetro. A los ejemplares jóvenes, de madera clara, se les llama hualle; a los viejos, con el corazón de la madera rojizo, pellín. Tras el incendio de 2017, muchos robles volvieron a brotar desde la base del tronco.' },
  ],
  '163': [
    { yaw: -176, pitch: -8, type: 'aviso', title: 'Llévate tu basura',
      text: 'Si comes en las mesas de picnic, guarda todos tus residuos en una bolsa y llévatelos de vuelta. Los restos de comida alteran la dieta de los animales del bosque y atraen especies que no son de aquí; envoltorios y botellas pueden quedar décadas en el bosque.' },
    { yaw: 70, pitch: 14, type: 'flora', title: 'Peumo', sci: 'Cryptocarya alba',
      text: 'Árbol siempreverde, endémico de Chile, muy común en este bosque. Sus hojas son aromáticas al frotarlas y da pequeños frutos rojos comestibles. Es una de las especies que mejor rebrotó después del incendio.' },
  ],
  '165': [
    { yaw: -106, pitch: -5, type: 'visita', title: 'Mesas de picnic',
      text: 'Un buen lugar para descansar a la sombra. Recuerda que está prohibido hacer fuego en todo el parque y que no hay zona de camping.' },
    { yaw: 8, pitch: 12, type: 'flora', title: 'Laurel', sci: 'Laurelia sempervirens',
      text: 'Otra de las especies que predominan en Coyanmahuida. Es un árbol siempreverde de hojas aromáticas con borde aserrado, endémico de Chile. Junto al roble y al peumo forma el dosel que da sombra al sendero.' },
    { yaw: 83, pitch: -12, type: 'visita', title: 'Sendero de un solo sentido',
      text: 'El letrero “sentido único” indica que el sendero se recorre en una sola dirección. Así se evita el cruce de grupos en los tramos angostos y se protege la vegetación de los bordes.' },
  ],
  '167': [
    { yaw: -72, pitch: -18, type: 'historia', title: 'Huellas del incendio de 2017',
      text: 'El 25 de enero de 2017 un incendio cruzó el camino y recorrió gran parte del parque, destruyendo más del 80 % de su área natural. Troncos muertos como este y las cicatrices de fuego en los árboles más antiguos recuerdan ese episodio; el bosque ya se había quemado al menos una vez antes en las últimas décadas. Un gran roble que sobrevivió a ambos incendios, conocido como el “Roble Resiliente”, se convirtió en símbolo de la recuperación del parque.' },
  ],
  '169': [
    { yaw: 90, pitch: -18, type: 'paisaje', title: 'Madera muerta, vida nueva',
      text: 'Los troncos caídos no son basura: hongos saprófitos e insectos los descomponen y devuelven sus nutrientes al suelo. En Coyanmahuida esa actividad es mayor en otoño y primavera, y fue clave para recuperar el suelo después del fuego.' },
  ],
  '170': [
    { yaw: 68, pitch: 16, type: 'flora', title: 'Lingue', sci: 'Persea lingue',
      text: 'Árbol siempreverde nativo, pariente lejano del palto. Su corteza, rica en taninos, se usó tradicionalmente para curtir cueros. Es una de las especies destacadas del bosque adulto del parque.' },
  ],
  '173': [
    { yaw: 10, pitch: -40, type: 'aviso', title: 'Piso resbaladizo',
      text: 'La madera de la pasarela y la hojarasca se ponen muy resbaladizas con la humedad, la lluvia o la neblina de la mañana. Camina despacio, usa las barandas y evita correr.' },
    { yaw: -90, pitch: -8, type: 'paisaje', title: 'Quebradas y esteros',
      text: 'Pequeños esteros atraviesan el parque y mantienen la humedad del bosque. Estas quebradas son refugio de anfibios. La pasarela permite cruzar sin pisar ni erosionar los bordes del cauce.' },
  ],
  '174': [
    { yaw: 53, pitch: -11, type: 'paisaje', title: 'Musgos y líquenes',
      text: 'El aire húmedo en verano y la neblina en invierno crean el ambiente ideal para musgos, líquenes y helechos, que cubren rocas y troncos. Son indicadores de un aire limpio y de un bosque que conserva su humedad.' },
  ],
  '176': [
    { yaw: 40, pitch: 9, type: 'flora', title: 'Árboles centenarios',
      text: 'En el bosque adulto sobreviven ejemplares muy antiguos, con cicatrices de incendios pasados. Algunos naranjillos del parque superarían los 200 años y uno de ellos, cerca de 300, por lo que se consideran verdaderos monumentos vivos.' },
  ],
  '179': [
    { yaw: 108, pitch: -18, type: 'historia', title: 'Restaurar un bosque',
      text: 'Después del incendio se evaluó el daño con imágenes satelitales y monitoreo en terreno. Se plantaron especies nativas, se controlaron plantaciones vecinas y unas 7 hectáreas se restauraron con vecinos, colegios y estudiantes. Cinco años después, más del 90 % de la vegetación mostraba rebrote o regeneración natural.' },
  ],
  '180': [
    { yaw: -107, pitch: -10, type: 'fauna', title: 'Relájate y escucha',
      text: 'Este punto invita a detenerse. En el parque se han registrado al menos 21 especies de aves. Con atención puedes oír al chucao y al hued-hued, dos aves del sotobosque que se escuchan mucho más de lo que se ven.' },
  ],
  '182': [
    { yaw: -42, pitch: -24, type: 'aviso', title: 'Cruza con precaución',
      text: 'Avanza despacio por el puente, sujétate de las barandas y no lo balancees ni saltes. Si está húmedo, la superficie puede estar resbaladiza.' },
    { yaw: -2, pitch: 6, type: 'paisaje', title: 'El puente colgante',
      text: 'Uno de los hitos más recordados del sendero. El puente cruza la quebrada por sobre la vegetación y permite observar el bosque desde otra altura, junto a troncos caídos y lianas.' },
  ],
  '185': [
    { yaw: -160, pitch: 28, type: 'aviso', title: 'Claro con sol',
      text: 'En algunos claros del sendero entra el sol directo. En verano, a mediodía, el calor se siente: hidrátate y protégete la cabeza.' },
    { yaw: 0, pitch: 18, type: 'flora', title: 'Olivillo', sci: 'Aextoxicon punctatum',
      text: 'Árbol siempreverde, único representante de su familia botánica y endémico de Chile y Argentina. Está entre las especies que la literatura destaca en el bosque adulto de Coyanmahuida, junto al peumo, el lingue y la huillipatagua.' },
  ],
  '186': [
    { yaw: 60, pitch: -30, type: 'aviso', title: 'Ramas y raíces en el camino',
      text: 'En este tramo hay troncos y ramas caídas y raíces que sobresalen del suelo. Mira dónde pisas, sobre todo al bajar.' },
    { yaw: -22, pitch: 14, type: 'paisaje', title: 'Pino insigne: bosque y plantación',
      text: 'Este gran tronco es de pino insigne (<i>Pinus radiata</i>), especie originaria de California. El sendero muestra la transición entre el bosque nativo y antiguas plantaciones de pino, que hoy rodean al parque y lo convierten en una isla de bosque nativo.' },
  ],
  '188': [
    { yaw: -80, pitch: 8, type: 'flora', title: 'Coligüe y quila',
      text: 'Bajo los árboles crecen cañas nativas como el coligüe y la quila, parientes chilenos del bambú. Forman matorrales densos que dan refugio a aves y pequeños mamíferos.' },
    { yaw: 110, pitch: -8, type: 'flora', title: 'Rebrotes de cepa',
      text: 'Arbustos y árboles con muchos tallos delgados que nacen de una misma base: es la forma en que robles y peumos se recuperaron del fuego, rebrotando desde la base del tronco quemado.' },
  ],
  '190': [
    { yaw: -124, pitch: -28, type: 'aviso', title: 'Pendiente con hojarasca',
      text: 'Las hojas secas cubren el suelo y esconden irregularidades. En las pendientes, baja de lado y con pasos cortos; con lluvia, el barro hace que el tramo sea más resbaladizo.' },
    { yaw: -50, pitch: 34, type: 'flora', title: 'Lianas y enredaderas',
      text: 'Las trepadoras nativas se enroscan en los árboles para alcanzar la luz. Algunas alcanzan un desarrollo notable y forman lianas gruesas y retorcidas, con forma de serpiente, sobre el sendero.' },
  ],
  '192': [
    { yaw: -57, pitch: 26, type: 'flora', title: 'Boldo', sci: 'Peumus boldus',
      text: 'Árbol endémico de Chile cuyas hojas, ásperas y aromáticas, se usan tradicionalmente en infusión. Forma parte del componente mediterráneo del bosque, junto al peumo.' },
  ],
  '194': [
    { yaw: -120, pitch: 5, type: 'fauna', title: 'Monito del monte', sci: 'Dromiciops gliroides',
      text: 'Pequeño marsupial nocturno, pariente lejano de los marsupiales de Australia, considerado un fósil viviente. Vive en matorrales densos, como los de quila y coligüe, y ayuda a dispersar semillas de plantas del bosque. Está registrado en el parque, pero es muy difícil de ver de día.' },
    { yaw: 34, pitch: 6, type: 'flora', title: 'Naranjillo', sci: 'Citronella mucronata',
      text: 'Árbol siempreverde, endémico de Chile, de hojas duras y frutos pequeños. En Coyanmahuida se encuentran algunos de los ejemplares más antiguos del parque, considerados “hitos vivientes” de su historia.' },
  ],
  '196': [
    { yaw: 100, pitch: 8, type: 'fauna', title: 'Habitantes escondidos',
      text: 'Según los registros del parque, en este bosque viven mamíferos difíciles de ver: el pudú, uno de los ciervos más pequeños del mundo; la güiña, un pequeño gato silvestre; el puma, y el monito del monte, un marsupial considerado un fósil viviente.' },
  ],
  '198': [
    { yaw: 132, pitch: -2, type: 'visita', title: 'Visita el parque',
      text: 'Según información publicada en 2024, el parque abre de martes a sábado, de 10:00 a 17:00 h, con acceso junto a la Ruta N-48 (Concepción–Florida). Confirma horarios antes de ir y recuerda: no hacer fuego, no extraer flora ni hongos y llevarte tu basura.' },
  ],
  '201': [
    { yaw: 60, pitch: 4, type: 'aviso', title: 'Antes de irte',
      text: 'Revisa que no quede basura en el lugar donde estuviste, no te lleves plantas, piedras ni hongos y sal por el mismo acceso. Así el bosque se mantiene igual para los siguientes visitantes.' },
    { yaw: -30, pitch: 10, type: 'historia', title: 'Un aula al aire libre',
      text: 'Desde comienzos de los 2000 el parque ha recibido a escolares y universitarios en programas de educación ambiental, con apoyo de la Universidad de Concepción. Hoy forma parte del programa de conservación de áreas de alto valor de Arauco.' },
  ],
};
