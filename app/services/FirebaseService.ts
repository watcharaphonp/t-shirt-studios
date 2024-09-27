import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import type { Analytics } from 'firebase/analytics'
import { getAnalytics } from 'firebase/analytics'
import type { Auth, User, UserCredential } from 'firebase/auth'
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from 'firebase/auth'

export class FirebaseService {
    private static firebaseApp: FirebaseApp | null = null
    private static firebaseAnalytics: Analytics | null = null
    private static firebaseAuth: Auth | null = null

    // Initialize Firebase with provided configuration
    public static async initialize(config: FirebaseOptions): Promise<void> {
        if (!this.firebaseApp) {
            this.firebaseApp = initializeApp(config)
            this.firebaseAnalytics = getAnalytics(this.firebaseApp)
            this.firebaseAuth = getAuth(this.firebaseApp)
        }
    }

    // Ensure Firebase Auth is initialized before using it
    private static ensureInitialized(): void {
        if (!this.firebaseAuth) {
            throw new Error(
                'Firebase is not initialized. Call FirebaseService.initialize() first.',
            )
        }
    }

    // Get Firebase App instance
    public static getFirebaseApp(): FirebaseApp | null {
        return this.firebaseApp
    }

    // Get Firebase Analytics instance
    public static getFirebaseAnalytics(): Analytics | null {
        return this.firebaseAnalytics
    }

    // Get Firebase Auth instance
    public static getFirebaseAuth(): Auth | null {
        return this.firebaseAuth
    }

    // User Signup with email and password
    public static async signup(
        email: string,
        password: string,
    ): Promise<UserCredential> {
        this.ensureInitialized()
        try {
            return await createUserWithEmailAndPassword(
                this.firebaseAuth!,
                email,
                password,
            )
        } catch (error: any) {
            throw new Error(this.mapFirebaseAuthError(error.code))
        }
    }

    // User Sign-In with email and password
    public static async signIn(
        email: string,
        password: string,
    ): Promise<UserCredential> {
        this.ensureInitialized()
        try {
            return await signInWithEmailAndPassword(
                this.firebaseAuth!,
                email,
                password,
            )
        } catch (error: any) {
            throw new Error(this.mapFirebaseAuthError(error.code))
        }
    }

    // Sign out the current user
    public static async signOut(): Promise<void> {
        this.ensureInitialized()
        try {
            await this.firebaseAuth!.signOut()
        } catch (error) {
            throw new Error('Error signing out.')
        }
    }

    // Get current user
    public static async getCurrentUser(): Promise<User | null> {
        this.ensureInitialized()
        return this.firebaseAuth!.currentUser
    }

    // Check if the user is authenticated
    public static async isAuthenticated(): Promise<boolean> {
        this.ensureInitialized()
        return !!this.firebaseAuth!.currentUser
    }

    // Send a verification email to the current user
    public static async sendVerificationEmail(): Promise<void> {
        this.ensureInitialized()
        try {
            if (this.firebaseAuth!.currentUser) {
                await sendEmailVerification(this.firebaseAuth!.currentUser)
            } else {
                throw new Error('No user is currently signed in.')
            }
        } catch (error) {
            throw new Error('Error sending verification email.')
        }
    }

    // Update current user's profile information
    public static async updateUserProfile({
        displayName = '',
        photoURL = '',
    }: {
        displayName?: string
        photoURL?: string
    }): Promise<void> {
        this.ensureInitialized()
        try {
            if (this.firebaseAuth!.currentUser) {
                await updateProfile(this.firebaseAuth!.currentUser, {
                    displayName,
                    photoURL,
                })
            } else {
                throw new Error('No user is currently signed in.')
            }
        } catch (error) {
            throw new Error('Error updating profile.')
        }
    }

    // Map Firebase Auth errors to custom messages
    public static mapFirebaseAuthError(errorCode: string): string {
        switch (errorCode) {
            case 'auth/invalid-credential':
                return 'The email address or password is incorrect.'
            case 'auth/email-already-in-use':
                return 'The email is already registered with another account.'
            case 'auth/weak-password':
                return 'The password is too weak.'
            case 'auth/user-not-found':
                return 'No account found with this email.'
            case 'auth/wrong-password':
                return 'Incorrect password.'
            default:
                return 'An unknown error occurred. Please try again.'
        }
    }

    // Get Firebase configuration from environment variables
    public static getFirebaseConfig(): FirebaseOptions {
        if (
            !process.env.PUBLIC_FIREBASE_API_KEY ||
            !process.env.PUBLIC_FIREBASE_AUTH_DOMAIN ||
            !process.env.PUBLIC_FIREBASE_PROJECT_ID ||
            !process.env.PUBLIC_FIREBASE_STORAGE_BUCKET ||
            !process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
            !process.env.PUBLIC_FIREBASE_APP_ID
        ) {
            throw new Error(
                'Firebase configuration is missing. Check your .env file.',
            )
        }

        return {
            apiKey: process.env.PUBLIC_FIREBASE_API_KEY!,
            authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN!,
            projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID!,
            storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET!,
            messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
            appId: process.env.PUBLIC_FIREBASE_APP_ID!,
            measurementId: process.env.PUBLIC_FIREBASE_MEASUREMENT_ID!,
        }
    }
}
