import React from 'react';
import {connect} from 'react-redux'
import {validateIntegers} from './validate'
import {setTotalSlot, setTotalParked, setVehicleDetails, setFilteredVehicle, setCustomVehicle, setUsedSlot,removeSlot} from './action'
import './home.css'
import {generateParkingDetails, availableSlot} from '../../utility/utility'
import Table from '../table/table'


class Home extends React.Component{
    constructor(){
        super()

      this.state = {
        totalSlot:"" ,
        carParked:"",
        isError: false,
        displayFilter: false
      }

      this.errorText ={}

      this.handleTextChange=this.handleTextChange.bind(this)

    }


    handleTextChange(event){
        const { target: { name, value } } = event
        this.setState({ [name]: value })
    }

    handleButtonClick = (e)=>{
        if(this.state.totalSlot.trim() !== "" && validateIntegers(this.state.totalSlot.trim()) && this.state.carParked.trim() !== "" && validateIntegers(this.state.carParked.trim()) ) {
            
            if(Number.parseInt(this.state.totalSlot) >= Number.parseInt(this.state.carParked)){
                this.props.setTotalSlot(this.state.totalSlot);
                this.props.setTotalParked(this.state.carParked);
                let details = generateParkingDetails(this.state.totalSlot,this.state.carParked);
                this.props.setVehicleDetails(details.vehicleDetails);
                this.props.setUsedSlot(details.slot)     
                this.errorText['totalSlot'] = ''
                this.errorText['carParked'] = ''
                this.setState({
                    isError:false
            })
            } else{
                this.errorText['totalSlot'] = 'Please enter the Number only and Total Slot should be greater the Car Parked '
                this.errorText['carParked'] = 'Please enter the Number only and Total Slot should be greater the Car Parked'
                this.setState({
                    isError:true
            })
            }
            
        }  else{
            this.errorText['totalSlot'] = 'Please enter the Number only and Total Slot should be greater the Car Parked '
            this.errorText['carParked'] = 'Please enter the Number only and Total Slot should be greater the Car Parked'
            this.setState({
                isError:true
        })
        }       
    }

    handleGenerateVehicleData =()=>{ 
        // let details = generateParkingDetails(this.props.totalSlot,this.props.vehicleParked);
        // console.log("details", details)
        // this.props.setVehicleDetails(details.vehicleDetails);
        // this.props.setUsedSlot(details.slot)
        
    }


    handleColorFilter =()=>{
        if(this.state.filterColor && this.state.filterColor.trim()!==""){
            this.setState({
                displayFilter:true
            })
            let filteredData=this.props.vehicleDetails.filter(filter=>filter.color === this.state.filterColor);
            this.props.setFilteredVehicle(filteredData);
            this.setState({
                isError:false
            })
        } else {
            this.errorText['filterColor'] = 'Please Enter the text '
            this.setState({
                isError:true
            })
        }
      
    }

    handleRegistrationFilter = ()=>{
        if(this.state.registration && this.state.registration.trim()!==''){
             let filteredData=this.props.vehicleDetails.filter(filter=>filter.registrationNumber === this.state.registration);
             this.props.setFilteredVehicle(filteredData);
             this.setState({
                isError:false
            })
        } else {
            this.errorText['registration'] = 'Please Enter the text'
            this.setState({
                isError:true
            })
        }

    }   

    handleSlotAllotment = ()=>{
        // let len= this.props.vehicleDetails.length;
        
        if(this.state.incomingRegistration && this.state.incomingColor && this.state.incomingRegistration.trim()!=="" && this.state.incomingColor.trim()!==""){
            const usedSlot= this.props.usedSlot;
            const availableSlots = availableSlot(this.state.totalSlot,usedSlot)
            const obj = {};
            obj['registrationNumber']= this.state.incomingRegistration;
            obj['color']= this.state.incomingColor;
            obj['slot']= Math.min( ...availableSlots )
            this.props.setUsedSlot(obj.slot)
            this.props.setCustomVehicle(obj)
            this.setState({
                isError:false
            })
        } else {
            this.errorText['incomingRegistration']= 'Please Enter value '
            this.errorText['incomingColor'] = 'Please Enter the Value'
            this.setState({
                isError:true
              })
        }
        

    }

    handleRemoveSlot = (value)=>{
        this.props.removeSlot(value)
    }


    render(){
        return(
            <div>
                <header>
                    <h2>Parking System</h2>
                    <div>
                         ENTER THE TOTAL NO OF SLOT AVAILABLE: <input onChange={this.handleTextChange} type='text' name='totalSlot' id='totalSlot'/> <div className='errorText'>{this.errorText.totalSlot}</div>
                    </div>
                    <div>
                         ENTER THE NO OF CAR PARKED :  <input onChange={this.handleTextChange} type='text' name='carParked' id='carParked'/> <div className='errorText'>{this.errorText.carParked}</div> <button type="button" onClick={e=>this.handleButtonClick(e)}>Submit Details</button>
                     </div>
                </header>
            
            <section>
                <nav>
                    <div className='detailBox'>
                    <h3>Enter Incoming Car details</h3>
                    <h5>EnterRegistration Number</h5> <input onChange={this.handleTextChange} type='text' name='incomingRegistration' id='incomingRegistration'/> <div className='errorText'>{this.errorText.incomingRegistration}</div>
                    <h5>Enter vehicle Color</h5> <input onChange={this.handleTextChange} type='text' name='incomingColor' id='incomingColor'/><br/><br/> <div className='errorText'>{this.errorText.incomingColor}</div>
                    <button type="button" onClick ={this.handleSlotAllotment} >Alot the slot</button>
                    </div>

                    <div className='detailBox'>
                    
                    <h3>Filter By Color</h3> <input onChange={this.handleTextChange} type='text' name='filterColor' id='filterColor'/> <button type="button" onClick={this.handleColorFilter}>Filter</button> <div className='errorText'>{this.errorText.filterColor}</div>
                    <h3>Filter By Registration Number</h3> <input onChange={this.handleTextChange} type='text' name='registration' id='registration'/> <button type="button" onClick={this.handleRegistrationFilter}>Filter</button> <div className='errorText'>{this.errorText.registration}</div>
                    </div>
                </nav>
                
                <article>   
             {this.props.vehicleDetails.length>0  ? <Table {...this.props} removeSlot={this.handleRemoveSlot} filter={this.state.displayFilter}/>:<h2>Enter the details to generate table</h2>}
             </article>
             

            </section>

            
            </div>

        )
    }
}

const mapStateToProps = (state) =>{
    return{
        totalSlot: state.homeReducer.totalSlot,
        vehicleParked: state.homeReducer.vehicleParked,
        vehicleDetails: state.homeReducer.vehicleDetails,
        filteredVehicle: state.homeReducer.filteredVehicle,
        usedSlot: state.homeReducer.usedSlot
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        setTotalSlot: (value)=>(dispatch(setTotalSlot(value))),
        setTotalParked: (value)=>(dispatch(setTotalParked(value))),
        setVehicleDetails: (value)=>(dispatch(setVehicleDetails(value))),
        setFilteredVehicle: (value)=>(dispatch(setFilteredVehicle(value))),
        setCustomVehicle: (value)=>(dispatch(setCustomVehicle(value))),
        setUsedSlot: (value)=>(dispatch(setUsedSlot(value))),
        removeSlot: (value)=>(dispatch(removeSlot(value)))
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// export default Home
