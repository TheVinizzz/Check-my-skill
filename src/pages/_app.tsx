import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {

	useEffect(() => {
		const handleStart = (url: string) => {
			NProgress.start()
		}
		const handleStop = (url: string) => {
			NProgress.done()
		}
		const handleError = () => {
			NProgress.done()
		}

		Router.events.on('routeChangeStart', handleStart)
		Router.events.on('routeChangeComplete', handleStop)
		Router.events.on('routeChangeError', handleError)

		return () => {
			Router.events.off('routeChangeStart', handleStart)
			Router.events.off('routeChangeComplete', handleStop)
			Router.events.off('routeChangeError', handleError)
		}
	}, [Router])

	return (
		<>
			<Head>
				<link rel="stylesheet" type="text/css" href="/nprogress.css" />
				<script data-ad-client="ca-pub-2468919422804006" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
				<title>Minhas Habilidades</title>
			</Head>

			<>
				<Toaster position="bottom-right" reverseOrder={false} />
				<Component {...pageProps} />
			</>
		</>
	)
}
export default MyApp
