import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectToProdutos() {
  const router = useRouter();

  useEffect(() => {
    router.push('/produtos');
  }, []);

  return null;
}
