import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export function VercelIntegrations() {
  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  )
}
