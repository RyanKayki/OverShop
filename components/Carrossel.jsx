import React, { useState, useEffect } from 'react';

export default function Carrossel({ onChangeBackground }) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Função para alterar o fundo da página
    const handleSlideChange = (index) => {
        setActiveIndex(index);
        if (onChangeBackground) {
            // Passa a cor de fundo dependendo da imagem
            onChangeBackground(index === 0 ? 'black' : 'gray'); // Exemplo de fundo para diferentes banners
        }
    };

    useEffect(() => {
        // Inicializa o fundo da página com base no banner ativo (primeiro)
        onChangeBackground && onChangeBackground('black');
    }, [onChangeBackground]);

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" onSlide={(e) => handleSlideChange(e.to)}>
            <div className="carousel-inner">
                {/* Primeira imagem - Ativa */}
                <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
                    <img
                        src="carrossel/bannerMsi.png"
                        className="d-flex justify-content-center w-100 mx-auto"
                        style={{ height: '450px' }}
                        alt="Imagem 1"
                    />
                </div>

                {/* Segunda imagem */}
                <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
                    <img
                        src="carrossel/bannerAorus1.png"
                        className="d-flex justify-content-center w-100 mx-auto"
                        style={{ height: '450px' }}
                        alt="Imagem 2"
                    />
                </div>
            </div>

            {/* Controles do carrossel */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
