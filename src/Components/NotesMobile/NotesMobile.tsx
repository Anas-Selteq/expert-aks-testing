import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { getOrderIdInLocalStorage } from '../helper';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NotesMobile() {
  const [show, setShow] = useState(false);
  const [inputtextval, setinputtextval] = useState("")
  const [ResponseDatafirstnote, setResponseDatafirstnote] = useState("")
  const [ResponseDatagetnotes, setResponseDatagetnotes] = useState([])
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedFileAudio, setSelectedFileAudio] = useState<any>(null);
  const [selectedFileImage, setSelectedFileImage] = useState<any>(null);

  const [loading, setLoading] = useState<any>(false);
  const fileInputRef = useRef<any>(null);

  const fileInputRefImage = useRef<any>(null);

  const purchaseOrderId = getOrderIdInLocalStorage();
  const { profile } = useSelector((state: any) => state);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // create notes first time -------------------------------------------------------------
  const firstnotesrequesttosend = async () => {
    // Create a new FormData object
    const formData: any = new FormData();

    // Add your data to the formData
    formData.append('bookingId', purchaseOrderId);
    formData.append('userId', profile?.userId);
    formData.append('noteType', 'customer');
    formData.append('isEnable', true);
    formData.append('textData', inputtextval);
    formData.append('created_by_name', profile?.firstName);
    formData.append('created_by_img_url', profile?.imageURL);
    // formData.append('is_shown', false);
    setLoading(true);

    try {
      const response = await axios.post('https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/', formData, {
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


  // upload videos first time -------------------------------------------------------------
  const firstnotesrequesttosendvideos = async () => {
    // Create a new FormData object
    const formData: any = new FormData();

    // Add your data to the formData
    formData.append('bookingId', purchaseOrderId);
    formData.append('userId', profile?.userId);
    formData.append('noteType', 'customer');
    formData.append('isEnable', true);
    formData.append('videoFile', selectedFile);
    setLoading(true);

    try {
      const response = await axios.post('https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/', formData, {
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
    // Create a new FormData object
    const formData: any = new FormData();

    // Add your data to the formData
    formData.append('bookingId', purchaseOrderId);
    formData.append('userId', profile?.userId);
    formData.append('noteType', 'customer');
    formData.append('isEnable', true);
    formData.append('audioFile', selectedFileAudio);
    setLoading(true);

    try {
      const response = await axios.post('https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/', formData, {
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

  // upload audio first time -------------------------------------------------------------
  const firstnotesrequesttosendImage = async () => {
    // Create a new FormData object
    const formData: any = new FormData();

    // Add your data to the formData
    formData.append('bookingId', purchaseOrderId);
    formData.append('userId', profile?.userId);
    formData.append('noteType', 'customer');
    formData.append('isEnable', true);
    formData.append('imageFile', selectedFileImage);
    setLoading(true);

    try {
      const response = await axios.post('https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/', formData, {
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
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(`https://gateway.findanexpert.net/notesapi_svc/pb/getnotes/?userId=${profile?.userId}&bookingId=${purchaseOrderId}&noteType=customer`);

        setResponseDatagetnotes(response.data?.result);
        console.log('get notes:', response.data?.result);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchDataFromAPI(); // This will trigger the GET request when the component mounts
  }, [profile?.userId, purchaseOrderId, ResponseDatafirstnote]);

  // used to trigger upload video function -------------------------------------------------
  useEffect(() => {
    firstnotesrequesttosendvideos();
  }, [selectedFile])

  // used to trigger upload audio function -------------------------------------------------
  useEffect(() => {
    firstnotesrequesttosendaudio();
  }, [selectedFileAudio])

  // used to trigger upload Image function -------------------------------------------------
  useEffect(() => {
    firstnotesrequesttosendImage();
  }, [selectedFileImage])


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
    fileInputRef.current.click();
  };

  // upload Image file ---------------------------------------------------------------
  const handleFileChangeImage = (e: any) => {
    const file = e.target.files[0];

    // Check if the selected file is less than 5 MB (5,242,880 bytes)
    if (file && file.type.startsWith('image/')) {
      setSelectedFileImage(file);
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

  return (
    <div className='col-md-12 '>


      {/* This is showing the notes that are adding ---------------------------------------------- */}
      <div className='col-md-12 px-1 '>
        <div className='row'>
          <div className='col-md-3 col-3'></div>
          <div className='col-md-9 col-9 '>
            {ResponseDatagetnotes.map((item: any, index: any) => {
              return (
                <>
                  <div className='col-md-12 text-end pb-1 mt-1'>
                    <p className='m-0 p-0 font_size_m'>{profile?.firstName} {profile?.lastName} 11:30</p>
                  </div>
                  {item?.textData ?
                    <div className='col-md-12 background-chat_tags px-2 py-2'>
                      <p className='m-0 p-0 font_chat_text'>{item?.textData}</p>
                    </div>
                    : item?.videoUrl ?
                      <div className='col-md-12 background-chat_tags px-2 py-2'>
                        <video width="100%" height="auto" controls>
                          <source src={item?.videoUrl} type="video/mp4" />
                        </video>
                      </div> : item?.audioUrl ?
                        <div className='col-md-12 pe-4 py-2'>
                          <audio controls>
                            <source src={item?.audioUrl} type="video/mp4" />
                          </audio>
                        </div>
                        : item?.imageUrl ?
                          <div className='col-md-12 background-chat_tags px-2 py-2'>
                            <img className='img-fluid' src={item?.imageUrl} />
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
                    <button className="btn btn-light pe-3 ps-2  pt-2 background_buttons_input" type="button">
                      <label htmlFor="uploadAudio" className="custom-file-upload" onClick={handleCustomInputClickaudio}>
                        <i className="fas fa-microphone-alt"></i>
                      </label>
                      <input
                        type="file"
                        id="uploadAudio"
                        accept="audio/*"
                        // onChange={handleFileChangeaudio}
                        style={{ display: 'none', cursor:"no-drop" }}
                        capture="user"
                        ref={fileInputRef}
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
              <img onClick={firstnotesrequesttosend} className='img-fluid img_border_rad' src='/imagess/navi.png' />
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

              <div className='col-md-4 col-4'>
                <div className='col-md-12  text-center py-3 border_for_modal'>
                  {/* Upload Video <i className="fas fa-video"></i> */}
                  {/* <input id="upload" type="file" accept="image/*" /> */}
                  <label htmlFor="upload" className="custom-file-upload" onClick={handleCustomInputClick}>
                    Upload Video <i className="fas fa-video"></i>
                  </label>
                  <input
                    type="file"
                    id="upload"
                    accept="video/*"
                    // onChange={handleFileChange}
                    style={{ display: 'none', cursor:"no-drop" }}
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
              <div className='col-md-4 col-4'>
                <div className='col-md-12  text-center py-3 border_for_modal'>
                  {/* Upload Audio <i className="fas fa-file-audio"></i> */}
                  <label htmlFor="uploadAudio" className="custom-file-upload" onClick={handleCustomInputClickaudio}>
                    Upload Audio <i className="fas fa-microphone"></i>
                  </label>
                  <input
                    type="file"
                    id="uploadAudio"
                    accept="audio/*"
                    // onChange={handleFileChangeaudio}
                    style={{ display: 'none', cursor:"no-drop" }}
                    // capture="user"
                    ref={fileInputRef}
                  />
                </div>
              </div>
              <div className='col-md-4 col-4'>
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

export default NotesMobile