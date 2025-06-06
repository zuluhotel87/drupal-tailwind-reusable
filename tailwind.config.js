export default {
  mode: 'jit',
  content: [
    "./web/themes/custom/shizen/macros/**/*.twig",
    "./web/themes/custom/shizen/templates/**/*.twig",
    "./web/themes/custom/shizen/**/*.php",
    "./web/themes/custom/shizen/src/js/**/*.js",
    "./web/themes/custom/shizen/*.theme",
    "./web/sites/default/files/sync/webform.webform.*.yml",
  ],
  plugins: [
    require('flowbite/plugin')
  ],
  theme: {
    container: {
        center: true,
        padding: '1rem',
        py: {
          DEFAULT: '2rem',
          lg: '5rem',
        },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0d6efd',
          focus: '#0b5ed7',
          hover: '#0a58ca',
          content: '#ffffff',
          light: '#dbeafe',
        },
        secondary: {
          DEFAULT: '#6c757d',
          focus: '#5c636a',
          hover: '#565e64',
          content: '#ffffff',
          dark: '#9CA3AF',
        },
        base: {
          DEFAULT: '#ffffff',
          focus: '#f8f9fa',
          hover: '#e9ecef',
          content: '#212529',
          container: '#f9fafb',
          'container-secondary': '#F3F4F6',
          dark: {
            DEFAULT: '#212529',
            focus: '#343a40',
            hover: '#495057',
            content: '#f8f9fa',
          }
        },
        status: {
          success: '#22c55e',
          error: '#ef4444',
          warning: '#f59e0b',
          info: '#3b82f6',
        },
        stroke: {
          DEFAULT: '#dee2e6',
          focus: '#ced4da',
          hover: '#adb5bd',
          dark: {
            DEFAULT: '#495057',
            focus: '#6c757d',
            hover: '#adb5bd',
          }
        }
      }
    }
  }
}
