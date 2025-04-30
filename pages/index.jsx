import { useEffect } from 'react'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/produtos')
  }, [])

  return null
}
