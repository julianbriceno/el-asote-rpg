// ================================================================
// EL ASOTE DE LOS ESTUDIANTES - BATTLES.JS
// Definición de los 6 ejercicios/batallas
// ================================================================

const BATTLES = [
    {
        id: 1,
        title: "BATALLA 1: El Primer Sello",
        narrative: "El Asote ha sellado los registros de poder de la academia en un archivo. 'Rompe mi primer sello y descubrirás tu verdadera fuerza'",
        description: `Tu misión: Crea una función leer_y_filtrar_guerreros(contenido_archivo) que:
1. Reciba un string: "nombre,poder\\nArturo,85\\nMerlín,95\\nLancelot,75"
2. Procese el CSV y cree un diccionario de guerreros
3. Filtre solo aquellos con poder > 80
4. Retorne diccionario {nombre: poder}

Temas: Funciones (9) + Archivos/Strings (12,6) + Diccionarios (8)
Dificultad: ⭐⭐ Intermedio-Alto`,
        hint: "1. Divide por '\\n' para obtener líneas\n2. Primera línea: encabezados = lineas[0].split(',')\n3. Para cada línea: valor = int(linea.split(',')[1])\n4. Filtra con: if int(poder) > 80",
        syntax: `def leer_y_filtrar_guerreros(contenido_archivo):
    lineas = contenido_archivo.strip().split('\\n')
    encabezados = lineas[0].split(',')
    guerreros = {}
    for linea in lineas[1:]:
        partes = linea.split(',')
        nombre = partes[0]
        poder = int(partes[1])
        if poder > 80:
            guerreros[nombre] = poder
    return guerreros`,
        damage: 100
    },

    {
        id: 2,
        title: "BATALLA 2: El Sello del Destino",
        narrative: "El Asote abre sus códigos mágicos: 'Encuentra los guerreros ÚNICOS y verdaderos, elimina los impostores duplicados'",
        description: `Tu misión: Crea una función identificar_guerreros_verdaderos(lista_guerreros) que:
1. Reciba lista: ["Arturo", "Merlín", "Arturo", "Percy", "Merlín", "Morgana"]
2. Elimine duplicados usando CONJUNTOS (sets)
3. Retorne conjunto de guerreros únicos
4. BONUS: Retorna también cuántos impostores fueron eliminados

Temas: Conjuntos (8) + Funciones (9) + Listas (7)
Dificultad: ⭐⭐⭐ Avanzado`,
        hint: "1. Crea un SET: guerreros_unicos = set(lista_guerreros)\n2. Cuántos duplicados: len(lista) - len(set(lista))\n3. Retorna tupla: (conjunto, duplicados)",
        syntax: `def identificar_guerreros_verdaderos(lista_guerreros):
    guerreros_unicos = set(lista_guerreros)
    duplicados_eliminados = len(lista_guerreros) - len(guerreros_unicos)
    return guerreros_unicos, duplicados_eliminados`,
        damage: 100
    },

    {
        id: 3,
        title: "BATALLA 3: Los Cálculos del Tiempo",
        narrative: "El Asote invoca el poder del cosmos: 'Calcula las probabilidades de victoria o tu suerte se desvanecerá'",
        description: `Tu misión: Crea una función calcular_odds_batalla(*estadisticas) que:
1. Reciba estadísticas variables: fuerza, defensa, magia, velocidad
2. Use MÓDULO MATH para calcular: sqrt(sum(stats) / len(stats))
3. Use MÓDULO RANDOM para ajustar (+/- 10%)
4. Retorne probabilidad final como porcentaje (0-100)

Temas: Funciones (9) + *args (10) + Módulos (11 - math, random)
Dificultad: ⭐⭐⭐ Avanzado`,
        hint: "1. Importa: import math, random\n2. Promedio = sum(estadisticas) / len(estadisticas)\n3. Base = math.sqrt(promedio) * 10\n4. Ajuste = random.uniform(0.9, 1.1)\n5. Final = base * ajuste (limita a 100 máx)",
        syntax: `import math
import random

def calcular_odds_batalla(*estadisticas):
    promedio = sum(estadisticas) / len(estadisticas)
    base = math.sqrt(promedio) * 10
    ajuste = random.uniform(0.9, 1.1)
    odds = base * ajuste
    return min(odds, 100)`,
        damage: 100
    },

    {
        id: 4,
        title: "BATALLA 4: La Catacumba de los Códigos",
        narrative: "En las profundidades, El Asote guarda un tesoro encriptado: 'Busca recursivamente en mis túneles infinitos o estarás atrapado para siempre'",
        description: `Tu misión: Crea una función buscar_tesoro_recursivo(nivel, objetivo=100) que:
1. Implementa recursión: busca incrementando nivel
2. Detiene cuando nivel >= objetivo
3. Retorna diccionario con: {nivel_actual, camino_recorrido, encontrado: True}
4. BONUS: Evita recursión infinita con validaciones

Temas: Funciones (9,10 - Recursión) + Diccionarios (8)
Dificultad: ⭐⭐⭐⭐ MUY Avanzado`,
        hint: "1. Caso base: if nivel >= objetivo: return {...}\n2. Caso recursivo: return buscar_tesoro_recursivo(nivel + 1, objetivo)\n3. Acumula camino correctamente",
        syntax: `def buscar_tesoro_recursivo(nivel, objetivo=100):
    if nivel >= objetivo:
        return {
            "nivel_actual": nivel,
            "camino_recorrido": [nivel],
            "encontrado": True
        }
    
    resultado_siguiente = buscar_tesoro_recursivo(nivel + 1, objetivo)
    resultado_siguiente["camino_recorrido"].insert(0, nivel)
    return resultado_siguiente`,
        damage: 100
    },

    {
        id: 5,
        title: "BATALLA 5: La Fortaleza de Datos",
        narrative: "El Asote custodia una fortaleza donde guarda registros de todos los guerreros: 'Procesa mi archivo de alianzas y derrota a cada facción'",
        description: `Tu misión: Crea una función analizar_alianzas(contenido_archivo) que:
1. Reciba CSV: "faccion,miembros,poder\\nLuz,3,85\\nOscuridad,2,90"
2. Procese en diccionario de facciones
3. Calcule poder_total = miembros * poder
4. Identifique facción con mayor poder usando MAX
5. Retorne: {faccion: mayor, poder: X, todas: {...}}

Temas: Funciones (9) + Diccionarios (8) + Strings (6) + Archivos (12)
Dificultad: ⭐⭐⭐ Avanzado`,
        hint: "1. Procesa CSV con split('\\n') y split(',')\n2. Crea dict: {faccion: {miembros, poder, poder_total}}\n3. Usa max() con key lambda",
        syntax: `def analizar_alianzas(contenido_archivo):
    lineas = contenido_archivo.strip().split('\\n')
    facciones = {}
    
    for linea in lineas[1:]:
        partes = linea.split(',')
        faccion = partes[0]
        miembros = int(partes[1])
        poder = int(partes[2])
        poder_total = miembros * poder
        facciones[faccion] = {"miembros": miembros, "poder": poder, "poder_total": poder_total}
    
    faccion_mayor, datos = max(facciones.items(), key=lambda x: x[1]['poder_total'])
    
    return {
        "faccion_mayor": faccion_mayor,
        "poder_total_mayor": datos["poder_total"],
        "todas_facciones": facciones
    }`,
        damage: 100
    },

    {
        id: 6,
        title: "BATALLA FINAL: El Enfrentamiento Definitivo",
        narrative: "¡¡¡BATALLA FINAL!!! El Asote reúne TODO su poder. 'Eres digno, guerrero. Demuéstrame que controlas TODOS los poderes'",
        description: `MISIÓN ÉPICA FINAL: Crea una función validar_elite_suprema(datos_json_string) que:
1. Reciba JSON parseable con: nombre, email, edad, poderes, nivel
2. Valide: email con @., edad >= 18, poderes ≠ vacío
3. Procese poderes con SET para eliminar duplicados
4. Calcule score = edad * len(poderes) - nivel
5. Retorne: {valido: True, score: X, poderes_unicos: set}

Temas: TODO (8,9,10,11,12) - Integración Total
Dificultad: ⭐⭐⭐⭐⭐ ÉPICO`,
        hint: "1. import json\n2. datos = json.loads(contenido)\n3. Valida email: '@' in email and '.' in email\n4. Valida poderes: len(set(datos['poderes'])) > 0\n5. score = edad * len(set(poderes)) - nivel",
        syntax: `import json

def validar_elite_suprema(datos_json_string):
    datos = json.loads(datos_json_string)
    
    email_ok = '@' in datos['email'] and '.' in datos['email']
    edad_ok = datos['edad'] >= 18
    poderes_unicos = set(datos['poderes'])
    poderes_ok = len(poderes_unicos) > 0
    
    if not (email_ok and edad_ok and poderes_ok):
        return {"valido": False, "score": 0, "poderes_unicos": set()}
    
    score = datos['edad'] * len(poderes_unicos) - datos['nivel']
    
    return {
        "valido": True,
        "nombre": datos['nombre'],
        "score": score,
        "poderes_unicos": poderes_unicos,
        "poderes_count": len(poderes_unicos)
    }`,
        damage: 100
    }
];
