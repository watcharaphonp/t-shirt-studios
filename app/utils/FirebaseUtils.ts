export const mapFirebaseAuthError = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/invalid-credential':
            return 'The email address or password is incorrect.'
        case 'auth/email-already-in-use':
            return 'The email is already registered with another account.'
        default:
            return 'An unknown error occurred. Please try again.'
    }
}
