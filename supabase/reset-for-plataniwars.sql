-- ============================================================
-- PlataniWars: Reset del Supabase compartido con Admin Ops
-- Ejecutar este script para configurar el juego de Estadística
-- USA EL MISMO SCHEMA del simulador empresarial original
-- Solo cambia los datos iniciales (empresas, áreas)
-- ============================================================

-- Limpiar datos existentes
DELETE FROM events WHERE TRUE;
DELETE FROM decisions WHERE TRUE;
DELETE FROM students WHERE TRUE;

-- Actualizar empresas para PlataniWars
UPDATE companies SET
  name = 'Don Pacho',
  emoji = '🍌',
  slogan = 'El sabor de siempre, con datos de verdad',
  total_cash = 500000000,
  total_revenue = 0,
  total_costs = 0,
  bsc_financial = 50,
  bsc_customer = 50,
  bsc_internal = 50,
  bsc_learning = 50
WHERE id = 1;

UPDATE companies SET
  name = 'PlataniMax',
  emoji = '🔥',
  slogan = 'Innovación con crunch',
  total_cash = 500000000,
  total_revenue = 0,
  total_costs = 0,
  bsc_financial = 50,
  bsc_customer = 50,
  bsc_internal = 50,
  bsc_learning = 50
WHERE id = 2;

-- Limpiar áreas existentes e insertar las de PlataniWars
DELETE FROM areas WHERE TRUE;

INSERT INTO areas (company_id, area_code, area_name, icon, budget) VALUES
  -- Empresa 1: Don Pacho
  (1, 'operations', 'Operaciones',      '🏭', 120000000),
  (1, 'finance',    'Finanzas',          '💰', 100000000),
  (1, 'marketing',  'Marketing',         '📢', 100000000),
  (1, 'hr',         'Talento Humano',    '👥', 80000000),
  (1, 'analyst',    'Análisis de Datos', '📊', 100000000),
  -- Empresa 2: PlataniMax
  (2, 'operations', 'Operaciones',      '🏭', 120000000),
  (2, 'finance',    'Finanzas',          '💰', 100000000),
  (2, 'marketing',  'Marketing',         '📢', 100000000),
  (2, 'hr',         'Talento Humano',    '👥', 80000000),
  (2, 'analyst',    'Análisis de Datos', '📊', 100000000);

-- Reset game state
UPDATE game_state SET value = 'lobby' WHERE key = 'status';
UPDATE game_state SET value = '0' WHERE key = 'day';
UPDATE game_state SET value = '' WHERE key = 'day_started_at';
UPDATE game_state SET value = '' WHERE key = 'active_event';

-- Nota: Si es la primera vez, primero ejecutar el schema.sql
-- del simulador-empresarial de Admin Ops 2 para crear las tablas.
-- Este script solo cambia los DATOS, no el schema.
