export interface Product {
  cod: string;
  nombre: string;
  cat: string;
  costo: number;
  precio: number;
  stock: number;
  stockMin: number;
  stockMax: number;
  reorden: number;
  rotacion: number;
  diasInv: number;
  categoriaVelocidad: 'ALTA ROTACIÓN' | 'MEDIA ROTACIÓN' | 'BAJA ROTACIÓN' | 'SIN MOVIMIENTO';
  abc: 'A' | 'B' | 'C';
}

export interface DepartmentSales {
  departamento: string;
  ventas: number;
  participacion: number;
  clientes: number;
  ticketPromedio: number;
}

export interface Supplier {
  cod: string;
  nombre: string;
  contacto: string;
  leadTimeNominal: number;
  leadTimeReal: number;
  diasRetraso: number;
  comprasTotales: number;
  entregasTotales: number;
  entregasTardias: number;
  cumplimientoPct: number;
  tasaDevolucionPct: number;
  estado: 'Óptimo' | 'Aceptable' | 'Crítico';
}

export const DEPARTAMENTOS_NICARAGUA: DepartmentSales[] = [
  { departamento: "Managua", ventas: 3890200, participacion: 46.04, clientes: 450, ticketPromedio: 8645 },
  { departamento: "León", ventas: 1540100, participacion: 18.23, clientes: 190, ticketPromedio: 8105 },
  { departamento: "Masaya", ventas: 1120400, participacion: 13.26, clientes: 160, ticketPromedio: 7002 },
  { departamento: "Granada", ventas: 780500, participacion: 9.24, clientes: 115, ticketPromedio: 6786 },
  { departamento: "Chinandega", ventas: 650030, participacion: 7.69, clientes: 95, ticketPromedio: 6842 },
  { departamento: "Matagalpa", ventas: 469000, participacion: 5.54, clientes: 80, ticketPromedio: 5862 }
];

export const PRODUCTOS_DATA: Product[] = [
  { cod: "PROD-001", nombre: "Arroz Faisán 80/20 50lb", cat: "Granos Básicos", costo: 850.0, precio: 1050.0, stock: 120, stockMin: 40, stockMax: 350, reorden: 65, rotacion: 7.2, diasInv: 50.7, categoriaVelocidad: 'ALTA ROTACIÓN', abc: 'A' },
  { cod: "PROD-002", nombre: "Frijol Rojo Don Pedro 50lb", cat: "Granos Básicos", costo: 1400.0, precio: 1750.0, stock: 95, stockMin: 35, stockMax: 280, reorden: 60, rotacion: 6.8, diasInv: 53.6, categoriaVelocidad: 'ALTA ROTACIÓN', abc: 'A' },
  { cod: "PROD-003", nombre: "Aceite Corona Vegetal 1L", cat: "Abarrotes y Aceites", costo: 58.0, precio: 75.0, stock: 310, stockMin: 80, stockMax: 600, reorden: 120, rotacion: 5.4, diasInv: 67.5, categoriaVelocidad: 'MEDIA ROTACIÓN', abc: 'B' },
  { cod: "PROD-004", nombre: "Azúcar Sulagro Blanca 50lb", cat: "Abarrotes y Aceites", costo: 720.0, precio: 890.0, stock: 110, stockMin: 30, stockMax: 300, reorden: 55, rotacion: 6.1, diasInv: 59.8, categoriaVelocidad: 'ALTA ROTACIÓN', abc: 'A' },
  { cod: "PROD-005", nombre: "Leche La Perfecta Entera 1L", cat: "Lácteos y Derivados", costo: 34.0, precio: 45.0, stock: 240, stockMin: 60, stockMax: 500, reorden: 100, rotacion: 8.9, diasInv: 41.0, categoriaVelocidad: 'ALTA ROTACIÓN', abc: 'B' },
  { cod: "PROD-006", nombre: "Queso Crema Chontaleño lb", cat: "Lácteos y Derivados", costo: 68.0, precio: 92.0, stock: 140, stockMin: 40, stockMax: 300, reorden: 70, rotacion: 6.4, diasInv: 57.0, categoriaVelocidad: 'ALTA ROTACIÓN', abc: 'B' },
  { cod: "PROD-007", nombre: "Café Presto Instantáneo 150g", cat: "Bebidas y Jugos", costo: 85.0, precio: 115.0, stock: 180, stockMin: 40, stockMax: 350, reorden: 65, rotacion: 4.8, diasInv: 76.0, categoriaVelocidad: 'MEDIA ROTACIÓN', abc: 'B' },
  { cod: "PROD-008", nombre: "Jugo Del Valle Naranja 1L", cat: "Bebidas y Jugos", costo: 42.0, precio: 60.0, stock: 210, stockMin: 50, stockMax: 400, reorden: 80, rotacion: 4.1, diasInv: 89.0, categoriaVelocidad: 'MEDIA ROTACIÓN', abc: 'C' },
  { cod: "PROD-009", nombre: "Detergente Xedex Floral 2kg", cat: "Higiene y Limpieza", costo: 110.0, precio: 148.0, stock: 14, stockMin: 35, stockMax: 300, reorden: 55, rotacion: 5.1, diasInv: 71.5, categoriaVelocidad: 'MEDIA ROTACIÓN', abc: 'B' }, // Stock crítico
  { cod: "PROD-010", nombre: "Jabón de Lavar Corona barra", cat: "Higiene y Limpieza", costo: 18.0, precio: 26.0, stock: 12, stockMin: 45, stockMax: 400, reorden: 75, rotacion: 5.6, diasInv: 65.1, categoriaVelocidad: 'MEDIA ROTACIÓN', abc: 'C' }  // Stock crítico
];

