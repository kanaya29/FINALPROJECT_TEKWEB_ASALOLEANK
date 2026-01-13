import React from "react";
import { useParams } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Event Detail</h1>
      <p>Event ID: {id}</p>
      <p>Halaman ini dikerjakan oleh anggota lain</p>
    </div>
  );
};

export default EventDetail;
