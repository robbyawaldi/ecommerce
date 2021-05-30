import Head from "next/head"
import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Layouts } from "../components/frontend/templates/Layouts"
import { withApollo } from "../utils/withApollo"

const Test = () => {
    const [open, setOpen] = useState(false);

    return (
        <Layouts>
            <Head>
                <title>Test</title>
            </Head>
            <button onClick={() => setOpen(!open)}>
                {open ? "CLOSE" : "OPEN"} SHEET
            </button>
            <BottomSheet
                open={open}
                onDismiss={() => setOpen(false)}
                header={<div className="sheetHeader">SHEET HEADER</div>}
                snapPoints={({ maxHeight }) => maxHeight}
                sibling={<div className="sheetFooter">YOUR MAIN FOOTER</div>}
            >
                <div className="sheetBody">SHEET BODY</div>
            </BottomSheet>
        </Layouts>
    )
}

export default withApollo({ ssr: true })(Test)