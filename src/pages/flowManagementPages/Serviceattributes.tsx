import Layout2 from '@/Components/Layout2/Layout2';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getOrderIdInLocalStorage, getServiceFromLocalStorage } from '@/Components/helper';
import { useRouter } from 'next/router';
import { getPurchaseOrderWithId, patchPurchaseOrder } from '@/helper';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

function Serviceattributes() {
    const [data, setData] = useState<any>(null);
    const { profile } = useSelector((state: any) => state);
    const [selectedData, setSelectedData] = useState<any>({});
    const [gettingservicedetail, SetGettingservicedetail] = useState<any>("");
    const service: any = getServiceFromLocalStorage();
    const [purchaseOrder, setPurchaseOrder] = useState<any>({});
    const [CheckError, setCheckError] = useState("");
    const [loadingnew, setLoadingnew] = useState(false);
    const [selectedserdur, setServiceselecteddur] = useState<any>({});
    const router = useRouter();
    const [newdataset, setNewdataset] = useState<any>(null)
    const [Allobjects, setAllobjects] = useState<any>(0)
    const [Attributesku, setAttributesku] = useState<any>(0)

    useEffect(() => {
        const selected_service: any = localStorage.getItem("selectedService");
        const parseservice = JSON.parse(selected_service);
        setServiceselecteddur(parseservice);
    }, []);




    console.log("selectedData", data)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://gateway.findanexpert.net/serviceinventory_svc/pb/ServiceAttribute/GetServiceAttributeByServiceSku?serviceSku=${service?.serviceSKU}`);
                setData(response.data.result.serviceAttribute);
                console.log("response.data", response.data.result.serviceAttribute)
            } catch (error: any) {
                // setError(error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, [service?.serviceSKU]);

    const handleCheckboxChange = (attributeType: string, value: string) => {
        const updatedData = { ...selectedData, [attributeType]: value };
        setSelectedData(updatedData);
    };

    // const renderAttributeValues = (item: any) => (
    //     <div className='col-md-12 ' key={item.attributeType}>
    //         <p className='m-0 p-0 service_a_p mt-2'>Please Choose At least One Option from {item?.attributeType}.</p>
    //         <div className='col-md-12 pt-2 pb-2 background_color_white_border px-3 mt-2'>
    //             {item?.values?.map((valueitem: any) => (
    //                 <div
    //                     key={valueitem.value}
    //                     className={`row pb-1 px-2 pt-2 universal_cursor ${selectedData[item.attributeType] === valueitem.value ? "border_active_attribute mt-1" : ""}`}
    //                     onClick={() => handleCheckboxChange(item.attributeType, valueitem.value)}

    //                 >
    //                     <div className='col-md-6 col-6'>
    //                         <p className='m-0 p-0 font_value_main'>{valueitem?.value}</p>
    //                     </div>
    //                     <div className='col-md-6 col-6 text-end m-auto'>
    //                         <p className='m-0 p-0 euro_attributes'>£{item?.attributePrice}</p>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );


    const getPurchaseOrder = () => {
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
    };

    useEffect(() => {
        getPurchaseOrder();
    }, []);

    const handleSaveChanges = () => {
        setLoadingnew(true);

        // Create an array of objects from the selectedData
        const attributesArray = Object.entries(selectedData).map(([key, value]) => ({
            attribute: key,
            value: value,
        }));

        const data = {
            purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
            attributes: attributesArray,
            hasattribute: "true",
            currentStep: 0,
        };

        patchPurchaseOrder(data)
            .then(response => {
                console.log('Purchase order patched successfully', response);
                router.push("/flowManagementPages/SelectQuantity");
                getPurchaseOrder();
                setLoadingnew(false);
            })
            .catch(error => {
                console.error('Error patching purchase order', error);
                setLoadingnew(false);
            });
    };

    const errorcheck = () => {
        enqueueSnackbar('Please select one option from attribute.', { variant: 'warning' });
    };

    const selectednewdata = (allobject: any, index: any, item1: any) => {
        setNewdataset(index)
        setAllobjects(allobject)
        setAttributesku(item1)
        console.log("allobjectallobject", allobject)
    }

    console.log("valueitem", Allobjects, Attributesku)

    const finaldataattributes = () => {
        const data = {
            purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
            attributes: [{
                attributePrice: Allobjects?.attributePrice,
                duration: Allobjects?.duration,
                isChecked: true,
                value: Allobjects?.value,
                attributeSku: Allobjects?.sku
            }],
            hasattribute: "true",
            currentStep: 0,
        };

        patchPurchaseOrder(data)
            .then(response => {
                console.log('Purchase order patched successfully', response);
                router.push("/flowManagementPages/SelectQuantity");
                getPurchaseOrder();
                setLoadingnew(false);
            })
            .catch(error => {
                console.error('Error patching purchase order', error);
                setLoadingnew(false);
            });
    }

    return (
        <Layout2>
            <div className='col-md-12 margin_bottom_new'>

                {/* your existing JSX */}
                <div className='col-md-12 background_color_white_border px-3 pb-1 pt-2 mt-4 mb-3'>
                    <div className='row  pb-2'>
                        <div className='col-md-6 col-8'>
                            <div className='d-flex'>
                                <div >
                                    <img className='img-fluid circle_rad' src={selectedserdur?.serviceImage ? selectedserdur?.serviceImage : selectedserdur?.attachments ? selectedserdur?.attachments[0]?.imageUrl : null} />
                                </div>
                                <div className='ps-3 mt-2'>
                                    <p className='m-0 p-0 quantity_heading'>{purchaseOrder?.data?.serviceName}</p>
                                    <p className='m-0 p-0 expert_center_text mt-1'>{purchaseOrder?.data?.bookingLocation}</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className='col-md-6 col-4 text-end'>
                            <p className='m-0 p-0 quantity_min_heading'>{selectedserdur?.duration} mins</p>

                        </div> */}
                    </div>
                </div>
                {data?.map((item1: any, index: any) => {
                    console.log("item1", item1)
                    return (
                        <div className='col-md-12 ' >
                            <p className='m-0 p-0 service_a_p mt-2 pb-2'>Please Choose At least One Option</p>
                            <div className='col-md-12 background_color_white_border'>
                                <div className='col-md-12  paddng_left_right_set'>
                                    {item1?.values?.map((valueitem: any, index1: any) => (
                                        <div
                                            key={valueitem.value}
                                            className={`row pb-1 px-2 pt-2 universal_cursor ${valueitem?.id === Allobjects?.id ? "border_active_attribute " : ""}`}
                                            onClick={() => selectednewdata(valueitem, index1, item1)}

                                        >
                                            <div className='col-md-6 col-6'>
                                                <p className='m-0 p-0 font_value_main'>{valueitem?.value} <span className='font_below_service_duration'>( {valueitem?.duration} min )</span></p>
                                            </div>
                                            <div className='col-md-6 col-6 text-end m-auto'>
                                                <p className='m-0 p-0 euro_attributes'>£{valueitem?.attributePrice}</p>
                                            </div>
                                            <div className='col-md-12'>
                                                <p className='m-0 p-0 mb-1 font_below_service'>This service include only one session</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* {data?.map((item: any) => renderAttributeValues(item))}
                {Object.keys(selectedData).length === 0 && !CheckError && (
                    <p style={{ fontSize: '12px', color: 'red' }}>{CheckError}</p>
                )} */}


                <div className='col-md-12 text-center mt-5'>
                    {newdataset === null ? (
                        <button
                            className='btn btn-danger color_danger button_width_slots mt-4 px-2 py-2'
                            onClick={errorcheck}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            className='btn btn-danger color_danger button_width_slots mt-4 px-2 py-2'
                            onClick={finaldataattributes}
                        >
                            Next&nbsp;&nbsp;
                            {loadingnew ? (
                                <div className='spinner-border text-white spinner-border-sm' role='status'>
                                    <span className='visually-hidden'>Loading...</span>
                                </div>
                            ) : null}
                        </button>
                    )}
                </div>
            </div>
        </Layout2>
    );
}

export default Serviceattributes;
