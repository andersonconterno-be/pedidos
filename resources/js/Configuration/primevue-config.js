import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'


// ===== DESIGN TOKENS BASE =====

/**
 * Paleta de cores primária personalizada
 */
const PRIMARY_COLORS = {
  50: 'rgb(238 255 252)',      // #eefffc
  100: 'rgb(198 255 246)',     // #c6fff6
  200: 'rgb(142 255 238)',     // #8effee
  300: 'rgb(77 251 229)',      // #4dfbe5
  400: 'rgb(25 232 212)',      // #19e8d4
  500: 'rgb(0 214 197)',       // #00d6c5 - Cor principal
  600: 'rgb(0 164 155)',       // #00a49b
  700: 'rgb(2 131 125)',       // #02837d
  800: 'rgb(8 103 100)',       // #086764
  900: 'rgb(12 85 82)',        // #0c5552
  950: 'rgb(0 51 52)'          // #003334
}

/**
 * Paleta de superfícies para tema claro
 */
const SURFACE_COLORS_LIGHT = {
  0: 'rgb(255 255 255)',       // #ffffff - Branco puro
  50: 'rgb(250 250 250)',      // #fafafa - Background principal
  100: 'rgb(245 245 245)',     // #f5f5f5 - Cards e containers
  200: 'rgb(238 238 238)',     // #eeeeee - Divisores suaves
  300: 'rgb(224 224 224)',     // #e0e0e0 - Bordas
  400: 'rgb(189 189 189)',     // #bdbdbd - Elementos desabilitados
  500: 'rgb(158 158 158)',     // #9e9e9e - Texto secundário
  600: 'rgb(117 117 117)',     // #757575 - Texto padrão
  700: 'rgb(97 97 97)',        // #616161 - Texto de destaque
  800: 'rgb(66 66 66)',        // #424242 - Texto escuro
  900: 'rgb(33 33 33)'         // #212121 - Texto mais escuro
}

/**
 * Paleta de superfícies para tema escuro
 */
const SURFACE_COLORS_DARK = {
  0: 'rgb(15 23 42)',          // #0f172a - Background escuro
  50: 'rgb(30 41 59)',         // #1e293b - Cards escuros
  100: 'rgb(51 65 85)',        // #334155 - Containers
  200: 'rgb(71 85 105)',       // #475569 - Divisores
  300: 'rgb(100 116 139)',     // #64748b - Bordas
  400: 'rgb(148 163 184)',     // #94a3b8 - Elementos desabilitados
  500: 'rgb(203 213 225)',     // #cbd5e1 - Texto secundário
  600: 'rgb(226 232 240)',     // #e2e8f0 - Texto padrão
  700: 'rgb(241 245 249)',     // #f1f5f9 - Texto de destaque
  800: 'rgb(248 250 252)',     // #f8fafc - Texto claro
  900: 'rgb(255, 255, 255)'    // #ffffff - Texto mais claro
}

// ===== PRESET PRINCIPAL =====

/**
 * Preset personalizado baseado no Aura
 * Integrado com o design system personalizado
 */
export const CustomPreset = definePreset(Aura, {
  semantic: {

    primary: PRIMARY_COLORS,
    
    colorScheme: {
      light: {
        surface: SURFACE_COLORS_LIGHT,
        primary: {
          color: '{primary.500}',
          contrastColor: '{surface.0}',
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}'
        }
      },
      dark: {
        surface: SURFACE_COLORS_DARK,
        primary: {
          color: '{primary.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{primary.300}',
          activeColor: '{primary.200}'
        }
      }
    }
  },
  
  // Tokens de componentes
  //components: {
  //  ...
  //}
})

/**
 * Configuração personalizada do tema PrimeVue usando Custom Preset
 * @returns {Object} Configuração do PrimeVue
 */

export function setupPrimeVueConfig() {
   return {
      theme: {
        preset: CustomPreset,
        options: {
          prefix: "p",
          darkModeSelector: "dark",
          cssLayer: {
              name: "primevue",
              order: "tailwind-base, primevue, tailwind-utilities",
          },
      },
      },
      ripple: true,
      inputStyle: 'outlined',
      locale: ptLocale
    }
}

/**
 * Locale PT-BR para PrimeVue
 */
