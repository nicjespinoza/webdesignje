import { Project } from '@/components/landing/types';

export interface FormFieldOption {
  id: string;
  label: string;
  items?: string[];
}

export interface FormSection {
  title: string;
  field: string;
  type: 'pills' | 'checklist';
  options: FormFieldOption[];
}

export interface ProjectFormConfig {
  emoji: string;
  subtitle: string;
  contactFields: { name: string; label: string; icon: string; placeholder: string }[];
  sections: FormSection[];
  budgetOptions: string[];
  timelineOptions: string[];
}

const sharedBudgets = ['$300 - $600 USD', '$600 - $900 USD', '$1,000 - $1,500 USD', '$1,500+ USD', 'Prefiero no decirlo'];
const sharedTimelines = ['Lo antes posible', '1-2 semanas', '1 mes', 'Sin prisa / Explorando'];

export const PROJECT_FORM_CONFIGS: Record<string, ProjectFormConfig> = {
  '1': { // Historia Clínica AI
    emoji: '🏥',
    subtitle: 'Historia Clínica & Consultorio',
    contactFields: [
      { name: 'name', label: 'Nombre Completo', icon: 'user', placeholder: 'Dr. / Dra. Nombre' },
      { name: 'email', label: 'Email', icon: 'mail', placeholder: 'doctor@clinica.com' },
      { name: 'phone', label: 'Teléfono / WhatsApp', icon: 'phone', placeholder: '+505 0000 0000' },
      { name: 'clinicName', label: 'Nombre de la Clínica', icon: 'building', placeholder: 'Clínica / Consultorio' },
    ],
    sections: [
      {
        title: 'Especialidad y Volumen',
        field: 'profile',
        type: 'pills',
        options: [
          { id: 'specialty', label: 'Especialidad', items: ['Medicina General', 'Pediatría', 'Ginecología', 'Cardiología', 'Dermatología', 'Odontología', 'Ortopedia', 'Otra'] },
          { id: 'patients', label: 'Pacientes/día', items: ['Menos de 10', '10-20', '21-40', 'Más de 40'] },
          { id: 'system', label: 'Sistema Actual', items: ['Papel / Agenda', 'Excel', 'Software existente', 'Ninguno'] },
        ],
      },
      {
        title: 'Necesidades Principales',
        field: 'needs',
        type: 'checklist',
        options: [
          { id: 'historia', label: 'Historia Clínica Digital' },
          { id: 'agenda', label: 'Agenda de Citas' },
          { id: 'receta', label: 'Receta Electrónica' },
          { id: 'factura', label: 'Facturación Fiscal' },
          { id: 'portal', label: 'Portal del Paciente' },
          { id: 'laboratorio', label: 'Órdenes de Laboratorio' },
          { id: 'imagenes', label: 'Imágenes Médicas (PACS)' },
          { id: 'firma', label: 'Firma Digital / Consentimientos' },
        ],
      },
      {
        title: 'Módulos de Historia Clínica',
        field: 'history',
        type: 'checklist',
        options: [
          { id: 'consulta_inicial', label: 'Consulta Inicial (motivo, antecedentes, examen)' },
          { id: 'consulta_sub', label: 'Consultas Subsecuentes (evolución)' },
          { id: 'signos', label: 'Signos Vitales gráficos' },
          { id: 'odontograma', label: 'Odontograma (mapa dental)' },
          { id: 'recetas', label: 'Recetas / Prescripciones' },
          { id: 'notas', label: 'Notas de Evolución' },
        ],
      },
      {
        title: 'Agenda y Citas',
        field: 'agenda',
        type: 'checklist',
        options: [
          { id: 'calendario', label: 'Calendario semanal/mensual' },
          { id: 'recordatorios', label: 'Recordatorios automáticos (WhatsApp/Email)' },
          { id: 'estados', label: 'Estados de cita (pendiente, confirmada, cancelada)' },
          { id: 'multiconsultorio', label: 'Multi-médico / Consultorios' },
          { id: 'bloqueos', label: 'Bloqueos de horario / Pausas' },
        ],
      },
      {
        title: 'Reportería',
        field: 'reports',
        type: 'checklist',
        options: [
          { id: 'pdf', label: 'Exportar consultas a PDF' },
          { id: 'estadisticas', label: 'Dashboard de estadísticas' },
          { id: 'excel', label: 'Exportar a Excel' },
          { id: 'finanzas', label: 'Reportes financieros' },
        ],
      },
      {
        title: 'Integraciones',
        field: 'integrations',
        type: 'checklist',
        options: [
          { id: 'lab', label: 'Laboratorio clínico' },
          { id: 'farmacia', label: 'Farmacia / Inventario' },
          { id: 'pagos', label: 'Pasarela de pagos' },
          { id: 'whatsapp', label: 'WhatsApp Business API' },
          { id: 'impresora', label: 'Impresora térmica / POS' },
        ],
      },
    ],
    budgetOptions: sharedBudgets,
    timelineOptions: sharedTimelines,
  },
  '2': { // POS Tienda AI
    emoji: '🛒',
    subtitle: 'Punto de Venta & Tienda',
    contactFields: [
      { name: 'name', label: 'Nombre Completo', icon: 'user', placeholder: 'Nombre del responsable' },
      { name: 'email', label: 'Email', icon: 'mail', placeholder: 'contacto@tienda.com' },
      { name: 'phone', label: 'Teléfono / WhatsApp', icon: 'phone', placeholder: '+505 0000 0000' },
      { name: 'clinicName', label: 'Nombre de la Tienda', icon: 'building', placeholder: 'Tienda / Marca' },
    ],
    sections: [
      {
        title: 'Tipo de Negocio',
        field: 'profile',
        type: 'pills',
        options: [
          { id: 'storeType', label: 'Tipo', items: ['Ropa / Moda', 'Calzado', 'Electrónica', 'Abarrotes / Supermercado', 'Ferretería', 'Otro'] },
          { id: 'branches', label: 'Sucursales', items: ['1 (Única)', '2-5', '6-10', '+10'] },
          { id: 'revenue', label: 'Ventas Mensuales', items: ['- $5,000', '$5,000 - $20,000', '$20,000 - $50,000', '+ $50,000'] },
          { id: 'skus', label: 'Inventario (SKUs)', items: ['- 100', '100-500', '501-2000', '+2000'] },
        ],
      },
      {
        title: 'Funciones de Venta',
        field: 'needs',
        type: 'checklist',
        options: [
          { id: 'pos', label: 'POS / Caja registradora' },
          { id: 'factura', label: 'Facturación fiscal' },
          { id: 'inventory', label: 'Control de inventario' },
          { id: 'variants', label: 'Variantes (talla, color, etc.)' },
          { id: 'barcode', label: 'Lector de código de barras' },
          { id: 'customers', label: 'Catálogo de clientes' },
          { id: 'credits', label: 'Créditos / Fiado' },
          { id: 'cashier', label: 'Corte de caja' },
        ],
      },
      {
        title: 'Inventario',
        field: 'inventory',
        type: 'checklist',
        options: [
          { id: 'stock_alert', label: 'Alertas de stock mínimo' },
          { id: 'purchase_order', label: 'Órdenes de compra' },
          { id: 'suppliers', label: 'Gestión de proveedores' },
          { id: 'transfers', label: 'Traspasos entre sucursales' },
          { id: 'audit', label: 'Auditoría de inventario' },
        ],
      },
      {
        title: 'Reportería',
        field: 'reports',
        type: 'checklist',
        options: [
          { id: 'sales_report', label: 'Reporte de ventas' },
          { id: 'inventory_report', label: 'Reporte de inventario' },
          { id: 'profit', label: 'Ganancias / Márgenes' },
          { id: 'excel', label: 'Exportar a Excel' },
        ],
      },
      {
        title: 'Integraciones',
        field: 'integrations',
        type: 'checklist',
        options: [
          { id: 'thermal_printer', label: 'Impresora térmica' },
          { id: 'barcode_scanner', label: 'Lector de barras' },
          { id: 'scales', label: 'Báscula' },
          { id: 'ecommerce', label: 'Tienda online (e-commerce)' },
          { id: 'accounting', label: 'Software contable' },
        ],
      },
    ],
    budgetOptions: sharedBudgets,
    timelineOptions: sharedTimelines,
  },
  '3': { // CRM
    emoji: '📊',
    subtitle: 'CRM & Gestión de Clientes',
    contactFields: [
      { name: 'name', label: 'Nombre Completo', icon: 'user', placeholder: 'Nombre del contacto' },
      { name: 'email', label: 'Email', icon: 'mail', placeholder: 'contacto@empresa.com' },
      { name: 'phone', label: 'Teléfono / WhatsApp', icon: 'phone', placeholder: '+505 0000 0000' },
      { name: 'clinicName', label: 'Empresa', icon: 'building', placeholder: 'Nombre de la empresa' },
    ],
    sections: [
      {
        title: 'Perfil del Negocio',
        field: 'profile',
        type: 'pills',
        options: [
          { id: 'companyType', label: 'Tipo', items: ['Agencia / Servicios', 'Consultoría', 'Software / SaaS', 'Comercio Mayorista', 'Otro'] },
          { id: 'teamSize', label: 'Tamaño Equipo', items: ['1 (Independiente)', '2-5', '6-15', '+15'] },
          { id: 'deals', label: 'Prospectos/mes', items: ['- 10', '10-30', '31-50', '+50'] },
        ],
      },
      {
        title: 'Funciones de CRM',
        field: 'needs',
        type: 'checklist',
        options: [
          { id: 'contacts', label: 'Gestión de contactos / Clientes' },
          { id: 'leads', label: 'Captura de prospectos' },
          { id: 'pipeline', label: 'Embudo de ventas / Pipeline' },
          { id: 'tasks', label: 'Tareas y seguimiento' },
          { id: 'notes', label: 'Notas y actividades' },
          { id: 'documents', label: 'Documentos / Propuestas' },
        ],
      },
      {
        title: 'Automatización',
        field: 'automation',
        type: 'checklist',
        options: [
          { id: 'email_seq', label: 'Secuencias de email' },
          { id: 'reminders', label: 'Recordatorios automáticos' },
          { id: 'whatsapp', label: 'Notificaciones WhatsApp' },
          { id: 'templates', label: 'Plantillas de propuesta' },
        ],
      },
      {
        title: 'Reportería',
        field: 'reports',
        type: 'checklist',
        options: [
          { id: 'dashboard', label: 'Dashboard de métricas' },
          { id: 'conversion', label: 'Tasa de conversión' },
          { id: 'team_perf', label: 'Rendimiento del equipo' },
          { id: 'revenue', label: 'Proyección de ingresos' },
        ],
      },
    ],
    budgetOptions: sharedBudgets,
    timelineOptions: sharedTimelines,
  },
  '4': { // Eve Commerce
    emoji: '💎',
    subtitle: 'E-Commerce & Tienda Online',
    contactFields: [
      { name: 'name', label: 'Nombre Completo', icon: 'user', placeholder: 'Nombre del responsable' },
      { name: 'email', label: 'Email', icon: 'mail', placeholder: 'contacto@tienda.com' },
      { name: 'phone', label: 'Teléfono / WhatsApp', icon: 'phone', placeholder: '+505 0000 0000' },
      { name: 'clinicName', label: 'Nombre de la Marca', icon: 'building', placeholder: 'Marca / Tienda' },
    ],
    sections: [
      {
        title: 'Perfil de la Tienda',
        field: 'profile',
        type: 'pills',
        options: [
          { id: 'niche', label: 'Nicho', items: ['Ropa / Moda', 'Calzado', 'Joyería / Accesorios', 'Cosmética / Skincare', 'Hogar / Decoración', 'Otro'] },
          { id: 'channel', label: 'Canal Principal', items: ['Instagram / Redes', 'MercadoLibre / Amazon', 'Tienda propia', 'Ninguno aún'] },
          { id: 'income', label: 'Ingresos Mensuales', items: ['Aún no vendo', '- $1,000', '$1,000 - $10,000', '+ $10,000'] },
        ],
      },
      {
        title: 'Funciones de la Tienda',
        field: 'needs',
        type: 'checklist',
        options: [
          { id: 'catalog', label: 'Catálogo de productos' },
          { id: 'cart', label: 'Carrito de compras' },
          { id: 'checkout', label: 'Checkout optimizado' },
          { id: 'payments', label: 'Pasarela de pagos (Stripe, PayPal)' },
          { id: 'shipping', label: 'Gestión de envíos' },
          { id: 'inventory', label: 'Control de inventario' },
          { id: 'discounts', label: 'Cupones / Descuentos' },
          { id: 'reviews', label: 'Reseñas de productos' },
        ],
      },
      {
        title: 'Marketing',
        field: 'marketing',
        type: 'checklist',
        options: [
          { id: 'email_marketing', label: 'Email marketing' },
          { id: 'abandoned_cart', label: 'Recuperación de carrito' },
          { id: 'analytics', label: 'Google Analytics / Pixel' },
          { id: 'seo', label: 'SEO básico' },
        ],
      },
      {
        title: 'Reportería',
        field: 'reports',
        type: 'checklist',
        options: [
          { id: 'sales', label: 'Reporte de ventas' },
          { id: 'products', label: 'Productos más vendidos' },
          { id: 'customers', label: 'Segmentación de clientes' },
          { id: 'conversion', label: 'Tasa de conversión' },
        ],
      },
    ],
    budgetOptions: sharedBudgets,
    timelineOptions: sharedTimelines,
  },
  '5': { // Beauty Agenda SaaS
    emoji: '💅',
    subtitle: 'Agenda & Booking',
    contactFields: [
      { name: 'name', label: 'Nombre Completo', icon: 'user', placeholder: 'Nombre del responsable' },
      { name: 'email', label: 'Email', icon: 'mail', placeholder: 'contacto@negocio.com' },
      { name: 'phone', label: 'Teléfono / WhatsApp', icon: 'phone', placeholder: '+505 0000 0000' },
      { name: 'clinicName', label: 'Nombre del Negocio', icon: 'building', placeholder: 'Salón / Spa / Hotel' },
    ],
    sections: [
      {
        title: 'Tipo de Negocio',
        field: 'profile',
        type: 'pills',
        options: [
          { id: 'businessType', label: 'Tipo', items: ['Salón de Belleza', 'Spa', 'Barbería', 'Clínica Estética', 'Hotel', 'Restaurante', 'Otro'] },
          { id: 'staff', label: 'Especialistas/Staff', items: ['1 (Independiente)', '2-5', '6-15', '+15'] },
          { id: 'clients', label: 'Clientes por Semana', items: ['- 20', '20-50', '51-100', '+100'] },
          { id: 'booking_method', label: 'Método de Citas', items: ['Manual (agenda)', 'WhatsApp / Llamadas', 'Google Calendar', 'Software básico'] },
        ],
      },
      {
        title: 'Funciones de Booking',
        field: 'needs',
        type: 'checklist',
        options: [
          { id: 'calendar', label: 'Calendario online' },
          { id: 'online_booking', label: 'Reserva online 24/7' },
          { id: 'reminders', label: 'Recordatorios automáticos (WhatsApp/Email)' },
          { id: 'multi_staff', label: 'Agenda por especialista' },
          { id: 'services', label: 'Gestión de servicios / Precios' },
          { id: 'payments', label: 'Pagos anticipados' },
        ],
      },
      {
        title: 'CRM & Fidelización',
        field: 'crm',
        type: 'checklist',
        options: [
          { id: 'customer_history', label: 'Historial de cliente' },
          { id: 'loyalty', label: 'Programa de fidelidad' },
          { id: 'marketing', label: 'Marketing automatizado' },
          { id: 'reviews', label: 'Solicitar reseñas' },
        ],
      },
      {
        title: 'Reportería',
        field: 'reports',
        type: 'checklist',
        options: [
          { id: 'occupancy', label: 'Ocupación de agenda' },
          { id: 'revenue', label: 'Ingresos por período' },
          { id: 'staff_perf', label: 'Rendimiento del staff' },
          { id: 'exports', label: 'Exportar a Excel' },
        ],
      },
    ],
    budgetOptions: sharedBudgets,
    timelineOptions: sharedTimelines,
  },
  '6': { // ScholarAI Nexus
    emoji: '🎓',
    subtitle: 'Plataforma Educativa',
    contactFields: [
      { name: 'name', label: 'Nombre Completo', icon: 'user', placeholder: 'Nombre del responsable' },
      { name: 'email', label: 'Email', icon: 'mail', placeholder: 'contacto@institucion.edu' },
      { name: 'phone', label: 'Teléfono / WhatsApp', icon: 'phone', placeholder: '+505 0000 0000' },
      { name: 'clinicName', label: 'Institución', icon: 'building', placeholder: 'Colegio / Universidad / Academia' },
    ],
    sections: [
      {
        title: 'Perfil de la Institución',
        field: 'profile',
        type: 'pills',
        options: [
          { id: 'institutionType', label: 'Tipo', items: ['Colegio / Escuela', 'Universidad', 'Instituto Técnico', 'Academia Online', 'Otro'] },
          { id: 'students', label: 'Estudiantes', items: ['1-100', '101-500', '501-2000', '+2000'] },
          { id: 'level', label: 'Nivel Educativo', items: ['Primaria / Secundaria', 'Pregrado', 'Posgrado', 'Mixto'] },
        ],
      },
      {
        title: 'Gestión Académica',
        field: 'needs',
        type: 'checklist',
        options: [
          { id: 'enrollment', label: 'Matrícula de estudiantes' },
          { id: 'grades', label: 'Registro de calificaciones' },
          { id: 'attendance', label: 'Control de asistencia' },
          { id: 'schedule', label: 'Horarios / Materias' },
          { id: 'teachers', label: 'Gestión de docentes' },
          { id: 'courses', label: 'Cursos / Asignaturas' },
        ],
      },
      {
        title: 'Portal y Comunicación',
        field: 'portal',
        type: 'checklist',
        options: [
          { id: 'parent_portal', label: 'Portal de padres / Apoderados' },
          { id: 'student_portal', label: 'Portal del estudiante' },
          { id: 'notifications', label: 'Notificaciones automáticas' },
          { id: 'payments', label: 'Pago de colegiaturas' },
        ],
      },
      {
        title: 'IA & Analítica',
        field: 'ai',
        type: 'checklist',
        options: [
          { id: 'dropout', label: 'Predicción de deserción' },
          { id: 'performance', label: 'Predicción de rendimiento' },
          { id: 'personalization', label: 'Aprendizaje personalizado' },
          { id: 'reports', label: 'Reportes automáticos' },
        ],
      },
    ],
    budgetOptions: sharedBudgets,
    timelineOptions: sharedTimelines,
  },
};
