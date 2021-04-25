import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import React from 'react'
import styles from '../../../styles/frontend/ProductDetail.module.css'
import { Detail } from '../atoms/Detail';
import { Size } from '../atoms/Size';

interface ProductDetailProps { }

export const ProductDetail: React.FC<ProductDetailProps> = ({ }) => {
    return (
        <div className={styles.box}>
            <Tabs>
                <TabList>
                    <Tab _selected={{ borderBottomColor: '#B38426'}}>Detail</Tab>
                    <Tab _selected={{ borderBottomColor: '#B38426'}}>Panduan Ukuran</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Detail />
                    </TabPanel>
                    <TabPanel>
                        <Size />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}