import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react'
import { Product } from '../../../generated/graphql';
import styles from '../../../styles/frontend/ProductDetail.module.css'
import { Size } from '../atoms/Size';

interface ProductDetailProps {
    product: Product | undefined
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    return (
        <div className={styles.box}>
            <Tabs>
                <TabList>
                    <Tab _selected={{ borderBottomColor: '#B38426' }}>Detail</Tab>
                    <Tab _selected={{ borderBottomColor: '#B38426' }}>Panduan Ukuran</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div dangerouslySetInnerHTML={{ __html: product?.detail ?? "" }}></div>
                    </TabPanel>
                    <TabPanel>
                        <Size />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}