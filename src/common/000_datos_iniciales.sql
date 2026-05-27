INSERT INTO countries(name) VALUES
('Argentina');

INSERT INTO provinces (name, country_id) VALUES
-- Argentina
('Buenos Aires', 1),
('CABA', 1),
('Córdoba', 1),
('Santa Fe', 1),
('Mendoza', 1),
('Entre Ríos', 1),
('Tucumán', 1),
('Salta', 1),
('Misiones', 1),
('Neuquén', 1);

INSERT INTO cities (name, province_id) VALUES
-- Argentina - Buenos Aires
('La Plata', 1),
('Mar del Plata', 1),
('Quilmes', 1),
('Bahía Blanca', 1),
-- Argentina - CABA
('Ciudad Autónoma de Buenos Aires', 2),
-- Argentina - Córdoba
('Córdoba Capital', 3),
('Villa Carlos Paz', 3),
('Río Cuarto', 3),
-- Argentina - Santa Fe
('Rosario', 4),
('Santa Fe Capital', 4),
-- Argentina - Mendoza
('Mendoza Capital', 5),
('San Rafael', 5),
-- Argentina - Entre Ríos
('Paraná', 6),
('Concordia', 6),
-- Argentina - Tucumán
('San Miguel de Tucumán', 7),
-- Argentina - Salta
('Salta Capital', 8),
-- Argentina - Misiones
('Posadas', 9),
-- Argentina - Neuquén
('Neuquén Capital', 10);

INSERT INTO sports (name) VALUES
('futbol'),
('basquet'),
('tenis'),
('padel');

INSERT INTO grounds (name) VALUES
('Césped Natural'),
('Césped Sintético'),
('Cemento'),
('Madera'),
('Arcilla'),
('Caucho'),
('Grava'),
('Arena'),
('Turf');

INSERT INTO roles (name) VALUES
('ADMIN'),
('CLUB_OWNER'),
('CLUB_EMPLOYEE'),
('USER');

INSERT INTO permissions (name) VALUES
-- Reservas
('CREATE_RESERVATION'),
('READ_RESERVATION'),
('UPDATE_RESERVATION'),
('CANCEL_RESERVATION'),
('VIEW_CLUB_RESERVATIONS'),
('VIEW_ALL_RESERVATIONS'),
-- Clubes
('CREATE_CLUB'),
('READ_CLUB'),
('UPDATE_CLUB'),
('DELETE_CLUB'),
('CONFIGURE_CLUB'),
('VIEW_ALL_CLUBS'),
-- Canchas
('CREATE_COURT'),
('READ_COURT'),
('UPDATE_COURT'),
('DELETE_COURT'),
-- Usuarios
('CREATE_USER'),
('READ_USER'),
('UPDATE_USER'),
('DELETE_USER'),
('VIEW_ALL_USERS'),
('MANAGE_CLUB_EMPLOYEES'),
-- Reportes y pagos
('VIEW_REPORTS'),
('VIEW_SYSTEM_STATS'),
('GENERATE_PAY'),
('REFUND_PAY');

INSERT INTO role_permissions ("rolesId", "permissionsId") VALUES
-- ADMIN - Todos los permisos (1-25)
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), 
(1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18), (1, 19), 
(1, 20), (1, 21), (1, 22), (1, 23), (1, 24), (1, 25), (1, 26),

-- CLUB_OWNER - Gestión completa de su club
(2, 1),  -- CREATE_RESERVATION
(2, 2),  -- READ_RESERVATION
(2, 3),  -- UPDATE_RESERVATION
(2, 4),  -- CANCEL_RESERVATION
(2, 5),  -- VIEW_CLUB_RESERVATIONS
(2, 7),  -- CREATE_CLUB
(2, 8),  -- READ_CLUB
(2, 9),  -- UPDATE_CLUB
(2, 11), -- CONFIGURE_CLUB
(2, 13), -- CREATE_COURT
(2, 14), -- READ_COURT
(2, 15), -- UPDATE_COURT
(2, 16), -- DELETE_COURT
(2, 22), -- MANAGE_CLUB_EMPLOYEES
(2, 23), -- VIEW_REPORTS
(2, 25), -- GENERATE_PAY
(2, 26), -- REFUND_PAY

-- CLUB_EMPLOYEE - Operaciones diarias del club
(3, 1),  -- CREATE_RESERVATION
(3, 2),  -- READ_RESERVATION
(3, 3),  -- UPDATE_RESERVATION
(3, 5),  -- VIEW_CLUB_RESERVATIONS
(3, 14), -- READ_COURT
(3, 25), -- GENERATE_PAY
(3, 26), -- REFUND_PAY

