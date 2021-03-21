import React, { ReactElement } from 'react'

interface loadingOrQueryFailedProps {
    data: any;
    error: any;
    loading: boolean
}

type ReactElementOrUndefined = ({ }: loadingOrQueryFailedProps) => ReactElement | undefined

export const loadingOrQueryFailed: ReactElementOrUndefined = ({ data, error, loading }) => {
    let issue;

    if (!loading && !data) {
        issue = (
            <div>
                <div>you got query failed for some reason</div>
                <div>{error?.message}</div>
            </div>
        )
    }

    if (!data && loading) {
        issue = <div>loading...</div>
    }

    return issue
}