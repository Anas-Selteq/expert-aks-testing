import { Skeleton } from "@mui/material";
import React from "react";
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
} from "@mui/material";
const NotesLoading = () => {
  return (
    <>
      {[1, 1, 1, 1, 11, 1, 1, 1, 1].map((item, index) => {
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
                <Skeleton   variant="rounded" width={210} height={60} />
              </Box>
            </Box>
          </ListItem>
        );
      })}
    </>
  );
};

export default NotesLoading;
