# 🛒 Product Dashboard 

Aplicación de dashboard para e-commerce desarrollada con **Vue 3 + TypeScript**, que permite visualizar, buscar y filtrar productos de forma eficiente.

---

## 🚀 Funcionalidades

* 📦 Listado de productos en grid responsivo
* 🔍 Búsqueda por nombre con debounce
* 🏷️ Filtro por categorías
* 📄 Paginación
* 🔎 Vista de detalle de producto
* ⚡ Lazy loading de rutas

---

## 🛠️ Tecnologías

* Vue 3 (Composition API)
* TypeScript
* Vite
* Tailwind CSS

---


<img width="1196" height="942" alt="image" src="https://github.com/user-attachments/assets/049b094a-d08e-437e-9162-232686c61cfe" />

---

## ⚙️ Instalación

```bash
npm install
npm run dev
```

---

## 🧠 Decisiones técnicas

* Uso de **Composition API** para mejorar la reutilización de lógica
* Separación en **services** para aislar llamadas a la API
* Implementación de **debounce** para optimizar búsquedas
* Uso de **lazy loading** en rutas para mejorar el performance inicial
* Componentización enfocada en escalabilidad y mantenimiento

---

## 🧩 Arquitectura

```
src/
├── components/
├── views/
├── services/
├── composables/
├── stores/
```

---

## ⚡ Mejoras implementadas

* Skeleton loaders
* Manejo de errores
* Empty states
* Diseño responsive
* Animaciones suaves

---

## 📦 Build

```bash
npm run build
```
