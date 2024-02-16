import Layout2 from '@/Components/Layout2/Layout2';
import PurchaseSummary from '@/Components/flow_management/purchase_summary'
import { getOrderIdInLocalStorage } from '@/Components/helper';
import { getPurchaseOrderWithId } from '@/helper';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Vouchersapply() {
    const [purchaseOrder, setPurchaseOrder] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow1(false);
    const handleShow = () => setShow1(true);


    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);




    useEffect(() => {
        const getPurchaseOrder = () => {
            const purchaseOrderId = parseInt(getOrderIdInLocalStorage());
            if (isNaN(purchaseOrderId)) {
                router.replace("/");
            } else {
                setIsLoading(true);
                getPurchaseOrderWithId(purchaseOrderId)
                    .then((res) => setPurchaseOrder(res.result))
                    .catch((e) => alert(e))
                    .finally(() => setIsLoading(false));
            }
        };
        getPurchaseOrder();
    }, [router]);



    return (
        <Layout2>
            <div className="mt-3 margin_bottom_new  ">
                <PurchaseSummary purchaseOrder={purchaseOrder} />
                <div className='col-md-12 mt-5 mb-4 universal_cursor '>
                    <div className='row'>
                        <div className='col-md-4 img_align_end' onClick={handleShow}>
                            <img className='img-fluid' src='/imagess/notes.png' />
                        </div>
                        <Modal size="lg" centered show={show1} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Notes</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Notes will be displayed here!</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <div className='col-md-4 img_align_center' onClick={handleShow2}>
                            <img className='img-fluid' src='/imagess/vouchers.png' />
                        </div>
                        <Modal size="lg" centered show={show2} onHide={handleClose2}>
                            <Modal.Body>
                                <div className='col-md-12'>
                                    <div className='m-0 p-0 col-md-12'>
                                        <h6><b>Manage Voucher</b></h6>
                                    </div>
                                    <div className='col-md-12  mt-3 mb-4'>
                                        <div className='d-flex'>
                                            <p className='m-0 p-0 vouchers_unselected'>Gift Voucher</p>
                                            &nbsp; <p className='m-0 p-0 vouchers_unselected'> | </p> &nbsp;
                                            <p className='m-0 p-0 vouchers_active'>Service Voucher</p>
                                        </div>
                                        <hr className='m-0 p-0' />
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='row'>
                                            <div className='col-md-4 col-6 mt-2 mt-md-0'>
                                                <div className='col-md-12'>
                                                    <img className='img-fluid w-100' src='/imagess/serviceb.png' />
                                                </div>
                                                <div className='col-md-12  border_card_v'>
                                                    <div className='col-md-12 px-2 pb-1'>
                                                        <div className='row'>
                                                            <div className='col-md-6 m-auto'>
                                                                <p className='m-0 p-0 exp_date'>Exp: 24 Dec 2023</p>
                                                            </div>
                                                            <div className='col-md-6 text-end'>
                                                            <span className="badge bg-danger">Radeem</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-6 mt-2 mt-md-0'>
                                                <div className='col-md-12'>
                                                    <img className='img-fluid w-100' src='/imagess/serviceb.png' />
                                                </div>
                                                <div className='col-md-12  border_card_v'>
                                                    <div className='col-md-12 px-2 pb-1'>
                                                        <div className='row'>
                                                            <div className='col-md-6 m-auto'>
                                                                <p className='m-0 p-0 exp_date'>Exp: 24 Dec 2023</p>
                                                            </div>
                                                            <div className='col-md-6 text-end'>
                                                            <span className="badge bg-danger">Radeem</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-4 col-6 mt-2 mt-md-0'>
                                                <div className='col-md-12'>
                                                    <img className='img-fluid w-100' src='/imagess/serviceb.png' />
                                                </div>
                                                <div className='col-md-12  border_card_v'>
                                                    <div className='col-md-12 px-2 pb-1'>
                                                        <div className='row'>
                                                            <div className='col-md-6 m-auto'>
                                                                <p className='m-0 p-0 exp_date'>Exp: 24 Dec 2023</p>
                                                            </div>
                                                            <div className='col-md-6 text-end'>
                                                            <span className="badge bg-danger">Radeem</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-12 text-center mt-5 pt-5'>
                                        <button className='btn btn-danger universal_button_color w-50' onClick={handleClose3}> Save & Continue </button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                        <div className='col-md-4 img_align_start' onClick={handleShow3}>
                            <img className='img-fluid' src='/imagess/discountcode.png' />
                        </div>
                        <Modal size="lg" centered show={show3} onHide={handleClose3}>

                            <Modal.Body>
                                <div className='col-md-12'>
                                    <div className='m-0 p-0 col-md-12'>
                                        <h6><b>Discount Code</b></h6>
                                    </div>
                                    <div className='col-md-12 border_discount px-3 py-1 mt-3 mb-4'>
                                        <p className='m-0 p-0 discount_code_text'>Discount Code</p>
                                        <input
                                            type="email"
                                            className="form-control input_discount"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Add Discount Code"
                                        />
                                    </div>
                                    <div className='col-md-12 text-center'>
                                        <button className='btn btn-danger universal_button_color w-50' onClick={handleClose3}> Apply </button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
                <div className='col-md-12 border_color_background  mb-4 px-4 py-3'>
                    <div className='col-md-12'>
                        <p className='m-0 p-0 color_summary_text'>Order Summary</p>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-6 mt-3'>
                            <p className='m-0 p-0 sub_total_text'>Sub total</p>
                        </div>
                        <div className='col-md-6 col-6 mt-3 '>
                            <p className='m-0 p-0 sub_total_textbig'>£260</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-6 mt-1'>
                            <p className='m-0 p-0 sub_total_texttax'>Tax</p>
                        </div>
                        <div className='col-md-6 col-6 mt-1 text-end'>
                            <p className='m-0 p-0 sub_total_text'>£40.00</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-6 mt-1'>
                            <p className='m-0 p-0 sub_total_texttax'>Voucher</p>
                        </div>
                        <div className='col-md-6 col-6 mt-1 text-end'>
                            <p className='m-0 p-0 sub_total_text'>£40.00</p>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <hr className='my-2' />
                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-6 mt-1'>
                            <p className='m-0 p-0 sub_total_texttotal'>Total</p>
                            <p className='m-0 p-0 sub_total_texttax'>(incl. Tax)</p>
                        </div>
                        <div className='col-md-6 col-6 mt-1 text-end mt-1'>
                            <p className='m-0 p-0 sub_total_textprice'>£240.00</p>
                        </div>
                    </div>
                </div>
            </div>

        </Layout2>
    )
}

export default Vouchersapply