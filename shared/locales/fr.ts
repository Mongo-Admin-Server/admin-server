export default {
  loginForm: {
    login: 'Se connecter',
    selected: 'Langue',
    userName: "Nom d'utilisateur",
    passWord: 'Mot de passe',
  },
  theme: {
    light: 'Clair',
    dark: 'Sombre',
  },
  menuSideBar: {
    database: 'Base de données',
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
      create: 'Créer',
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
    createTitle: 'Créer une base de données',
    name: 'Base de données',
    storage: 'Stockage',
    collection: 'Collections',
    indexes: 'Index',
  },
  collection: {
    title: 'Collections',
    create: 'Créer une collection',
    collectionName: 'Nom Collection',
    count: 'Document',
    avgDocumentSize: 'Taille Moyenne Document',
    totalDocumentSize: 'Taille Totale Document',
    indexes: 'Numero Index',
    totalIndexSize: 'Taille Totale Index',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cette collection ?',
  },
  formCreateCollection: {
    title: 'Créer une collection',
    collectionName: 'Nom de la collection',
  },
  document: {
    noDocument: 'Aucun document',
    deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce document ?',
    deleteSuccess: 'Document supprimé avec succès',
    deleteError: 'Erreur lors de la suppression du document',
    updateSuccess: 'Document mis à jour avec succès',
    updateError: 'Erreur lors de la mise à jour du document',
    createSuccess: 'Document créé avec succès',
    createError: 'Erreur lors de la création du document',
    createTitle: 'Créer un document',
    updateTitle: 'Mettre à jour le document',
  },
  language: {
    en: '🇬🇧 Anglais',
    fr: '🇫🇷 Français',
    es: '🇪🇸 Espagnol',
  },
} as const;
