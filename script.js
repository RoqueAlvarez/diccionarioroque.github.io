class Diccionario {
    constructor() {
        this.diccionario = {
            "grande": "enorme",
            "pequeño": "minúsculo",
            "bueno": "excelente",
            "malo": "pésimo",
            "viejo": "antiguo",
            "fácil": "sencillo",
            "difícil": "complicado",
            "mucho": "abundantemente",
            "poco": "insuficiente",
            "siempre": "eternamente",
            "nunca": "jamás",
            "bien": "correctamente",
            "mal": "erróneamente",
            "ahora": "actualmente",
            "después": "posteriormente"
        };
    }

    getPalabras() {
        return Object.keys(this.diccionario);
    }

    getSinonimo(palabra) {
        return this.diccionario[palabra] || palabra;
    }
}

const diccionario = new Diccionario();
const buscarTexto = document.getElementById('buscarTexto');
const reemplazarTexto = document.getElementById('reemplazarTexto');
const textoArea = document.getElementById('textoArea');
const botonReemplazar = document.getElementById('botonReemplazar');
const resultado = document.getElementById('resultado');

diccionario.getPalabras().forEach(palabra => {
    const option = document.createElement('option');
    option.value = palabra;
    option.textContent = palabra;
    buscarTexto.appendChild(option);
});

buscarTexto.addEventListener('change', (e) => {
    const palabraSeleccionada = e.target.value;
    reemplazarTexto.value = diccionario.getSinonimo(palabraSeleccionada);
});

botonReemplazar.addEventListener('click', () => {
    const texto = textoArea.value;
    const buscar = buscarTexto.value;
    const reemplazo = reemplazarTexto.value;

    if (!buscar) {
        resultado.textContent = 'No se efectuó ningún cambio. Debes seleccionar una palabra.';
        return;
    }

    const regexBuscar = new RegExp(`\\b${buscar}\\b`, 'gi');
    const regexReemplazo = new RegExp(`\\b${reemplazo}\\b`, 'gi');

    if (!regexBuscar.test(texto)) {
        resultado.textContent = `No se encontró la palabra "${buscar}" en el texto.`;
        return;
    }

    if (regexReemplazo.test(texto) && regexBuscar.test(texto)) {
        const nuevoTexto = texto.replace(regexBuscar, reemplazo);
        textoArea.value = nuevoTexto;
        resultado.textContent = `Ya se están usando tanto la palabra "${buscar}" como su sinónimo "${reemplazo}" en el texto. Solo se reemplazó "${buscar}".`;
        return;
    }

    const nuevoTexto = texto.replace(regexBuscar, reemplazo);
    textoArea.value = nuevoTexto;
    resultado.textContent = 'Texto actualizado correctamente.';
});
