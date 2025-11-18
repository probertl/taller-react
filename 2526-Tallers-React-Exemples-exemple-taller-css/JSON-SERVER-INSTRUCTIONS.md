# Instruccions per utilitzar json-server

## Instal·lació

Json-server ja està instal·lat com a dependència de desenvolupament del projecte.

## Configuració

El projecte utilitza variables d'entorn per gestionar la URL de l'API:

- Fitxer `.env` a l'arrel del projecte conté: `VITE_API_URL=http://localhost:3000`
- Tots els components utilitzen `import.meta.env.VITE_API_URL` per accedir a la URL base

## Executar el servidor

En un terminal, executa:

```bash
npm run server
```

El servidor estarà disponible a `http://localhost:3000`

## Executar l'aplicació

En un altre terminal, executa:

```bash
npm run dev
```

## Funcionalitats implementades

### Sistema d'autenticació amb Context API
- Component `Login` que valida usuaris contra el servidor
- `UserContext` comparteix l'estat d'usuari entre components
- El `Header` mostra el nom d'usuari i permet fer logout
- Ubicat a `src/components/Login.jsx` i `src/App.jsx`

### Càrrega de dades (GET) - amb .then/.catch
- Quan es munta el component, es carreguen les dades del servidor
- Si falla, es mostren les dades inicials (INITIAL_PAROLE)
- També es guarda al localStorage per persistència
- Ubicat al `useEffect` inicial de `ParolaList.jsx`

### Afegir paraula (POST) - amb .then/.catch
- S'envia la nova paraula al servidor
- S'actualitza l'estat local i el localStorage
- Ubicat a la funció `handleAdd` de `ParolaList.jsx`

### Actualitzar paraula (PUT) - amb async/await
- S'envia la paraula actualitzada al servidor
- S'actualitza l'estat local i el localStorage
- Ubicat a la funció `handleUpdate` de `ParolaList.jsx`

### Esborrar paraula (DELETE) - amb async/await
- S'esborra la paraula del servidor
- S'actualitza l'estat local i el localStorage
- Ubicat a la funció `handleDelete` de `ParolaList.jsx`

### Rutes amb React Router
- `/` - Pàgina d'inici
- `/parole` - Llistat de vocabulari
- `/parole/:id` - Detall d'una paraula específica
- `/about` - Pàgina About
- `*` - Pàgina 404 Not Found

## Endpoints disponibles

### Paraules (parole)
- `GET http://localhost:3000/parole` - Obtenir totes les paraules
- `GET http://localhost:3000/parole/:id` - Obtenir una paraula específica
- `POST http://localhost:3000/parole` - Afegir una nova paraula
- `PUT http://localhost:3000/parole/:id` - Actualitzar una paraula
- `DELETE http://localhost:3000/parole/:id` - Esborrar una paraula

### Usuaris (users)
- `GET http://localhost:3000/users` - Obtenir tots els usuaris (utilitzat pel login)

## Estructura del db.json

```json
{
  "parole": [
    { "id": 1, "word": "ciao", "translation": "hola" },
    ...
  ],
  "users": [
    { "id": 1, "username": "admin" },
    { "id": 2, "username": "user" }
  ]
}
```

## Notes

- El localStorage actua per persistir dades localment
- Les operacions amb async/await mostren una forma més moderna i llegible
- Les operacions amb .then/.catch mostren la forma tradicional de Promises
- El sistema d'autenticació utilitza Context API per compartir l'estat d'usuari
- Totes les rutes d'API utilitzen la variable d'entorn `VITE_API_URL` del fitxer `.env`
