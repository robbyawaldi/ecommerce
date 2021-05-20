import React, { ReactElement } from 'react'
import styles from '../styles/frontend/LoadingAndFailed.module.css'
import { isServer } from './isServer';

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
                <div>something error</div>
                <div>{error?.message}</div>
            </div>
        )
    }

    if (!data && loading) {
        if (!isServer()) document.querySelector("body")?.classList.add(styles.body)
        issue = <div className={styles.preloader}></div>
    } else {
        if (!isServer()) document.querySelector("body")?.classList.remove(styles.body)
    }

    return issue
}