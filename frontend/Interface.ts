export interface joiningRequest {
    id: number;
    recipient: number;
    sender: number;
    apartment:number;
    condominium:number;
    date:string;
    active: boolean;
    rejected: boolean;

}