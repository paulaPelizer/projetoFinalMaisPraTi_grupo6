import * as React from 'react'
import { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'

const Page0 = React.lazy(() => import('@/pages/index'))
const Page1 = React.lazy(() => import('@/pages/clients/index'))
const Page2 = React.lazy(() => import('@/pages/clients/new/index'))
const Page3 = React.lazy(() => import('@/pages/dashboard/index'))
const Page4 = React.lazy(() => import('@/pages/documents/index'))
const Page5 = React.lazy(() => import('@/pages/documents/new/index'))
const Page6 = React.lazy(() => import('@/pages/documents/routing/new/index'))
const Page7 = React.lazy(() => import('@/pages/documents/routing/[id]/grd/index'))
const Page8 = React.lazy(() => import('@/pages/grds/index'))
const Page9 = React.lazy(() => import('@/pages/planning/index'))
const Page10 = React.lazy(() => import('@/pages/projects/index'))
const Page11 = React.lazy(() => import('@/pages/projects/edit/index'))
const Page12 = React.lazy(() => import('@/pages/projects/new/index'))
const Page13 = React.lazy(() => import('@/pages/projects/[id]/index'))
const Page14 = React.lazy(() => import('@/pages/projects/[id]/documents/index'))
const Page15 = React.lazy(() => import('@/pages/projects/[id]/edit/index'))
const Page16 = React.lazy(() => import('@/pages/projects/[id]/planning/index'))
const Page17 = React.lazy(() => import('@/pages/projects/[id]/routing/index'))
const Page18 = React.lazy(() => import('@/pages/requests/index'))
const Page19 = React.lazy(() => import('@/pages/requests/attend/index'))
const Page20 = React.lazy(() => import('@/pages/requests/attend/generate-grds/index'))
const Page21 = React.lazy(() => import('@/pages/requests/new/index'))
const Page22 = React.lazy(() => import('@/pages/requests/tender/index'))
const Page23 = React.lazy(() => import('@/pages/requests/tender/generate-grds/index'))
const Page24 = React.lazy(() => import('@/pages/requests/[id]/index'))
const Page25 = React.lazy(() => import('@/pages/requests/[id]/generate-grd/index'))
const Page26 = React.lazy(() => import('@/pages/suppliers/index'))
const Page27 = React.lazy(() => import('@/pages/suppliers/new/index'))

const routes: RouteObject[] = [
  { path: "/", element: <Suspense fallback={null}><Page0 /></Suspense> },
  { path: "/clients", element: <Suspense fallback={null}><Page1 /></Suspense> },
  { path: "/clients/new", element: <Suspense fallback={null}><Page2 /></Suspense> },
  { path: "/dashboard", element: <Suspense fallback={null}><Page3 /></Suspense> },
  { path: "/documents", element: <Suspense fallback={null}><Page4 /></Suspense> },
  { path: "/documents/new", element: <Suspense fallback={null}><Page5 /></Suspense> },
  { path: "/documents/routing/new", element: <Suspense fallback={null}><Page6 /></Suspense> },
  { path: "/documents/routing/:id/grd", element: <Suspense fallback={null}><Page7 /></Suspense> },
  { path: "/grds", element: <Suspense fallback={null}><Page8 /></Suspense> },
  { path: "/planning", element: <Suspense fallback={null}><Page9 /></Suspense> },
  { path: "/projects", element: <Suspense fallback={null}><Page10 /></Suspense> },
  { path: "/projects/edit", element: <Suspense fallback={null}><Page11 /></Suspense> },
  { path: "/projects/new", element: <Suspense fallback={null}><Page12 /></Suspense> },
  { path: "/projects/:id", element: <Suspense fallback={null}><Page13 /></Suspense> },
  { path: "/projects/:id/documents", element: <Suspense fallback={null}><Page14 /></Suspense> },
  { path: "/projects/:id/edit", element: <Suspense fallback={null}><Page15 /></Suspense> },
  { path: "/projects/:id/planning", element: <Suspense fallback={null}><Page16 /></Suspense> },
  { path: "/projects/:id/routing", element: <Suspense fallback={null}><Page17 /></Suspense> },
  { path: "/requests", element: <Suspense fallback={null}><Page18 /></Suspense> },
  { path: "/requests/attend", element: <Suspense fallback={null}><Page19 /></Suspense> },
  { path: "/requests/attend/generate-grds", element: <Suspense fallback={null}><Page20 /></Suspense> },
  { path: "/requests/new", element: <Suspense fallback={null}><Page21 /></Suspense> },
  { path: "/requests/tender", element: <Suspense fallback={null}><Page22 /></Suspense> },
  { path: "/requests/tender/generate-grds", element: <Suspense fallback={null}><Page23 /></Suspense> },
  { path: "/requests/:id", element: <Suspense fallback={null}><Page24 /></Suspense> },
  { path: "/requests/:id/generate-grd", element: <Suspense fallback={null}><Page25 /></Suspense> },
  { path: "/suppliers", element: <Suspense fallback={null}><Page26 /></Suspense> },
  { path: "/suppliers/new", element: <Suspense fallback={null}><Page27 /></Suspense> }
]

export default routes
