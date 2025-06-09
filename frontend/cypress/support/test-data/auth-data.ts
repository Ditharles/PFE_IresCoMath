export const AUTH_TEST_DATA = {
  INVALID_PASSWORD: "mauvaismotdepasse",
  INVALID_EMAIL: "invalidformat",
  VALIDATION_MESSAGES: {
    userAlreadyExists: "Cet utilisateur existe déjà",
    invalidEmail: "Format d'email invalide",
    userNotFound: "Utilisateur non existant",
    wrongPassword: "Mot de passe incorrect",
    success: "Connexion réussie",
    registerSuccess: "Inscription réussie ! Vous allez être redirigé vers la page de confirmation.",
    error: "Une erreur s'est produite",
  },
  FIELDS_ERRORS: {
    lastName: "Le nom doit contenir au moins 2 caractères",
    firstName: "Le prénom doit contenir au moins 2 caractères",
    phone: "Le numéro de téléphone doit contenir 8 chiffres",
    email: "Email invalide",
    cin: "Le CIN doit contenir au moins 5 caractères",
    password: "Le mot de passe doit contenir au moins 8 caractères",
    confirmPassword: "Champ requis",
  },
  ROUTES: {
    register: "/inscription",
    login: "/login",
    home: "/accueil",
    resend: "/resend-confirmation-email"
  },
} as const;
