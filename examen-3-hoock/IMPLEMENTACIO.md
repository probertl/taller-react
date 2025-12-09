# Examen 3 - Gestió de Productes amb React i Redux

## Instal·lació

```bash
npm install
```

## Executar l'aplicació

### 1. Executar el backend (json-server amb delay de 2 segons)
```bash
npm run server
```

### 2. Executar el frontend (en un altre terminal)
```bash
npm run dev
```

## Funcionalitats implementades

**Punt 1**: Projecte descarregat i en marxa
**Punt 2**: Redux configurat amb productesSlice.js i thunks.js
  - Mètodes: `setProductes`, `startLoading`, `setLimit`, `removeProducte`
  - Thunks: `getProductes`, `delProducte`
  - Estats: `isLoading`, `productes`, `limit`

**Punt 3**: Rutes configurades
  - `/productes` - Llistat de productes
  - `/about` - Informació sobre l'aplicació
  - `*` - Pàgina 404

**Punt 4**: ProductsList renderitza ProductMenu i ProductList

**Punt 5**: ProductList mostra productes amb botó VIEW/HIDE i DELETE
  - Mostra thumbnail, brand, title, price, category
  - Missatge de càrrega mentre s'està carregant

**Punt 6**: Funcionalitat d'esborrar producte
  - Confirmació abans d'esborrar
  - Actualització automàtica del llistat

**Punt 7**: Botó SHOW/HIDE
  - Mostra descripció i imatges quan es clica SHOW
  - Oculta quan es clica HIDE
  - Imatges amb amplada màxima de 200px

**Punt 8**: ProductMenu amb formulari de límit
  - Validació amb react-hook-form
  - Camp requerit i només números enters positius
  - Mostra errors de validació
  - Carrega el número de productes indicat

## Estructura del projecte

```
src/
  ├── components/
  │   ├── Header.jsx
  │   ├── Footer.jsx
  │   ├── AppMenu.jsx
  │   ├── About.jsx
  │   ├── NotFound.jsx
  │   ├── ProductsList.jsx
  │   ├── ProductList.jsx
  │   └── ProductMenu.jsx
  ├── store/
  │   ├── store.js
  │   ├── productesSlice.js
  │   └── thunks.js
  ├── App.jsx
  └── main.jsx
```
