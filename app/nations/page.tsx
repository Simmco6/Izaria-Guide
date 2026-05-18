import { Suspense } from "react"
import NationsClient from "@/components/NationsClient"

export default function Page() {
  return (
    <Suspense>
      <NationsClient />
    </Suspense>
  )
}