import Head from "next/head";
import React from "react";
import { PageNotFound } from "../components/frontend/atoms/PageNotFound";
import { Layouts } from "../components/frontend/templates/Layouts";
import { withApollo } from "../utils/withApollo";

const NotFound = () => {
    return (
        <Layouts>
            <Head>
                <title>404 - Halaman tidak ditemukan</title>
            </Head>
            <PageNotFound />
        </Layouts>
    )
}

export default withApollo({ ssr: false })(NotFound)