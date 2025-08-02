'use client'

import { useGetAllQuery, useGetScheduleQuery } from "@/store/api";
import { use } from 'react';

const SchedulePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: schedule, isLoading: scheduleLoading, error } = useGetScheduleQuery(id);
  const { data: allData, isLoading: allLoading } = useGetAllQuery()

  if(!schedule) return <div>Error</div>

  if (scheduleLoading || allLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading schedule</div>;
  
  return (
    <div>Schedule ID: {id}</div>
  );
};

export default SchedulePage;