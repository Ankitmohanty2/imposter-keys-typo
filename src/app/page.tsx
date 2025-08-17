import { Suspense } from "react"
import ImposterKeysTypo from "./components/imposter-keys-typo"

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ImposterKeysTypo />
    </Suspense>
  )
}