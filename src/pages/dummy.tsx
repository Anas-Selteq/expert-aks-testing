import Layout2 from '@/Components/Layout2/Layout2'
import React, { useCallback, useEffect, useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { getOrderIdInLocalStorage, getServiceFromLocalStorage } from '@/Components/helper';
import { useRouter } from 'next/router';
import { getPurchaseOrderWithId, patchPurchaseOrder } from '@/helper';
import { useSelector } from 'react-redux';


function Serviceattributes() {


    const [data, setData] = useState<any>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedData, setSelectedData] = useState<any>([]);
    const [gettingservicedetail, SetGettingservicedetail] = useState<any>("")
    const service: any = getServiceFromLocalStorage();
    const { profile } = useSelector((state: any) => state);
    const [purchaseOrder, setPurchaseOrder] = useState<any>({});
    const [CheckError, setCheckError] = useState("")
    const [loadingnew, setLoadingnew] = useState(false);
    const [selectedserdur, setServiceselecteddur] = useState<any>({})




    useEffect(() => {
        const selected_service: any = localStorage.getItem("selectedService");
        const parseservice = JSON.parse(selected_service);
        setServiceselecteddur(parseservice)
    }, [])

    const handleCheckboxChange = (item: any) => {
        // Check if the item is already selected
        const selectedIndex = selectedData.indexOf(item);
        if (selectedIndex === -1) {
            // If not selected, add it to the array
            setSelectedData([...selectedData, item]);
        } else {
            // If selected, remove it from the array
            const updatedData = [...selectedData];
            updatedData.splice(selectedIndex, 1);
            setSelectedData(updatedData);
        }
    };

    const router = useRouter();

    console.log("selectedData",selectedData)


    // const handleSaveChanges = () => {
    //     // Do something with the selectedData array, e.g., send it to the server
    //     console.log('Selected Data:', selectedData);
    //     router.push("/flowManagementPages/SelectQuantity")

    //     // Add your logic to send the data to the server or perform any other actions
    // };







    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://gateway.findanexpert.net/serviceinventory_svc/pb/ServiceAttribute/GetServiceAttributeByServiceSku?serviceSku=${service?.serviceSKU}`);
                setData(response.data.result.serviceAttribute);
                console.log("response.data", response.data.result.serviceAttribute)
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [service?.serviceSKU]);


    const getPurchaseOrder = useCallback(() => {
        const purchaseOrderId = parseInt(getOrderIdInLocalStorage());
        if (isNaN(purchaseOrderId)) {
            // router.replace("/");--------------------------------------------------------------------------------------------------------
        } else {
            //   setIsLoading(true);
            getPurchaseOrderWithId(purchaseOrderId)
                .then((res) => setPurchaseOrder(res.result))
                .catch((e) => alert(e))
                .finally(() => console.log(false));
        }
    }, [router]);

    useEffect(() => {
        getPurchaseOrder();
        // if (profile?.userId) {
        //   fetchAddresses();
        // }
    }, [getPurchaseOrder, profile.userId]);


    //   console.log("purchaseOrder",purchaseOrder?.data?.purchaseOrderId)


    const handleSaveChanges = () => {
        // console.log("selectedData",selectedData)
        setLoadingnew(true);
        const data = {
            purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
            attributes: selectedData,
            hasattribute: "true",
            currentStep: 0,
            //   paymentMethodId: defaultPayment?.id,
            //   submitPurchaseOrder: true,
            //   currentStep: purchaseOrder?.data?.totalStep,
            //   quantity: getactualquantity === null ? 1 : getactualquantity,
            //   cartId: cartId,
            //   totalPrice: getactualpriceincremented,
            //   totalAmount: getactualpriceincremented,
            //   amount: getactualpriceincremented,
        };

        // Assuming patchPurchaseOrder is an asynchronous function
        patchPurchaseOrder(data)
            .then(response => {
                // Handle the response as needed
                console.log('Purchase order patched successfully', response);
                router.push("/flowManagementPages/SelectQuantity")
                getPurchaseOrder();
                setLoadingnew(false);
            })
            .catch(error => {
                // Handle errors
                console.error('Error patching purchase order', error);
                setLoadingnew(false);
            });
    };

    const errorcheck = () => {
        setCheckError("Please select one of the above!");
    }

    return (
        <Layout2>
            <div
                className="row px-md-5 mx-0 py-2"
                style={{
                    width: "100%",
                    fontSize: "18px",
                    backgroundColor: "white",
                    padding: "0 0 0 1rem",
                    borderTop: "1px solid #dcdcdc",
                    borderBottom: "1px solid #dcdcdc",
                    paddingTop: "0.5%",
                    paddingBottom: "0.5%",
                    color: "#404145",
                    lineHeight: "16px",
                    fontWeight: "900",
                    fontFamily: "Roboto",
                }}
            >
                <div className="col-md-6 col-8 m-auto py-2">
                    <span className="">Service Attributes</span>
                </div>
                <div className="col-md-6 col-4 text-secondary text-end">

                </div>
            </div>
            {/* defaultChecked */}
            <div className='col-md-12 margin_bottom_new pt-4'>
                <div className='col-md-12 background_color_white_border px-3 pb-1 pt-2'>
                    <div className='row  pb-2'>
                        <div className='col-md-6 col-8'>
                            <div className='row'>
                                <div className='col-md-2 col-3 pe-0'>
                                    <img className='img-fluid circle_rad' src={selectedserdur?.serviceImage} />
                                </div>
                                <div className='col-md-10 col-9 m-auto'>
                                    <p className='m-0 p-0 quantity_heading'>{purchaseOrder?.data?.serviceName}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-4 text-end'>
                            <p className='m-0 p-0 quantity_min_heading'>{selectedserdur?.duration} mins</p>

                        </div>
                    </div>
                </div>
                <div className='col-md-12 mt-3'>
                    <p className='m-0 p-0 service_a_p'>Please answer the following service attributes</p>
                </div>
                {data?.map((item: any, index: any) => {
                    return (
                        <div className='col-md-12 border_for_boxes px-3 mt-2 py-3'>
                            <p className='m-0 p-0 service_a_p1'>Choose At least One Option form {item?.attributeType}.</p>
                            {item?.values?.map((valueitem: any, index: any) => {
                                return (
                                    <div className='col-md-12 pt-2 border_active_attribute '>
                                        <div className='row pb-1 px-2 universal_cursor' onClick={(e: any)=>handleCheckboxChange(valueitem)}>
                                            <div className='col-md-6 col-6'>
                                                <p className='m-0 p-0 font_value_main'>{valueitem?.value}</p>
                                            </div>
                                            <div className='col-md-6 col-6 text-end m-auto'>
                                                <p className='m-0 p-0 euro_attributes'>£{item?.attributePrice}</p>
                                            </div>
                                        </div>
                                        <hr className='m-0 p-0 border_whole' />
                                    </div>
                                )
                            })}

                        </div>
                    )
                })}
                {selectedData.length === 0 ?
                    <p style={{ fontSize: "12px", color: "red" }}>{CheckError}</p> : null}

                <div className='col-md-12 text-center mt-2'>
                    {selectedData.length === 0 ?
                        <button
                            className="btn btn-danger color_danger button_width_slots mt-4 px-2 py-2"
                            onClick={errorcheck}
                        >
                            Save Changes
                        </button> :
                        <button
                            className="btn btn-danger color_danger button_width_slots mt-4 px-2 py-2"
                            onClick={handleSaveChanges}
                        >
                            Save Changes&nbsp;&nbsp;
                            {loadingnew ?
                                <div className="spinner-border text-white spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> :
                                null
                            }
                        </button>
                    }
                </div>
            </div>
        </Layout2>
    )
}

export default Serviceattributes