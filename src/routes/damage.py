from flask import Blueprint, request, jsonify
import math

damage_bp = Blueprint("damage", __name__)

def avalanche_min_damage(level, magic_level, damage_percentage_buff=0):
    base_damage = (level * 0.2) + (magic_level * 1.2) + 7
    return base_damage * (1 + damage_percentage_buff / 100)

def avalanche_max_damage(level, magic_level, damage_percentage_buff=0):
    base_damage = (level * 0.2) + (magic_level * 2.8) + 17
    return base_damage * (1 + damage_percentage_buff / 100)

def exevo_mas_san_min_damage(level, magic_level, damage_percentage_buff=0):
    base_damage = (magic_level * 4) + (level * 0.2) + 7
    return base_damage * (1 + damage_percentage_buff / 100)

def exevo_mas_san_max_damage(level, magic_level, damage_percentage_buff=0):
    base_damage = (magic_level * 6) + (level * 0.2) + 17
    return base_damage * (1 + damage_percentage_buff / 100)

def holy_grenade_min_damage(level, magic_level, damage_percentage_buff=0):
    base_damage = (level * 0.2) + (magic_level * 1.6) + 25
    return base_damage * (1 + damage_percentage_buff / 100)

def holy_grenade_max_damage(level, magic_level, damage_percentage_buff=0):
    base_damage = (level * 0.2) + (magic_level * 3.2) + 45
    return base_damage * (1 + damage_percentage_buff / 100)

def basic_attack_min_damage(level):
    return math.floor(level / 5) + 1

def basic_attack_max_damage(distance_skill, attack_value, damage_factor):
    return math.floor(distance_skill / 2) + attack_value * damage_factor

@damage_bp.route("/calculate", methods=["POST"])
def calculate_damage():
    try:
        data = request.get_json()
        
        level = int(data.get("level", 0))
        magic_level = int(data.get("magic_level", 0))
        distance_skill = int(data.get("distance_skill", 0))
        attack_value = int(data.get("attack_value", 0))
        damage_factor = float(data.get("damage_factor", 1.0))
        
        # Buffs de porcentagem de dano para cada magia
        avalanche_buff = float(data.get("avalanche_buff", 0))
        exevo_mas_san_buff = float(data.get("exevo_mas_san_buff", 0))
        holy_grenade_buff = float(data.get("holy_grenade_buff", 0))
        
        # Cálculos das magias
        avalanche_min = avalanche_min_damage(level, magic_level, avalanche_buff)
        avalanche_max = avalanche_max_damage(level, magic_level, avalanche_buff)
        avalanche_avg = (avalanche_min + avalanche_max) / 2
        
        exevo_mas_san_min = exevo_mas_san_min_damage(level, magic_level, exevo_mas_san_buff)
        exevo_mas_san_max = exevo_mas_san_max_damage(level, magic_level, exevo_mas_san_buff)
        exevo_mas_san_avg = (exevo_mas_san_min + exevo_mas_san_max) / 2
        
        holy_grenade_min = holy_grenade_min_damage(level, magic_level, holy_grenade_buff)
        holy_grenade_max = holy_grenade_max_damage(level, magic_level, holy_grenade_buff)
        holy_grenade_avg = (holy_grenade_min + holy_grenade_max) / 2
        
        # Cálculos de ataque à distância
        # Invertendo min e max para o ataque básico
        distance_min = basic_attack_min_damage(level)
        distance_max = basic_attack_max_damage(distance_skill, attack_value, damage_factor)
        
        # Garantir que o min seja sempre menor ou igual ao max
        if distance_min > distance_max:
            distance_min, distance_max = distance_max, distance_min

        distance_avg = (distance_min + distance_max) / 2
        
        return jsonify({
            "avalanche": {
                "min": round(avalanche_min, 2),
                "max": round(avalanche_max, 2),
                "avg": round(avalanche_avg, 2)
            },
            "exevo_mas_san": {
                "min": round(exevo_mas_san_min, 2),
                "max": round(exevo_mas_san_max, 2),
                "avg": round(exevo_mas_san_avg, 2)
            },
            "holy_grenade": {
                "min": round(holy_grenade_min, 2),
                "max": round(holy_grenade_max, 2),
                "avg": round(holy_grenade_avg, 2)
            },
            "distance_attack": {
                "min": round(distance_min, 2),
                "max": round(distance_max, 2),
                "avg": round(distance_avg, 2)
            }
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@damage_bp.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "Damage Calculator API is running"})


