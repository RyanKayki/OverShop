import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Link from 'next/link';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const ProdutoImagem = ({ img, nome }) => (
  <img
    src={img}
    alt={nome}
    style={{
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      borderRadius: '8px',
    }}
  />
);

const ProdutoInfo = ({ nome, id, preco, quantidade, rating }) => (
  <CardContent>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '1.25rem',
      }}
    >
      <Link href={`${id}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
        {nome}
      </Link>
      <ArrowOutwardIcon style={{ marginLeft: '5px' }} />
    </div>

    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
      <Rating
        name="product-rating"
        value={rating}
        precision={0.5}
        readOnly
        size="small"
        sx={{ color: '#FFD700' }}
      />
      <Chip
        label="Promoção"
        size="small"
        color="success"
        sx={{ marginLeft: 'auto', marginRight: 1 }}
      />
    </div>

    <div style={{ marginTop: '8px', color: '#6c757d', fontSize: '0.875rem' }}>
      ({quantidade} {quantidade === 1 ? 'unidade' : 'unidades'} em estoque)
    </div>
  </CardContent>
);

const AdicionarCarrinhoButton = ({ onAddToCart, preco }) => (
  <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div
      style={{
        fontSize: '1.125rem',
        color: '#212529',
        marginRight: '10px',
      }}
    >
      R$ {preco.toFixed(2)}
    </div>
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={onAddToCart}
      sx={{
        backgroundColor: '#00B0B9',
        '&:hover': { backgroundColor: '#008C8D' },
      }}
    >
      Adicionar ao carrinho
    </Button>
  </CardActions>
);

export default function CardProduto({ id, nome, preco, quantidade, img, onAddToCart, rating = 5 }) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        id,
        nome,
        preco,
        quantidade,
        img,
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 320, boxShadow: 3, borderRadius: 2, margin: 2, padding: 2 }}>
      <ProdutoImagem img={img} nome={nome} />
      <ProdutoInfo
        nome={nome}
        id={id}
        preco={preco}
        quantidade={quantidade}
        rating={rating}
      />
      <AdicionarCarrinhoButton onAddToCart={handleAddToCart} preco={preco} />
    </Card>
  );
}
