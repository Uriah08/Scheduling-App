'use client'

import { useParams } from 'next/navigation'
import { useGetScheduleQuery } from '@/store/api'

export default function Page() {
  const params = useParams()
  
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetScheduleQuery(id);
  return <p>Post: {params.id}</p>
}
