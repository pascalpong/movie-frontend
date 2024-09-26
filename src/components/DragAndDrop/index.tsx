"use client";

import React, { useState, DragEvent, ChangeEvent } from "react";
import { Box, Typography, CircularProgress, IconButton, TextField } from "@mui/material";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePostBannerMutation } from "@/services/bannerService";
import { toast } from "react-toastify";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Dayjs } from 'dayjs';

const DragAndDrop = ({refetch}: {refetch: () => void}) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState<string | null>(null);
  const [files, setFile] = useState<File | null>(null);
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [untilDate, setUntilDate] = useState<Dayjs | null>(null);
  const [url, setUrl] = useState<string>('');
  const [shopName, setShopName] = useState<string>('');
  const [postBanner] = usePostBannerMutation();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      updateImagePreviews(files);
    }
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const files = Array.from(event.dataTransfer.files);
      updateImagePreviews(files);
    }
  };

  const handleResetImage = () => {
    setFileInfo(null);
    setFile(null);
    setImagePreviews([]);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const updateImagePreviews = (files: File[]) => {
    setFile(files[0]);
    setLoading(true);
    const previews = files.map((file) => URL.createObjectURL(file));
    const fileSize = files.reduce((acc, file) => acc + file.size, 0);
    setFileInfo(`Image (${(fileSize / (1024 * 1024)).toFixed(2)} MB)`);
    setImagePreviews(previews);
    setLoading(false);
  };

  const handleDelete = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFileInfo(null);
    setFile(null);
  };

  const handleSubmit = async () => {
    if (files) {
      try {
        const formData = new FormData();
        formData.append("file", files);
        if (fromDate) formData.append("add_time", fromDate.toISOString());
        if (untilDate) formData.append("until", untilDate.toISOString());
        if (url) formData.append("url", url);
        if (shopName) formData.append("shop_name", shopName);

        const response = await postBanner(formData).unwrap();
        toast.success(response.data?.message);
        handleResetImage();
        setFromDate(null);
        setUntilDate(null);
        setUrl('');
        setShopName('');

        refetch();
      } catch (error) {
        toast.error("Failed to upload banner");
      }
    } else {
      toast.error("Please select an image");
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <div>
        <Box className="flex flex-col items-center p-2 border border-gray-300 rounded-lg shadow-md">
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            className="hidden"
            id="file-upload"
            accept=".jpg,.jpeg,.png"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full max-w-md p-4 text-center transition border-2 border-blue-500 border-dashed cursor-pointer hover:bg-blue-50"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <CloudUploadIcon
              className="mb-1 text-blue-500"
              style={{ fontSize: "36px" }}
            />
            <Typography variant="body1" className="text-blue-600">
              Choose files or drag and drop
            </Typography>
            {fileInfo && (
              <Typography variant="body2" className="text-gray-500">
                {fileInfo}
              </Typography>
            )}
          </label>
          <div className="flex flex-wrap justify-center mt-2">
            {loading ? (
              <CircularProgress />
            ) : (
              imagePreviews.map((src, index) => (
                <div key={index} className="relative m-1 group">
                  <Image
                    src={src}
                    alt={`Preview ${index}`}
                    className="object-cover transition-transform duration-200 rounded shadow-md group-hover:scale-105"
                    width={80}
                    height={80}
                  />
                  <IconButton
                    onClick={() => handleDelete(index)}
                    className="absolute text-red-500 transition-opacity bg-white opacity-0 top-1 right-1 group-hover:opacity-100 hover:bg-red-500 hover:text-white"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))
            )}
          </div>
        </Box>
      </div>
      <div className="flex flex-col gap-2 justify-between">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label={'from'} 
            value={fromDate}
            onChange={(newValue) => setFromDate(newValue)}
          />
          <DatePicker 
            label={'until'} 
            value={untilDate}
            onChange={(newValue) => setUntilDate(newValue)}
          />
        </LocalizationProvider>
      </div>
      <div className="flex flex-col gap-2 justify-between">
        <TextField 
          id="url" 
          label="URL" 
          variant="outlined" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <TextField 
          id="shopName" 
          label="Shop name" 
          variant="outlined" 
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="h-full w-full text-white transition bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DragAndDrop;
