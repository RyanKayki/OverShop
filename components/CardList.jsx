import React from 'react';
import CardProdutos from './CardProdutos';

export default function CardList({ produtos }) {
    return (
        <div className="bg-light p-4 mx-auto" style={{ width: '100%' }}>
            <div className="d-flex flex-wrap gap-4">
                {Array.isArray(produtos) && produtos.length > 0 ? (
                    produtos.map((produto, index) => (
                        <div
                            key={index}
                            style={{ flex: '1 1 300px', maxWidth: '350px' }}
                        >
                            <CardProdutos
                                id={produto[0]}
                                img={produto[1]}
                                nome={produto[2]}
                                descricao={produto[3]}
                                preco={parseFloat(produto[4])}
                                quantidade={produto[5]}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-center w-100 text-muted">Nenhum produto disponível.</p>
                )}
            </div>
        </div>
    );
}