const ptLocale = {
  firstDayOfWeek: 1,
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  today: 'Hoje',
  clear: 'Limpar',
  passwordPrompt: 'Digite sua senha',
  weak: 'Fraca',
  medium: 'Média',
  strong: 'Forte',
  emptyMessage: 'Sem opções disponíveis',
  startsWith: 'Começa com',
  contains: 'Contém',
  notContains: 'Não contém',
  endsWith: 'Termina com',
  equals: 'Igual a',
  notEquals: 'Diferente de',
  noFilter: 'Sem filtro',
  lt: 'Menor que',
  lte: 'Menor ou igual a',
  gt: 'Maior que',
  gte: 'Maior ou igual a',
  dateIs: 'A data é',
  dateIsNot: 'A data não é',
  dateBefore: 'Antes da data',
  dateAfter: 'Depois da data',
  matchAll: 'Corresponder a todos',
  matchAny: 'Corresponder a qualquer',
  addRule: 'Adicionar regra',
  removeRule: 'Remover regra',
  apply: 'Aplicar',
  choose: 'Escolher',
  upload: 'Enviar',
  cancel: 'Cancelar',
  accept: 'Aceitar',
  reject: 'Rejeitar',
  pending: 'Pendente',
};

/**
 * Locale ES (Español) para PrimeVue
 */
const esLocale = {
  firstDayOfWeek: 1,
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  today: 'Hoy',
  clear: 'Limpiar',
  passwordPrompt: 'Ingrese su contraseña',
  weak: 'Débil',
  medium: 'Media',
  strong: 'Fuerte',
  emptyMessage: 'Sin opciones disponibles',
  startsWith: 'Comienza con',
  contains: 'Contiene',
  notContains: 'No contiene',
  endsWith: 'Termina con',
  equals: 'Igual a',
  notEquals: 'Diferente de',
  noFilter: 'Sin filtro',
  lt: 'Menor que',
  lte: 'Menor o igual a',
  gt: 'Mayor que',
  gte: 'Mayor o igual a',
  dateIs: 'La fecha es',
  dateIsNot: 'La fecha no es',
  dateBefore: 'Antes de la fecha',
  dateAfter: 'Después de la fecha',
  matchAll: 'Coincidir con todos',
  matchAny: 'Coincidir con cualquiera',
  addRule: 'Agregar regla',
  removeRule: 'Eliminar regla',
  apply: 'Aplicar',
  choose: 'Elegir',
  upload: 'Cargar',
  cancel: 'Cancelar',
  accept: 'Aceptar',
  reject: 'Rechazar',
  pending: 'Pendiente',
};

/**
 * Locale EN (English) para PrimeVue
 */
const enLocale = {
  firstDayOfWeek: 0,
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  today: 'Today',
  clear: 'Clear',
  passwordPrompt: 'Enter your password',
  weak: 'Weak',
  medium: 'Medium',
  strong: 'Strong',
  emptyMessage: 'No options available',
  startsWith: 'Starts with',
  contains: 'Contains',
  notContains: 'Does not contain',
  endsWith: 'Ends with',
  equals: 'Equals',
  notEquals: 'Not equals',
  noFilter: 'No filter',
  lt: 'Less than',
  lte: 'Less than or equal to',
  gt: 'Greater than',
  gte: 'Greater than or equal to',
  dateIs: 'Date is',
  dateIsNot: 'Date is not',
  dateBefore: 'Before date',
  dateAfter: 'After date',
  matchAll: 'Match all',
  matchAny: 'Match any',
  addRule: 'Add rule',
  removeRule: 'Remove rule',
  apply: 'Apply',
  choose: 'Choose',
  upload: 'Upload',
  cancel: 'Cancel',
  accept: 'Accept',
  reject: 'Reject',
  pending: 'Pending',
};

/**
 * Mapa de locales disponíveis
 */
export const PRIMEVUE_LOCALES = {
  br: ptLocale,
  es: esLocale,
  en: enLocale,
};

/**
 * Retorna o locale do PrimeVue baseado no código do idioma
 * @param {string} localeCode - Código do locale (br, es, en)
 * @returns {Object} Objeto de locale do PrimeVue
 */
export function getPrimeVueLocale(localeCode) {
  return PRIMEVUE_LOCALES[localeCode] || PRIMEVUE_LOCALES.br;
}
