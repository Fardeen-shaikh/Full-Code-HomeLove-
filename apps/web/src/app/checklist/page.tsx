import type { Metadata } from 'next'
import { getChecklistProfiles } from '@/lib/api'
import ChecklistPage from '@/components/checklist/ChecklistPage'

export const metadata: Metadata = {
  title: 'Home Checklist',
  description:
    'Plan your home shopping before visiting HOMElove Home Expo. Tick what you need, compare at the expo, and shop smarter.',
}

export default async function Page() {
  const profiles = await getChecklistProfiles().catch(() => ({ docs: [] }))
  return <ChecklistPage profiles={profiles.docs} />
}
