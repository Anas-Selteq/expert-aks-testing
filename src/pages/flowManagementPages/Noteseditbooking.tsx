import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { getOrderIdInLocalStorage } from '@/Components/helper';

function Noteseditbooking() {
    const [show, setShow] = useState(false);
    const [inputtextval, setinputtextval] = useState("")
    const [ResponseDatafirstnote, setResponseDatafirstnote] = useState("")
    const [ResponseDatagetnotes, setResponseDatagetnotes] = useState([])
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [selectedFileAudio, setSelectedFileAudio] = useState<any>(null);
    const [selectedFileImage, setSelectedFileImage] = useState<any>(null);
    const [updateNotesId, setUpdateNotesId] = useState<any>(null);
    const [NewNotes, setNewNotes] = useState<any>(false);
    const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");


    const [loading, setLoading] = useState<any>(false);
    const fileInputRef = useRef<any>(null);

    const fileInputRefImage = useRef<any>(null);

    const purchaseOrderId = getOrderIdInLocalStorage();
    const { profile } = useSelector((state: any) => state);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
    }, []);

    useEffect(() => {
        const Jwtset = async () => {

            // Convert the JWT token object to a string
            // const jwtTokenString = JSON.stringify(JwtRefreshToken);

            // Encode the JWT token to Base64
            const base64Token = Buffer.from(JwtRefreshToken).toString('base64');



            try {
                const response = await axios.get(
                    `https://gateway.findanexpert.net/signup_svc/pb/users/getnewRefreshToken?tokenModel=${base64Token}`
                );
                // localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
                // localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
                if (response?.data?.code === 0) {
                    localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
                    localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
                }
                // Only update state if the component is still mounted
            } catch (error) {
                console.log(error);
            }
        };
        if (JwtRefreshToken) {
            Jwtset();
        }
    }, [JwtRefreshToken])


    // Get types api to get types ------------------------------------------------------------
    useEffect(() => {
        const fetchDataGetTypesAPI = async () => {
            try {
                const response = await axios.get(`https://gateway.findanexpert.net/notesapi_svc/pv/types/`);

                // setResponseDatagetnotes(response.data?.result);
                console.log('types:', response?.data);
            } catch (error) {
                console.error('API Error:', error);

            }
        };

        fetchDataGetTypesAPI();
    }, []);



    // create notes first time -------------------------------------------------------------
    const firstnotesrequesttosend = async () => {
        const bookingdetail: any = localStorage.getItem('bookingdetailforbookingnull');
        const newpurchaseorder: any = localStorage.getItem('orderId');
        const purchase_order_id = parseInt(newpurchaseorder);
        const bookingdetailparse = JSON.parse(bookingdetail);
        // Create a new FormData object
        const formData: any = new FormData();


        formData.append('text', inputtextval);
        formData.append('created_by', profile?.externalCustomerId);
        formData.append('created_for', newpurchaseorder === "null" ? bookingdetailparse?.appointments[0]?.plexaarBookingId : newpurchaseorder);
        formData.append('created_by_type', 2);
        formData.append('created_for_type', newpurchaseorder === "null" ? 4 : 3);
        formData.append('image', "");
        formData.append('audio', "");
        formData.append('video', "");
        formData.append('is_shown', true);
        formData.append('created_by_name', profile?.firstName);
        formData.append('created_by_img_url', profile?.imageURL);
        formData.append('note_type', 2);
        formData.append('is_expert0_plexaar1', false);
        // setLoading(true);
        // console.log("formData",newpurchaseorder === "null" ? bookingdetailparse?.appointments[0]?.plexaarBookingId : newpurchaseorder)
        // return;
        try {
            const response = await axios.post('https://gateway.findanexpert.net/notesapi_svc/pv/notes/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure you use multipart/form-data for form data
                },
            });

            setResponseDatafirstnote(response.data);
            console.log('API Response:', response.data);
            setinputtextval("");
            setLoading(false);
        } catch (error) {
            console.error('API Error:', error);
            setLoading(false);
        }
    };

    // update notes Api ----------------------------dont use---------------------------------
    const imguploadrequesttosend = async (file: any) => {
        const JWTtoken = localStorage.getItem("jwtToken");
        const purchase_order_id = parseInt(getOrderIdInLocalStorage());
        const notes_id: any = localStorage.getItem("notes_id");
        const notes_id_new = parseInt(notes_id);
        console.log("JWTtoken", JWTtoken)
        var randomId = Math.floor(Math.random() * 1000000);
        // Create a new FormData object
        const formData: any = new FormData();


        formData.append('Id', randomId);
        formData.append('serviceName', "signup");
        formData.append('source', "Expert");
        formData.append('Files', file);
        formData.append('Category', "main");
        formData.append('FileType', "i");
        formData.append('CreatedBy', randomId);
        setLoading(true);

        try {
            const response = await axios.post('https://gateway.findanexpert.net/serviceinventory_svc/pb/ServiceAttachment/UploadAttachment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure you use multipart/form-data for form data
                    Authorization: `Bearer ${JWTtoken}`,
                },
            });

            // setResponseDatafirstnote(response.data);
            setNewNotes(false);
            updatenotesrequesttosendimg(response.data.paths[0])
            console.log('API Response new data:', response.data.paths[0]);
            setinputtextval("");
            setLoading(false);
        } catch (error) {
            console.error('API Error:', error);
            setLoading(false);
            setNewNotes(false);
        }
    };

    const updatenotesrequesttosendimg = async (image: any) => {
        const bookingdetail: any = localStorage.getItem('bookingdetailforbookingnull');
        const bookingdetailparse = JSON.parse(bookingdetail);
        const JWTtoken = localStorage.getItem("jwtToken");
        const purchase_order_id: any = parseInt(getOrderIdInLocalStorage());
        const purchaserOrderCheck = getOrderIdInLocalStorage();
        const notes_id: any = localStorage.getItem("notes_id");
        const notes_id_new = parseInt(notes_id);
        console.log("JWTtoken", JWTtoken)
        // Create a new FormData object
        const formData: any = new FormData();


        formData.append('text', inputtextval ? inputtextval : "");
        formData.append('created_by', profile?.externalCustomerId);
        formData.append('created_for', purchaserOrderCheck === "null" ? bookingdetailparse?.appointments[0]?.plexaarBookingId : purchase_order_id);
        formData.append('created_by_type', 2);
        formData.append('created_for_type', purchaserOrderCheck === "null" ? 4 : 3);
        formData.append('image', image ? image : "");
        formData.append('audio', selectedFileAudio ? selectedFileAudio : "");
        formData.append('video', selectedFile ? selectedFile : "");
        // formData.append('id', updateNotesId);
        // formData.append('is_shown', true);
        // formData.append('note_type', 2);
        formData.append('is_shown', true);
        formData.append('created_by_name', profile?.firstName);
        formData.append('created_by_img_url', profile?.imageURL);
        formData.append('note_type', 2);
        formData.append('is_expert0_plexaar1', false);
        // console.log("newnew", purchaserOrderCheck)
        // return;
        setLoading(true);

        try {
            const response = await axios.post('https://gateway.findanexpert.net/notesapi_svc/pv/notes/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure you use multipart/form-data for form data
                    Authorization: `Bearer ${JWTtoken}`,
                },
            });

            setResponseDatafirstnote(response.data);
            setNewNotes(false);
            console.log('API Response:', response.data);
            setinputtextval("");
            setLoading(false);
        } catch (error) {
            console.error('API Error:', error);
            setLoading(false);
            setNewNotes(false);
        }
    };


    // upload videos first time -------------------------------------------------------------
    const firstnotesrequesttosendvideos = async () => {
        const newpurchaseorder: any = localStorage.getItem('orderId');
        const purchase_order_id = parseInt(newpurchaseorder);
        // Create a new FormData object
        const formData: any = new FormData();

        // Add your data to the formData
        formData.append('text', "");
        formData.append('created_by', profile?.userId);
        formData.append('created_for', purchase_order_id);
        formData.append('created_by_type', 2);
        formData.append('created_for_type', 5);
        formData.append('image', "");
        formData.append('audio', "");
        formData.append('video', selectedFile);
        formData.append('is_shown', true);
        formData.append('created_by_name', profile?.firstName);
        formData.append('created_by_img_url', profile?.imageURL);
        formData.append('note_type', 2);
        formData.append('is_expert0_plexaar1', false);
        setLoading(true);

        try {
            const response = await axios.post('https://gateway.findanexpert.net/notesapi_svc/pv/notes/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure you use multipart/form-data for form data
                },
            });

            setResponseDatafirstnote(response.data);
            setSelectedFile(null);
            setLoading(false);
            console.log('API Response:', response.data);
            setinputtextval("");
        } catch (error) {
            console.error('API Error:', error);
            setLoading(false);
        }
    };

    // upload audio first time -------------------------------------------------------------
    const firstnotesrequesttosendaudio = async () => {
        const newpurchaseorder: any = localStorage.getItem('orderId');
        const purchase_order_id = parseInt(newpurchaseorder);
        // Create a new FormData object
        const formData: any = new FormData();

        // Add your data to the formData
        formData.append('text', "");
        formData.append('created_by', profile?.userId);
        formData.append('created_for', purchase_order_id);
        formData.append('created_by_type', 2);
        formData.append('created_for_type', 5);
        formData.append('image', "");
        formData.append('audio', selectedFileAudio);
        formData.append('video', "");
        formData.append('is_shown', true);
        formData.append('created_by_name', profile?.firstName);
        formData.append('created_by_img_url', profile?.imageURL);
        formData.append('note_type', 2);
        formData.append('is_expert0_plexaar1', false);
        setLoading(true);

        try {
            const response = await axios.post('https://gateway.findanexpert.net/notesapi_svc/pv/notes/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure you use multipart/form-data for form data
                },
            });

            setResponseDatafirstnote(response.data);
            setSelectedFileAudio(null);
            setLoading(false);
            console.log('API Response:', response.data);
            setinputtextval("");
        } catch (error) {
            console.error('API Error:', error);
            setLoading(false);
        }
    };

    // upload Image first time -------------------------------------------------------------
    const firstnotesrequesttosendImage = async () => {
        const newpurchaseorder: any = localStorage.getItem('orderId');
        const purchase_order_id = parseInt(newpurchaseorder);

        // Create a new FormData object
        const formData: any = new FormData();

        // Add your data to the formData
        formData.append('text', "");
        formData.append('created_by', profile?.userId);
        formData.append('created_for', purchase_order_id);
        formData.append('created_by_type', 2);
        formData.append('created_for_type', 5);
        formData.append('image', selectedFileImage);
        formData.append('audio', "");
        formData.append('video', "");
        formData.append('is_shown', true);
        formData.append('created_by_name', profile?.firstName);
        formData.append('created_by_img_url', profile?.imageURL);
        formData.append('note_type', 2);
        formData.append('is_expert0_plexaar1', false);
        setLoading(true);

        try {
            const response = await axios.post('https://gateway.findanexpert.net/notesapi_svc/pv/notes/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure you use multipart/form-data for form data
                },
            });

            setResponseDatafirstnote(response.data);
            setSelectedFileImage(null);
            setLoading(false);
            console.log('API Response:', response.data);
            setinputtextval("");
        } catch (error) {
            console.error('API Error:', error);
            setLoading(false);
        }
    };

    // Delete Notes Api --------------------------------------------------------------------
    const DeleteNotesbyid = async (item: any) => {


        setLoading(true);

        try {
            const response = await axios.delete(`https://gateway.findanexpert.net/notesapi_svc/pv/notes/?id=${item}&created_by=${profile?.externalCustomerId}&created_by_type=2`, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure you use multipart/form-data for form data
                },
            });

            setResponseDatafirstnote(response.data);
            setSelectedFileImage(null);
            setLoading(false);
            console.log('API Response:', response.data);
            setinputtextval("");
        } catch (error) {
            console.error('API Error:', error);
            setLoading(false);
        }
    };

    // used to get notes everytime updated -------------------------------------------------
    useEffect(() => {
        const bookingdetail: any = localStorage.getItem('bookingdetailforbookingnull');
        const newpurchaseorder: any = localStorage.getItem('orderId');
        const purchase_order_id = parseInt(newpurchaseorder);
        const bookingdetailparse = JSON.parse(bookingdetail);
        console.log("purchase_order_id", bookingdetailparse?.appointments[0]?.plexaarBookingId)
        // const getpurchaseorderid = parseInt(getOrderIdInLocalStorage())
        const fetchDataFromAPI = async () => {
            try {
                const response = await axios.get(`https://gateway.findanexpert.net/notesapi_svc/pv/notes/?id=${newpurchaseorder === "null" ? bookingdetailparse?.appointments[0]?.plexaarBookingId : purchase_order_id}&type=${newpurchaseorder === "null" ? "booking" : "purchase_order_id"}&timezone=Asia/Karachi${newpurchaseorder === "null" ? `&purchase_order_id=0` : ''}`);
                // /notesapi_svc/pv/notes/?id=780&type=provider&timezone=Asia/Karachi

                setResponseDatagetnotes(response.data.result);
                // localStorage.setItem("notes_id", response.data?.result[0]?.id)
                console.log('get notes:', response.data);
            } catch (error) {
                console.error('API Error:', error);

            }
        };

        fetchDataFromAPI(); // This will trigger the GET request when the component mounts
    }, [profile?.userId, purchaseOrderId, ResponseDatafirstnote, JwtRefreshToken]);

    // used to trigger upload video function -------------------------------------------------
    // useEffect(() => {
    //     if (NewNotes === false) {
    //         firstnotesrequesttosendvideos();
    //     } else {
    //         updatenotesrequesttosend();
    //     }
    // }, [selectedFile])

    // used to trigger upload audio function -------------------------------------------------
    // useEffect(() => {
    //     if (NewNotes === false) {
    //         firstnotesrequesttosendaudio();
    //     } else {
    //         updatenotesrequesttosend();
    //     }
    // }, [selectedFileAudio])

    // used to trigger upload Image function -------------------------------------------------
    // useEffect(() => {
    //     if (NewNotes === false) {
    //         firstnotesrequesttosendImage();
    //     } else {
    //         updatenotesrequesttosend();
    //     }
    // }, [selectedFileImage])


    // upload video file -------------------------------------------------------------------
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];

        // Check if the selected file is less than 5 MB (5,242,880 bytes)
        if (file && file.size <= 5242880) {
            setSelectedFile(file);
            setShow(false)
            console.log('Uploaded file:', file);

        } else {
            alert('File size exceeds 5 MB limit.');
        }
    };

    const handleCustomInputClick = (e: any) => {
        e.preventDefault();
        // Trigger the hidden file input element
        const fileInput: any = document.getElementById('upload');
        fileInput.click();
    };

    // upload audio file ---------------------------------------------------------------
    const handleFileChangeaudio = (e: any) => {
        const file = e.target.files[0];

        // Check if the selected file is less than 5 MB (5,242,880 bytes)
        if (file && file.size <= 5242880) {
            setSelectedFileAudio(file);
            setShow(false)
            console.log('Uploaded file:', file);
        } else {
            console.error('File size exceeds 5 MB limit.');
        }
    };

    const handleCustomInputClickaudio = (e: any) => {
        e.preventDefault();
        // Trigger the hidden file input element
        // fileInputRef.current.click();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // upload Image file ---------------------------------------------------------------
    const handleFileChangeImage = (e: any) => {
        const file = e.target.files[0];

        // Check if the selected file is less than 5 MB (5,242,880 bytes)
        if (file && file.type.startsWith('image/')) {
            // setSelectedFileImage(file);
            imguploadrequesttosend(file);
            setShow(false)
            console.log('Uploaded file:', file);
        } else {
            console.error('File size exceeds 5 MB limit.');
        }
    };

    const handleCustomInputClickImage = (e: any) => {
        e.preventDefault();
        // Trigger the hidden file input element
        fileInputRefImage.current.click();
    };

    // const handledelete = (item: any) => {
    //     setUpdateNotesId(item?.note_id);
    //  }

    console.log("ResponseDatagetnotes", ResponseDatagetnotes)

    return (
        <div className='col-md-12 '>


            {/* This is showing the notes that are adding ---------------------------------------------- */}
            <div className='col-md-12 px-1  '>
                <div className='row'>
                    <div className='col-md-3 col-3'></div>
                    <div className='col-md-9 col-9 text-end '>

                        {ResponseDatagetnotes?.map((item: any, index: any) => {
                            console.log("hi", item?.notesContent)
                            return (
                                <>
                                    <div className='col-md-12 text-end mt-3 '>
                                        <p className='m-0 p-0 font_size_m'>{profile?.firstName} {profile?.lastName} {item?.created_time}</p>
                                    </div>
                                    {item?.notesContent?.text_data ?
                                        <div className='col-md-12 '>
                                            <div className='flex_for_notes'>
                                                <p className='mt-2 py-0 mb-0  font_chat_text'><span className='background-chat_tags px-2 py-2 '>{item?.notesContent?.text_data}</span></p>
                                                <div className='ps-2'>
                                                    <Dropdown drop="start">
                                                        <Dropdown.Toggle variant="success" id="dropdown-basiccc">
                                                            <i id="icon_universal" className="fas fa-ellipsis-v"></i>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            {/* <Dropdown.Item onClick={() => { setUpdateNotesId(item?.notesContent?.note_id), setNewNotes(true) }} >Update</Dropdown.Item> */}
                                                            <Dropdown.Item onClick={() => DeleteNotesbyid(item?.notesContent?.note_id)} >Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                        : item?.notesContent?.video_url ?
                                            <div className='col-md-12  py-2'>
                                                <div className='flex_for_notes'>
                                                    <div className='px-2 py-2 background-chat_tags'>
                                                        <video width="100%" height="auto" controls>
                                                            <source src={item?.notesContent?.video_url} type="video/mp4" />
                                                        </video>
                                                    </div>
                                                    <div className='ps-2'>
                                                        <Dropdown drop="start">
                                                            <Dropdown.Toggle variant="success" id="dropdown-basiccc">
                                                                <i id="icon_universal" className="fas fa-ellipsis-v"></i>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                {/* <Dropdown.Item onClick={() => { setUpdateNotesId(item?.notesContent?.note_id), setNewNotes(true) }} >Update</Dropdown.Item> */}
                                                                <Dropdown.Item onClick={() => DeleteNotesbyid(item?.notesContent?.note_id)}>Delete</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </div> : item?.notesContent?.audio_url ?
                                                <div className='col-md-12  py-2'>
                                                    <div className='flex_for_notes'>
                                                        <audio controls>
                                                            <source src={item?.notesContent?.audio_url} type="video/mp4" />
                                                        </audio>
                                                        <div className='ps-2'>
                                                            <Dropdown drop="start">
                                                                <Dropdown.Toggle variant="success" id="dropdown-basiccc">
                                                                    <i id="icon_universal" className="fas fa-ellipsis-v"></i>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    {/* <Dropdown.Item onClick={() => { setUpdateNotesId(item?.notesContent?.note_id), setNewNotes(true) }} >Update</Dropdown.Item> */}
                                                                    <Dropdown.Item onClick={() => DeleteNotesbyid(item?.notesContent?.note_id)}>Delete</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                                : item?.notesContent?.image_url ?
                                                    <div className='col-md-12 px-2 py-2'>
                                                        <div className='flex_for_notes'>
                                                            <img className='img-fluid background-chat_tags px-2 py-2' src={item?.notesContent?.image_url} />
                                                            <div className='ps-2'>
                                                                <Dropdown drop="start">
                                                                    <Dropdown.Toggle variant="success" id="dropdown-basiccc">
                                                                        <i id="icon_universal" className="fas fa-ellipsis-v"></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu>
                                                                        {/* <Dropdown.Item onClick={() => { setUpdateNotesId(item?.notesContent?.note_id), setNewNotes(true) }} >Update</Dropdown.Item> */}
                                                                        <Dropdown.Item onClick={() => DeleteNotesbyid(item?.notesContent?.note_id)}>Delete</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null
                                    }

                                </>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* This is adding the notes  -------------------------------------------------------------- */}
            <div className='col-md-12 mt-4'>
                <div className='row'>
                    <div className='col-md-11 col-10 pe-0'>
                        <div className="input-group input_grp_border">
                            {selectedFile === null || selectedFileAudio === null || selectedFileImage === null ?
                                <>
                                    <input
                                        type="text"
                                        className="form-control border_remove_input py-2"
                                        placeholder="Type here..."
                                        aria-label=""
                                        aria-describedby="basic-addon1"
                                        value={inputtextval}
                                        onChange={(event: any) => setinputtextval(event?.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-light px-2 pt-2 background_buttons_input" type="button" onClick={handleShow}>
                                            <i className="fas fa-paperclip"></i>
                                        </button>
                                        <button className="btn btn-light pe-3 ps-2  pt-2 background_buttons_input" type="button" style={{ cursor: "no-drop" }}>
                                            <label htmlFor="uploadAudio" className="custom-file-upload" style={{ cursor: "no-drop" }} onClick={handleCustomInputClickaudio}>
                                                <i className="fas fa-microphone-alt"></i>
                                            </label>
                                            <input
                                                type="file"
                                                id="uploadAudio"
                                                accept="audio/*"
                                                disabled
                                                // onChange={handleFileChangeaudio}
                                                style={{ display: 'none', cursor: "no-drop" }}
                                                capture="user"
                                                ref={fileInputRef}
                                            // type="file"
                                            // id="uploadAudio"
                                            // accept="audio/*"
                                            // onChange={handleFileChangeaudio}
                                            // style={{ display: 'none' }}
                                            // capture="user"
                                            // ref={fileInputRef}
                                            />
                                        </button>
                                    </div>
                                </> :
                                <span className='px-2 py-1'>{selectedFile?.name} {selectedFileAudio?.name} </span>
                            }
                        </div>

                    </div>
                    <div className='col-md-1 col-2 pe-2 m-auto'>
                        {loading === false ?
                            <>
                                {NewNotes === false ?
                                    <img onClick={firstnotesrequesttosend} className='img-fluid img_border_rad' src='/imagess/navi.png' />
                                    :
                                    <>
                                        {/* <span onClick={updatenotesrequesttosend}>HIt</span> */}
                                        <img onClick={imguploadrequesttosend} className='img-fluid img_border_rad' src='/imagess/navi.png' />
                                    </>
                                }
                            </>
                            :
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/* Modal to show further options ---------------------------------------------------------- */}
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-md-12'>
                        <div className='row'>

                            <div className='col-md-12 col-12'>
                                <div className='col-md-12  text-center py-3 border_for_modal' style={{ cursor: "no-drop" }}>
                                    {/* Upload Video <i className="fas fa-video"></i> */}
                                    {/* <input id="upload" type="file" accept="image/*" /> */}
                                    <label htmlFor="upload" className="custom-file-upload" onClick={handleCustomInputClick}>
                                        Upload Video <i className="fas fa-video"></i>
                                    </label>
                                    <input
                                        type="file"
                                        id="upload"
                                        accept="video/*"
                                        disabled
                                        // onChange={handleFileChange}
                                        style={{ display: 'none', cursor: "no-drop" }}
                                    />

                                </div>
                                {/* <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="fileInput" className="btn btn-primary">
                  Choose File
                </label> */}
                            </div>
                            <div className='col-md-4 col-4' style={{display:"none"}}>
                                <div className='col-md-12  text-center py-3 border_for_modal' style={{ cursor: "no-drop" }}>
                                    {/* Upload Audio <i className="fas fa-file-audio"></i> */}
                                    <label htmlFor="uploadAudio" className="custom-file-upload" onClick={handleCustomInputClickaudio}>
                                        Upload Audio <i className="fas fa-microphone"></i>
                                    </label>
                                    <input
                                        type="file"
                                        id="uploadAudio"
                                        accept="audio/*"
                                        disabled
                                        // onChange={handleFileChangeaudio}
                                        style={{ display: 'none', cursor: "no-drop" }}
                                        capture="user"
                                        ref={fileInputRef}
                                    />
                                </div>
                            </div>
                            <div className='col-md-4 col-4' style={{display:"none"}}>
                                <div className='col-md-12  text-center py-3 border_for_modal'>
                                    <label htmlFor="uploadImage" className="custom-file-upload" onClick={handleCustomInputClickImage}>
                                        Upload Image <i className="fas fa-image"></i>
                                    </label>
                                    <input
                                        type="file"
                                        id="uploadImage"
                                        accept="image/*"
                                        onChange={handleFileChangeImage}
                                        style={{ display: 'none' }}
                                        // capture="environment"
                                        ref={fileInputRefImage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default Noteseditbooking