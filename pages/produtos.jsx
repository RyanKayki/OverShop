import React, { useState, useEffect } from 'react';
import CardList from '@/components/CardList';
import Header from '../components/Header';
import TituloProd from '../components/TituloProd';
import { getProdutos } from '@/services/apiProduto'
import Carrossel from '../components/Carrossel'


export default function Produtos() {
    const [produtos, setProdutos] = useState([])
    const [resultado, setResultado] = useState(null)

    async function buscaProdutos() {
        try {
            const data = await getProdutos()
            setProdutos(data)
        } catch (error) {
            console.error('Erro ao buscar produtos:', error)
        }
    }

    useEffect(() => {
        buscaProdutos()
    }, [])

    return (
        <div className="bg-black">
            <Header />
            <Carrossel />
            <CardList produtos={resultado || produtos} />
        </div>
    )
}
