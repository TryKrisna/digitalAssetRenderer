import dynamic from 'next/dynamic'

const TemplateRenderer = dynamic(() => import('../components/TemplateRenderer.js'), { ssr: false })

export default function Main() {
  return <TemplateRenderer />
}
