// ================================================================
// EL ASOTE DE LOS ESTUDIANTES - GAME.JS
// Lógica principal del juego
// ================================================================

let currentBattle = 0;
let villainHP = 600;
const maxHP = 600;

// ================================================================
// SKULPT - Ejecución de Python
// ================================================================
function runPython(code) {
    return new Promise((resolve, reject) => {
        let output = '';
        Sk.configure({
            output: (txt) => { output += txt; },
            read: (url) => {
                if (Sk.builtinFiles?.files[url] === undefined)
                    throw new Error('File not found: ' + url);
                return Sk.builtinFiles.files[url];
            },
            execLimit: 8000,
        });
        Sk.misceval.asyncToPromise(() =>
            Sk.importMainWithBody('<stdin>', false, code, true)
        )
            .then(() => resolve(output.trim()))
            .catch((e) => {
                let msg = e.toString ? e.toString() : String(e);
                msg = msg.replace(/on line \d+ of <stdin>/g, '').trim();
                reject(msg);
            });
    });
}

// ================================================================
// INICIAR BATALLA
// ================================================================
function startBattle() {
    document.getElementById('portada').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    renderBattle();
    document.getElementById('code-editor').focus();
}

function renderBattle() {
    const battle = BATTLES[currentBattle];
    document.getElementById('game-level').textContent = `RONDA ${currentBattle + 1} / 6`;
    document.getElementById('exercise-title').textContent = battle.title;
    document.getElementById('exercise-narrative').textContent = battle.narrative;
    document.getElementById('exercise-description').textContent = battle.description;
    document.getElementById('hint-0').textContent = battle.hint;
    document.getElementById('hint-1').textContent = battle.syntax;
    document.getElementById('code-editor').value = '';
    document.getElementById('output').textContent = '// Escribe código y presiona ⚡ ATACAR';
    document.getElementById('result-msg').className = '';
    document.getElementById('result-msg').style.display = 'none';
    
    updateHealthBar();
}

function updateHealthBar() {
    const percentage = (villainHP / maxHP) * 100;
    const bar = document.getElementById('villain-health-bar');
    const text = document.getElementById('villain-health-text');
    
    bar.style.width = percentage + '%';
    bar.textContent = Math.ceil(percentage) + '%';
    document.getElementById('villain-health-text').textContent = `${Math.max(0, villainHP)} / ${maxHP} HP`;
}

// ================================================================
// EJECUTAR CÓDIGO
// ================================================================
async function executeCode() {
    const code = document.getElementById('code-editor').value.trim();
    const battle = BATTLES[currentBattle];
    
    if (!code) {
        setOutput('❌ El editor está vacío. Escribe tu solución.', false);
        return;
    }

    const btn = document.getElementById('btn-execute');
    btn.disabled = true;
    btn.textContent = '⏳ ATACANDO...';
    
    const fullCode = code + '\n\n' + getTestsForBattle(currentBattle);

    try {
        const out = await runPython(fullCode);
        setOutput(out, true);
        
        villainHP = Math.max(0, villainHP - battle.damage);
        updateHealthBar();

        const msg = document.getElementById('result-msg');
        msg.className = 'success';
        msg.style.display = 'block';
        msg.innerHTML = '⚡ ¡ATAQUE EXITOSO! Dañaste a El Asote.';

        if (villainHP <= 0) {
            setTimeout(showVictory, 2000);
        } else {
            setTimeout(() => {
                currentBattle++;
                if (currentBattle < BATTLES.length) {
                    renderBattle();
                    btn.disabled = false;
                    btn.textContent = '⚡ ATACAR ⚡';
                }
            }, 2000);
        }
    } catch (err) {
        setOutput('❌ ERROR:\n\n' + err, false);
        const msg = document.getElementById('result-msg');
        msg.className = 'error';
        msg.style.display = 'block';
        msg.innerHTML = '❌ El ataque falló. Intenta de nuevo.';
        btn.disabled = false;
        btn.textContent = '⚡ ATACAR ⚡';
    }
}

function setOutput(text, ok) {
    document.getElementById('output').textContent = text;
    document.getElementById('output').style.color = ok ? '#00ff00' : '#ff4444';
}

function switchHint(index) {
    const tabs = document.querySelectorAll('.hint-tab');
    const contents = document.querySelectorAll('.hint-content');
    
    tabs.forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
    contents.forEach((c, i) => {
        c.classList.toggle('active', i === index);
    });
}

function showVictory() {
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('victory-screen').classList.remove('hidden');
}

