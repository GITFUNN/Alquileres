import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import JoiningRequest from './JoiningRequestPage';
import { getApartmentRequest } from '../api/apartment';


const GetSoloApartment = ()=>{
    const { id, sId } = useParams();
    let ApId:number;
    if (id!== undefined && sId!== undefined){
      ApId = Number(sId);
      console.log(ApId);
    } 
    const { data, isLoading, error } = useQuery({
        queryKey:['apartment', id],
        queryFn:()=> getApartmentRequest(ApId)
    
  });
  console.log(data);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error || !data) {
    return <p>Error al cargar el condominio.</p>;
  }
return(
    <>
    
<JoiningRequest ApId = {data.id}/>


</>


);

}
export default GetSoloApartment