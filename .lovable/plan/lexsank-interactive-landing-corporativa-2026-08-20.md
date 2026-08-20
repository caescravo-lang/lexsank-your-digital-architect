# LexSank Interactive — Landing corporativa

Landing de una sola página, estilo minimalista/tecnológico como las referencias adjuntas (composición, tarjetas suaves, mockups, pills de navegación), pero con la paleta corporativa LexSank: azul noche, cian eléctrico y blancos.

## Identidad visual

- Tipografía: Poppins (400/500/600/700), cargada desde el head de la app.
- Colores: fondo profundo `#0F172A` / `#1E293B`, acentos `#0EA5E9` y `#2563EB`, superficies `#F8FAFC` / `#FFFFFF`.
- Estilo: esquinas redondeadas amplias, degradados suaves cian→azul, tarjetas con sombra tenue, mucho espacio en blanco, microinteracciones discretas en hover.

## Secciones (en orden)

1. **Nav flotante** tipo pill: logo LexSank + enlaces (Inicio, Servicios, Casos, Proceso, Contacto) + botón "Hablemos".
2. **Hero**: badge "Innovación sin fronteras", titular "Soluciones tecnológicas avanzadas con impacto empresarial definitivo", subtítulo con el lema secundario, dos CTAs (WhatsApp / Ver casos), visual con mockup de producto generado.
3. **Franja de confianza**: San Cristóbal, Táchira — estándares internacionales; valores (robustez, transparencia, empatía comercial, escalabilidad, innovación).
4. **Servicios**: tres tarjetas — Software y apps a medida, Automatización con IA 24/7, Infraestructura y redes inteligentes; cada una con beneficios orientados a conversión.
5. **Casos de estudio**: tres bloques alternados con imagen — AERUM 360, Bucare Suite, Red LoRa Mesh, con resultado/impacto.
6. **Cómo trabajamos**: 4 pasos (Diagnóstico, Arquitectura, Desarrollo, Escalado), formato de tarjetas numeradas.
7. **CTA final + contacto**: bloque oscuro con eslogan principal, botón WhatsApp y correo directo (sin base de datos), ubicación.
8. **Footer** minimalista con logo, enlaces de sección y datos de contacto.

## Imágenes

Se generan 3–4 visuales de marca (mockup hero, recorrido 360, suite inmobiliaria, red mesh solar) en la paleta azul/cian. Las imágenes adjuntas se usan solo como referencia de estilo, no se incrustan.

## Detalles técnicos

- Se reescribe `src/routes/index.tsx` como la landing; componentes de sección en `src/components/`.
- Tokens de color y fuente definidos en `src/styles.css` (`@theme`), sin colores hardcodeados en componentes.
- Poppins vía `<link>` en `src/routes/__root.tsx`; favicon derivado del logo generado.
- SEO: title/description/og propios en la ruta index, H1 único, alt en imágenes, JSON-LD de Organization.
- Contacto sin backend: enlaces `wa.me` y `mailto:` (necesito el número de WhatsApp y el correo; mientras tanto quedan placeholders visibles para reemplazar).
