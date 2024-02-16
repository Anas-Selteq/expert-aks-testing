import Layout2 from '@/Components/Layout2/Layout2'
import { getOrderIdInLocalStorage, getServiceFromLocalStorage } from '@/Components/helper';
import { getPurchaseOrderWithId, patchPurchaseOrder } from '@/helper';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function SelectQuantity() {
    const router = useRouter();
    // const storedQuantity = typeof window !== 'undefined' ? localStorage.getItem("quantity_selected") : null;
    // const quantityselected: any = localStorage.getItem("main_quantity");
    // const quantityconverted: any = parseInt(quantityselected);
    // const initialQuantity = storedQuantity ? JSON.parse(storedQuantity) : quantityconverted;

    const [NewSelectedQuantity, setSelectedQuantity] = useState<any>(null)
    const [newQuantity, setNewQuantity] = useState<any>(null);
    const [actualquantity, setActualquantity] = useState<any>(null);
    console.log("selected", actualquantity)
    const [incrementednumber, setIncrementednumber] = useState<any>(1);
    const service = getServiceFromLocalStorage();
    const [result, setResult] = useState(0);
    const [purchaseOrder, setPurchaseOrder] = useState<any>({});
    const { profile } = useSelector((state: any) => state);
    const [loadingnew, setLoadingnew] = useState(false);
    const [loadingnewPur, setLoadingnewPur] = useState(false);
    const [SelectedIndexx, setSelectedIndexx] = useState(null);
    const [selectedserdur, setServiceselecteddur] = useState<any>({})
    const [quantitydrop, setQuantitydrop] = useState<any>(false)

    useEffect(() => {
        const selected_service: any = localStorage.getItem("selectedService");
        const parseservice = JSON.parse(selected_service);
        setServiceselecteddur(parseservice)
    }, [])

    // useEffect(() => {
    //   const newupdate = purchaseOrder?.data?.attributes[0]?.attributePrice;

    // }, [])




    const incrementednumberr = () => {
        setIncrementednumber(incrementednumber + 1);
        localStorage.setItem("quantity_selected", incrementednumber + 1)
        localStorage.removeItem('setQuantity_QuantityPage');
        setSelectedIndexx(null)
    }

    const decrementednumber = () => {
        if (incrementednumber > 1) {
            setIncrementednumber(incrementednumber - 1);
            localStorage.setItem("quantity_selected", incrementednumber - 1)
            localStorage.removeItem('setQuantity_QuantityPage');
            setSelectedIndexx(null)
        }
    }

    useEffect(() => {
        const getactualquantity: any = localStorage.getItem("quantity_selected");
        const getactualquantityy: any = JSON.parse(getactualquantity);
        setNewQuantity(getactualquantityy === null ? 1 : parseInt(getactualquantityy))

    }, [])


    useEffect(() => {

        if (newQuantity != null) {
            setActualquantity(newQuantity)
        }
    }, [newQuantity != null])

    console.log("act", incrementednumber)

    useEffect(() => {
        // const newnumberset = NewSelectedQuantity.length === 0 ? actualquantity: NewSelectedQuantity
        const selectedpackage: any = localStorage.getItem("setQuantity_QuantityPage");
        const selectedpackagee: any = JSON.parse(selectedpackage);
        console.log("anas", parseInt(selectedpackagee));
        setIncrementednumber(parseInt(selectedpackagee) ? parseInt(selectedpackagee) : actualquantity)
    }, [actualquantity != null, NewSelectedQuantity])



    useEffect(() => {
        // service?.actualPrice
        const multiplyprice: any = incrementednumber * (purchaseOrder?.data?.hasattribute === "true" ?
            purchaseOrder?.data?.attributes[0]?.attributePrice :
            service?.actualPrice)

        // console.log("incrementednumber",incrementednumber * purchaseOrder?.data?.attributes[0]?.attributePrice,incrementednumber,purchaseOrder?.data?.attributes[0]?.attributePrice)
        localStorage.setItem("incremented_price", multiplyprice)
        setResult(multiplyprice);
    }, [incrementednumber, purchaseOrder?.data?.attributes[0]?.attributePrice]);

    console.log("servie", service)

    const selectedquantity = (item: any, index: any) => {
        setSelectedIndexx(index);
        // console.log("newnew1212", index)
        setSelectedQuantity(item.recommendedQuantity ? item.recommendedQuantity : "abc");
        localStorage.setItem("setQuantity_QuantityPage", JSON.stringify(item.recommendedQuantity))
        localStorage.removeItem("quantity_selected")
        setQuantitydrop(false);
    }


    // const nextpageinflow = () => {
    //     router.push("/flowManagementPages/expert_address")
    // }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const getPurchaseOrder = useCallback(() => {
        setLoadingnewPur(true);
        const purchaseOrderId = parseInt(getOrderIdInLocalStorage());
        if (isNaN(purchaseOrderId)) {
            // router.replace("/");--------------------------------------------------------------------------------------------------------
        } else {
            //   setIsLoading(true);
            getPurchaseOrderWithId(purchaseOrderId)
                .then((res) => {
                    setPurchaseOrder(res.result)
                    setLoadingnewPur(false);
                })
                .catch((e) => {
                    setLoadingnewPur(false);
                    alert(e)
                })
                .finally(() => console.log(false));
        }
    }, [router]);


    useEffect(() => {
        getPurchaseOrder();
        // if (profile?.userId) {
        //   fetchAddresses();
        // }
    }, [profile.userId]);


    //   console.log("purchaseOrder",purchaseOrder?.data?.purchaseOrderId)


    const nextpageinflow = () => {
        setLoadingnew(true);
        const data = {
            purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,

            currentStep: 0,
            quantity: incrementednumber,
            totalPrice: result === 0 ? purchaseOrder?.data?.hasattribute === "true" ?
                purchaseOrder?.data?.attributes[0]?.attributePrice :
                service?.actualPrice
                : result,
            totalAmount: result === 0 ? purchaseOrder?.data?.hasattribute === "true" ?
                purchaseOrder?.data?.attributes[0]?.attributePrice :
                service?.actualPrice : result,
        };

        // Assuming patchPurchaseOrder is an asynchronous function
        patchPurchaseOrder(data)
            .then(response => {
                // Handle the response as needed
                console.log('Purchase order patched successfully', response);
                router.push("/flowManagementPages/expert_address")
                getPurchaseOrder();
                setLoadingnew(false);
            })
            .catch(error => {
                // Handle errors
                console.error('Error patching purchase order', error);
                setLoadingnew(false);
            });
    };

    console.log("purchaseOrdernew", purchaseOrder?.data?.hasattribute)

    return (
        <Layout2>
            <div className='col-md-12 margin_bottom_new pt-4'>
                {/* Header section of Quantity -------------------------------------------------------- */}
                <div className='col-md-12 background_color_white_border px-3 py-2'>
                    <div className='row'>
                        <div className='col-md-6 col-8'>
                            <div className='row'>
                                <div className='col-md-2 col-3 pe-0'>
                                    <img className='img-fluid circle_rad' src={selectedserdur?.serviceImage ? selectedserdur?.serviceImage : selectedserdur?.attachments ? selectedserdur?.attachments[0]?.imageUrl : null} />
                                </div>
                                <div className='col-md-10 col-9 m-auto'>
                                    <p className='m-0 p-0 quantity_heading'>{purchaseOrder?.data?.serviceName}</p>
                                    <div className='d-flex'>
                                        {purchaseOrder?.data?.attributes?.map((item: any, index: any) => {
                                            return (
                                                <p className='m-0 p-0 pt-1 quantity_sub_heading'>{item?.value}{index === 0 ? "" : ","}&nbsp;</p>
                                            )
                                        })}
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-4 text-end'>
                            <p className='m-0 p-0 quantity_min_heading'>
                                {/* {selectedserdur?.duration} */}
                                {purchaseOrder?.data?.attributes[0]?.duration}  mins</p>
                            <p className='m-0 p-0 mt-1 quantity_heading'>£
                                {/* {purchaseOrder?.data?.attributes[0]?.attributePrice} */}
                                {result === 0 ?
                                    <>
                                        {purchaseOrder?.data?.hasattribute === "true" ?
                                            purchaseOrder?.data?.attributes[0]?.attributePrice :
                                            service?.actualPrice
                                        }
                                    </>
                                    : result}
                            </p>
                        </div>
                    </div>
                </div>

                {/* section to see only Quantity -------------------------------------------------------- */}
                <div className='col-md-12'>
                    <p className='m-0 p-0 des_font mt-3'>Please check the variable pricing, the more you book the more you save</p>
                </div>
                <div className='col-md-12 background_color_white_border px-2 py-2 mt-2'>
                    {service?.recommendedQuantities?.map((item: any, index: any) => {
                        const multiplyquantity = parseInt(item?.recommendedQuantity);
                        const multiplyfinal = multiplyquantity * (purchaseOrder?.data?.hasattribute === "true" ?
                            purchaseOrder?.data?.attributes[0]?.attributePrice :
                            service?.actualPrice);
                        console.log("newnew12", index === SelectedIndexx)
                        return (
                            <>
                                <div className='row mt-2'>
                                    <div className='col-md-6'>
                                        <p className='m-0 p-0 new_quantity_screen'>Quantitiy: {item?.recommendedQuantity}</p>
                                    </div>
                                    <div className='col-md-6 text-end px-5'>
                                        <p className='m-0 p-0 new_quantity_screen px-5'>£{multiplyfinal}</p>
                                    </div>
                                </div>
                                <hr className='m-0 p-0 mt-2 background_line' />
                            </>
                        )
                    })}
                </div>

                {/* section to select Quantity -------------------------------------------------------- */}
                <div className='col-md-12 mt-3 mb-3'>
                    <p className='m-0 p-0 des_font'>Please select the quantity</p>
                </div>
                <div className='col-md-12 background_color_white_border universal_cursor  ' onClick={()=> setQuantitydrop(!quantitydrop)}>
                    <div className='row '>
                        <div className='col-md-6 m-auto px-3'>
                            <p className='m-0 p-0 px-1 new_quantity_screen'>Quantity: {incrementednumber}</p>
                        </div>
                        <div className='col-md-5 m-auto text-end px-4'>
                            <p className='m-0 p-0 new_quantity_screen px-2'>£    {result === 0 ?
                                <>
                                    {purchaseOrder?.data?.hasattribute === "true" ?
                                        purchaseOrder?.data?.attributes[0]?.attributePrice :
                                        service?.actualPrice
                                    }
                                </>
                                : result}</p>
                        </div>
                        <div className='col-md-1 text-center'>
                            <div className='col-md-12 py-2 dropdown_setting_quantity'>
                                <p className='m-0 p-0'>
                                    <img className='img-fluid' src='/imagess/downnew.png' />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {quantitydrop === false ? null :
                    <div className='col-md-12 background_color_white_border px-2 py-2 mt-2'>
                        {service?.recommendedQuantities?.map((item: any, index: any) => {
                            const multiplyquantity = parseInt(item?.recommendedQuantity);
                            const multiplyfinal = multiplyquantity * (purchaseOrder?.data?.hasattribute === "true" ?
                                purchaseOrder?.data?.attributes[0]?.attributePrice :
                                service?.actualPrice);
                            console.log("newnew12", index === SelectedIndexx)
                            return (
                                <>
                                    <div className='row universal_cursor  mt-2' onClick={(e) => selectedquantity(item, index)}>
                                        <div className='col-md-6'>
                                            <p className='m-0 p-0 new_quantity_screen'>Quantitiy: {item?.recommendedQuantity}</p>
                                        </div>
                                        <div className='col-md-6 text-end px-5'>
                                            <p className='m-0 p-0 new_quantity_screen px-5'>£{multiplyfinal}</p>
                                        </div>
                                    </div>
                                    <hr className='m-0 p-0 mt-2 background_line' />
                                </>
                            )
                        })}
                        <div className='row mt-2'>
                            <div className='col-md-2'>
                                <p className='m-0 p-0 new_quantity_screen'>Custom: 1-20</p>
                            </div>
                            <div className='col-md-10 ps-0 '>
                                <div className="d-flex  justify-content-start ">
                                    <img className="img-fluid" src="/imagess/left-ico.png" onClick={() => decrementednumber()} />
                                    <div className="px-3 text_show ">{incrementednumber}</div>
                                    <img className="img-fluid" src="/imagess/right-ico.png " onClick={() => incrementednumberr()} />
                                </div>
                            </div>
                        </div>
                    </div>
                }








                <div className='col-md-12 text-center'>
                    {loadingnewPur ?
                        <button
                            className="btn btn-secondary  button_width_slots mt-5 px-2 py-2"
                            disabled
                        >
                            Create Order
                        </button>
                        :
                        <button
                            className="btn btn-danger color_danger button_width_slots mt-5 px-2 py-2"
                            onClick={nextpageinflow}
                        >
                            Create Order&nbsp;&nbsp;
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
        </Layout2 >
    )
}

export default SelectQuantity