"use client"

import "./scrollbox.css";


const Announcement = ({announcements}: {announcements: string[]}) => {
  return (
    <div className="bg-[#2948cd] py-4 overflow-hidden rounded">
      <div className="whitespace-nowrap overflow-hidden">
        <div className="inline-block animate-scroll">
          <div className="inline-flex">
            {announcements.map((item, index) => (
              <span key={index} className="px-12 text-white">{item}</span> // Added text-white for visibility
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;