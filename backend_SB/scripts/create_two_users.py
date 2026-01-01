#!/usr/bin/env python3
"""
Script simple pour :
- créer deux utilisateurs via POST /auth/register (rien d'autre).

Usage (depuis le dossier `backend_SB`):
    python scripts/create_two_users.py

Ce script utilise uniquement la stdlib (urllib) pour éviter d'ajouter des dépendances.
"""

import os
import sys
import json
import urllib.request
import urllib.error

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVER_URL = os.environ.get('SERVER_URL', 'http://localhost:8080')
REGISTER_PATH = "/auth/register"

# Les utilisateurs à créer (modifiable)
USERS = [
    {"username": "testuser1", "password": "Password123!", "email": "testuser1@example.com"},
    {"username": "testuser2", "password": "Password123!", "email": "testuser2@example.com"}
]


def post_register(payload):
    url = SERVER_URL + REGISTER_PATH
    data = json.dumps(payload).encode('utf-8')
    headers = {'Content-Type': 'application/json'}
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status, resp.read().decode('utf-8')
    except urllib.error.HTTPError as he:
        body = None
        try:
            body = he.read().decode('utf-8')
        except Exception:
            body = None
        return he.code, body
    except Exception as e:
        return None, str(e)


def main():
    # Envoie directement les requêtes de création des utilisateurs
    for u in USERS:
        print(f"Création utilisateur: {u['username']} -> POST {SERVER_URL + REGISTER_PATH}")
        code, body = post_register(u)
        if code == 201:
            print(f"OK: {u['username']} créé (201 Created)")
        elif code == 409:
            print(f"Conflit: {u['username']} existe déjà (409)")
        elif code is None:
            print(f"Erreur réseau lors de la création de {u['username']}: {body}")
        else:
            print(f"Réponse inattendue ({code}) lors de la création de {u['username']}: {body}")

    print("Opération terminée.")


if __name__ == '__main__':
    main()
