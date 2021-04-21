import { IconButton } from '@chakra-ui/button'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import styles from '../../../styles/frontend/Searchbar.module.css'

interface SearchbarProps { }

export const Searchbar: React.FC<SearchbarProps> = ({ }) => {
    return (
        <div className={styles.searchBox}>
            <input 
                className="w-full" 
                type="text" 
                name="search" 
                placeholder="Cari..."
                autoComplete="off" />
            <IconButton
                className={styles.searchButton}
                aria-label="Search"
                icon={<BiSearch color="white"/> }
            />
        </div>
    );
}