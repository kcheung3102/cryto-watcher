import { Container } from '@mui/material'
import React from 'react'
import { Banner } from '../components/Banner/Banner';
import { CoinTable } from '../components/CoinTable/CoinTable';

export const Home = () => {
    //components: Banner, Table and a search component
    return (
            <>
            <Banner />
            <Container>
            <CoinTable />

            </Container>
            </>
    )
}
