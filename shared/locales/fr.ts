export default {
  loginForm: {
    login: 'Se connecter',
    selected: 'Langue',
    userName: "Nom d'utilisateur",
    passWord: 'Mot de passe',
  },
  menuSideBar: {
    database: 'Base de données',
    theme: 'Thème',
    collection: 'Collections',
    language: 'Langue',
    setting: 'Paramètres',
    logout: 'Déconnexion'
  },
  modal: {
    language: {
      title: 'Langue',
    },
    confirm: {
      title: 'Confirmation',
    },
    button: {
      cancel: 'Annuler',
      confirm: 'Confirmer',
    },
  },
  database: {
    title: 'Base de données',
    create: 'Créer une base de données',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cette base de données ?',
    deleteSuccess: 'Base de données supprimée avec succès',
    deleteError: 'Erreur lors de la suppression de la base de données',
    createSuccess: 'Base de données créée avec succès',
    createError: 'Erreur lors de la création de la base de données',
  },
  language: {
    en: '🇬🇧 Anglais',
    fr: '🇫🇷 Français',
    es: '🇪🇸 Espagnol',
  },
} as const;
