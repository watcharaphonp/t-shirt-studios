import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import type { Analytics } from 'firebase/analytics'
import { getAnalytics } from 'firebase/analytics'
import type { Auth } from 'firebase/auth'
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

    public static async initialize(config: FirebaseOptions): Promise<void> {
        if (!this.firebaseApp) {
            this.firebaseApp = initializeApp(config)

            this.firebaseAnalytics = getAnalytics(this.firebaseApp)
            this.firebaseAuth = getAuth(this.firebaseApp)
        }
    }

    private static ensureInitialized(): void {
        if (!this.firebaseAuth) {
            throw new Error(
                'Firebase service is not initialized. Please call FirebaseService.initialize() first.',
            )
        }
    }

    public static getFirebaseApp(): FirebaseApp | null {
        return this.firebaseApp
    }

    public static getFirebaseAnalytics(): Analytics | null {
        return this.firebaseAnalytics
    }

    public static getFirebaseAuth(): Auth | null {
        return this.firebaseAuth
    }

    public static async signup(email: string, password: string): Promise<any> {
        this.ensureInitialized()
        return await createUserWithEmailAndPassword(
            this.firebaseAuth!,
            email,
            password,
        )
    }

    public static async signIn(email: string, password: string): Promise<any> {
        this.ensureInitialized()
        return await signInWithEmailAndPassword(
            this.firebaseAuth!,
            email,
            password,
        )
    }

    public static async signOut(): Promise<void> {
        this.ensureInitialized()
        await this.firebaseAuth!.signOut()
    }

    public static async getCurrentUser(): Promise<any> {
        this.ensureInitialized()
        return this.firebaseAuth!.currentUser
    }

    public static async isAuthenticated(): Promise<any> {
        this.ensureInitialized()
        return this.firebaseAuth!.currentUser !== null
    }

    public static mapFirebaseAuthError(errorCode: string): string {
        switch (errorCode) {
            case 'auth/invalid-credential':
                return 'The email address or password is incorrect.'
            case 'auth/email-already-in-use':
                return 'The email is already registered with another account.'
            default:
                return 'An unknown error occurred. Please try again.'
        }
    }

    public static getFirebaseConfig(): FirebaseOptions {
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

    public static async sendVerificationEmail(): Promise<void> {
        this.ensureInitialized()
        await sendEmailVerification(this.firebaseAuth!.currentUser!)
    }

    public static async updateUserProfile({
        displayName = '',
        photoURL = '',
    }: {
        displayName?: string
        photoURL?: string
    }): Promise<void> {
        this.ensureInitialized()
        await updateProfile(this.firebaseAuth!.currentUser!, {
            displayName,
            photoURL,
        })
    }
}
