import type { Content } from './types'

export const es: Content = {
  ui: {
    tagline: 'Lo básico de invertir para estudiantes de primera generación',
    langLabel: 'Idioma',
    tabs: {
      start: 'Empieza aquí',
      ready: '¿Ya puedo invertir?',
      grow: 'Calculadora',
      account: '¿Qué cuenta?',
      jargon: 'Glosario',
      scams: '¿Es estafa?',
    },
    disclaimerStrong: 'Solo para aprender, no es asesoría financiera.',
    disclaimer:
      'Invest-Assist no conoce toda tu situación y no recomienda empresas ni productos específicos. Todo lo que escribes se queda en tu navegador.',
    resourcesLabel: 'Recursos gratuitos y confiables:',
    resources: [
      { label: 'Investor.gov (SEC)', href: 'https://www.investor.gov/' },
      { label: 'CFPB en español', href: 'https://www.consumerfinance.gov/es/' },
      { label: 'IRS en español', href: 'https://www.irs.gov/es' },
    ],
    progress: (done, total, what) => `${done} de ${total} ${what}`,

    startTitle: 'Empieza aquí',
    startLead: 'Cinco lecciones cortas, sin palabras complicadas. Unos 13 minutos en total. Tu progreso se guarda en este dispositivo.',
    lessonsDone: 'lecciones completadas',
    min: 'min',
    takeaway: 'Lo más importante:',
    markDone: 'Entendido, marcar como completada',
    markNotDone: 'Marcar como no completada',

    readyTitle: '¿Ya puedo empezar a invertir?',
    readyLead: 'La mayoría de los expertos en finanzas recomiendan este orden. Marca lo que ya hiciste.',
    stepsDone: 'pasos completados',
    nextStep: 'Tu siguiente paso: trabaja en',
    allDone: 'Ya cubriste lo básico. Sigue invirtiendo de forma automática y déjalo crecer. 🎉',

    calcTitle: 'Calculadora de crecimiento',
    calcLead: 'Mira en qué se pueden convertir cantidades pequeñas y constantes. Cambia los números y observa la gráfica.',
    startAmount: 'Cantidad inicial',
    monthlyAmount: 'Aporte cada mes',
    yearsInvested: 'Años invirtiendo',
    yearsSuffix: ' años',
    yearlyReturn: 'Rendimiento anual (promedio)',
    calcNote:
      'Los fondos indexados amplios de acciones han rendido en promedio entre 6 y 7% al año después de la inflación durante periodos largos, con grandes subidas y bajadas en el camino. Una cuenta de ahorros podría dar de 0 a 2% después de la inflación. El pasado no garantiza el futuro.',
    afterYears: (y) => `después de ${y} años.`,
    youPutIn: 'Tú aportaste',
    growthAdded: 'y el crecimiento sumó',
    legendIn: 'Lo que aportaste',
    legendGrowth: 'Crecimiento',
    chartLabel: (b) => `Gráfica: el saldo crece hasta ${b}`,

    quizTitle: '¿Qué cuenta me conviene?',
    quizLead: 'Cuatro preguntas rápidas. No se guarda ni se envía nada.',
    quizBest: 'Un buen lugar para empezar',
    quizNext: 'Qué hacer ahora:',
    quizAlso: 'También vale la pena ver:',
    startOver: 'Empezar de nuevo',

    jargonTitle: 'Glosario sin enredos',
    jargonLead: 'Palabras de dinero, explicadas como lo haría un amigo.',
    searchPlaceholder: 'Busca una palabra… ej. ETF, Roth, aporte',
    searchLabel: 'Buscar términos',
    example: 'Ejemplo:',
    noMatches: 'No hay resultados. Prueba con otra palabra.',

    scamTitle: '¿Es una estafa?',
    scamLead: '¿Alguien te ofreció una "oportunidad"? Marca todo lo que aplique.',
    scamNone: 'Todavía no marcaste ninguna señal de alerta. Invertir de verdad suele ser aburrido: comisiones bajas, sin promesas exageradas y sin prisa.',
    scamHits: (n) => `${n} señal${n > 1 ? 'es' : ''} de alerta.`,
    scamAdvice: 'Con una sola ya es motivo para detenerte. No envíes dinero. Investiga en',
    brokerCheck: { label: 'FINRA BrokerCheck', href: 'https://brokercheck.finra.org/' },
    reportFraud: { label: 'ReporteFraude.ftc.gov', href: 'https://reportefraude.ftc.gov/' },
  },

  lessons: [
    {
      id: 'what',
      title: 'Qué es invertir, en realidad',
      minutes: 2,
      body: [
        'Ahorrar es apartar dinero. Invertir es usar ese dinero para comprar una pequeña parte de algo, como una empresa, que puede aumentar de valor con el tiempo.',
        'Cuando compras una acción de una empresa, tienes un pedacito de ella. Si a la empresa le va bien, tu pedacito puede valer más. Si le va mal, puede valer menos.',
        'Nadie te puede prometer ganancias. Pero históricamente, tener una mezcla amplia de empresas por mucho tiempo ha hecho crecer el dinero más rápido que una cuenta de ahorros.',
      ],
      takeaway: 'Invertir = tener pedacitos de cosas que pueden crecer. Sube y baja, así que funciona mejor a lo largo de muchos años.',
    },
    {
      id: 'compound',
      title: 'Por qué importa empezar temprano',
      minutes: 2,
      body: [
        'El interés compuesto significa que tu dinero genera dinero, y luego ese dinero nuevo también genera dinero. Es como una bola de nieve.',
        'El tiempo importa más que la cantidad. Alguien que invierte $50 al mes desde los 20 años puede terminar con más que alguien que invierte $100 al mes desde los 35.',
        'No necesitas tener mucho dinero para empezar. Muchas aplicaciones te dejan invertir desde $1.',
      ],
      takeaway: 'Cantidades pequeñas + mucho tiempo = grandes resultados. Pruébalo en la Calculadora.',
    },
    {
      id: 'safety',
      title: 'Primero, arma tu red de seguridad',
      minutes: 3,
      body: [
        'Antes de invertir, ten un fondo de emergencia: dinero apartado para sorpresas como una reparación del carro o perder el trabajo. Empieza con $500 a $1,000 y luego trabaja hasta cubrir algunos meses de gastos.',
        'Guárdalo en una cuenta de ahorros de alto rendimiento (HYSA). Puedes sacarlo fácilmente, y el seguro de la FDIC lo protege hasta $250,000 por banco si el banco quiebra.',
        'Paga las deudas con interés alto, como tarjetas de crédito al 20% o más, antes de invertir. Pagarlas es una "ganancia" garantizada que la bolsa no puede superar de forma confiable.',
      ],
      takeaway: 'Primero el fondo de emergencia, luego las deudas con interés alto, y después a invertir.',
    },
    {
      id: 'funds',
      title: 'Fondos indexados: no escojas acciones, compra la canasta',
      minutes: 3,
      body: [
        'Escoger acciones individuales es difícil, incluso para los profesionales. Un fondo indexado (index fund) compra un poquito de cientos o miles de empresas a la vez, así que una empresa que va mal no te hunde.',
        'Busca comisiones bajas. El "expense ratio" es la comisión anual. Muchos fondos indexados amplios cobran menos de 0.10%, o sea, alrededor de $1 al año por cada $1,000 invertidos.',
        'Un fondo de todo el mercado de acciones o uno del S&P 500 es una primera opción común. Un "fondo con fecha objetivo" (target-date fund) escoge la mezcla por ti según cuándo planeas jubilarte.',
      ],
      takeaway: 'Un fondo indexado amplio y de bajo costo es una forma sencilla y popular de empezar.',
    },
    {
      id: 'accounts',
      title: 'Dónde vive tu dinero: las cuentas',
      minutes: 3,
      body: [
        'Una cuenta es el recipiente. Las inversiones (como los fondos indexados) van adentro. El recipiente decide cómo funcionan los impuestos.',
        'Un 401(k) o 403(b) es una cuenta para la jubilación que ofrece tu trabajo. Si tu empleador ofrece un "match" (aporte equivalente), es dinero gratis. Aporta al menos lo suficiente para recibirlo completo.',
        'Una Roth IRA es una cuenta para la jubilación que abres por tu cuenta. Necesitas ingresos de trabajo (un empleo o trabajo por tu cuenta) para poner dinero. Crece libre de impuestos, y puedes sacar lo que aportaste (no las ganancias) en cualquier momento sin penalidad.',
        'Una cuenta de corretaje normal (brokerage) no tiene beneficios de impuestos especiales, pero tampoco límites ni reglas sobre cuándo puedes sacar tu dinero.',
      ],
      takeaway: 'Aprovecha cualquier aporte de tu empleador y luego considera una Roth IRA. Revisa IRS.gov para ver los límites de aportes de este año.',
    },
  ],

  glossary: [
    { term: 'Acción (stock / share)', plain: 'Un pedacito de una empresa que te pertenece.', example: 'Tener 1 acción de una empresa con 1 millón de acciones significa que tienes una millonésima parte.' },
    { term: 'Bono (bond)', plain: 'Un préstamo que le haces a un gobierno o empresa. Te pagan intereses y luego te devuelven el dinero.', example: 'Suele ser más estable que las acciones, pero crece más despacio.' },
    { term: 'Fondo indexado (index fund)', plain: 'Un fondo que compra todas las empresas de una lista (un "índice"), así que tienes un poquito de todas.' },
    { term: 'ETF', plain: 'Fondo cotizado en bolsa. Una canasta de inversiones que puedes comprar y vender como si fuera una sola acción. Muchos fondos indexados son ETF.' },
    { term: 'Fondo mutuo (mutual fund)', plain: 'Una canasta de inversiones administrada como una sola. Se compra y vende una vez al día al precio de cierre.' },
    { term: 'S&P 500', plain: 'Una lista de unas 500 de las empresas más grandes de EE. UU. Mucha gente la usa para referirse a "el mercado".' },
    { term: 'Diversificación', plain: 'No poner todos los huevos en la misma canasta. Repartir el dinero en muchas inversiones baja el riesgo de un desastre.' },
    { term: 'Interés compuesto', plain: 'Ganar rendimientos sobre tus rendimientos anteriores, así el crecimiento se hace bola de nieve con el tiempo.' },
    { term: 'Comisión anual (expense ratio)', plain: 'Lo que un fondo cobra cada año, como porcentaje de lo que tienes invertido.', example: '0.05% sobre $1,000 son 50 centavos al año.' },
    { term: 'Rendimiento (return)', plain: 'Cuánto ganó o perdió tu inversión, normalmente en porcentaje.' },
    { term: 'Volatilidad', plain: 'Cuánto y qué tan rápido suben y bajan los precios.' },
    { term: 'Mercado bajista / alcista', plain: 'Bajista (bear) = precios bajando por un tiempo. Alcista (bull) = precios subiendo por un tiempo.' },
    { term: 'Dividendo', plain: 'Una parte de las ganancias de una empresa que se paga a quienes tienen sus acciones.' },
    { term: 'Casa de corretaje (brokerage)', plain: 'Una empresa (muchas veces una app) donde abres una cuenta para comprar y vender inversiones.' },
    { term: 'Roth IRA', plain: 'Una cuenta para la jubilación que abres tú. Pagas impuestos ahora, y crece y se retira libre de impuestos en la jubilación. Necesitas ingresos de trabajo para aportar.' },
    { term: '401(k) / 403(b)', plain: 'Una cuenta para la jubilación que ofrece tu trabajo. El dinero sale directo de tu cheque de pago.' },
    { term: 'Aporte del empleador (match)', plain: 'Cuando tu trabajo pone dinero en tu 401(k) porque tú también pusiste. Básicamente, dinero gratis.', example: '"100% match hasta 4%" significa que si aportas 4% de tu sueldo, ellos agregan otro 4%.' },
    { term: 'HYSA', plain: 'Cuenta de ahorros de alto rendimiento. Paga más intereses que un banco típico. Ideal para tu fondo de emergencia.' },
    { term: 'Seguro de la FDIC', plain: 'Protección del gobierno de EE. UU. para depósitos bancarios, hasta $250,000 por persona por banco, si el banco quiebra. No cubre inversiones.' },
    { term: 'SIPC', plain: 'Te protege si tu casa de corretaje quiebra (no si tus inversiones pierden valor).' },
    { term: 'Fondo con fecha objetivo (target-date fund)', plain: 'Un fondo todo en uno que se vuelve más conservador automáticamente a medida que se acerca tu año de jubilación.' },
    { term: 'Promedio del costo en dólares', plain: 'Invertir la misma cantidad con regularidad (como cada día de pago), sin importar lo que hagan los precios.' },
    { term: 'Ganancias de capital', plain: 'Lo que ganas cuando vendes algo por más de lo que pagaste. Puede pagar impuestos.' },
    { term: 'Puntaje de crédito (credit score)', plain: 'Un número que usan los prestamistas para saber qué tan probable es que pagues tus deudas. Pagar a tiempo es lo que más cuenta.' },
    { term: 'APR (tasa anual)', plain: 'La tasa de interés anual de un préstamo o tarjeta de crédito. APR más alta = deuda más cara.' },
  ],

  readySteps: [
    { id: 'budget', label: 'Sé más o menos cuánto dinero entra y sale cada mes', why: 'Solo puedes invertir dinero que no necesitas para tus cuentas.' },
    { id: 'starter', label: 'Tengo un fondo de emergencia inicial ($500 a $1,000)', why: 'Así una cuenta inesperada no se convierte en deuda de tarjeta de crédito.' },
    { id: 'highdebt', label: 'No tengo deudas de tarjeta de crédito u otras con más de 8% de interés', why: 'Pagar deudas con interés alto es una ganancia segura.' },
    { id: 'match', label: 'Si mi trabajo ofrece aporte (match) al 401(k), aporto lo suficiente para recibirlo completo', why: 'El aporte del empleador suele ser una ganancia inmediata del 50% al 100%.' },
    { id: 'full', label: 'Mi fondo de emergencia cubre unos 3 meses de gastos', why: 'Así puedes dejar tus inversiones en paz cuando la vida se complica.' },
    { id: 'roth', label: 'Ya abrí una Roth IRA (o pienso abrirla pronto)', why: 'Crece libre de impuestos, y quienes empiezan joven son los que más ganan.' },
    { id: 'fund', label: 'Escogí un fondo indexado amplio de bajo costo o un fondo con fecha objetivo', why: 'Sencillo, diversificado y barato. No hace falta escoger acciones.' },
    { id: 'auto', label: 'Configuré una inversión automática cada mes', why: 'Al automatizarlo, nunca tienes que acordarte ni adivinar el mejor momento.' },
  ],

  redFlags: [
    'Te prometen ganancias "garantizadas" o "sin riesgo".',
    'Te dicen que tienes que actuar ya o te lo pierdes.',
    'Te llegó por mensaje directo, de un influencer en redes sociales o de un desconocido en un chat de grupo.',
    'Quieren que pagues con criptomonedas, tarjetas de regalo o transferencia bancaria.',
    'Te piden reclutar amigos para ganar más.',
    'No puedes explicar cómo gana dinero en realidad.',
    'La persona o empresa no está registrada (revisa FINRA BrokerCheck o Investor.gov de la SEC).',
    'Te piden la contraseña de tu banco, tu número de Seguro Social o una "pequeña comisión" para liberar tus ganancias.',
  ],

  quiz: [
    {
      q: '¿Cuándo podrías necesitar este dinero?',
      options: ['En el próximo año, más o menos', 'En 1 a 5 años (carro, posgrado, mudanza)', 'No en mucho tiempo, tal vez para la jubilación'],
    },
    {
      q: '¿Ya tienes un fondo de emergencia?',
      options: ['La verdad, no', 'Un poco, menos de $1,000', 'Sí, unos meses de gastos'],
    },
    {
      q: '¿Ganas dinero de un trabajo o de algo por tu cuenta?',
      options: ['Sí, y mi trabajo ofrece aporte (match) al 401(k)', 'Sí, pero sin aporte al 401(k)', 'Ahora mismo no'],
    },
    {
      q: '¿Cómo te sentirías si tu inversión bajara 20% en un mal año?',
      options: ['Me daría pánico y querría sacar mi dinero', 'Me daría nervios, pero esperaría', 'Sin problema, es a largo plazo'],
    },
  ],

  accountInfo: {
    hysa: {
      name: 'Cuenta de ahorros de alto rendimiento (HYSA)',
      summary: 'Tu mejor primer paso es un lugar seguro y fácil de usar para el dinero que podrías necesitar pronto. Gana intereses y está asegurada por la FDIC.',
      next: 'Compara cuentas HYSA de bancos asegurados por la FDIC o cooperativas de crédito (aseguradas por la NCUA). Busca que no cobren comisión mensual ni pidan saldo mínimo.',
    },
    k401: {
      name: '401(k) / 403(b) de tu trabajo',
      summary: 'El aporte de tu empleador es dinero gratis. Aporta al menos lo suficiente para recibirlo completo antes de cualquier otra cosa.',
      next: 'Pregunta en Recursos Humanos o revisa tu portal de beneficios para ver las reglas del aporte. Si no sabes qué escoger, elige el fondo con fecha objetivo más cercano a tu año de jubilación.',
    },
    roth: {
      name: 'Roth IRA',
      summary: 'Ideal para estudiantes y personas que empiezan a trabajar. Pagas impuestos ahora, cuando probablemente ganas poco, y crece libre de impuestos.',
      next: 'Ábrela en una casa de corretaje grande y de bajo costo, y luego compra adentro un fondo indexado amplio o un fondo con fecha objetivo. Abrir la cuenta no es lo mismo que invertir.',
    },
    brokerage: {
      name: 'Cuenta de corretaje normal (brokerage)',
      summary: 'Flexible, sin límites ni reglas para retirar, pero sin beneficios de impuestos. Buena para metas a mediano plazo después de cubrir lo básico de la jubilación.',
      next: 'Usa una casa de corretaje de bajo costo sin mínimo de apertura, y quédate con fondos indexados diversificados.',
    },
  },
}
