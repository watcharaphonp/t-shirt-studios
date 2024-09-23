// useFirebase.ts
import type { FirebaseOptions } from 'firebase/app'
import { useEffect, useState } from 'react'
import { FirebaseService } from '~/services/FirebaseService'

const useFirebase = (firebaseConfig: FirebaseOptions) => {
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const initializeFirebase = async () => {
            try {
                await FirebaseService.initialize(firebaseConfig)
            } catch (initError) {
                setError(
                    'Firebase initialization failed: ' +
                        (initError as Error).message,
                )
            }
        }

        initializeFirebase()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { error }
}

export default useFirebase
