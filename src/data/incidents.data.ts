import { Incident } from "../models/incident.model";

export const incidents: Incident[] = [
  {
    id: 1,
    title: "Proyector sin señal",
    description: "El proyector no reconoce ningún computador conectado.",
    reporter: "Carlos Díaz",
    location: "Aula 201",
    priority: "MEDIUM",
    status: "OPEN",
    estimatedMinutes: 30,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Falla de red en laboratorio",
    description: "Los equipos del fondo no tienen acceso a la red local.",
    reporter: "María Pérez",
    location: "Laboratorio 102",
    priority: "HIGH",
    status: "OPEN",
    estimatedMinutes: 45,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Impresora sin tóner",
    description: "La impresora principal parpadea indicando falta de tóner.",
    reporter: "Andrés Rojas",
    location: "Biblioteca",
    priority: "LOW",
    status: "IN_PROGRESS",
    estimatedMinutes: 20,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Caída del sistema de notas",
    description: "La plataforma web arroja error 500 al intentar ingresar calificaciones.",
    reporter: "Sofía Castro",
    location: "Oficina Sistemas",
    priority: "CRITICAL",
    status: "OPEN",
    estimatedMinutes: 60,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    title: "Puerto de red roto",
    description: "El conector RJ45 de la pared se zafó por completo.",
    reporter: "Luis Mendoza",
    location: "Sala de Juntas",
    priority: "MEDIUM",
    status: "RESOLVED",
    estimatedMinutes: 25,
    createdAt: new Date().toISOString()
  }
];
