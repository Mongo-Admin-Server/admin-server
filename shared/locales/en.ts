export default {
  loginForm: {
    title: 'Sign in',
    selected: 'Language',
    userName: 'Username',
    passWord: 'Password',
    login: 'Sign in',
  },
  formCreateDB: {
    title: 'Create database',
    nameDB: 'Database name',
    nameFirstCollection: 'Collection name',
    error500: 'Database name cannot contain spaces',
    error409: 'Database name is already us',
    buttonCancel: 'Cancel'
  },
  theme: {
    light: 'Light',
    dark: 'Dark',
  },
  menuSideBar: {
    database: 'Database',
    collection: 'Collections',
    language: 'Language',
    setting: 'Settings',
    logout: 'Logout'
  },
  database: {
    title: 'Database',
    create: 'Create database',
    deleteConfirm: 'Are you sure you want to delete this database?',
    deleteSuccess: 'Database deleted successfully',
    deleteError: 'Error deleting database',
    createSuccess: 'Database created successfully',
    createError: 'Error creating database',
    name: 'Database',
    storage: 'Storage',
    collection: 'Collections',
    indexes: 'Indexes',
  },
  modal: {
    language: {
      title: 'Language',
    },
    confirm: {
      title: 'Confirmation',
    },
    button: {
      cancel: 'Cancel',
      confirm: 'Confirm',
    },
  },
  collection: {
    title: 'Collections',
    collectionName: 'Collection Name',
    count: 'Document',
    avgDocumentSize: 'Avg. Document Size',
    totalDocumentSize: 'Total Document Size',
    indexes: 'Num. Indexes',
    totalIndexSize: 'Total Index Size',
    deleteConfirm: 'Are you sure you want to delete this collection?',
  },
  document: {
    noDocument: 'No document',
  },
  language: {
    en: '🇬🇧 English',
    fr: '🇫🇷 French',
    es: '🇪🇸 Spanish',
  },
} as const;
