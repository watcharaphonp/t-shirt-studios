import { useMatches } from '@remix-run/react'

export const useGenerateMeta = (routeId: string, defaultPageName: string) => {
    const matches = useMatches()
    const match = matches.find((match: { id: string }) => match.id === routeId)

    const data: any = match?.data

    const appName = data?.appName || 'Default App Name'
    const title = `${appName} - ${defaultPageName}`
    const description = data?.description || 'Default description for the page.'

    return [
        { title },
        { property: 'og:title', content: title },
        { name: 'description', content: description },
    ]
}
