# 🗡️ Calculadora de Dano - Tibia

Uma calculadora web interativa para estimar o dano de magias e ataques à distância no jogo Tibia.

## ✨ Funcionalidades

- **Cálculo de Magias**: Avalanche, Exevo Mas San e Holy Grenade
- **Ataques à Distância**: Cálculo baseado em Distance Skill e Attack Value
- **Buffs Individuais**: Porcentagem de dano personalizada para cada magia
- **Interface Responsiva**: Funciona em desktop e dispositivos móveis
- **Cálculo Automático**: Resultados atualizados em tempo real
- **Validação Robusta**: Verificação de entrada em múltiplas camadas

## 🚀 Como Usar

### Instalação Local

1. **Clone ou baixe o projeto**
2. **Navegue até o diretório do projeto**
   ```bash
   cd damage_calculator
   ```

3. **Ative o ambiente virtual**
   ```bash
   source venv/bin/activate
   ```

4. **Instale as dependências** (se necessário)
   ```bash
   pip install -r requirements.txt
   ```

5. **Execute a aplicação**
   ```bash
   python src/main.py
   ```

6. **Acesse no navegador**
   ```
   http://localhost:5000
   ```

### Uso da Calculadora

1. **Preencha os dados do personagem:**
   - Level (1-1000)
   - Magic Level (0-200)
   - Distance Skill (0-200)
   - Attack Value da arma (0-100)
   - Fator de Dano (Ataque Máximo, Balanceado, Defesa Máxima)

2. **Configure os buffs (opcional):**
   - Avalanche Buff (%)
   - Exevo Mas San Buff (%)
   - Holy Grenade Buff (%)

3. **Veja os resultados instantaneamente:**
   - Dano Mínimo, Máximo e Médio para cada magia
   - Cálculos de ataque à distância

## 📊 Fórmulas Implementadas

### Magias

**Avalanche (Runa de Gelo - Área)**
- Dano Mínimo: (Level × 0.2) + (Magic Level × 1.2) + 7
- Dano Máximo: (Level × 0.2) + (Magic Level × 2.8) + 17

**Exevo Mas San (Alvo Único)**
- Dano Mínimo: (Magic Level × 4) + (Level × 0.2) + 7
- Dano Máximo: (Magic Level × 6) + (Level × 0.2) + 17

**Holy Grenade (Estimada)**
- Dano Mínimo: (Level × 0.2) + (Magic Level × 1.6) + 25
- Dano Máximo: (Level × 0.2) + (Magic Level × 3.2) + 45

### Ataques à Distância

- Dano Mínimo: floor(Level / 5) + 1
- Dano Máximo: floor(Distance Skill / 2) + (Attack Value × Fator de Dano)

**Fatores de Dano:**
- Ataque Máximo: 1.0
- Balanceado: 0.75
- Defesa Máxima: 0.5

## 🛠️ Tecnologias Utilizadas

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **API**: RESTful com JSON
- **Estilo**: CSS Grid, Flexbox, Gradientes
- **Validação**: Client-side e Server-side

## 📁 Estrutura do Projeto

```
damage_calculator/
├── src/
│   ├── main.py              # Aplicação Flask principal
│   ├── routes/
│   │   ├── damage.py        # Rotas de cálculo de dano
│   │   └── user.py          # Rotas de usuário (template)
│   ├── models/
│   │   └── user.py          # Modelos de dados (template)
│   └── static/
│       ├── index.html       # Interface principal
│       ├── styles.css       # Estilos CSS
│       └── script.js        # Lógica JavaScript
├── venv/                    # Ambiente virtual Python
├── requirements.txt         # Dependências Python
└── README.md               # Este arquivo
```

## 🧪 Testes

A aplicação inclui testes automatizados que validam:
- Precisão dos cálculos matemáticos
- Validação de entrada
- Funcionamento da API
- Lógica de buffs

Para executar os testes:
```bash
python test_calculator.py
```

## 🔧 API Endpoints

### POST /api/damage/calculate
Calcula o dano para todas as magias e ataques à distância.

**Payload:**
```json
{
  "level": 100,
  "magic_level": 50,
  "distance_skill": 50,
  "attack_value": 20,
  "damage_factor": 0.75,
  "avalanche_buff": 0,
  "exevo_mas_san_buff": 0,
  "holy_grenade_buff": 0
}
```

**Resposta:**
```json
{
  "avalanche": {
    "min": 87.0,
    "max": 177.0,
    "avg": 132.0
  },
  "exevo_mas_san": {
    "min": 227.0,
    "max": 337.0,
    "avg": 282.0
  },
  "holy_grenade": {
    "min": 125.0,
    "max": 225.0,
    "avg": 175.0
  },
  "distance_attack": {
    "min": 21,
    "max": 40.0,
    "avg": 30.5
  }
}
```

### GET /api/damage/health
Verifica se a API está funcionando.

## 📱 Responsividade

A calculadora é totalmente responsiva e funciona em:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (até 767px)

## 🎯 Casos de Uso

- **Planejamento de Build**: Compare diferentes configurações de atributos
- **Otimização de Equipamentos**: Veja o impacto de diferentes armas
- **Análise de Buffs**: Determine quais buffs oferecem melhor custo-benefício
- **Educação**: Aprenda como as mecânicas de dano funcionam no Tibia

## 🔮 Futuras Melhorias

- Adicionar mais magias do jogo
- Sistema de salvamento de builds
- Comparação lado a lado de diferentes configurações
- Cálculo de DPS considerando cooldowns
- Integração com APIs oficiais do Tibia
- Aplicação móvel nativa

## 📄 Licença

Este projeto é desenvolvido para a comunidade Tibia e é de uso livre.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Adicionar novas magias

## 📞 Suporte

Para dúvidas ou sugestões sobre a calculadora, entre em contato através dos canais da comunidade Tibia.

---

**Desenvolvido com ❤️ para a comunidade Tibia**

