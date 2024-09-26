"use client"

import React from 'react';
import { ProfilesType } from '@/models/movie';
import Image from 'next/image';

interface AdminMovieDetailsProps {
  profile: ProfilesType;
}

const AdminMovieDetails: React.FC<AdminMovieDetailsProps> = ({ profile }) => {
  const decodeActors = (encodedActors: string | null): string[] => {
    if (!encodedActors) return [];
    try {
      const decodedString = decodeURIComponent(encodedActors);
      return JSON.parse(decodedString);
    } catch (error) {
      console.error("Error decoding actors:", error);
      return [];
    }
  };

  const actors = decodeActors(profile.actor);

  // Parse actor_images if it's a string
  const actorImages = typeof profile.actor_images === 'string' 
    ? JSON.parse(profile.actor_images) 
    : profile.actor_images;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{profile.title || 'Untitled Movie'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          {profile.image && (
            <Image 
              width={300} 
              height={450} 
              src={profile.image} 
              alt={profile.title || 'Movie poster'} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          )}
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <p className="text-gray-600"><span className="font-semibold">Description:</span> {profile.des || 'No description available'}</p>
          <p className="text-gray-600"><span className="font-semibold">Release Date:</span> {profile.release_date || '-'}</p>
          <p className="text-gray-600"><span className="font-semibold">Duration:</span> {profile.duration || '-'}</p>
          <p className="text-gray-600"><span className="font-semibold">Genre:</span> {profile.genre || '-'}</p>
          <p className="text-gray-600"><span className="font-semibold">Actors:</span> {actors.length > 0 ? actors.join(', ') : '-'}</p>
          <p className="text-gray-600"><span className="font-semibold">Producer:</span> {profile.producer || '-'}</p>
          <p className="text-gray-600"><span className="font-semibold">Location:</span> {profile.location || '-'}</p>
          <p className="text-gray-600"><span className="font-semibold">Number of Episodes:</span> {profile.number_ep || 'N/A'}</p>
          <p className="text-gray-600"><span className="font-semibold">View Count:</span> {profile.view_count || '0'}</p>
          <p className="text-gray-600"><span className="font-semibold">Status:</span> 
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${profile.status ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {profile.status ? 'Active' : 'Inactive'}
            </span>
          </p>
          <p className="text-gray-600"><span className="font-semibold">Video Status:</span> 
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${profile.statusvideo ? 'bg-blue-200 text-blue-800' : 'bg-yellow-200 text-yellow-800'}`}>
              {profile.statusvideo ? 'Available' : 'Unavailable'}
            </span>
          </p>
        </div>
      </div>
      {actorImages && Object.keys(actorImages).length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Actor Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.entries(actorImages).map(([name, imageUrl]) => (
              <div key={name} className="relative aspect-square">
                <Image
                  src={imageUrl as string}
                  alt={`Actor ${name}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-md"
                />
                <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-1 text-sm">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <p className="text-gray-600"><span className="font-semibold">Created By:</span> {profile.createdBy || 'Unknown'}</p>
        <p className="text-gray-600"><span className="font-semibold">Created Date:</span> {profile.createdDate || 'Unknown'}</p>
        <p className="text-gray-600"><span className="font-semibold">Updated By:</span> {profile.updatedBy || 'Unknown'}</p>
        <p className="text-gray-600"><span className="font-semibold">Updated Date:</span> {profile.updatedDate || 'Unknown'}</p>
      </div>
    </div>
  );
};

export default AdminMovieDetails;