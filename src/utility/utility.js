function getRandomString(){
    let chars =  'ABCDEFGHIJKLMNOPQRSTUVWXYZAB'
    let randomString;
    let randomNumber = Math.floor(Math.random() * 26);
    randomString = chars.substring(randomNumber, randomNumber+2);
    return randomString;
}

function getTwoDigitRandomNumber(){
    let chars = '123456789012';
    let twoDigit;
    let randomNumber = Math.floor(Math.random() * 10);
    twoDigit = chars.substring(randomNumber, randomNumber+2);
    return  twoDigit;   
}

function getFourDigitRandomNumber(){
    let chars = '1234567890123';
    let fourdigit;
    let randomNumber = Math.floor(Math.random() * 10);
    fourdigit = chars.substring(randomNumber, randomNumber+4)
    return fourdigit    
}

function generateRegistrationNumber(){
    return (getRandomString()+'-'+getTwoDigitRandomNumber()+'-'+getRandomString()+'-'+getFourDigitRandomNumber())
}

// function generateRandomSlot(){
//     return (Math.floor(Math.random() * 99))
// }

function generateRandomColor(){
    let colors = ['Black','White','Blue','Red'];
    return (colors[Math.floor(Math.random() * 4)])   
}


// function generateParkingDetails(value){
//     let vehicleDetails = [];
//     for(let i=0 ; i< value ;i++){
//         let vehicle = {};
//         vehicle['registrationNumber']= generateRegistrationNumber();
//         vehicle['slot']= generateRandomSlot();
//         vehicle['color']= generateRandomColor();
//         vehicleDetails.push(vehicle)
//     }
//     return vehicleDetails
// }

function filterData(value){
    generateParkingDetails(50).filter(filter => filter.color==value);
}

function generateUniqueSlot(totelSlot,generatedSlot){
    let generateSlot = [];
    while(generateSlot.length < generatedSlot){
     let randomnum = Math.floor(Math.random() * totelSlot) + 1;   
        if(generateSlot.indexOf(randomnum) === -1){
            generateSlot.push(randomnum)
        }
    }
    return generateSlot;
}


export function availableSlot(totalSlot, usedSlot){
    let availableSlot = [];
    for(let i = 0 ; i < totalSlot; i++){
        if(usedSlot.indexOf(i) === -1){
            availableSlot.push(i)
        }
    }
    return availableSlot    
}
//====================================================>>>

 export function generateParkingDetails(totelSlot,generatedSlot){
    let vehicleDetails = [];
    let slot = generateUniqueSlot(totelSlot,generatedSlot);
    for(let i=0 ; i< slot.length ;i++){
        let vehicle = {};
        vehicle['registrationNumber']= generateRegistrationNumber();
        vehicle['slot']= slot[i];
        vehicle['color']= generateRandomColor();
        vehicleDetails.push(vehicle)
    }
    // vehicleDetails.push(slot)
    return {vehicleDetails,slot}
}

