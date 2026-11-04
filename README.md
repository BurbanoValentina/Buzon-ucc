# Formulario de Quejas Académicas

## Prerrequisitos

- Java 21
- Maven 3.9+
- Node.js y npm
- Docker para CI y `compose.yaml` local

## Configuración

Copie `infra/.env.example` a un archivo `.env` local y complete los valores
fuera del repositorio. Nunca escriba credenciales, tokens ni claves en el
código o la documentación.

## Ejecución

```powershell
cd backend
mvn spring-boot:run
cd ..\frontend
npm install
npm run test
```

La IA usa `AI_PROVIDER=simulation` para desarrollo. Google Drive, Telegram y
otros servicios externos no deben considerarse conectados sin configuración y
una validación ejecutada.
