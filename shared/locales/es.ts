export default {
  loginForm: {
    login: 'Iniciar sesión',
    selected: 'Idioma',
    userName: 'Nombre de usuario',
    passWord: 'Contraseña',
  },
  theme: {
    light: 'Claro',
    dark: 'Oscuro',
  },
  menuSideBar: {
    database: 'Base de datos',
    collection: 'Colecciones',
    language: 'Idioma',
    setting: 'Configuración',
    logout: 'Cerrar sesión'
  },
  modal: {
    language: {
      title: 'Idioma',
    },
    confirm: {
      title: 'Confirmación',
    },
    button: {
      cancel: 'Cancelar',
      confirm: 'Confirmar',
    },
  },
  database: {
    title: 'Base de datos',
    create: 'Crear base de datos',
    deleteConfirm: '¿Estás seguro de que quieres eliminar esta base de datos?',
    deleteSuccess: 'Base de datos eliminada con éxito',
    deleteError: 'Error al eliminar la base de datos',
    createSuccess: 'Base de datos creada con éxito',
    createError: 'Error al crear la base de datos',
    name: 'Base de datos',
    storage: 'Almacenamiento',
    collection: 'Colecciones',
    indexes: 'Índice',
  },
  collection: {
    title: 'Colecciones',
    collectionName: 'Nombre de la colección',
    count: 'Documento',
    avgDocumentSize: 'Tamaño medio del documento',
    totalDocumentSize: 'Tamaño total del documento',
    indexes: 'Número índices',
    totalIndexSize: 'Tamaño total del índice',
    deleteConfirm: '¿Estás seguro de que quieres eliminar esta colección?',
  },
  document: {
    noDocument: 'Ningún documento',
    deleteConfirm: '¿Estás seguro de que quieres eliminar este documento?',
    deleteSuccess: 'Documento eliminado con éxito',
    deleteError: 'Error al eliminar el documento',
    updateSuccess: 'Documento actualizado con éxito',
    updateError: 'Error al actualizar el documento',
    createSuccess: 'Documento creado con éxito',
    createError: 'Error al crear el documento',
    createTitle: 'Crear documento',
    updateTitle: 'Actualizar documento',
  },
  language: {
    en: '🇬🇧 Inglés',
    fr: '🇫🇷 Francés',
    es: '🇪🇸 Español',
  },
} as const;