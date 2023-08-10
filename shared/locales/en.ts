export default {
  loginForm: {
    title: 'Sign in',
    selected: 'Language',
    userName: 'Username',
    passWord: 'Password',
    login: 'Sign in',
  },
  menuSideBar: {
    database: 'Database',
    collection: 'Collections',
    theme: 'Theme',
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
  language: {
    en: '🇬🇧 English',
    fr: '🇫🇷 French',
    es: '🇪🇸 Spanish',
  },
} as const;
