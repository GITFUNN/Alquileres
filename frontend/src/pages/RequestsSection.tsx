import { getJoiningRequests, getApartmentNumber, getCondominiumName} from "../api/joining";
import { getSenderEmail } from "../api/user";
import { toast } from 'react-hot-toast';
import { useQuery ,useMutation, useQueryClient, } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import SetRenterPage from './setRenter';
import SetRequestState from "./SetRequestState";
import jjrequest from '../assets/jjrequest.svg';

interface Requests {
    id:number;
    recipient:number; 
    sender:number; 
    apartment:number; 
    condominium:number;
    timestamp:string;
    active:boolean; 
    rejected:boolean;
    senderEmail?: string;
  apartmentDetails?: string;  
  condominiumDetails?: string;  
}
const TruncateDate = ({timestamp}:{timestamp:string})=>{
  const truncatedDate = timestamp.slice(0,10)
  return truncatedDate
};

const RequestsSection = () => {
  const queryClient = useQueryClient()
  const { data, error } = useQuery({
    queryKey: ['requests'],
    queryFn: getJoiningRequests,
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const enrichedData = await Promise.all(data?.map(async (request: Requests) => {
          const senderEmailData = await getSenderEmail(request.sender);
          const senderEmail = senderEmailData?.email
          const apartmentDetailsData = await getApartmentNumber(request.apartment);
          const apartmentDetails = apartmentDetailsData?.number
          const condondominiumDetailsData = await getCondominiumName(request.condominium);
          const condominiumDetails = condondominiumDetailsData?.condominium_name
          
          return {
            ...request,
            senderEmail,
            apartmentDetails,
            condominiumDetails,
          };
        }) || []);

        // Actualiza el estado con los datos enriquecidos
        setRequests(enrichedData);
      } catch (error) {
        console.error('Error al obtener solicitudes de unión:', error);
      }
    };

    fetchData();
  }, [data]);

  const [requests, setRequests] = useState<Requests[]>([]);

  if (error instanceof Error) {
    return <>{toast.error(error.message)}</>;
  }

  return (
      <div className='flex justify-center'>
        <div className = 'mx-auto my-auto w-11/12'>
            
          {requests.map((request) => (
            <div key={request.id} className="w-11/12 sm:py-4 sm:w-[500px] bg-white text-black justify-center my-6 sm:my-2 mx-auto">
              <div className="rounded-lg border-black border">
              <div className="flex justify-center items-center">
              <img className="w-6 h-6" src={jjrequest} alt="jrequest"/>
              <span className="px-4 py-3 text-center font-medium text-lg ">Condominium Request</span>
              </div>
              <p className="px-4 py-3 selection:bg-indigo-500"> <TruncateDate timestamp ={request.timestamp}/></p>
              <p className="px-4 py-3 selection:bg-indigo-500">Dear Resident,</p>
              <p className="px-4 py-3 mb-5 selection:bg-indigo-500">You are hereby granted access to the condominium <a className="underline decoration-indigo-500 font-medium">{request.condominiumDetails}</a> by the owner <a className="underline decoration-indigo-500 font-medium">{request.senderEmail}</a>. This access is valid for the following apartment: <a className="underline decoration-indigo-500 font-medium">{request.apartmentDetails}</a></p>            
              <SetRequestState ApId={request.apartment} UserId={request.recipient} id ={request.id}/>
              </div>
            </div>
            
          ))}
        </div>
        
      </div>
  );
};
export default RequestsSection