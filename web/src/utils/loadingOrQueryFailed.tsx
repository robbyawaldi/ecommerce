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

    // if ((!data || loading) && !isServer())
    //     document.querySelector("body")?.classList.add(styles.body)


    if (!loading && !data)
        issue = (
            <>
            </>
            // <div className={styles.error}>
            //     <h1>Oh Tidak</h1>, Ada yang salah 😱
            // </div>
        )
    else if (!data && loading)
        issue = <div className={styles.preloader}></div>
    else
        if (!isServer()) document.querySelector("body")?.classList.remove(styles.body)

    return issue
}