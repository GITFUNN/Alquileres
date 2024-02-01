import { getJoiningRequests, getApartmentNumber, getCondominiumName} from "../api/joining";
import { getSenderEmail } from "../api/user";
import { toast } from 'react-hot-toast';
import { useQuery ,useMutation, useQueryClient, } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import SetRenterPage from './setRenter';
import SetRequestState from "./SetRequestState";
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
    <div className='sm:flex sm:justify-center sm:items-center'>
      <div className = 'mx-auto my-auto'>
          

        {requests.map((request) => (
          <div key={request.id} className="w-full sm:py-4 sm:w-[500px] bg-slate-50 rounded-lg border-gray-300 sm:justify-center my-4 sm:my-2">
            <div className = 'flex'>
            <p className="px-4 py-4"> <TruncateDate timestamp ={request.timestamp}/></p>
            <p className="px-4 py-4">Owner {request.senderEmail}</p>
            </div>
            <p className="px-4 py-4">Apartment Number: {request.apartmentDetails}</p>
            <p className="px-4 py-4">Condominium: {request.condominiumDetails}</p>
            
            <SetRequestState ApId={request.apartment} UserId={request.recipient} id ={request.id}/>
           
          </div>
          
        ))}
      </div>
    </div>
  );
};
export default RequestsSection