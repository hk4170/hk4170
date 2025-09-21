import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Card } from '@/components/ui/card'

export default function Index() {
  const router = useRouter()
  // useEffect(() => {
    // router.replace('/')
  // })
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-red-900">Index</h1>
    </div>
  )
}