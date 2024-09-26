"use client"

import { useAddAnnouncementMutation } from "@/services/announcementService";
import { Button, TextField } from "@mui/material";
import { useState } from "react";


const SetAnnouncement = ({refetch}: {refetch: () => void}) => {

    const [ announce, setAnnounce ] = useState<string>('')
    const [ addAnnouncement ] = useAddAnnouncementMutation({})

    const submitAnnouncement = async () => {
        await addAnnouncement({announcement: announce})        
        refetch()
        setAnnounce('')
    }

    return (
        <div className="w-full flex items-center gap-2">
            <TextField className="w-full text-center" value={announce} id="announcement" onChange={(e) => setAnnounce(e.target.value)} />
            <Button variant="contained" color="primary" onClick={() => submitAnnouncement()}>Set Announcement</Button>
        </div>
    )
}

export default SetAnnouncement; 