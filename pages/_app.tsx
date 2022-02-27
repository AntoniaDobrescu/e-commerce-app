import '../styles/global.css'
import { AppProps } from 'next/app'
import { AppWrapper } from '../context/productsContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
