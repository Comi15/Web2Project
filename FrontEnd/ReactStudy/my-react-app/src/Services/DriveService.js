import axios from "axios";
import { useEffect,useState } from "react";


export const AddDrive = (Drive) => {

    const config = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
      return axios.post(`${process.env.REACT_APP_API_URL}/api/drives/add`,Drive,config)
      
}

export const GetDrives =() =>{
    
    const config = 
    {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
     
     return axios.get(`${process.env.REACT_APP_API_URL}/api/drives`,config)
               
    }


    export const DoAcceptDrive = (id,driverId) => {
        const config = {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        }
       return axios.put(`${process.env.REACT_APP_API_URL}/api/drives/${id}`,driverId,config)
           
       
    }


export const GetDriverId =(driveId) =>{
    const config = 
    {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
    return axios.get(`${process.env.REACT_APP_API_URL}/api/drives/${driveId}`,config)
}

export const GetEstimatedTime = (driveId) =>{
    const config = { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } };
    return axios.get(`${process.env.REACT_APP_API_URL}/estimated-time/${driveId}`, config);
}


export const DoRateDriver = (driverId,rating) => {
    const config = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
   return axios.put(`${process.env.REACT_APP_API_URL}/rating/${driverId}`,rating,config)
     
   
   
}

export const FinishDrive = (driveId) => {
    const config = {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    }
   return axios.put(`${process.env.REACT_APP_API_URL}/drive/finished/${driveId}`,{},config)
     
   
   
}