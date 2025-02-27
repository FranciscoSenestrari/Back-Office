# Usar una imagen base de Node.js
FROM node:18-alpine

# Configurar el directorio de trabajo
WORKDIR /app

# Clonar el repositorio desde GitHub
RUN apk add --no-cache git && \
    git clone --depth=1 https://github.com/FranciscoSenestrari/template-react.git . && \
    rm -rf .git

# Instalar dependencias
RUN npm install

# Exponer el puerto que utiliza Vite (por defecto 5173)
EXPOSE 5173

# Comando para iniciar Vite en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
