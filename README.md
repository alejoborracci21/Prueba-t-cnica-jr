# Aplicación de Gestión de Tareas FIFO

Proyecto técnico para desarrollar una aplicación de gestión de tareas FIFO utilizando **React**, **Firebase**, **TypeScript** y **Tailwind CSS**.

## Descripción General

Este proyecto implementa una aplicación web que permite gestionar una lista de tareas siguiendo un enfoque de "Primero en entrar, primero en salir" (FIFO), respetando reglas de negocio específicas y principios de diseño.

## Características

- **Autenticación de Usuarios:**  
  Sistema de inicio de sesión y registro seguro implementado con **Firebase Authentication**.
- **Almacenamiento de Datos:**
  - Las tareas se almacenan en **Firebase** para usuarios autenticados.
  - Los usuarios invitados gestionan las tareas localmente mediante **localStorage**.
- **Diseño Responsivo:**  
  Interfaz limpia y minimalista, diseñada con **Tailwind CSS**, adaptada para diferentes tamaños de pantalla.
- **Cumplimiento de Reglas de Negocio:**
  - No se permiten tareas duplicadas.
  - El botón "Añadir" se desactiva cuando el campo de texto está vacío.
  - Las tareas se procesan siguiendo un esquema FIFO.

## Tecnologías Utilizadas

- **React**: Para la construcción de la interfaz de usuario.
- **TypeScript**: Para garantizar la seguridad de tipos y mejorar la calidad del código.
- **Firebase**:
  - **Authentication**: Para gestionar el inicio de sesión y registro de usuarios.
  - **Firestore/Database**: Para persistir las tareas de los usuarios autenticados.
- **Tailwind CSS**: Para crear un diseño moderno y responsivo.

## Instalación y Configuración

1. Clonar el repositorio:

```bash
   git clone https://github.com/afordigital/fifo-challenge.git
```

2. Navegar al directorio del proyecto:

```bash
    cd fifo-challenge
```

3. Instalar las dependencias:

```bash
    npm install
```

## Reglas de Negocio

1. Evitar duplicados: No se permite añadir tareas repetidas.
2. Validación del campo de texto: El botón "Añadir" solo está habilitado si el campo de texto contiene información.
3. Gestión FIFO: Las tareas se procesan en el orden en que se añaden

## Contribución

Si deseas contribuir, por favor abre un issue o envía un pull request. Todas las contribuciones son bienvenidas.