-- USER - Usuario final
(4, 1),  -- CREATE_RESERVATION
(4, 2),  -- READ_RESERVATION
(4, 4),  -- CANCEL_RESERVATION
(4, 8),  -- READ_CLUB
(4, 14), -- READ_COURT
(4, 25); -- GENERATE_PAY

INSERT INTO reservations_status (value) VALUES
('PENDIENTE'),
('CONFIRMADA'),
('CANCELADA'),
('FINALIZADA'),
('NO_PRESENTADO'),
('REEMBOLSADA');

INSERT INTO users (name, surname, birth_date, phone_number, email, password, city_id, role_id, created_at) VALUES
('Juan Carlos', 'Pérez', '1985-03-15', '+5491123456789', 'juan.perez@email.com', '123456', 1, 1, CURRENT_TIMESTAMP),
('María Elena', 'González', '1990-07-22', '+5491134567890', 'maria.gonzalez@email.com', '123456', 2, 4, CURRENT_TIMESTAMP),
('Roberto', 'Martínez', '1988-11-08', '+5491145678901', 'roberto.martinez@email.com', '123456', 3, 4, CURRENT_TIMESTAMP),
('Ana Lucía', 'Fernández', '1992-05-14', '+5491156789012', 'ana.fernandez@email.com', '123456', 4, 4, CURRENT_TIMESTAMP),
('Carlos Alberto', 'López', '1987-09-30', '+5491167890123', 'carlos.lopez@email.com', '123456', 5, 4, CURRENT_TIMESTAMP),
('Diego', 'Rodríguez', '1995-12-03', '+5491178901234', 'diego.rodriguez@email.com', '123456', 6, 4, CURRENT_TIMESTAMP),
('Sandra', 'Morales', '1983-08-25', '+5491189012345', 'sandra.morales@email.com', '123456', 7, 4, CURRENT_TIMESTAMP),
('Super', 'Admin', '1980-01-01', '+5491112345678', 'admin@clubes.com', '123456', 8, 1, CURRENT_TIMESTAMP),
-- Usuarios adicionales para owners
('Agustín', 'Tapia', '1975-01-01', '+549100000001', 'owner.vialibre@example.com', '123456', 1, 2, CURRENT_TIMESTAMP),
('Arturo', 'Coello', '1980-02-02', '+549100000002', 'owner.grandslam@example.com', '123456', 2, 2, CURRENT_TIMESTAMP),
('Pablo', 'Galdames', '1978-03-15', '+549100000003', 'owner.padelvilla@example.com', '123456', 3, 2, CURRENT_TIMESTAMP),
('Fernando', 'Belasteguín', '1979-04-20', '+549100000004', 'owner.lagran7@example.com', '123456', 4, 2, CURRENT_TIMESTAMP),
('Martín', 'Di Nenno', '1982-05-10', '+549100000005', 'owner.elprado@example.com', '123456', 5, 2, CURRENT_TIMESTAMP),
('Alejandro', 'Galán', '1977-06-25', '+549100000006', 'owner.sportclub@example.com', '123456', 6, 2, CURRENT_TIMESTAMP),
('Franco', 'Stupaczuk', '1981-07-30', '+549100000007', 'owner.bancocordoba@example.com', '123456', 7, 2, CURRENT_TIMESTAMP),
('Juan', 'Lebron', '1983-08-15', '+549100000008', 'owner.newellsclub@example.com', '123456', 1, 2, CURRENT_TIMESTAMP),
('Paquito', 'Navarro', '1976-09-20', '+549100000009', 'owner.racquetcenter@example.com', '123456', 2, 2, CURRENT_TIMESTAMP),
('Luciano', 'Capra', '1979-10-11', '+549100000010', 'owner.tennishouse@example.com', '123456', 3, 2, CURRENT_TIMESTAMP),
('Sanyo', 'Gutiérrez', '1984-11-05', '+549100000011', 'owner.futbolclub@example.com', '123456', 4, 2, CURRENT_TIMESTAMP),
('Maxi', 'Sánchez', '1978-12-22', '+549100000012', 'owner.arenaclub@example.com', '123456', 5, 2, CURRENT_TIMESTAMP),
('Juan', 'Tello', '1981-01-30', '+549100000013', 'owner.platinumpadel@example.com', '123456', 6, 2, CURRENT_TIMESTAMP),
('Alejandra', 'Salazar', '1985-02-14', '+549100000014', 'owner.goldenclub@example.com', '123456', 7, 2, CURRENT_TIMESTAMP),
('Gemma', 'Triay', '1982-03-08', '+549100000015', 'owner.victoryclub@example.com', '123456', 1, 2, CURRENT_TIMESTAMP),
('Miguel', 'Lamperti', '1977-04-12', '+549100000016', 'owner.riverclub@example.com', '123456', 2, 2, CURRENT_TIMESTAMP),
('Matías', 'Marina', '1980-05-18', '+549100000017', 'owner.bocacenter@example.com', '123456', 3, 2, CURRENT_TIMESTAMP),
('Sebastián', 'Nerone', '1979-06-24', '+549100000018', 'owner.universidad@example.com', '123456', 4, 2, CURRENT_TIMESTAMP),
('Carolina', 'Navarro', '1983-07-19', '+549100000019', 'owner.velezcomplex@example.com', '123456', 5, 2, CURRENT_TIMESTAMP),
('Paula', 'Josemaría', '1981-08-21', '+549100000020', 'owner.racingclub@example.com', '123456', 6, 2, CURRENT_TIMESTAMP);