export const PROVEEDORES_DATA: Supplier[] = [
  { cod: "PROV-001", nombre: "Agroindustrias del Norte S.A.", contacto: "Carlos Morales", leadTimeNominal: 4, leadTimeReal: 4.1, diasRetraso: 0.1, comprasTotales: 2100000, entregasTotales: 42, entregasTardias: 2, cumplimientoPct: 95.2, tasaDevolucionPct: 0.5, estado: 'Óptimo' },
  { cod: "PROV-002", nombre: "Lácteos de Chontales Cía.", contacto: "María Solís", leadTimeNominal: 3, leadTimeReal: 3.2, diasRetraso: 0.2, comprasTotales: 1450000, entregasTotales: 40, entregasTardias: 1, cumplimientoPct: 97.5, tasaDevolucionPct: 0.3, estado: 'Óptimo' },
  { cod: "PROV-003", nombre: "Industrias Aceiteras Chinandega", contacto: "Elena Rivas", leadTimeNominal: 5, leadTimeReal: 5.4, diasRetraso: 0.4, comprasTotales: 1820000, entregasTotales: 46, entregasTardias: 4, cumplimientoPct: 91.3, tasaDevolucionPct: 1.1, estado: 'Aceptable' },
  { cod: "PROV-004", nombre: "Distribuidora Nacional DINA", contacto: "Roberto Blandón", leadTimeNominal: 7, leadTimeReal: 7.8, diasRetraso: 0.8, comprasTotales: 1640000, entregasTotales: 46, entregasTardias: 8, cumplimientoPct: 82.6, tasaDevolucionPct: 1.8, estado: 'Aceptable' },
  { cod: "PROV-005", nombre: "Consorcio Químico Industrial Managua", contacto: "Jorge Téllez", leadTimeNominal: 12, leadTimeReal: 17.1, diasRetraso: 5.1, comprasTotales: 1440230, entregasTotales: 49, entregasTardias: 19, cumplimientoPct: 61.2, tasaDevolucionPct: 4.2, estado: 'Crítico' }
];

export const MONTHLY_SALES = [
  { mes: "Ene 2026", ventas: 2480150, costo: 1945000, utilidad: 535150, margenPct: 21.58, transacciones: 1240 },
  { mes: "Feb 2026", ventas: 2810300, costo: 2205000, utilidad: 605300, margenPct: 21.54, transacciones: 1385 },
  { mes: "Mar 2026", ventas: 3159780, costo: 2479780, utilidad: 680000, margenPct: 21.52, transacciones: 1540 }
];

export const CATEGORY_SALES = [
  { categoria: "Granos Básicos", ventas: 3250400, share: 38.5, margen: 20.8 },
  { categoria: "Abarrotes y Aceites", ventas: 2180500, share: 25.8, margen: 21.2 },
  { categoria: "Lácteos y Derivados", ventas: 1420300, share: 16.8, margen: 24.1 },
  { categoria: "Bebidas y Jugos", ventas: 940030, share: 11.1, margen: 25.4 },
  { categoria: "Higiene y Limpieza", ventas: 659000, share: 7.8, margen: 24.8 }
];

export const PARETO_DATA = [
  { producto: "Arroz Faisán 50lb", ventas: 1850000, pct: 21.9, acumPct: 21.9, clase: 'A' },
  { producto: "Frijol Don Pedro 50lb", ventas: 1400400, pct: 16.6, acumPct: 38.5, clase: 'A' },
  { producto: "Azúcar Sulagro 50lb", ventas: 1150000, pct: 13.6, acumPct: 52.1, clase: 'A' },
  { producto: "Aceite Corona 1L", ventas: 1030500, pct: 12.2, acumPct: 64.3, clase: 'A' },
  { producto: "Leche La Perfecta 1L", ventas: 890000, pct: 10.5, acumPct: 74.8, clase: 'A' },
  { producto: "Queso Chontaleño lb", ventas: 640000, pct: 7.6, acumPct: 82.4, clase: 'B' },
  { producto: "Café Presto 150g", ventas: 560000, pct: 6.6, acumPct: 89.0, clase: 'B' },
  { producto: "Detergente Xedex 2kg", ventas: 420000, pct: 5.0, acumPct: 94.0, clase: 'B' },
  { producto: "Jugo Del Valle 1L", ventas: 310000, pct: 3.7, acumPct: 97.7, clase: 'C' },
  { producto: "Jabón Corona barra", ventas: 199330, pct: 2.3, acumPct: 100.0, clase: 'C' }
];

export const AUTHOR_INFO = {
  nombre: "Ing. Maxwell Chacón",
  rol: "Ingeniero de Sistemas | Analista de Datos & Business Intelligence",
  correo: "ing.chacon.maxwell@gmail.com",
  linkedin: "https://www.linkedin.com/in/ingemaxwellchacon",
  github: "https://github.com/mchacondev24",
  sitioWeb: "https://ingemaxwellchacon.com",
  cPanelHost: "ingemaxwellchacon.com",
  cPanelUrl: "https://business174.web-hosting.com/cpanel",
  cPanelFolder: "public_html/Portafolio/NicaDistrib-BI",
  ubicacion: "Nicaragua",
  pais: "Nicaragua"
};
