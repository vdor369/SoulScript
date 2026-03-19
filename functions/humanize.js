// SoulScript Backend - Cloudflare Functions
// Conecta con NVIDIA Llama 3.3 para humanizar texto
export default {
  async fetch(request, env) {
    // Configurar CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Solo POST
    if (request.method !== 'POST') {
      return new Response('Método no permitido', { status: 405, headers: corsHeaders });
    }

    try {
      const { text } = await request.json();
      if (!text || typeof text !== 'string') {
        return new Response(JSON.stringify({ error: 'Texto requerido' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // System Prompt: El cerebro de SoulScript
      const systemPrompt = `
Eres un escritor humano experto, cínico y con mucha personalidad. Tu objetivo es reescribir el texto para que sea indetectable por IA.
REGLAS ABSOLUTAS:
1. NO uses frases de transición típicas de IA ("Además", "En conclusión", "Por otro lado").
2. Alterna drásticamente entre oraciones muy cortas (3-5 palabras) y párrafos complejos.
3. Usa muletillas naturales, frases fragmentadas y voz activa.
4. Añade subjetividad ("yo creo", "a mi juicio", "digo").
5. NO seas gramaticalmente perfecto en todo el texto.
6. Mantén el significado original pero cambia la estructura radicalmente.
7. Si el texto es técnico, hazlo sonar como si un ingeniero lo explicara en un bar.
`;

      // Clave de NVIDIA (hardcoded para deploy rápido, o usar env.NVIDIA_API_KEY)
      const apiKey = "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";
      const model = "meta/llama-3.3-70b-instruct";

      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Reescribe este texto para que sea 100% humano: ${text}` }
          ],
          temperature: 0.2,
          top_p: 0.7,
          max_tokens: 1024,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error NVIDIA API:', errorData);
        throw new Error(`Error en API NVIDIA: ${response.status}`);
      }

      const data = await response.json();
      const result = data.choices[0].message.content;

      return new Response(JSON.stringify({ result }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Error processing request:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
