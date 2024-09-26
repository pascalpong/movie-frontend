"use client"

import BannerTable from '@/components/BannerTable';
import DragAndDrop from '@/components/DragAndDrop';
import SetAnnouncement from '@/components/SetAnnouncement';
import { BannerType } from '@/models/ad';
import { AnnouncementType } from '@/models/announcement';
import { useDeleteAnnouncementMutation, useGetAnnouncementsQuery, useUpdateAnnouncementMutation } from '@/services/announcementService';
import { useGetBannersQuery } from '@/services/bannerService';
import withAuth from '@/utils/withAuth';
import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';

const AdminPage = () => {

  const { data: getBanners, refetch: refetchBanner } = useGetBannersQuery({})
  const [banners, setBanners] = useState<BannerType[]>([])
  const { data: getAnnouncements, refetch: refetchAnnouncement } = useGetAnnouncementsQuery({active: null})
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([])

  const [updateStatus] = useUpdateAnnouncementMutation()
  const [deleteAnnouncement] = useDeleteAnnouncementMutation()

  useEffect(() => {
    if(getBanners)
      setBanners(getBanners.data)
  },[getBanners])

  useEffect(() => {
    if(getAnnouncements) 
      setAnnouncements(getAnnouncements.data)
  },[getAnnouncements])

  const changeStat = async (id: string) => {
    await updateStatus(id)
    refetchAnnouncement()
  }

  const deleteAnnounce = async (id: string) => {
    await deleteAnnouncement(id)
    refetchAnnouncement()
  }
  return (
    <div className='p-4 flex flex-col gap-2'>
      <div className='w-full h-full p-4 bg-current'>
        <h1 className='text-gray-600 text-3xl'>Set Announcement</h1>
        <SetAnnouncement refetch={refetchAnnouncement}/>
        <div className='flex flex-wrap gap-2 pt-2'>
          {announcements && announcements.map((announce: AnnouncementType, index: number) => (
            <Chip key={index} 
              label={announce.announcement}
              color={announce.status ? 'success' : 'primary'}
              variant={announce.status ? 'filled' : 'outlined'}
              onDelete={() => deleteAnnounce(announce._id)}
              onClick={() => changeStat(announce._id)}
            />
          ))}
        </div>
      </div>
      <div className='w-full h-full p-4 bg-current'>
        <h1 className='text-gray-600 text-3xl'>Set Banners</h1>
        <div className='flex flex-col gap-2'>
          <DragAndDrop refetch={refetchBanner}/>
          <BannerTable banners={banners} refetch={refetchBanner}/>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminPage);