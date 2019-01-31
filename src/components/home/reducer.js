const initialState ={
    isLoading:false,
    totalSlot:"",
    vehicleParked:"",
    usedSlot:[],
    avilableSlot:[],
    vehicleDetails:[],
    filteredVehicle:[]
}

const homeReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'SET_LOADING':
        return {
            ...state,
            isLoading:action.isLoading
        }
        case 'SET_TOTEL_SLOT':
        return{
            ...state,
            totalSlot:action.data,
            usedSlot:[]
        }
        case 'SET_TOTEL_PARKED':
        return {
            ...state,
            vehicleParked:action.data
        }    
        
        case 'SET_VEHICLE_DETAILS':
        return {
            ...state,
            vehicleDetails: action.data,
        }

        case 'FILTERED_VEHICLE_DETAILS':
        return {
            ...state,
            filteredVehicle: action.data

        }
        case 'SET_CUSTOM_VEHICLE':
        return {
            ...state,
            vehicleDetails:[
                ...state.vehicleDetails,
                    action.data                
            ]
        }

        case 'SET_USED_SLOT':
        return{
            ...state,
            usedSlot: state.usedSlot.concat(action.data)
        }

        case 'REMOVE_SLOT':
        return{
            ...state,
            vehicleDetails: state.vehicleDetails.filter(
                e=>e.slot !== action.slotNo
            ),
            usedSlot: state.usedSlot.filter(
                e=>e !== action.slotNo 
            )
        }
        
        default:
        return state
    }
}

export default homeReducer