-- Owners table (nueva estructura separada)
INSERT INTO owners (user_id) VALUES
(9),   -- Agustín Tapia
(10),  -- Arturo Coello
(11),  -- Pablo Galdames
(12),  -- Fernando Belasteguín
(13),  -- Martín Di Nenno
(14),  -- Alejandro Galán
(15),  -- Franco Stupaczuk
(16),  -- Juan Lebron
(17),  -- Paquito Navarro
(18),  -- Luciano Capra
(19),  -- Sanyo Gutiérrez
(20),  -- Maxi Sánchez
(21),  -- Juan Tello
(22),  -- Alejandra Salazar
(23),  -- Gemma Triay
(24),  -- Miguel Lamperti
(25),  -- Matías Marina
(26),  -- Sebastián Nerone
(27),  -- Carolina Navarro
(28);  -- Paula Josemaría

INSERT INTO club (name, address, owner_id, city_id, is_active, created_at, updated_at) VALUES
('Via Libre Padel Center', 'Av. Rivadavia 1234', 1, 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Grand Slam', 'Calle 5 No. 456', 2, 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Padel Villa', 'Av. Principal 789', 3, 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('La Gran 7', 'Ruta 9 Km 25', 4, 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('El Prado Fútbol', 'Av. San Martín 2567', 5, 5, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sport Club', 'Calle 10 No. 1890', 6, 6, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Club Banco Córdoba', 'Av. Colón 3456', 7, 7, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Newells Padel Club', 'Calle Mitre 4567', 8, 8, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Racquet Center', 'Av. del Libertador 5678', 9, 9, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Tennis House Rosario', 'Calle Córdoba 6789', 10, 10, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Fútbol Club Central', 'Av. 9 de Julio 7890', 11, 11, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Arena Sports Complex', 'Ruta 2 Km 15', 12, 12, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Platinum Padel', 'Calle Florida 8901', 13, 13, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Golden Club Deportivo', 'Av. Santa Fe 9012', 14, 14, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Victory Sports Center', 'Calle Lavalle 1023', 15, 15, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Club Atlético River', 'Av. Figueroa Alcorta 2134', 16, 16, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Boca Sports Center', 'Calle Brandsen 3245', 17, 17, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Club Universidad', 'Av. Las Heras 4356', 18, 18, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Vélez Sports Complex', 'Calle Juan B. Justo 5467', 19, 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Racing Athletic Club', 'Av. Belgrano 6578', 20, 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Imágenes rotando las 4 URLs proporcionadas
INSERT INTO images (image_url, file_name, storage_path, uploaded_by, club_id, is_primary) VALUES
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Futbol/4/LaGran7-1.jpg', 'vialibre3.jpg', 'images-seminario/Futbol/4/LaGran7-1.jpg', 1, 1, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Padel/1/ViaLibre2.jpg', 'vialibre2.jpg', 'images-seminario/Padel/1/ViaLibre2.jpg', 2, 2, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Tenis/6/SportClub1.jpg', 'vialibre1.jpg', 'images-seminario/Tenis/6/SportClub1.jpg', 3, 3, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Padel/1/ViaLibre2.jpg', 'vialibre2-2.jpg', 'images-seminario/Padel/1/ViaLibre2.jpg', 4, 4, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Futbol/4/LaGran7-2.jpg', 'vialibre3-2.jpg', 'images-seminario/Futbol/4/LaGran7-2.jpg', 5, 5, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Padel/1/ViaLibre2.jpg', 'vialibre2-3.jpg', 'images-seminario/Padel/1/ViaLibre2.jpg', 6, 6, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Tenis/6/SportClub2.jpg', 'vialibre1-2.jpg', 'images-seminario/Tenis/6/SportClub2.jpg', 7, 7, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Padel/1/ViaLibre2.jpg', 'vialibre2-4.jpg', 'images-seminario/Padel/1/ViaLibre2.jpg', 8, 8, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Futbol/4/LaGran7-3.jpg', 'vialibre3-3.jpg', 'images-seminario/Futbol/4/LaGran7-3.jpg', 1, 9, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Padel/1/ViaLibre2.jpg', 'vialibre2-5.jpg', 'images-seminario/Padel/1/ViaLibre2.jpg', 2, 10, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Tenis/6/SportClub3.jpg', 'vialibre1-3.jpg', 'images-seminario/Tenis/6/SportClub3.jpg', 3, 11, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Padel/1/ViaLibre2.jpg', 'vialibre2-6.jpg', 'images-seminario/Padel/1/ViaLibre2.jpg', 4, 12, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Futbol/5/PradoFutbol1.jpg', 'vialibre3-4.jpg', 'images-seminario/Futbol/5/PradoFutbol1.jpg', 5, 13, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Padel/1/ViaLibre2.jpg', 'vialibre2-7.jpg', 'images-seminario/Padel/1/ViaLibre2.jpg', 6, 14, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Padel/3/PadelVilla1.webp', 'vialibre1-4.jpg', 'images-seminario/Padel/3/PadelVilla1.webp', 7, 15, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Padel/1/ViaLibre2.jpg', 'vialibre2-8.jpg', 'images-seminario/Padel/1/ViaLibre2.jpg', 8, 16, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Futbol/5/PradoFutbol2.jpg', 'vialibre3-5.jpg', 'images-seminario/Futbol/5/PradoFutbol2.jpg', 1, 17, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Padel/1/ViaLibre2.jpg', 'vialibre2-9.jpg', 'images-seminario/Padel/1/ViaLibre2.jpg', 2, 18, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Padel/3/PadelVilla2.webp', 'vialibre1-5.jpg', 'images-seminario/Padel/3/PadelVilla2.webp', 3, 19, true),
('https://hodcwckiqgtejtxpdyzm.supabase.co/storage/v1/object/public/images-seminario/Padel/1/ViaLibre2.jpg', 'vialibre2-10.jpg', 'images-seminario/Padel/1/ViaLibre2.jpg', 4, 20, true);

INSERT INTO regular_availabilities_club (day_of_week, club_id) VALUES
(1, 1), -- Lunes
(2, 1), -- Martes
(3, 1), -- Miércoles
(4, 1), -- Jueves
(5, 1), -- Viernes
(6, 1), -- Sábado
(0, 1), -- Domingo
(1, 13), -- Lunes
(2, 13), -- Martes
(3, 13), -- Miércoles
(4, 13), -- Jueves
(5, 2), -- Viernes
(6, 2), -- Sábado
(0, 2), -- Domingo
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20);

-- Time ranges ajustados a formato 8-12, 16-20, etc.
INSERT INTO time_ranges_club (start_time, end_time, regular_availability_club_id) VALUES
-- Lunes
('08:00', '12:00', 1),
('16:00', '20:00', 1),
-- Martes
('08:00', '22:00', 2),
-- Miércoles
('08:00', '12:00', 3),
('14:00', '18:00', 3),
-- Jueves
('10:00', '14:00', 4),
('16:00', '22:00', 4),
-- Viernes
('08:00', '22:00', 5),
-- Sábado
('08:00', '20:00', 6),
-- Domingo
('10:00', '18:00', 7),

-- Lunes
('08:00', '12:00', 8),
('16:00', '20:00', 8),
-- Martes
('08:00', '22:00', 9),
-- Miércoles
('08:00', '12:00', 10),
('14:00', '18:00', 10),
-- Jueves
('10:00', '14:00', 11),
('16:00', '22:00', 11),
-- Viernes
('08:00', '22:00', 12),
-- Sábado
('08:00', '20:00', 13),
-- Domingo
('10:00', '18:00', 14),
('08:00', '20:00', 15),
('08:00', '20:00', 16),
('08:00', '20:00', 17),
('08:00', '20:00', 18),
('08:00', '20:00', 19),
('08:00', '20:00', 20),
('08:00', '20:00', 21),
('08:00', '20:00', 22),
('08:00', '20:00', 23),
('08:00', '20:00', 24),
('08:00', '20:00', 25),
('08:00', '20:00', 26),
('08:00', '20:00', 27),
('08:00', '20:00', 28),
('08:00', '20:00', 29),
('08:00', '20:00', 30),
('08:00', '20:00', 31);

-- Courts expandidos - Muchas más canchas distribuidas entre los clubes
INSERT INTO courts (number, price, is_lightness, is_covered, description, sport_id, ground_id, club_id, is_active) VALUES
-- Via Libre Padel Center (Club 1)
('1', 12000.00, true, false, 'Cancha de fútbol 11 con césped natural', 1, 1, 1, true),
('2', 8000.00, true, true, 'Cancha de fútbol 5 techada con césped sintético', 1, 2, 1, true),
('3', 2800.00, true, true, 'Cancha de pádel techada profesional', 4, 8, 1, true),
('4', 3200.00, true, false, 'Cancha de pádel exterior premium', 4, 2, 1, true),

-- Grand Slam (Club 2)
('1', 9500.00, true, false, 'Cancha de fútbol 7 con césped sintético', 1, 2, 2, true),
('2', 3500.00, true, false, 'Cancha de tenis con superficie de arcilla', 3, 5, 2, true),
('3', 4000.00, true, true, 'Cancha de tenis techada profesional', 3, 3, 2, true),

-- Padel Villa (Club 3)
('1', 5000.00, true, true, 'Cancha de baloncesto cubierta con piso de madera', 2, 4, 3, true),
('2', 4200.00, true, false, 'Cancha de baloncesto exterior con cemento', 2, 3, 3, true),
('3', 2900.00, true, true, 'Cancha de pádel con iluminación LED', 4, 2, 3, true),

-- La Gran 7 (Club 4)
('1', 3000.00, true, true, 'Cancha de pádel cubierta standard', 4, 8, 4, true),
('2', 3600.00, true, true, 'Cancha de pádel premium con césped sintético', 4, 2, 4, true),
('3', 4500.00, true, false, 'Cancha de tenis outdoor arcilla', 3, 5, 4, true),

-- El Prado Fútbol (Club 5)
('1', 11000.00, true, false, 'Cancha de fútbol 11 césped natural premium', 1, 1, 5, true),
('2', 7500.00, true, true, 'Cancha de fútbol 5 indoor césped sintético', 1, 2, 5, true),
('3', 8500.00, true, false, 'Cancha de fútbol 7 césped natural', 1, 1, 5, true),

-- Sport Club (Club 6)
('1', 5200.00, true, true, 'Cancha de baloncesto profesional techada', 2, 4, 6, true),
('2', 2700.00, true, true, 'Cancha de pádel techada estándar', 4, 2, 6, true),
('3', 3100.00, true, true, 'Cancha de pádel con vidrio panorámico', 4, 8, 6, true),

-- Club Banco Córdoba (Club 7)
('1', 3800.00, true, false, 'Cancha de tenis cemento profesional', 3, 3, 7, true),
('2', 4200.00, true, true, 'Cancha de tenis cubierta con arcilla', 3, 5, 7, true),
('3', 9000.00, true, false, 'Cancha de fútbol 7 sintético premium', 1, 2, 7, true),

-- Newells Padel Club (Club 8)
('1', 2600.00, true, true, 'Cancha de pádel techada económica', 4, 2, 8, true),
('2', 3000.00, true, true, 'Cancha de pádel techada standard', 4, 8, 8, true),
('3', 3400.00, true, true, 'Cancha de pádel premium iluminación LED', 4, 2, 8, true),
('4', 3800.00, true, false, 'Cancha de pádel exterior VIP', 4, 2, 8, true),

-- Racquet Center (Club 9)
('1', 3900.00, true, false, 'Cancha de tenis arcilla profesional', 3, 5, 9, true),
('2', 4300.00, true, true, 'Cancha de tenis indoor cemento', 3, 3, 9, true),
('3', 3700.00, true, false, 'Cancha de tenis outdoor arcilla', 3, 5, 9, true),

-- Tennis House Rosario (Club 10)
('1', 4100.00, true, true, 'Cancha de tenis cubierta cemento', 3, 3, 10, true),
('2', 3500.00, true, false, 'Cancha de tenis exterior arcilla roja', 3, 5, 10, true),
('3', 7800.00, true, false, 'Cancha de fútbol césped natural', 1, 1, 10, true),

-- Fútbol Club Central (Club 11)
('1', 12500.00, true, false, 'Cancha de fútbol 11 profesional césped natural', 1, 1, 11, true),
('2', 8200.00, true, true, 'Cancha de fútbol 5 techada premium', 1, 2, 11, true),
('3', 9200.00, true, false, 'Cancha de fútbol 7 césped sintético', 1, 2, 11, true),

-- Arena Sports Complex (Club 12)
('1', 5500.00, true, true, 'Cancha de baloncesto cubierta profesional', 2, 4, 12, true),
('2', 2800.00, true, true, 'Cancha de pádel techada', 4, 2, 12, true),
('3', 3200.00, true, true, 'Cancha de pádel premium techada', 4, 8, 12, true),
('4', 4000.00, true, false, 'Cancha de tenis outdoor', 3, 3, 12, true),

-- Platinum Padel (Club 13)
('1', 3300.00, true, true, 'Cancha de pádel platinum standard', 4, 2, 13, true),
('2', 3700.00, true, true, 'Cancha de pádel platinum premium', 4, 8, 13, true),
('3', 4100.00, true, true, 'Cancha de pádel platinum VIP', 4, 2, 13, true),

-- Golden Club Deportivo (Club 14)
('1', 8500.00, true, false, 'Cancha de fútbol 5 césped sintético premium', 1, 2, 14, true),
('2', 4500.00, true, false, 'Cancha de tenis arcilla profesional', 3, 5, 14, true),
('3', 3100.00, true, true, 'Cancha de pádel techada standard', 4, 2, 14, true),

-- Victory Sports Center (Club 15)
('1', 5800.00, true, true, 'Cancha de baloncesto indoor madera', 2, 4, 15, true),
('2', 3300.00, true, true, 'Cancha de pádel techada LED', 4, 2, 15, true),
('3', 4200.00, true, false, 'Cancha de tenis cemento outdoor', 3, 3, 15, true),

-- Club Atlético River (Club 16)
('1', 13000.00, true, false, 'Cancha de fútbol 11 profesional', 1, 1, 16, true),
('2', 8800.00, true, true, 'Cancha de fútbol 5 techada premium', 1, 2, 16, true),
('3', 3400.00, true, true, 'Cancha de pádel cubierta', 4, 8, 16, true),

-- Boca Sports Center (Club 17)
('1', 9200.00, true, false, 'Cancha de fútbol 7 sintético', 1, 2, 17, true),
('2', 3200.00, true, true, 'Cancha de pádel techada standard', 4, 2, 17, true),
('3', 4400.00, true, false, 'Cancha de tenis outdoor arcilla', 3, 5, 17, true),

-- Club Universidad (Club 18)
('1', 6000.00, true, true, 'Cancha de baloncesto universitaria', 2, 4, 18, true),
('2', 3000.00, true, true, 'Cancha de pádel estudiantil', 4, 2, 18, true),
('3', 3800.00, true, false, 'Cancha de tenis universitaria', 3, 3, 18, true),

-- Vélez Sports Complex (Club 19)
('1', 8600.00, true, false, 'Cancha de fútbol 5 outdoor', 1, 2, 19, true),
('2', 3500.00, true, true, 'Cancha de pádel techada premium', 4, 8, 19, true),
('3', 4600.00, true, true, 'Cancha de tenis indoor cemento', 3, 3, 19, true),

-- Racing Athletic Club (Club 20)
('1', 12800.00, true, false, 'Cancha de fútbol 11 césped natural', 1, 1, 20, true),
('2', 3300.00, true, true, 'Cancha de pádel techada', 4, 2, 20, true),
('3', 4100.00, true, false, 'Cancha de tenis arcilla outdoor', 3, 5, 20, true);

INSERT INTO exceptions_availability (date_start, date_end, start_time, end_time, reason, court_id, club_id) VALUES
('2024-11-20', '2024-11-20', '14:00', '16:00', 'Mantenimiento programado', 1, NULL),
('2024-11-25', '2024-11-25', '08:00', '10:00', 'Evento especial del club', 2, NULL),
('2024-12-01', '2024-12-01', '09:00', '11:00', 'Torneo profesional', 3, NULL),
('2024-11-30', '2024-11-30', '15:00', '17:00', 'Reparación de instalaciones', 4, NULL);

-- RESERVAS 
INSERT INTO pays (mp_id, mp_init_point, mp_payment_method, mp_state, amount, currency, creation_date, approval_date) VALUES
-- Pagos completados
('pref_001', 'https://mercadopago.com/init/1', 'mercado_pago', 'approved', 12000.00, 'ARS', '2024-12-15 10:30:00', '2024-12-15 10:35:00'),
('pref_002', 'https://mercadopago.com/init/2', 'mercado_pago', 'approved', 2800.00, 'ARS', '2024-12-15 11:00:00', '2024-12-15 11:05:00'),
('pref_003', 'https://mercadopago.com/init/3', 'mercado_pago', 'approved', 8000.00, 'ARS', '2024-12-16 09:15:00', '2024-12-16 09:20:00'),
('pref_004', 'https://mercadopago.com/init/4', 'tarjeta_credito', 'approved', 3200.00, 'ARS', '2024-12-16 10:45:00', '2024-12-16 10:50:00'),
('pref_005', 'https://mercadopago.com/init/5', 'mercado_pago', 'approved', 9500.00, 'ARS', '2024-12-17 08:20:00', '2024-12-17 08:25:00'),
('pref_006', 'https://mercadopago.com/init/6', 'transferencia', 'approved', 3500.00, 'ARS', '2024-12-17 14:30:00', '2024-12-17 14:35:00'),
('pref_007', 'https://mercadopago.com/init/7', 'mercado_pago', 'approved', 4000.00, 'ARS', '2024-12-18 09:00:00', '2024-12-18 09:05:00'),
('pref_008', 'https://mercadopago.com/init/8', 'tarjeta_debito', 'approved', 5000.00, 'ARS', '2024-12-18 15:45:00', '2024-12-18 15:50:00'),
('pref_009', 'https://mercadopago.com/init/9', 'mercado_pago', 'approved', 4200.00, 'ARS', '2024-12-19 07:30:00', '2024-12-19 07:35:00'),
('pref_010', 'https://mercadopago.com/init/10', 'mercado_pago', 'approved', 2900.00, 'ARS', '2024-12-19 10:15:00', '2024-12-19 10:20:00'),
('pref_011', 'https://mercadopago.com/init/11', 'efectivo', 'approved', 3000.00, 'ARS', '2024-12-20 08:45:00', '2024-12-20 08:50:00'),
('pref_012', 'https://mercadopago.com/init/12', 'mercado_pago', 'approved', 3600.00, 'ARS', '2024-12-20 14:20:00', '2024-12-20 14:25:00'),
('pref_013', 'https://mercadopago.com/init/13', 'tarjeta_credito', 'approved', 4500.00, 'ARS', '2024-12-21 09:30:00', '2024-12-21 09:35:00'),
('pref_014', 'https://mercadopago.com/init/14', 'mercado_pago', 'approved', 11000.00, 'ARS', '2024-12-21 16:00:00', '2024-12-21 16:05:00'),
('pref_015', 'https://mercadopago.com/init/15', 'mercado_pago', 'approved', 7500.00, 'ARS', '2024-12-22 07:45:00', '2024-12-22 07:50:00'),
-- Pagos pendientes (approval_date NULL)
('pref_016', 'https://mercadopago.com/init/16', 'mercado_pago', 'pending', 8500.00, 'ARS', '2024-12-23 08:00:00', '2024-12-22 07:50:00'),
('pref_017', 'https://mercadopago.com/init/17', 'mercado_pago', 'pending', 5200.00, 'ARS', '2024-12-23 13:30:00', '2024-12-22 07:50:00'),
('pref_018', 'https://mercadopago.com/init/18', 'mercado_pago', 'pending', 2700.00, 'ARS', '2024-12-24 09:15:00', '2024-12-22 07:50:00'),
('pref_019', 'https://mercadopago.com/init/19', 'mercado_pago', 'pending', 3100.00, 'ARS', '2024-12-24 15:45:00', '2024-12-22 07:50:00'),
('pref_020', 'https://mercadopago.com/init/20', 'mercado_pago', 'pending', 3800.00, 'ARS', '2024-12-25 07:30:00', '2024-12-22 07:50:00'),
-- Pagos rechazados/cancelados
('pref_021', 'https://mercadopago.com/init/21', 'mercado_pago', 'rejected', 12000.00, 'ARS', '2024-12-14 09:00:00', '2024-12-22 07:50:00'),
('pref_022', 'https://mercadopago.com/init/22', 'mercado_pago', 'cancelled', 2800.00, 'ARS', '2024-12-13 13:30:00', '2024-12-22 07:50:00'),
('pref_023', 'https://mercadopago.com/init/23', 'mercado_pago', 'rejected', 4500.00, 'ARS', '2024-12-12 15:00:00', '2024-12-22 07:50:00'),
('pref_024', 'https://mercadopago.com/init/24', 'mercado_pago', 'cancelled', 3200.00, 'ARS', '2024-12-11 10:30:00', '2024-12-22 07:50:00'),
-- Pagos finalizados
('pref_025', 'https://mercadopago.com/init/25', 'mercado_pago', 'approved', 8000.00, 'ARS', '2024-12-09 20:00:00', '2024-12-09 20:05:00'),
('pref_026', 'https://mercadopago.com/init/26', 'tarjeta_credito', 'approved', 3200.00, 'ARS', '2024-12-10 18:30:00', '2024-12-10 18:35:00'),
('pref_027', 'https://mercadopago.com/init/27', 'mercado_pago', 'approved', 9500.00, 'ARS', '2024-12-10 22:15:00', '2024-12-10 22:20:00'),
('pref_028', 'https://mercadopago.com/init/28', 'transferencia', 'approved', 4000.00, 'ARS', '2024-12-11 19:45:00', '2024-12-11 19:50:00'),
('pref_029', 'https://mercadopago.com/init/29', 'mercado_pago', 'approved', 4200.00, 'ARS', '2024-12-12 17:30:00', '2024-12-12 17:35:00'),
-- No presentados
('pref_030', 'https://mercadopago.com/init/30', 'mercado_pago', 'approved', 5500.00, 'ARS', '2024-12-13 07:00:00', '2024-12-13 07:05:00'),
('pref_031', 'https://mercadopago.com/init/31', 'mercado_pago', 'approved', 6200.00, 'ARS', '2024-12-13 15:30:00', '2024-12-13 15:35:00');

-- RESERVAS 
INSERT INTO reservations (reservation_date, start_time, end_time, court_id, user_id, reservation_status, pay_id, total, created_at) VALUES
-- Reservas CONFIRMADAS
('2024-12-16', '08:00:00', '09:00:00', 1, 1, 2, 1, 12000.00, '2024-12-15 10:30:00'),
('2024-12-16', '10:00:00', '11:00:00', 3, 1, 2, 2, 2800.00, '2024-12-15 11:00:00'),
('2024-12-17', '16:00:00', '17:00:00', 2, 2, 2, 3, 8000.00, '2024-12-16 09:15:00'),
('2024-12-17', '18:00:00', '19:00:00', 4, 2, 2, 4, 3200.00, '2024-12-16 10:45:00'),
('2024-12-18', '09:00:00', '10:00:00', 5, 3, 2, 5, 9500.00, '2024-12-17 08:20:00'),
('2024-12-18', '14:00:00', '15:00:00', 7, 3, 2, 6, 3500.00, '2024-12-17 14:30:00'),
('2024-12-19', '10:00:00', '11:00:00', 8, 4, 2, 7, 4000.00, '2024-12-18 09:00:00'),
('2024-12-19', '16:00:00', '17:00:00', 10, 4, 2, 8, 5000.00, '2024-12-18 15:45:00'),
('2024-12-20', '08:00:00', '09:00:00', 12, 5, 2, 9, 4200.00, '2024-12-19 07:30:00'),
('2024-12-20', '11:00:00', '12:00:00', 15, 5, 2, 10, 2900.00, '2024-12-19 10:15:00'),
('2024-12-21', '09:00:00', '10:00:00', 18, 6, 2, 11, 3000.00, '2024-12-20 08:45:00'),
('2024-12-21', '15:00:00', '16:00:00', 20, 6, 2, 12, 3600.00, '2024-12-20 14:20:00'),
('2024-12-22', '10:00:00', '11:00:00', 22, 7, 2, 13, 4500.00, '2024-12-21 09:30:00'),
('2024-12-22', '17:00:00', '18:00:00', 25, 7, 2, 14, 11000.00, '2024-12-21 16:00:00'),
('2024-12-23', '08:00:00', '09:00:00', 28, 1, 2, 15, 7500.00, '2024-12-22 07:45:00'),
-- Reservas PENDIENTES
('2024-12-24', '09:00:00', '10:00:00', 30, 2, 1, 16, 8500.00, '2024-12-23 08:00:00'),
('2024-12-24', '14:00:00', '15:00:00', 32, 3, 1, 17, 5200.00, '2024-12-23 13:30:00'),
('2024-12-25', '10:00:00', '11:00:00', 35, 4, 1, 18, 2700.00, '2024-12-24 09:15:00'),
('2024-12-25', '16:00:00', '17:00:00', 38, 5, 1, 19, 3100.00, '2024-12-24 15:45:00'),
('2024-12-26', '08:00:00', '09:00:00', 40, 6, 1, 20, 3800.00, '2024-12-25 07:30:00'),
-- Reservas CANCELADAS
('2024-12-15', '10:00:00', '11:00:00', 1, 1, 3, 21, 12000.00, '2024-12-14 09:00:00'),
('2024-12-14', '14:00:00', '15:00:00', 3, 2, 3, 22, 2800.00, '2024-12-13 13:30:00'),
('2024-12-13', '16:00:00', '17:00:00', 5, 3, 3, 23, 4500.00, '2024-12-12 15:00:00'),
('2024-12-12', '09:00:00', '10:00:00', 7, 4, 3, 24, 3200.00, '2024-12-11 10:30:00'),
-- Reservas FINALIZADAS
('2024-12-10', '08:00:00', '09:00:00', 2, 1, 4, 25, 8000.00, '2024-12-09 20:00:00'),
('2024-12-11', '10:00:00', '11:00:00', 4, 2, 4, 26, 3200.00, '2024-12-10 18:30:00'),
('2024-12-11', '15:00:00', '16:00:00', 6, 3, 4, 27, 9500.00, '2024-12-10 22:15:00'),
('2024-12-12', '14:00:00', '15:00:00', 8, 4, 4, 28, 4000.00, '2024-12-11 19:45:00'),
('2024-12-13', '09:00:00', '10:00:00', 10, 5, 4, 29, 4200.00, '2024-12-12 17:30:00'),
-- Reservas NO_PRESENTADO
('2024-12-14', '08:00:00', '09:00:00', 12, 6, 5, 30, 5500.00, '2024-12-13 07:00:00'),
('2024-12-14', '16:00:00', '17:00:00', 15, 7, 5, 31, 6200.00, '2024-12-13 15:30:00');