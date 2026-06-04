-- =============================================
-- DATOS INICIALES: Adira - Joyería Artesanal
-- =============================================
-- Usuarios por defecto (password: admin123)
INSERT INTO users (name, surname, usuario, password, role) VALUES
('Super', 'Admin', 'admin', '$2b$10$NM8Rkd2Fl0ntpnpKBf4v8.ASCh4/7clvLQ0nlkcKRfBoUmjA2J06i', 'SUPER_ADMIN'),
('Dueño', 'Tienda', 'dueno', '$2b$10$NM8Rkd2Fl0ntpnpKBf4v8.ASCh4/7clvLQ0nlkcKRfBoUmjA2J06i', 'OWNER');

-- Productos (imageUrl NULL, asignar después)
INSERT INTO products (name, description, price, category, material, "imageUrl", subcategory, "createdByUserId") VALUES

-- ===================== AROS =====================
('Argollas Tibby Doradas', 'Argollas decorativas bañadas en plata con diseño moderno y acabado brillante.', 15000.00, 'Aros', 'Bañados en Plata', NULL, NULL, 1),
('Argollas Madisson Doradas', 'Elegantes argollas doradas con estilo clásico y superficie pulida.', 12000.00, 'Aros', 'Bañados en Plata', NULL, NULL, 1),
('Argollas Yumi Doradas', 'Argollas bañadas en plata con diseño minimalista y detalles refinados.', 12000.00, 'Aros', 'Bañados en Plata', NULL, NULL, 1),
('Argollas Aurelia Doradas', 'Argollas doradas con forma estilizada y acabado luminoso.', 12000.00, 'Aros', 'Bañados en Plata', NULL, NULL, 1),
('Argollas Ribe', 'Argollas de acero blanco con diseño geométrico y surface satinada.', 12000.00, 'Aros', 'Acero Blanco', NULL, NULL, 1),
('Argollas Tueris Verde Claro', 'Argollas de acero blanco con detalles en tono verde claro.', 12000.00, 'Aros', 'Acero Blanco', NULL, NULL, 1),
('Aros Meliore Blano', 'Aros de acero blanco con forma orgánica y acabado brillante.', 12000.00, 'Aros', 'Acero Blanco', NULL, NULL, 1),
('Argollas Cerezas Cele', 'Divertidas argollas con diseño de cerezas en acero blanco.', 10000.00, 'Aros', 'Acero Blanco', NULL, NULL, 1),
('Aros en miniatura colibrí Rosado', 'Aros delicados con forma de colibrí en tono rosado.', 10000.00, 'Aros', 'Acero Blanco', NULL, NULL, 1),
('Argollas Flores Nick Negras', 'Argollas con diseño floral en acero blanco con detalles negros.', 10000.00, 'Aros', 'Acero Blanco', NULL, NULL, 1),
('Argollas Estrellas Milia Naranja', 'Argollas con diseño de estrellas en tono naranja y rojizo.', 8000.00, 'Aros', 'Acero Blanco', NULL, NULL, 1),
('Argollas Ostra Negras', 'Argollas de acero blanco con diseño de ostra y acabado oscuro.', 8000.00, 'Aros', 'Acero Blanco', NULL, NULL, 1),
('Argollas Vir Naranja', 'Argollas de acero blanco con detalles en naranja vibrante.', 8000.00, 'Aros', 'Acero Blanco', NULL, NULL, 1),
('Argollas Daria Doradas', 'Argollas pequeñas bañadas en plata con estilo delicado y brillante.', 8000.00, 'Aros', 'Bañados en Plata', NULL, NULL, 1),

