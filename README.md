# El Truco de las Brasileñas — app del reto de 21 días

App web instalable (PWA) en español: Inicio, Entrenamientos (con entrenamiento guiado y videos), Protocolos y Perfil. Sin dependencias ni paso de compilación.

## Ejecutar en local

```bash
node serve.mjs
```

Abre http://localhost:5174. **No abras `index.html` con doble clic**: los videos de YouTube dan "Error 153" y el service worker no funciona fuera de http(s).

## Publicar

Sube la carpeta tal cual a cualquier hosting estático con https (GitHub Pages, Netlify, Vercel, etc.).

## Dónde cambiar cosas

- `data.js`: textos, días del reto, ejercicios (código `yt` del video de YouTube) y protocolos.
- `styles.css`: colores y tema, en las variables del inicio del archivo.
- `sw.js`: sube `VERSION` cada vez que cambies archivos, para que el app instalado se actualice.
- `icons/`: ícono de la app (pendiente de reemplazar por el definitivo).

El progreso de cada persona se guarda solo en su dispositivo (localStorage).
