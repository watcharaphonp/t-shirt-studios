import type { MetaFunction } from '@remix-run/react'
import { json } from '@remix-run/react'
import LoginForm from '~/components/LoginForm'
import { routeConfig } from '~/configs'
import { useGenerateMeta } from '~/hooks/useGenerateMeta'

export function loader() {
    return json(routeConfig)
}

export const meta: MetaFunction = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const metaTags = useGenerateMeta()

    return metaTags
}

export default function Login() {
    return <LoginForm />
}