-- ===================== ABRIDORES =====================
('Abridores Capibara', 'Abridor de plata 925 con diseño de capibara, divertido y original.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Pandita', 'Abridor de plata 925 con forma de panda, dulce y encantador.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Uvas Mini', 'Abridor de plata 925 con diseño de uvas en miniatura.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Cerezas Mini', 'Abridor de plata 925 con forma de cerezas pequeñas.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Vaquita Rosa', 'Abridor de plata 925 con diseño de vaquita en tono rosa.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Vaquita Roja', 'Abridor de plata 925 con diseño de vaquita en tono rojo.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Palta', 'Abridor de plata 925 con forma de palta, moderno y divertido.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Cristal Gota', 'Abridor de plata 925 con cristal en forma de gota.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Cristal Cuadradito', 'Abridor de plata 925 con cristal en forma cuadrada.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Cristal Triángulo', 'Abridor de plata 925 con cristal en forma triangular.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Cristal Corazón', 'Abridor de plata 925 con cristal en forma de corazón.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Cristal Estrella', 'Abridor de plata 925 con cristal en forma de estrella.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Perla Corazón', 'Abridor de plata 925 con perla y diseño de corazón.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Corazón Calado', 'Abridor de plata 925 con corazón calado, delicado y romántico.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),
('Abridores Perlas Plateadas', 'Abridor de plata 925 decorado con perlas plateadas.', 10000.00, 'Abridores', 'Plata925', NULL, NULL, 1),

-- ===================== ANILLOS =====================
('Anillo Novefa Blanco', 'Anillo de acero blanco con diseño moderno y acabado brillante.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Bauly Blanco', 'Anillo de acero blanco con líneas depuradas y estilo minimalista.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Norita', 'Anillo de acero blanco con diseño clásico y elegante.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Piedra Loutas', 'Anillo de acero blanco con piedra decorativa central.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Rehi Blanco', 'Anillo de acero blanco de líneas sencillas y acabado satinado.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Cira Colorido', 'Anillo de acero blanco con detalles de colores vibrantes.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Keyra', 'Anillo de acero blanco con diseño original y forma estilizada.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Midi lone', 'Anillo midi de acero blanco para combinar en capas.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Zaea', 'Anillo de acero blanco con textura y diseño contemporáneo.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Flipa Colorido', 'Anillo de acero blanco con detalles coloridos y divertidos.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Giratorio Girasol', 'Anillo de acero blanco con dije giratorio de girasol.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Alane Colorido', 'Anillo de acero blanco con incrustaciones de color.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Yin', 'Anillo de acero blanco con diseño simbólico y minimalista.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Piedras Corazón', 'Anillo de acero blanco con piedras en forma de corazón.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Uxia Colorido', 'Anillo de acero blanco con detalles multicolor.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Alfiler', 'Anillo de acero blanco con diseño de alfiler, original y único.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Tara Blanco', 'Anillo de acero blanco de estilo clásico y depurado.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Tara Colorido', 'Anillo de acero blanco con detalles de color.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Tivy Verde', 'Anillo de acero blanco con detalles en tono verde.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Nory Trébol', 'Anillo de acero blanco con diseño de trébol de la suerte.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Mariposa Zoe', 'Anillo de acero blanco con diseño de mariposa.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Indy', 'Anillo de acero blanco con forma geométrica y moderna.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Mariposa Blanco', 'Anillo de acero blanco con delicada mariposa.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Mariposa Gala', 'Anillo de acero blanco con mariposa decorativa.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Vives Colorido', 'Anillo de acero blanco con detalles de colores.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Colibrí Negro', 'Anillo de acero blanco con diseño de colibrí en negro.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Falange Lais', 'Anillo de acero blanco para falange, moderno y juvenil.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),
('Anillo Mariposa Irati Rojo', 'Anillo de acero blanco con mariposa en tono rojo.', 9000.00, 'Anillos', 'Acero Blanco', NULL, NULL, 1),

-- ===================== CADENAS =====================
('Collar Mariposa Cher', 'Collar de acero blanco con dije de mariposa y cadena fina.', 14000.00, 'Collares', 'Acero Blanco', NULL, NULL, 1),
('Collar Cerezas Dami', 'Collar de acero blanco con dije de cerezas.', 14000.00, 'Collares', 'Acero Blanco', NULL, NULL, 1),
('Collar Serpiente Piedritas Blancas', 'Collar de acero blanco con diseño de serpiente y piedritas blancas.', 12000.00, 'Collares', 'Acero Blanco', NULL, NULL, 1),
('Collar 5 Dijes Trébol Verde', 'Collar de acero blanco con cinco dijes de trébol verde.', 12000.00, 'Collares', 'Acero Blanco', NULL, NULL, 1),
('Collar Dije Mini Colibrí Naranja', 'Collar de acero blanco con dije mini colibrí en tono naranja.', 12000.00, 'Collares', 'Acero Blanco', NULL, NULL, 1),
('Collar Dije Frutilla', 'Collar de acero blanco con dije de frutilla.', 12000.00, 'Collares', 'Acero Blanco', NULL, NULL, 1),
('Collar Dije Trébol', 'Collar de acero blanco con dije de trébol.', 10000.00, 'Collares', 'Acero Blanco', NULL, NULL, 1),
('Collar Dije Inicial F', 'Collar de acero blanco con dije de inicial F.', 10000.00, 'Collares', 'Acero Blanco', NULL, NULL, 1),

-- ===================== PULSERAS =====================
('Esclava Cloe', 'Esclava de acero blanco con diseño ajustable y acabado brillante.', 9000.00, 'Pulseras', 'Acero Blanco', NULL, NULL, 1),
('Pulsera Dije Candado + Bolitas', 'Pulsera de acero blanco con dije de candado y bolitas decorativas.', 8000.00, 'Pulseras', 'Acero Blanco', NULL, NULL, 1),
('Pulsera Cola Ratón', 'Pulsera de acero blanco con diseño de cola de ratón.', 8000.00, 'Pulseras', 'Acero Blanco', NULL, NULL, 1),
('Pulsera con Dije Cereza', 'Pulsera de acero blanco con dije de cereza.', 7000.00, 'Pulseras', 'Acero Blanco', NULL, NULL, 1),
('Pulsera Mini Bolitas', 'Pulsera de acero blanco con mini bolitas, delicada y femenina.', 5000.00, 'Pulseras', 'Acero Blanco', NULL, NULL, 1);
