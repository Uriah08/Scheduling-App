'use client'

import CreateSection from "@/components/dialogs/CreateSection";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Course } from "@/generated/prisma";
import { useGetAllQuery, useGetScheduleQuery, useGetAssignedCourseQuery, useGetTestQuery } from "@/store/api";
import { use, useMemo, useState } from 'react';

const SchedulePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: schedule, isLoading: scheduleLoading, error } = useGetScheduleQuery(id);
  const { data: allData, isLoading: allLoading } = useGetAllQuery(id)
  const [ openSectionDialog, setOpenSectionDialog ] = useState(false)
  const { data: assigned, isLoading: assignLoading } = useGetAssignedCourseQuery(id)
  const { data: sections, isLoading: sectionLoading } = useGetTestQuery(id)

  const groupedByProfessor = useMemo(() => {
  if (!assigned) return [];

  const map = new Map();

  assigned.forEach((item) => {
    const profId = item.professor?.id;
    const firstName = item.professor?.firstName;
    const lastName = item.professor?.lastName;
    const rank = item.professor?.acadRank
    if (!profId) return;

    if (!map.has(profId)) {
      map.set(profId, {
        professorId: profId,
        profName: `${firstName} ${lastName}`,
        acadRank: rank,
        courses: [],
      });
    }

    map.get(profId).courses.push(item.course);
  })

  return Array.from(map.values());
}, [assigned]);

  console.log(groupedByProfessor);

  if(!schedule) return <div>Error</div>

  if (scheduleLoading || allLoading || assignLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading schedule</div>;
  
  return (
    <div className="p-5 flex flex-col w-full h-full overflow-y-auto overflow-x-hidden">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold">{schedule.name}</div>
        <Dialog open={openSectionDialog} onOpenChange={setOpenSectionDialog}>
              <DialogTrigger asChild>
                <Button className='bg-[#0b6602] hover:bg-[#0b7804] text-white cursor-pointer'>Add Section</Button>
              </DialogTrigger>
              <CreateSection onOpenChange={setOpenSectionDialog} id={id}/>
            </Dialog>
      </div>
      <div className="grid xl:grid-cols-4 grid-cols-2 gap-5 mt-5">
        <div className="p-5 bg-[#035413] rounded-2xl flex flex-col">
          <h1 className="text-xl font-semibold text-white">Professors</h1>
          <h1 className="text-5xl font-bold mt-5 text-white">
            {allData?.data.professors.length}
          </h1>
        </div>
        <div className="p-5 bg-[#035413] rounded-2xl">
          <h1 className="text-xl font-semibold text-white">Courses</h1>
          <h1 className="text-5xl font-bold mt-5 text-white">
            {allData?.data.courses.length}
          </h1>
        </div>
        <div className="p-5 bg-[#035413] rounded-2xl">
          <h1 className="text-xl font-semibold text-white">Rooms</h1>
          <h1 className="text-5xl font-bold mt-5 text-white">
            {allData?.data.rooms.length}
          </h1>
        </div>
        <div className="p-5 bg-[#035413] rounded-2xl">
          <h1 className="text-xl font-semibold text-white">Sections</h1>
          <h1 className="text-5xl font-bold mt-5 text-white">
            {allData?.data.sections.length}
          </h1>
        </div>
      </div>
      <h1 className="text-xl font-semibold mt-5 w-full">Faculty Loading</h1>
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full h-full overflow-x-scroll border">
          {groupedByProfessor.map((item) => (
            <div key={item.professorId} className={`flex ${item[0] ? '' : 'border-b'}`}>
              <div className="flex w-full border-r min-w-[250px] h-full items-center justify-center">
                <h1>{item.profName}</h1>
              </div>
              <div className="flex w-full h-full border-r min-w-[250px] items-center justify-center">
                <h1>{item.acadRank}</h1>
              </div>
              <div key={item.id} className="flex flex-col min-w-[150px] border-r">
              {item.courses.map((course: Course, index: number) => (
                <h1 key={course.id} className={`${index === 0 ? '' : 'border-t'}`}>{course.code}</h1>
              ))}
              </div>
              <div key={item.id} className="flex flex-col min-w-[500px] w-fit">
              {item.courses.map((course: Course, index: number) => (
                <h1 key={course.id} className={`border-r ${index === 0 ? '' : 'border-t'}`}>{course.title}</h1>
              ))}
              </div>
              <div key={item.id} className="flex flex-col min-w-[300px] w-fit">
                {item.courses.map((course: Course) => (
                  <div key={course.id} className="flex items-center">
                    {sections?.sections
                      ?.filter((section) => section.year === course.year && section.type === course.program)
                      .map((section) => (
                        <h1 key={section.id}>
                          {section.type === 'Computer Science' ? 'BSCS' : 'BSIT'}
                          {section.year[0]}
                          {section.section}{",  "}
                        </h1>
                      ))}
                  </div>
                ))}
              </div>
              <div key={item.id} className="flex flex-col min-w-[100px] w-fit">
                {item.courses.map((course: Course) => {
                  const matchingSections = sections?.sections?.filter(
                    (section) =>
                      section.year === course.year &&
                      section.type === course.program
                  ) || [];

                  return (
                    <div key={course.id} className="flex items-center">
                      <h1>{matchingSections.length}</h1>
                    </div>
                  );
                })}
              </div>
              <div key={item.id} className="flex flex-col min-w-[100px] w-fit">
                {item.courses.map((course: Course) => {
                  return (
                    <div key={course.id} className="flex items-center">
                      <h1>{course.creditLec}</h1>
                    </div>
                  );
                })}
              </div>
              <div key={item.id} className="flex flex-col min-w-[100px] w-fit">
                {item.courses.map((course: Course) => {
                  return (
                    <div key={course.id} className="flex items-center">
                      <h1>{course.creditLab}</h1>
                    </div>
                  );
                })}
              </div>
              <div key={item.id} className="flex flex-col min-w-[100px] w-fit">
                {item.courses.map((course: Course) => {
                  return (
                    <div key={course.id} className="flex items-center">
                      <h1>{course.contactLec}</h1>
                    </div>
                  );
                })}
              </div>
              <div key={item.id} className="flex flex-col min-w-[100px] w-fit">
                {item.courses.map((course: Course) => {
                  return (
                    <div key={course.id} className="flex items-center">
                      <h1>{course.contactLab}</h1>
                    </div>
                  );
                })}
              </div>
              <div key={item.id} className="flex flex-col min-w-[100px] w-fit">
                {item.courses.map((course: Course) => {
                  const matchingSections = sections?.sections?.filter(
                    (section) =>
                      section.year === course.year &&
                      section.type === course.program
                  ) || [];

                  return (
                    <div key={course.id} className="flex items-center">
                      <h1>{(course.contactLab + course.contactLec) * matchingSections.length}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;