import { Tab, TabList, Tabs as TabContainer } from '@chakra-ui/tabs'
import React from 'react'

interface TabsProps { }

export const Tabs: React.FC<TabsProps> = ({ }) => {
    return (
        <TabContainer className="w-full">
            <TabList>
                <Tab _selected={{borderColor: 'gold.300'}}>Beranda</Tab>
                <Tab _selected={{borderColor: 'gold.300'}}>Kategori</Tab>
            </TabList>
        </TabContainer>
    );
}