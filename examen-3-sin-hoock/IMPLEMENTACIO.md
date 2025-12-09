# Examen 3 - Gestió de Productes SENSE Redux ni React Hook Form

## Diferències amb examen-3-hoock

Aquest projecte implementa **la mateixa funcionalitat** que examen-3-hoock però **SENSE utilitzar**:
- ❌ Redux / Redux Toolkit
- ❌ React Hook Form

**S'utilitza en lloc de**:
- ✅ Context API per autenticació
- ✅ useState per gestió d'estat local
- ✅ Validació manual de formularis

## Instal·lació

```bash
npm install
```

## Executar l'aplicació

### 1. Executar el backend (json-server al port 3001)
```bash
npm run server
```

### 2. Executar el frontend (en un altre terminal)
```bash
npm run dev
```

## Funcionalitats implementades

### Autenticació
✅ **Login**: Validació contra db.json
✅ **Register**: Crear nous usuaris
✅ **Context API**: Gestió d'estat global sense Redux
✅ **Logout**: Tancar sessió

### Gestió de Productes
✅ **Llistat**: Amb spinner de càrrega
✅ **ADD**: Formulari per afegir productes (validació manual)
✅ **EDIT**: Formulari per editar productes inline
✅ **DELETE**: Eliminar productes amb confirmació
✅ **VIEW/HIDE**: Mostrar/ocultar detalls i imatges
✅ **Límit**: Carregar nombre específic de productes (validació manual)

### Components
- **Auth**: Login/Register amb toggle
- **Header**: Navegació amb nom d'usuari i logout
- **Footer**: Peu de pàgina
- **ProductsList**: Llistat principal amb useState
- **ProductList**: Component individual amb CRUD
- **AddProduct**: Formulari d'afegir (validació manual)
- **EditProduct**: Formulari d'editar (validació manual)
- **ProductMenu**: Formulari de límit (validació manual)
- **Error/Success/Warning**: Components de missatges

## Estructura del projecte

```
src/
  ├── components/
  │   ├── Auth.jsx
  │   ├── Login.jsx
  │   ├── Register.jsx
  │   ├── Header.jsx
  │   ├── Footer.jsx
  │   ├── About.jsx
  │   ├── NotFound.jsx
  │   ├── ProductsList.jsx
  │   ├── ProductList.jsx
  │   ├── AddProduct.jsx
  │   ├── EditProduct.jsx
  │   ├── ProductMenu.jsx
  │   ├── Error.jsx
  │   ├── Success.jsx
  │   └── Warning.jsx
  ├── App.jsx (amb Context API)
  └── main.jsx
```

## Validació Manual

Exemple de validació sense React Hook Form:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Validació manual
  if (!form.title.trim()) {
    setError('El títol és obligatori');
    return;
  }
  
  const price = parseFloat(form.price);
  if (isNaN(price) || price <= 0) {
    setError('El preu ha de ser un número positiu');
    return;
  }
  
  // Processar formulari...
};
```

## Gestió d'Estat

- **Context API** per l'usuari autenticat (global)
- **useState** per tots els altres estats (local)
- **Lifting State Up** per compartir estat entre components

## API Endpoints (json-server)

- `GET /users` - Llistar usuaris
- `POST /users` - Crear usuari
- `GET /products?_limit=X` - Llistar productes amb límit
- `POST /products` - Crear producte
- `PUT /products/:id` - Actualitzar producte
- `DELETE /products/:id` - Eliminar producte
