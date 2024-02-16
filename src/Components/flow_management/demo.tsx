import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import StopIcon from "@mui/icons-material/Stop";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import NotesLoading from "./loader_for_notes";
import { getOrderIdInLocalStorage } from "../helper";
import { useSelector } from "react-redux";
import { getNotesData } from "@/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Message {
  sender: "user" | "receiver";
  content: string;
  timestamp: number;
  voiceBlob?: Blob;
  videoBlob?: Blob;
  imageBlob?: Blob;
  audioBlob?: Blob;
}
interface NotesResponse {
  error: boolean;
  result: ResultItem[];
  message: string;
  code: number;
}
interface ResultItem {
  objectId: number;
  notesId: number;
  textData: string | null;
  audioUrl: string | null;
  videoUrl: string | null;
  imageUrl: string | null;
  isEnable: boolean;
  createdAt: string;
}

const Demo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [loading, SetLoading] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | undefined>();
  const [selectedVideo, setSelectedVideo] = useState<Blob | undefined>();
  const [selectedImage, setSelectedImage] = useState<Blob | undefined>();
  const [recordedCameraBlob, setRecordedCameraBlob] = useState<
    Blob | undefined
  >();
  const [selectedAudio, setSelectedAudio] = useState<File | undefined>();

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [senderAvatar] = useState<string>("S");
  const [receiverAvatar] = useState<string>("R");
  const [isRecordingCamera, setIsRecordingCamera] = useState(false);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);
  const [notes, setNotes] = useState<ResultItem[]>([]);
  const [isNotesCreated, setIsNotesCreated] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const purchaseOrderId = getOrderIdInLocalStorage();
  const { profile } = useSelector((state: any) => state);

  const fetchNotesData = useCallback(() => {
    setFetchedData(true);
    getNotesData(profile?.userId, parseInt(purchaseOrderId))
      .then((res) => {
        if (res.code === 0) {
          setNotes(res?.result);
        } else {
          // toast.warning("Notes created please create by entering details");
          console.log("respppppp", notes);
        }
      })
      .catch((e) => alert(e))
      .finally(() => setFetchedData(false));
  }, [profile, purchaseOrderId]);

  useEffect(() => {
    if (profile.userId) {
      fetchNotesData();
    }
  }, [fetchNotesData]);

  const handleSendMessage = async (e: React.FormEvent) => {
    const allowedTypes = ["image/png", "image/jpeg"];
    e.preventDefault();
    if (
      !messageInput.trim() &&
      !selectedVideo &&
      !recordedBlob &&
      !selectedImage &&
      !recordedCameraBlob &&
      !selectedAudio
    )
      return;

    let newSenderMessage: Message = {
      sender: "user",
      content: messageInput,
      timestamp: Date.now(),
    };

    let newReceiverMessage: Message = {
      sender: "receiver",
      content: "Received: " + messageInput,
      timestamp: Date.now() + 1,
    };
    SetLoading(true);
    if (selectedType === "voice") {
      newSenderMessage.voiceBlob = recordedBlob;
      // setRecordedBlob(undefined);
      console.log(newSenderMessage, "voice");
      console.log(recordedBlob, "recordedBlob");
      let fd = new FormData();

      fd.append("bookingId", purchaseOrderId);
      fd.append("userId", profile?.userId);
      fd.append("noteType", "customer");
      fd.append("isEnable", "true");
      if (recordedBlob instanceof Blob) {
        fd.append("audioFile", recordedBlob);
      } else {
        console.error("Invalid selectedImage");
      }

      try {
        const result = await axios.post(
          "https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/",
          // "https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/",
          fd
        );
        console.log(result, "result");
        setRecordedBlob(undefined);
        fetchNotesData();
      } catch (error) {
        console.log(error);
      }
    } else if (selectedType === "video") {
      newSenderMessage.videoBlob = selectedVideo;

      // setSelectedVideo(undefined);
      let fd = new FormData();

      fd.append("bookingId", purchaseOrderId);
      fd.append("userId", profile?.userId);
      fd.append("noteType", "customer");
      fd.append("isEnable", "true");
      if (selectedVideo instanceof Blob) {
        let sizeInMb = selectedVideo.size / (1024 * 1024);
        console.log(sizeInMb, "sizeInMb");
        let sizeInKb = selectedVideo.size / 1000;
        if (sizeInMb <= 5) {
          fd.append("videoFile", selectedVideo);
          try {
            const result = await axios.post(
              "https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/",
              // "https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/",
              fd
            );
            console.log(result, "result");
            setSelectedVideo(undefined);
            fetchNotesData();
          } catch (error) {
            console.log(error);
          }
        } else {
          setSelectedVideo(undefined);
          alert("video file should be less then 5 MB");
        }
        // fd.append("videoFile", selectedVideo);
        // if (selectedVideo.size <= 30 * 1024 * 1024) {
        //   fd.append("videoFile", selectedVideo);
        // } else {
        //   console.log("large file");
        //   alert("video file should be less then 30 second");
        // }
      } else {
        console.error("Invalid selectedImage");
      }
    } else if (selectedType === "image") {
      newSenderMessage.imageBlob = selectedImage;

      // setSelectedImage(undefined);
      let fd = new FormData();

      fd.append("bookingId", purchaseOrderId);
      fd.append("userId", profile?.userId);
      fd.append("noteType", "customer");
      fd.append("isEnable", "true");
      if (selectedImage instanceof Blob) {
        if (allowedTypes.includes(selectedImage.type)) {
          fd.append("imageFile", selectedImage);
          try {
            const result = await axios.post(
              "https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/",
              // "https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/",
              fd
            );
            console.log(result, "result");
            setSelectedImage(undefined);
            fetchNotesData();
          } catch (error) {
            console.log(error);
          }
        } else {
          alert("Only PNG and JPG images are allowed.");
          setSelectedImage(undefined);
          // console.log("Only PNG and JPG images are allowed.")
        }
      } else {
        alert("Invalid selectedImage");
        console.error("Invalid selectedImage");
      }
    } else if (selectedType === "camera") {
      newSenderMessage.videoBlob = recordedCameraBlob;
      // setRecordedCameraBlob(undefined);
      let fd = new FormData();

      fd.append("bookingId", purchaseOrderId);
      fd.append("userId", profile?.userId);
      fd.append("noteType", "customer");
      fd.append("isEnable", "true");
      if (recordedCameraBlob instanceof Blob) {
        let sizeInMb = recordedCameraBlob.size / (1024 * 1024);
        if (sizeInMb <= 5) {
          fd.append("videoFile", recordedCameraBlob);
          try {
            const result = await axios.post(
              "https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/",
              // "https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/",
              fd
            );
            console.log(result, "result");
            setRecordedCameraBlob(undefined);
            fetchNotesData();
          } catch (error) {
            console.log(error);
          }
        } else {
          setRecordedCameraBlob(undefined);
          alert("video file should be less then 5 MB");
        }
      } else {
        console.error("Invalid selectedImage");
      }

      console.log(fd, "fd");
    } else if (selectedType === "audio") {
      newSenderMessage.audioBlob = selectedAudio;
      // setSelectedAudio(undefined);
      let fd = new FormData();

      fd.append("bookingId", purchaseOrderId);
      fd.append("userId", profile?.userId);
      fd.append("noteType", "customer");
      fd.append("isEnable", "true");
      if (selectedAudio instanceof Blob) {
        fd.append("audioFile", selectedAudio);
      } else {
        console.error("Invalid selectedImage");
      }

      try {
        const result = await axios.post(
          "https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/",
          // "https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/",
          fd
        );
        console.log(result, "result");
        setSelectedAudio(undefined);
        fetchNotesData();
      } catch (error) {
        console.log(error);
      }
    } else {
      let fd = new FormData();

      fd.append("bookingId", purchaseOrderId);
      fd.append("userId", profile?.userId);
      fd.append("noteType", "customer");
      fd.append("isEnable", "true");
      fd.append("textData", messageInput);
      console.log(fd, "fd");

      try {
        const result = await axios.post(
          "https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/",
          // "https://gateway.findanexpert.net/notesapi_svc/pb/createnotes/",
          fd
        );
        console.log(result, "result");
        setMessageInput("");
        fetchNotesData();
      } catch (error) {
        console.log(error);
      }
    }
    console.log(newSenderMessage, "newSenderMessage");
    setMessages((prevMessages) => [
      ...prevMessages,
      newSenderMessage,
      //   newReceiverMessage,
    ]);

    setMessageInput("");
    setSelectedType(null);
    SetLoading(false);
    // onClickHandler();
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: "audio/webm" });
        setRecordedBlob(recordedBlob);
      };

      recorder.start();
      setIsRecording(true);
      recorderRef.current = recorder;
      setSelectedType("voice");
    } catch (error) {
      console.error("Failed to access microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (!recorderRef.current || !isRecording) {
      console.log("No active recording to stop.");
      return;
    }

    recorderRef.current.stop();
    setIsRecording(false);

    const tracks = recorderRef.current.stream.getTracks();
    tracks.forEach((track) => track.stop());
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    console.log(file, "image");
    if (file) {
      setSelectedImage(file);
      setSelectedType("image");
      setShowFileDialog(false);
    }
  };
  const handleStartCameraRecording = async () => {
    setShowVideo(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        if (!videoRef.current.paused) {
          videoRef.current.pause();
        }

        videoRef.current.play();
        setIsRecordingCamera(true);
      } else {
        console.error("videoRef.current is null or undefined");
      }
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: "video/webm" });
        setRecordedCameraBlob(recordedBlob);
      };

      recorder.start();
      setIsRecordingCamera(true);
      recorderRef.current = recorder;
      setSelectedType("camera");
    } catch (error) {
      console.error("Failed to access camera:", error);
    }
  };

  const handleStopCameraRecording = () => {
    if (!recorderRef.current || !isRecordingCamera) return;

    recorderRef.current.stop();
    setIsRecordingCamera(false);

    setShowFileDialog(false);
    setShowVideo(false);
    setRecordedCameraBlob(undefined);

    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file, "audio");
    if (file) {
      setSelectedAudio(file);
      setSelectedType("audio");
      setShowFileDialog(false);
    }
  };
  const handleOpenFileDialog = () => {
    setShowFileDialog(true);
  };

  const handleCloseFileDialog = () => {
    setShowFileDialog(false);
  };
  const openCamera = async () => {
    setShowVideo(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        if (!videoRef.current.paused) {
          videoRef.current.pause();
        }

        videoRef.current.play();
        setIsRecordingCamera(true);
      } else {
        console.error("videoRef.current is null or undefined");
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  console.log("notes=====>", notes);

  return (
    <>
      <ToastContainer />
      {notes ? null : (
        <span className="label_text">
          Enter message to create notes
          <br />
        </span>
      )}
      <Box className="pt-2">
        {notes?.length === 0 ? null : (
          <Box
            sx={{
              height: "60vh",
              overflowY: "auto",
              marginBottom: 2,
              display: "flex",
              flexDirection: "column-reverse",
              scrollbarWidth: "thin",
              scrollbarColor: "transparent transparent",
              "&::-webkit-scrollbar": {
                width: "1px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "transparent",
              },
            }}
          >
            {showVideo ? (
              <video ref={videoRef} style={{ display: "block" }} height="350" />
            ) : (
              <List>
                {fetchedData ? (
                  <NotesLoading />
                ) : (
                  notes.length &&
                  notes.map((item, index) => {
                    return (
                      <ListItem
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "row-reverse",
                        }}
                      >
                        <Box>
                          <Box
                            component="div"
                            sx={{
                              backgroundColor: "#f3f3f3",
                              padding: "8px",
                              borderRadius: "4px",
                              width: "fit-content",
                              color: "#000",
                            }}
                          >
                            {item.audioUrl && (
                              <audio controls>
                                <source src={item.audioUrl} type="audio/webm" />
                              </audio>
                            )}

                            {item.videoUrl && (
                              <video
                                controls
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  maxWidth: "300px",
                                }}
                              >
                                <source src={item.videoUrl} type="video/mp4" />
                              </video>
                            )}
                            {item.imageUrl && (
                              <img
                                src={item.imageUrl}
                                alt="Uploaded"
                                style={{
                                  maxWidth: "300px",
                                  maxHeight: "200px",
                                }}
                              />
                            )}

                            {item.textData && (
                              <ListItemText>
                                <Typography
                                  sx={{
                                    fontFamily: "Roboto",
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    lineHeight: "16px",
                                  }}
                                >
                                  {item.textData}
                                </Typography>
                              </ListItemText>
                            )}
                          </Box>
                        </Box>
                      </ListItem>
                    );
                  })
                )}
              </List>
            )}
          </Box>
        )}

        <form onSubmit={handleSendMessage}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Message"
              fullWidth
              size="small"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              sx={{ marginRight: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      component="span"
                      aria-label="Attach File"
                      onClick={handleOpenFileDialog}
                    >
                      <AttachFileIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Dialog open={showFileDialog} onClose={handleCloseFileDialog}>
              <DialogTitle>Select Media</DialogTitle>
              <DialogContent>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <label htmlFor="file-input">
                    <input
                      id="file-input"
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        setSelectedVideo(e.target.files?.[0]);
                        setSelectedType("video");
                        setShowFileDialog(false);
                      }}
                      style={{ display: "none" }}
                      ref={fileInputRef}
                    />
                    <IconButton
                      color="primary"
                      component="span"
                      aria-label="Select Video"
                    >
                      <VideoCallIcon
                        sx={{
                          fontSize: "40px",
                        }}
                      />
                      <Typography>Select Video</Typography>
                    </IconButton>
                  </label>
                  <label htmlFor="image-input">
                    <input
                      id="image-input"
                      type="file"
                      accept="image/*,.gif"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      ref={fileInputRef}
                    />
                    <IconButton
                      color="primary"
                      component="span"
                      aria-label="Select Image"
                    >
                      <ImageIcon
                        sx={{
                          fontSize: "40px",
                        }}
                      />
                      <Typography>Select Image</Typography>
                    </IconButton>
                  </label>
                  <label htmlFor="audio-input">
                    <input
                      id="audio-input"
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioUpload}
                      style={{ display: "none" }}
                      ref={fileInputRef}
                    />
                    <IconButton
                      color="primary"
                      component="span"
                      aria-label="Select Audio"
                    >
                      <AudiotrackIcon
                        sx={{
                          fontSize: "40px",
                        }}
                      />
                      <Typography>Select Audio</Typography>
                    </IconButton>
                  </label>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseFileDialog}>Cancel</Button>
              </DialogActions>
            </Dialog>

            <IconButton
              color={isRecording ? "secondary" : "primary"}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              aria-label={isRecording ? "Stop Recording" : "Start Recording"}
            >
              <MicIcon />
            </IconButton>
            <IconButton
              color={isRecordingCamera ? "secondary" : "primary"}
              onClick={
                isRecordingCamera
                  ? handleStopCameraRecording
                  : handleStartCameraRecording
              }
              aria-label={isRecordingCamera ? "Stop Camera" : "Start Camera"}
            >
              {isRecordingCamera ? <StopIcon /> : <PhotoCameraIcon />}
            </IconButton>
            {loading ? (
              <CircularProgress size={25} />
            ) : (
              <IconButton
                type="submit"
                color="primary"
                aria-label="Send Message"
                disabled={
                  !messageInput &&
                  !selectedVideo &&
                  !recordedBlob &&
                  !selectedImage &&
                  !recordedCameraBlob &&
                  !selectedAudio
                }
              >
                <SendIcon />
              </IconButton>
            )}
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Demo;
