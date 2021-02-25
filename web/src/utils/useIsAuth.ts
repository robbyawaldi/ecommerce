import { useRouter } from "next/router"
import React from "react"
import { useMeQuery } from "../generated/graphql"

export const useIsAuth = () => {
    const { data, loading} = useMeQuery()
    const router = useRouter()

    React.useEffect(() => {
        if (!loading && !data?.me) {
            router.replace({
                pathname: '/adm/login',
                query: { next: router.pathname }
            })
        }
    }, [loading, data, router])
}