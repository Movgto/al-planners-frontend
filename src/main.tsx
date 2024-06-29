import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ParallaxProvider } from 'react-scroll-parallax'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ParallaxProvider>
        <Router />
        <ReactQueryDevtools />
      </ParallaxProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
