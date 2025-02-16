'use client'

import Split from 'react-split'
import { BlogPostsPage } from '@/components/(appPages)/homepage/BlogPostPage'
import { MarketplacePage } from '@/components/(appPages)/marketplace/MarketplacePage'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Split
        className="split-container"
        sizes={[80, 20]}
        minSize={300}
        gutterSize={12}
        snapOffset={30}
        gutter={(index, direction) => {
          const gutter = document.createElement('div')
          gutter.className = `gutter gutter-${direction}`
          return gutter
        }}
      >
        <div className="split-panel">
          <BlogPostsPage />
        </div>
        <div className="split-panel">
          <MarketplacePage />
        </div>
      </Split>
    </QueryClientProvider>
  )
}
