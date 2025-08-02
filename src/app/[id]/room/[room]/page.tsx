import React from 'react'

const RoomPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);    
  return (
    <div>RoomPage</div>
  )
}

export default RoomPage