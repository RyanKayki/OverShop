import Titulo from '@/components/Titulo'
import Header from '../components/Header'
import Carrossel from '../components/Carrossel'

export default function Home() {
  return (
    <>
      <Header />
      <Carrossel />
      <Titulo texto="Bem vindo à papelaria Rabisco!"/>
    </>
  )
}