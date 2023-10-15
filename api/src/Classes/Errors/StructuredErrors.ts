export type StructuredErrors =
  // SQL
  'sql/failed' |
  'sql/not-found' |
  'database/duplicate-value' |
  'database/not-found' |
  'collection/duplicate-value' |

  // Crud
  'validation/failed' |

  // Authorization
  'auth/invalid-credentials' |
  'auth/invalid-password-format' |
  'auth/invalid-email-format' |
  'auth/missing-header' |
  'auth/missing-url' |

  // Validation
  'validation/invalid-code' |
  'validation/invalid-password' |
  'validation/invalid-email' |

  //Challenge
  'challenge/not-active' |
  'challenge/already-exist' |

  //Query
  'query/not-found' |
  'query/invalid' |
  // Default
  'internal/unknown' |
  
  //User
  'user/exists' |
  'user/creation-failed'
  ;

