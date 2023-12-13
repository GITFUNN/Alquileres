import { getCondominiumRequest } from '../api/condominium';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import UnitMgmt from './UnitMgmtPage';


const GetSoloCondominium = ()=>{
    const { id } = useParams();
    let condId:number;
    if (id !== undefined){
      condId = Number(id);
    } 

    const { data, isLoading, error } = useQuery({
        queryKey:['condominiums', id],
        queryFn:()=> getCondominiumRequest(condId)
    
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
    
<UnitMgmt condId = {data.id}/>


</>


);

}
export default GetSoloCondominium