// ================================================================
// TESTS POR BATALLA
// ================================================================
function getTestsForBattle(battleIndex) {
    const tests = [
        // Batalla 1: CSV + Diccionarios
        `
contenido = "nombre,poder\\nArturo,85\\nMerlín,95\\nLancelot,75\\nPercy,82"
resultado = leer_y_filtrar_guerreros(contenido)

assert len(resultado) == 3, f"Debe haber 3 guerreros, obtuve {len(resultado)}"
assert resultado.get("Arturo") == 85, "Arturo (85) debe estar"
assert resultado.get("Merlín") == 95, "Merlín (95) debe estar"
assert resultado.get("Percy") == 82, "Percy (82) debe estar"
assert "Lancelot" not in resultado, "Lancelot (75) NO debe estar"

print("✓ Arturo (85) desbloqueado")
print("✓ Merlín (95) desbloqueado")
print("✓ Percy (82) desbloqueado")
print("✓ Lancelot (75) rechazado")
print("\\n⚡ ¡PRIMER SELLO ROTO! El Asote pierde 100 HP")
`,
        // Batalla 2: Conjuntos
        `
lista = ["Arturo", "Merlín", "Arturo", "Percy", "Merlín", "Morgana"]
unicos, duplicados = identificar_guerreros_verdaderos(lista)

assert len(unicos) == 4, f"Debe haber 4 únicos, obtuve {len(unicos)}"
assert duplicados == 2, f"Debe haber 2 duplicados, obtuve {duplicados}"

lista2 = ["Lancelot", "Lancelot", "Lancelot"]
unicos2, duplicados2 = identificar_guerreros_verdaderos(lista2)
assert len(unicos2) == 1 and duplicados2 == 2

print("✓ 6 guerreros → 4 únicos")
print("✓ 2 impostores eliminados")
print("✓ Identidad confirmada")
print("✓ Caso extremo: 3 Lancelots → 1 verdadero + 2 impostores")
print("\\n⚡ ¡SELLO DEL DESTINO ROTO! El Asote pierde 100 HP")
`,
        // Batalla 3: Módulos
        `
import math
import random

random.seed(42)

odds1 = calcular_odds_batalla(85, 90, 75, 88)
assert 0 <= odds1 <= 100, f"Odds debe estar 0-100"
assert odds1 > 50, f"Guerrero fuerte debe tener > 50%"

odds2 = calcular_odds_batalla(20, 25, 30, 15)
assert 0 <= odds2 <= 100

odds3 = calcular_odds_batalla(50, 50, 50, 50)
assert 0 <= odds3 <= 100

print(f"✓ Guerrero fuerte: {odds1:.1f}% de victoria")
print(f"✓ Guerrero débil: {odds2:.1f}% de victoria")
print(f"✓ Guerrero balance: {odds3:.1f}% de victoria")
print("✓ Todos los odds válidos (0-100%)")
print("\\n⚡ ¡CÁLCULOS COMPLETADOS! El Asote pierde 100 HP")
`,
        // Batalla 4: Recursión
        `
resultado = buscar_tesoro_recursivo(95, 100)

assert resultado["encontrado"] == True
assert resultado["nivel_actual"] == 100
assert len(resultado["camino_recorrido"]) == 6
assert resultado["camino_recorrido"][0] == 95
assert resultado["camino_recorrido"][-1] == 100

resultado2 = buscar_tesoro_recursivo(98, 100)
assert len(resultado2["camino_recorrido"]) == 3

print("✓ Tesoro encontrado en nivel 100")
print("✓ Camino recorrido: [95, 96, 97, 98, 99, 100]")
print("✓ Total de pasos: 6")
print("✓ Recursión controlada exitosamente")
print("\\n⚡ ¡TESORO DESENTERRADO! El Asote pierde 100 HP")
`,
        // Batalla 5: CSV + Max
        `
contenido = "faccion,miembros,poder\\nLuz,3,85\\nOscuridad,2,90\\nNeutrales,5,60"
resultado = analizar_alianzas(contenido)

assert len(resultado["todas_facciones"]) == 3
assert resultado["todas_facciones"]["Luz"]["poder_total"] == 255
assert resultado["todas_facciones"]["Oscuridad"]["poder_total"] == 180
assert resultado["todas_facciones"]["Neutrales"]["poder_total"] == 300
assert resultado["faccion_mayor"] == "Neutrales"
assert resultado["poder_total_mayor"] == 300

print("✓ Luz: 3 miembros × 85 poder = 255 total")
print("✓ Oscuridad: 2 miembros × 90 poder = 180 total")
print("✓ Neutrales: 5 miembros × 60 poder = 300 total")
print("✓ Facción más fuerte: Neutrales (300)")
print("\\n⚡ ¡FORTALEZA ANALIZADA! El Asote pierde 100 HP")
`,
        // Batalla 6: JSON + Todo
        `
import json

json1 = '{"nombre":"Arturo","email":"arturo@camelot.com","edad":25,"poderes":["Excalibur","Liderazgo"],"nivel":10}'
resultado1 = validar_elite_suprema(json1)

assert resultado1["valido"] == True
assert resultado1["score"] == 40
assert len(resultado1["poderes_unicos"]) == 2

json2 = '{"nombre":"Merlín","email":"merlin","edad":30,"poderes":["Magia"],"nivel":5}'
resultado2 = validar_elite_suprema(json2)
assert resultado2["valido"] == False

json3 = '{"nombre":"Percival","email":"percy@camelot.com","edad":17,"poderes":["Valor","Honor"],"nivel":8}'
resultado3 = validar_elite_suprema(json3)
assert resultado3["valido"] == False

json4 = '{"nombre":"Lancelot","email":"lance@camelot.com","edad":28,"poderes":["Espada","Espada","Coraje"],"nivel":12}'
resultado4 = validar_elite_suprema(json4)
assert resultado4["valido"] == True
assert len(resultado4["poderes_unicos"]) == 2

print("✓ Arturo: Válido, Score=40")
print("✓ Merlín: Email inválido")
print("✓ Percival: Edad insuficiente")
print("✓ Lancelot: Duplicados eliminados")
print("\\n🏆 ¡¡¡ BATALLA FINAL GANADA !!!")
print("🎊 ¡¡¡ EL ASOTE HA SIDO DERROTADO !!!")
print("🌟 ¡¡¡ ERES UN VERDADERO MAESTRO PROGRAMADOR !!!")
`
    ];
    
    return tests[battleIndex] || '';
}
