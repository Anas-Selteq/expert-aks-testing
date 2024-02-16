import Layout2 from '@/Components/Layout2/Layout2'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getSocket, connectSocket } from '@/ServicesSocket/SocketServices';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

function Chat() {
  const socket = getSocket();
  const [msgdata, seteMsgData] = useState([]);
  const [valueNew, setvalueNew] = useState(false);
  const [inputValue123, setInputValue123] = useState<any>("")
  const containerRef = useRef<HTMLDivElement>(null);
  const [valurchange, setValuechange] = useState(false)
  const [updatedValue, setUpdatedValue] = useState(false);
  const [NewBooking, setNewBooking] = useState<any>({});
  const { profile } = useSelector((state: any) => state);
  const router = useRouter();
  const { id }: any = router.query;

  // Use useEffect to scroll to the bottom when the component mounts

  console.log("profile-->", parseInt(id))

  useEffect(() => {
    const gettingbooking: any = localStorage.getItem("bookingdetailforchat")
    const parsedgettingbooking = JSON.parse(gettingbooking);
    console.log("parsedgettingbooking", parsedgettingbooking);
    setNewBooking(parsedgettingbooking);
  }, [])


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`https://expertchatapi.findanexpert.net/api/message/get/${profile?.externalCustomerId}.${id}?page=1`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        seteMsgData(result?.data);
        console.log("data", result?.data);

      } catch (error: any) {
        console.log(error.message);
      } finally {
        console.log(false);
      }
    };
    fetchData();
  }, [profile?.userId, id]);






  useEffect(() => {
    if (inputValue123.length === 0) {
      connectSocket();
    }
    else {
      console.log("i am not running anymore socket")
    }
    if (socket) {

      socket.on("ios_prv_message", (message: any) => {
        console.log("Received message:", message);
        const fetchDatanew = async () => {
          try {
            const response = await fetch(`https://expertchatapi.findanexpert.net/api/message/get/${profile?.externalCustomerId}.${id}?page=1`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log("anass")
            seteMsgData(result?.data);
            console.log("data", result?.data);
            // setInputValue("")
          } catch (error: any) {
            console.log(error.message);
          } finally {
            console.log(false);
          }
        };
        fetchDatanew();
        // alert("in")
      });
    }
  }, [socket])

  // useEffect(() => {
  //   alert("onnnnnnnnnn")
  //   socket.on("ios_prv_message", (message: any) => {
  //     console.log("Received message:", message);
  //     alert("hit")

  //     // setChatting(true);
  //     // Update the UI with the message
  //     // You can use the payload properties here to update the UI as needed
  //   });
  // }, [valueNew])





  const msgemit = () => {
    // console.log("newval", inputValue);

    // Clear the input field
    setInputValue123('');
    if (socket) {

      socket.emit("ios_prv_message", {
        conversationId: `${profile?.externalCustomerId}.${id}`,
        text: inputValue123,
        to: id,
        from: profile?.externalCustomerId,
      });

    } else {
      alert("connextion not build")
    }
  }

  useLayoutEffect(() => {

    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }

  }, [msgdata, socket, updatedValue]);






  React.useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Enter') {
        msgemit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [msgemit]);

  const handleInputChange = (event: any) => {
    setInputValue123(event.target.value);
  };
  const msgemitnew = () => {
    enqueueSnackbar('Default card not updated!', { variant: 'error' });
  }




  return (

    <Layout2>
      <div className='col-md-12 margin_bottom_new mt-4'>
        {/* Header of the Chat  */}
        <div className='col-md-12 border_white_new py-2 px-2'>
          {NewBooking?.dateJson ?
            <div className='row'>
              <div className='col-md-1 col-1 pe-0 text-center'>
                <img className='img-fluid' src='/imagess/img.png' />
              </div>
              <div className='col-md-6 col-6 m-auto'>
                <p className='m-0 p-0 heading_chat'>{NewBooking?.serviceName}</p>
                <p className='m-0 p-0 sub_text_chat'>{NewBooking?.bookingLocation}</p>
              </div>
              <div className='col-md-5 col-5 m-auto text-end'>
                <p className='m-0 p-0 sub_text_chat'>{NewBooking?.dateJson[0]?.bookingDate}</p>
                <p className='m-0 p-0 sub_text_chat_1 pt-1'>{NewBooking?.dateJson[0]?.timeFrom} - {NewBooking?.dateJson[0]?.timeTo}</p>
              </div>
            </div> :
            <div className="spinner-grow text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          }
        </div>
        {/* Body Of the chat  */}
        <div className='col-md-12  border_white_new py-2 mt-3 px-2 '>
          <div className='col-md-12 text-center mt-1'>
            <button className='btn btn-secondary py-0 px-4 background_color_button_chat rounded-pill'> Today </button>
          </div>
          <div className='col-md-12 height_adjust' ref={containerRef}>
            {msgdata?.map((item: any, index: any) => {
              return (
                <div className='col-md-12  px-1'>
                  {item.from === `${id}` ?
                    <div className='col-md-6 '>

                      <div className='row mt-4 '>
                        <div className='col-md-2 ps-4 col-2 '>
                          <img className='img-fluid' src='/imagess/avatar.png' />
                          <div className='col-md-12 margin_neg_chat '>
                            <img className='img-fluid ' src='/imagess/ac.png' />
                          </div>
                        </div>
                        <div className='col-md-10 col-10 ps-0 pt-1'>
                          <div className='col-md-12 ps-0'>
                            <p className='m-0 p-0 main_head_chat'>{NewBooking?.providerName}</p>
                            <p className='m-0 p-0 sub_text_chat_1'>Just Now</p>
                          </div>
                        </div>
                      </div>

                      <div className='col-md-12 '>
                        <p className='m-0 p-0 background_text_chat px-3 py-2 mt-2'>
                          {item.text}
                        </p>
                        {/* <p className='m-0 p-0 background_text_chat px-3 py-2 mt-2'>
                          Just Let me know!
                        </p> */}
                      </div>

                    </div>
                    : item.from === `${profile?.externalCustomerId}` ?
                      <div className='col-md-12'>
                        <div className='row'>
                          <div className='col-md-6'></div>
                          <div className='col-md-6 px-3'>

                            <div className='row  '>

                              <div className='col-md-10 col-10 text-end pe-0 pt-1'>
                                <div className='col-md-12 pe-0'>
                                  <p className='m-0 p-0 main_head_chat'>{profile?.firstName} {profile?.lastName}</p>
                                  <p className='m-0 p-0 sub_text_chat_1'>Just now</p>
                                </div>
                              </div>
                              <div className='col-md-2 col-2 '>
                                <img className='img-fluid' src={profile?.imageURL.length === 0 ? "/imagess/avatar.png" : profile?.imageURL} />
                                <div className='col-md-12 margin_neg_chat_new ps-1 '>
                                  <img className='img-fluid ' src='/imagess/ac.png' />
                                </div>
                              </div>
                            </div>
                            <div className='col-md-12 '>
                              <p className='m-0 p-0 background_text_chat_sender px-3 py-2 mt-2'>
                                {item?.text}
                              </p>
                              {/* <p className='m-0 p-0 background_text_chat_sender px-3 py-2 mt-2'>
                              Just Let me know!
                            </p> */}
                              <div className='col-md-12'>
                                <img className='img-fluid background_text_chat_sender' src='' />
                              </div>
                            </div>

                            {/* <div className='text-end col-md-12'>
                            <p className='m-0 p-0 '><span className='unseen_text'>seen</span>
                              <span className='seen_text'>Unsend</span>
                            </p>
                          </div> */}
                          </div>
                        </div>
                      </div> : null
                  }
                </div>
              )
            })}
          </div>



          <div className='col-md-12  px-2 mb-2 mt-3'>
            {/* <input className='form-control form-control-lg ' type='text' placeholder='Type your message....' /> */}
            <div className="input-group">
              <input
                type="text"
                className="form-control text_chatnew py-2"
                placeholder="Type your message..."
                aria-label=""
                aria-describedby="basic-addon1"
                value={inputValue123}
                onChange={handleInputChange}
                onClick={() => setUpdatedValue(!updatedValue)}
              />
              <div
                onClick={inputValue123.length === 0 ? msgemitnew : msgemit}
                onKeyDown={event => {
                  if (event.key === 'Enter' && inputValue123.length === 0) {
                    event.preventDefault(); // Prevent default Enter key behavior
                  }
                }}
                className="input-group-append text_chatnww px-2 pt-2">
                {/* <button className='btn btn-danger' >send</button> */}
                <img

                  className='img-fluid' src='/imagess/rightb.png' />
              </div>
            </div>

          </div>

        </div>
      </div>
    </Layout2>
  )
}

export default Chat