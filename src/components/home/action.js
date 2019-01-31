export function setFetchPending(isLoading){
    return{
        type:'SET_LOADING',
        isLoading
    }
}

export function setTotalSlot(data){
    return{
        type:'SET_TOTEL_SLOT',
        data
    }
}

export function setTotalParked(data){
    return{
        type:'SET_TOTEL_PARKED',
        data
    }
}


export function setVehicleDetails(data){
    return{
        type:'SET_VEHICLE_DETAILS',
        data
    }
}

export function setFilteredVehicle(data){
    return{
        type: 'FILTERED_VEHICLE_DETAILS',
        data
    }
}

export function setCustomVehicle(data){
    return{
        type:'SET_CUSTOM_VEHICLE',
        data
    }
}

export function setUsedSlot(data){
    return{
        type:'SET_USED_SLOT',
        data
    }
}
export function removeSlot(slotNo){
    debugger;
 return{
     type:'REMOVE_SLOT',
     slotNo
 }   
}

