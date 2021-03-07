export const loadingOrQueryFailed = (data: any, loading: boolean, error: any) => {
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