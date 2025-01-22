import { defineI18nConfig } from '#imports'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            welcome: 'Welcome',
            login: 'Login',
            signup: 'Sign Up',
            profile: 'Profile',
            credit_log: 'Credit Log',
            username: 'Username',
            email: 'Email',
            password: 'Password',
            member_since: 'Member Since',
            edit_profile: 'Edit Profile',
            date: 'Date',
            type: 'Type',
            amount: 'Amount',
            balance: 'Balance',
            check_status: 'Check Status',
            please_login: 'Please login to continue'
        },
        fr: {
            welcome: 'Bienvenue',
            login: 'Connexion',
            signup: 'Inscription',
            profile: 'Profil',
            credit_log: 'Journal de Crédit',
            username: 'Nom d\'utilisateur',
            email: 'Email',
            password: 'Mot de passe',
            member_since: 'Membre depuis',
            edit_profile: 'Modifier le profil',
            date: 'Date',
            type: 'Type',
            amount: 'Montant',
            balance: 'Solde',
            check_status: 'Vérifier l\'état',
            please_login: 'Veuillez vous connecter pour continuer'
        }
    }
})) 