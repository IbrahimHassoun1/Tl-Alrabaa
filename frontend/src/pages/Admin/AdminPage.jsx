import React, { useContext, useEffect, useState } from 'react'
import ManageStock from '../../components/ManageStock/ManageStock';
import { MyContext } from '../../context/Context';
React

const AdminPage = () => {
    const {setImagePreview,setdata,setProductIsChosen,orders,setOrders}=useContext(MyContext)
    const [dropDownOrders, setDropDownOrders] = useState(false); // Changed to boolean
    const [dropDownStock, setDropDownStock] = useState(false); // Changed to boolean
    const [selectedStockOperation,setSelectedStockOperation]=useState("")
    const [selectedOrder,setSelectedOrder]=useState("")

    const [selectedGeneralOperation,setSelectedGeneralOperation]=useState("")

    

  return (
    <div className='min-h-screen bg-tertiary flex'>
        <div className='containers mx-auto flex flex-wrap w-full text-start'>

            <div className="left panel h-full w-full sm:w-1/5  sm:border-r-2 border-primary flex flex-col  ">
                   
                    <div className='ml-4'>
                    <span className='cursor-pointer' onClick={() => {setDropDownStock(!dropDownStock);setDropDownOrders(false);setSelectedGeneralOperation("stock");setImagePreview(null)}}>
                        Manage Stock
                        <span className={`font-thin text-xs ml-1 transition-transform duration-300 ${dropDownStock ? 'rotate-180' : ''}`}>&#9660;</span>
                    </span> <br />
                    <ul
                        className={`ml-5 w-3/5 border-l border-l-gray-100 transition-max-height duration-300 ease-in-out overflow-hidden ${dropDownStock ? 'max-h-40' : 'max-h-0'}`}
                    >
                        
                        <li className={`pl-2 cursor-pointer ${selectedStockOperation==="add"?"text-secondary":""}`} onClick={()=>{setSelectedStockOperation("add");setImagePreview(null);setdata({});setProductIsChosen(false)}}>Add New Item</li>
                        <li className={`pl-2 cursor-pointer ${selectedStockOperation==="edit"?"text-secondary":""}`} onClick={()=>{setSelectedStockOperation("edit");setImagePreview(null);setdata({});setProductIsChosen(false)}}>Edit Item</li>
                        <li className={`pl-2 cursor-pointer ${selectedStockOperation==="delete"?"text-secondary":""}`} onClick={()=>{setSelectedStockOperation("delete");setdata({});setProductIsChosen(false)}}>Delete Item</li>
                        
                    </ul>
                    </div>

                    <div className='ml-4 pb-5'>
                    <span className='cursor-pointer' onClick={() => {setDropDownOrders(!dropDownOrders);setDropDownStock(false);setSelectedGeneralOperation("orders");setImagePreview(null)}}>
                        Manage Orders 
                        <span className={`font-thin text-xs ml-1 transition-transform duration-300 ${dropDownOrders ? 'rotate-180' : ''}`}>&#9660;</span>
                    </span> <br />
                    <ul
                        className={`ml-5 w-3/5 border-l border-l-gray-100 transition-max-height duration-300 ease-in-out overflow-hidden ${dropDownOrders ? 'max-h-40' : 'max-h-0'}`}
                    >
                        
                        <li className={`pl-2 cursor-pointer relative ${selectedOrder==="pending"?"text-secondary":""}`} onClick={()=>{setSelectedOrder("pending")}}>Pending  <span className='h-4 w-4 top-1/4 right-9 bg-yellow-400 text-yellow-400 rounded-lg absolute'></span></li>
                        <li className={`pl-2 cursor-pointer relative ${selectedOrder==="completed"?"text-secondary":""}`} onClick={()=>{setSelectedOrder("completed")}}>Completed <span className='h-4 w-4 top-1/4 right-3 bg-green-500 text-yellow-400 rounded-lg absolute'></span></li>
                        <li className={`pl-2 cursor-pointer relative ${selectedOrder==="cancelled"?"text-secondary":""}`} onClick={()=>{setSelectedOrder("cancelled")}}>Cancelled <span className='h-4 w-4 top-1/4 right-7 bg-red-600 text-yellow-400 rounded-lg absolute'></span></li>
                        
                    </ul>
                    </div>
                   
            </div>











            <div className="right w-full sm:w-4/5 ">
                {selectedGeneralOperation==="stock"?<ManageStock selectedStockOperation={selectedStockOperation}/>:""}
            </div>

        </div>
    </div>
  )
}

export default AdminPage