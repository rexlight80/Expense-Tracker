import React,{createContext,useReducer} from "react"
import AppReducer from "./AppReducer"
import axios  from "axios";
const intialstate={
    transactions:[],
    error:null,
    loading:true
}


export const GlobalContext= createContext(intialstate);
export const GlobalProvider=({children})=>{
const[state,dispatch]=useReducer(AppReducer,intialstate)

async function getTransaction(){
    try {
        const res=await axios.get('/api/transactions');
        dispatch({
            type:"GET_TRANSACTION",
            payload:res.data.data
        })
    } catch (err) {
        dispatch({
            type:"TRANSACTION_ERROR",
            payload:err.response.data.error
        })
        
    }
}
async function deletetransaction(id){
    try {
        await axios.delete(`/api/transactions/${id}`)
        dispatch({
            type:'DELETE_TRANSACTION',
            payload:id
        })     
    } catch (err) {
        dispatch({
            type:"TRANSACTION_ERROR",
            payload:err.response.data.error
        })
        
    }
   
}
async function addtransaction(transaction){
    const config={
        headers:{
            "Content-Type":"application/json",

        }
    }

    try {
   const res= await axios.post('/api/transactions/',transaction,config)
   
    dispatch({
        type:'ADD_TRANSACTION',
        payload:res.data.data
    })
   
        
    } catch (err) {
        dispatch({
            type:"TRANSACTION_ERROR",
            payload:err.response.data.error
        })
        
    }
   
}
return(
    <GlobalContext.Provider 
    value={{transactions:state.transactions,
        error:state.error,
        getTransaction,
            deletetransaction,
            addtransaction
    }}>
    {children}
    </GlobalContext.Provider>
)
}