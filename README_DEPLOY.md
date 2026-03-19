# 🚀 Despliegue de SoulScript en Clouflare Pages

## 📂 Estructura de Archivos
Asegúrate de tener esta estructura en tu carpeta local antes de subir:
```
SoulScript_Production/
├── index.html          (Frontend)
├── functions/
│   └── humanize.js     (Backend Serverless)
└── README_DEPLOY.md    (Estas instrucciones)
```

## 🛠️ Pasos para Desplegar

### 1. Subir a Clouflare Pages
1. Ve a [Clouflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Haz clic en **Create Application** > **Pages**.
3. Elige **Direct Upload** (si no usas Git) o conecta tu repositorio de GitHub.
4. Sube la carpeta `SoulScript_Production` (o los archivos individuales).
   - Si usas **Direct Upload**: Arrastra la carpeta completa o un ZIP con los archivos.
   - Si usas **Git**: Asegúrate de que la carpeta `functions` esté en la raíz del repositorio.
5. En **Build Settings**:
   - **Build command:** (Déjalo en blanco)
   - **Build output directory:** (Déjalo en blanco)
   - **Framework preset:** None
6. Haz clic en **Save and Deploy**.

### 2. Configurar Variables de Entorno (CRUCIAL)
Una vez desplegado (o antes de desplegar):
1. Ve a la pestaña **Settings** > **Environment Variables**.
2. Haz clic en **Add Variable** para cada una:
   - **Variable Name:** `NVIDIA_API_KEY`
     - **Value:** `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`
     - **Environment:** `Production`
   - **Variable Name:** `MODEL_NAME`
     - **Value:** `abacusai/dracarys-llama-3.1-70b-instruct`
     - **Environment:** `Production`
3. Haz clic en **Save**.
4. **Re-despliega** la aplicación (si ya lo habías hecho) para que las variables se apliquen:
   - Ve a **Deployments** > Haz clic en los tres puntos del último despliegue > **Retry deployment**.

### 3. Conectar tu Dominio Personalizado
1. Ve a la pestaña **Custom Domains** en tu proyecto de Pages.
2. Haz clic en **Add Custom Domain**.
3. Escribe: `soul.tri-colors.com` (o el subdominio que hayas creado).
4. Clouflare detectará automáticamente el registro DNS que ya creaste.
5. Haz clic en **Confirm** o **Add Domain**.
6. Espera unos minutos a que se propague el SSL (la nube naranja en DNS debe estar activa).

## ✅ Verificación
1. Abre `https://soul.tri-colors.com` en tu navegador.
2. Pega un texto robótico.
3. Haz clic en **Humanizar**.
4. ¡Deberías ver el resultado transformado en segundos!

## 🛡️ Seguridad
- Tu API Key de NVIDIA **nunca** se expone en el frontend. Se ejecuta solo en el servidor de Clouflare.
- Solo el endpoint `/humanize` está expuesto.

## 🚨 Solución de Problemas
- **Error 500:** Verifica que las variables de entorno `NVIDIA_API_KEY` y `MODEL_NAME` estén configuradas correctamente en Clouflare.
- **Error 401:** La API Key es inválida o ha expirado.
- **Texto no cambia:** Verifica que el System Prompt en `humanize.js` esté bien formado.

---
**SoulScript | Powered by NVIDIA Dracarys & Tricolors Intelligence**
