import Link from 'next/link'
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Header(props) {

    const [busca, setBusca] = useState("")
    // Inicializa o hook useRouter para obter informações sobre a rota atual
    const router = useRouter()
    
    // Função para atualizar o estado de busca com o valor do input
    const atualiza = (event) => {
        setBusca(event.target.value)
    }

    // Função para lidar com o envio do formulário de busca
    const handleSearchSubmit = (event) => {
        // Evita a recarga da página ao enviar o formulário
        event.preventDefault()
        // Chama a função de busca passada via props com o termo de busca
        if (props.funcao) {
            props.funcao(busca)
        } else {
            console.log("Buscando por:", busca)
        }
    }

    const [mostrarInput, setMostrarInput] = useState(false)

    const toggleInput = () => {
    setMostrarInput(!mostrarInput)
}

    return (
        <nav className="navbar navbar-expand-lg bg-white border-b-2 border-black" data-bs-theme="white">
            <div className="container-fluid" >
                <img src="logo/logomarca.png" className={styles.img}/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0  d-flex justify-content-between w-100">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Notebooks</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/produtos">Computadores</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/produtos">Impressoras</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/contatos">Peças de Pc</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/contatos">Reparo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/contatos">Outros Produtos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/contatos">Contatos</Link>
                        </li>
                        <li>
                            {props.title}
                        </li>
                    </ul>
                    {router.pathname == '/produtos' && (
                        <form className="d-flex align-items-center gap-2" role="search" onSubmit={handleSearchSubmit}>
                            {mostrarInput && (
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    value={busca}
                                    onChange={atualiza}
                                    placeholder="Buscar"
                                    autoFocus
                                />
                            )}
                            <button
                                className="btn btn-outline-white"
                                type={mostrarInput ? "submit" : "button"}
                                onClick={mostrarInput ? undefined : toggleInput}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.397h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.105a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
                                </svg>
                            </button>

                            {/* Botão do carrinho */}
                            <Link href="/carrinho" className="btn btn-outline-white p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 5H14.5a.5.5 0 0 1 .49.598l-1.5 7A.5.5 0 0 1 13 13H4a.5.5 0 0 1-.491-.408L1.01 2H.5a.5.5 0 0 1-.5-.5zM3.14 6l1.25 5h8.222l1.25-5H3.14zM5 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                            </Link>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    )
}