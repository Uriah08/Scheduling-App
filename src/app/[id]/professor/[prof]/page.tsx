import React from 'react'

const ProfessorPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);   
  return (
    <div>ProfessorPage</div>
  )
}

export default ProfessorPage