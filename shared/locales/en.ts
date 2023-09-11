export default {
  loginForm: {
    title: 'Sign in',
    selected: 'Language',
    userName: 'Username',
    passWord: 'Password',
    login: 'Sign in',
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
    createTitle: 'Create database',
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
      create: 'Create',
    },
  },
  collection: {
    title: 'Collections',
    create: 'Create Collection',
    collectionName: 'Collection Name',
    count: 'Document',
    avgDocumentSize: 'Avg. Document Size',
    totalDocumentSize: 'Total Document Size',
    indexes: 'Num. Indexes',
    totalIndexSize: 'Total Index Size',
    deleteConfirm: 'Are you sure you want to delete this collection?',
  },
  formCreateCollection: {
    title: 'Create Collection',
    collectionName: 'Collection Name',
  },
  document: {
    noDocument: 'No document',
    deleteConfirm: 'Are you sure you want to delete this document?',
    deleteSuccess: 'Document deleted successfully',
    deleteError: 'Error deleting document',
    updateSuccess: 'Document updated successfully',
    updateError: 'Error updating document',
    createSuccess: 'Document created successfully',
    createError: 'Error creating document',
    createTitle: 'Create document',
    updateTitle: 'Update document',
  },
  language: {
    en: '🇬🇧 English',
    fr: '🇫🇷 French',
    es: '🇪🇸 Spanish',
  },
} as const;
