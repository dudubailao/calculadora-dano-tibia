// Configuração da API
const API_BASE_URL = '/api/damage';

// Elementos do DOM
const calculateBtn = document.getElementById('calculate-btn');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');

// Inputs
const levelInput = document.getElementById('level');
const magicLevelInput = document.getElementById('magic-level');
const distanceSkillInput = document.getElementById('distance-skill');
const attackValueInput = document.getElementById('attack-value');
const damageFactorSelect = document.getElementById('damage-factor');
const avalancheBuffInput = document.getElementById('avalanche-buff');
const exevoMasSanBuffInput = document.getElementById('exevo-mas-san-buff');
const holyGrenadeBuffInput = document.getElementById('holy-grenade-buff');

// Elementos de resultado
const resultElements = {
    avalanche: {
        min: document.getElementById('avalanche-min'),
        max: document.getElementById('avalanche-max'),
        avg: document.getElementById('avalanche-avg')
    },
    exevo_mas_san: {
        min: document.getElementById('exevo-mas-san-min'),
        max: document.getElementById('exevo-mas-san-max'),
        avg: document.getElementById('exevo-mas-san-avg')
    },
    holy_grenade: {
        min: document.getElementById('holy-grenade-min'),
        max: document.getElementById('holy-grenade-max'),
        avg: document.getElementById('holy-grenade-avg')
    },
    distance_attack: {
        min: document.getElementById('distance-attack-min'),
        max: document.getElementById('distance-attack-max'),
        avg: document.getElementById('distance-attack-avg')
    }
};

// Função para mostrar loading
function showLoading() {
    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    calculateBtn.disabled = true;
    calculateBtn.textContent = '🧮 Calculando...';
}

// Função para esconder loading
function hideLoading() {
    loadingElement.style.display = 'none';
    calculateBtn.disabled = false;
    calculateBtn.textContent = '🧮 Calcular Dano';
}

// Função para mostrar erro
function showError(message = 'Erro ao calcular o dano. Verifique os valores inseridos.') {
    errorElement.style.display = 'block';
    errorElement.querySelector('p').textContent = `❌ ${message}`;
    hideLoading();
}

// Função para esconder erro
function hideError() {
    errorElement.style.display = 'none';
}

// Função para validar inputs
function validateInputs() {
    const level = parseInt(levelInput.value);
    const magicLevel = parseInt(magicLevelInput.value);
    const distanceSkill = parseInt(distanceSkillInput.value);
    const attackValue = parseInt(attackValueInput.value);

    if (isNaN(level) || level < 1 || level > 1000) {
        throw new Error('Level deve estar entre 1 e 1000');
    }

    if (isNaN(magicLevel) || magicLevel < 0 || magicLevel > 200) {
        throw new Error('Magic Level deve estar entre 0 e 200');
    }

    if (isNaN(distanceSkill) || distanceSkill < 0 || distanceSkill > 200) {
        throw new Error('Distance Skill deve estar entre 0 e 200');
    }

    if (isNaN(attackValue) || attackValue < 0 || attackValue > 100) {
        throw new Error('Attack Value deve estar entre 0 e 100');
    }

    return true;
}

// Função para coletar dados do formulário
function collectFormData() {
    return {
        level: parseInt(levelInput.value),
        magic_level: parseInt(magicLevelInput.value),
        distance_skill: parseInt(distanceSkillInput.value),
        attack_value: parseInt(attackValueInput.value),
        damage_factor: parseFloat(damageFactorSelect.value),
        avalanche_buff: parseFloat(avalancheBuffInput.value) || 0,
        exevo_mas_san_buff: parseFloat(exevoMasSanBuffInput.value) || 0,
        holy_grenade_buff: parseFloat(holyGrenadeBuffInput.value) || 0
    };
}

// Função para atualizar os resultados na interface
function updateResults(data) {
    Object.keys(data).forEach(spellKey => {
        if (resultElements[spellKey]) {
            const spell = data[spellKey];
            resultElements[spellKey].min.textContent = spell.min;
            resultElements[spellKey].max.textContent = spell.max;
            resultElements[spellKey].avg.textContent = spell.avg;
        }
    });

    // Adicionar animação aos resultados
    document.querySelectorAll('.spell-result').forEach((element, index) => {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'fadeIn 0.5s ease-out';
        }, index * 100);
    });
}

// Função principal para calcular o dano
async function calculateDamage() {
    try {
        hideError();
        showLoading();
        
        // Validar inputs
        validateInputs();
        
        // Coletar dados do formulário
        const formData = collectFormData();
        
        // Fazer requisição para a API
        const response = await fetch(`${API_BASE_URL}/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro na requisição');
        }

        const data = await response.json();
        
        // Atualizar resultados na interface
        updateResults(data);
        
        hideLoading();
        
    } catch (error) {
        console.error('Erro ao calcular dano:', error);
        showError(error.message);
    }
}

// Event listeners
calculateBtn.addEventListener('click', calculateDamage);

// Calcular automaticamente quando Enter for pressionado em qualquer input
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateDamage();
        }
    });
});

// Calcular automaticamente quando os valores mudarem (com debounce)
let debounceTimer;
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (levelInput.value && magicLevelInput.value) {
                calculateDamage();
            }
        }, 500);
    });
});

// Calcular valores iniciais quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    if (levelInput.value && magicLevelInput.value) {
        calculateDamage();
    }
});

// Função para testar a conexão com a API
async function testAPIConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            console.log('✅ Conexão com a API estabelecida');
        } else {
            console.warn('⚠️ API respondeu com status:', response.status);
        }
    } catch (error) {
        console.error('❌ Erro ao conectar com a API:', error);
    }
}

// Testar conexão quando a página carregar
testAPIConnection();

