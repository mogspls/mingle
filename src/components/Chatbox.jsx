import { useState } from "react";
import {
  TextField,
  Paper,
  Box,
  IconButton,
  Tooltip,
  Menu,
  Typography,
} from "@mui/material";
import {
  motion,
  // AnimatePresence
} from "framer-motion";

// Material Icons
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";

import data from "@emoji-mart/data";
import { init, SearchIndex, Picker } from "emoji-mart";

init({ data });

export function EmojiPedia({
  anchorEl,
  open,
  onClose,
  anchorOrigin,
  transformOrigin,
  results,
  emojiList,
}) {
  const [data, setData] = useState({
    emojiList: emojiList,
  });

  async function searchEmoji(value) {
    try {
      const emojis = await SearchIndex.search(value);
      const results = emojis.map((emoji) => {
        return emoji.skins[0].native;
      });
      setData({
        ...data,
        emojiList: results,
      });
    } catch (e) {
      setData({ ...data, emojiList: "All" });
      console.log("No emojis");
      console.log(data);
    }
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "340px",
          display: "block",
          borderRadius: "12px",
          boxShadow: "10px 10px 20px #bebebe,-10px -10px 20px #ffffff",
        },
      }}
    >
      <Box
        sx={{
          padding: "10px",
        }}
      >
        <Box>
          <TextField
            type="text"
            autoComplete="false"
            sx={{
              padding: 0,
              height: "50px",
              color: "#000",
              background: "#",
              width: "100%",
              borderRadius: "150px",
              "& .MuiInputBase-root": {
                borderRadius: "150px",
                boxShadow:
                  "inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff",
                color: "#333",
                fontWeight: "400",
              },
            }}
            onChange={(e) => {
              searchEmoji(e.target.value);
            }}
          />
        </Box>
        <Box
          sx={{
            height: "320px",
            padding: "10px 0px",
            overflow: "auto",
          }}
        >
          {data.emojiList === "All" ? (
            // Render all emojis
            <Box>RENDER ALL EMOJIS</Box>
          ) : data.emojiList.length !== 0 ? (
            data.emojiList.map((emoji) => {
              return (
                <IconButton
                  sx={{
                    borderRadius: "4px",
                    fontSize: "18px",
                    width: '40px',
                    height: "40px",
                    "&:hover": {
                      background: "rgba(0,0,0,0.1)",
                      transition: "0.2s",
                    },
                  }}
                >
                  {emoji}
                </IconButton>
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "100%"
              }}
            >
              <SentimentDissatisfiedOutlinedIcon
                sx={{ fontSize: "150px", color: "#aaa" }}
              />
              <Typography variant="body2" sx={{ fontStyle: "italic", color: "#aaa" }}>
                No matches
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Menu>
  );
}

export default function ChatBox() {
  // const [microphone, setMicrophone] = useState(false);

  const [data, setData] = useState({
    keyboardIsActive: "",
    emojiAnchor: null,
    emojiPicker: false,
    emojiList: "All",
  });

  const variants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
    closed: {
      scale: 0,
      transition: { duration: 0.2 },
    },
  };

  console.log(data);

  return (
    <Paper
      sx={{
        boxShadow: "none",
        padding: "10px",
        height: "100vh",
        position: "relative",
      }}
      variant="secondary"
    >
      <form
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          width: "100%",
          padding: "12px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            color: "#000",
            borderRadius: "12px",
            // border: "solid 1px #B2DDDD",
            position: "relative",
            boxShadow: "10px 10px 20px #bebebe,-10px -10px 20px #ffffff",
            // padding: '12px'
          }}
          color="secondary"
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="Add media" placement="top">
              <IconButton color="secondary">
                <InsertPhotoOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Send a GIFs from GIPHY" placement="top">
              <IconButton
                color="secondary"
                onClick={(e) => {
                  setData({ ...data, emojiAnchor: e.currentTarget });
                }}
              >
                <GifBoxOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // border: "solid 1px #B2DDDD",
              borderRadius: "12px",
              // borderTopLeftRadius: "15px",
              // borderBottomLeftRadius: "15px",
              // borderTopRightRadius: "150px",
              // borderBottomRightRadius: "150px",
              width: "100%",
              padding: "10px",
              bottom: 0,
              height: "100%",
              maxHeight: "150px",
              background: "#e0e0e0",
              boxShadow:
                "inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff",
            }}
          >
            <motion.div
              animate={data.keyboardIsActive ? "closed" : "open"}
              variants={variants}
            >
              <IconButton color="secondary">
                <KeyboardVoiceIcon />
              </IconButton>
            </motion.div>
            <motion.div
              animate={{ x: data.keyboardIsActive ? "-40px" : "0px" }}
              transition={{ duration: 0.2 }}
              style={{ width: "120%" }}
            >
              <Box
                sx={{
                  flex: 1,
                  overflow: "auto",
                  maxHeight: "9em",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  type="text"
                  sx={{
                    border: "none",
                    boxShadow: "none",
                    overflowWrap: "break-word",
                    overflow: "auto",
                    height: "100%",
                    width: "100%",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      borderColor: "none",
                      boxShadow: "none",
                      width: "100%",
                      overflowWrap: "break-word",
                    },
                    "& .MuiInputBase-root": {
                      padding: "4px",
                      width: "100%",
                    },
                    transition: "0.5s",
                  }}
                  placeholder="Aa"
                  autoComplete="off"
                  multiline
                  onChange={(e) => {
                    setData({
                      ...data,
                      keyboardIsActive: e.target.value
                        ? e.target.value
                        : () => {
                            return "";
                          },
                    });
                    // console.log(data);
                  }}
                />
              </Box>
            </motion.div>
            <Tooltip title="Emojis" placement="top">
              <IconButton
                color="secondary"
                onClick={(event) => {
                  setData({
                    ...data,
                    emojiAnchor: event.currentTarget,
                    emojiPicker: true,
                  });
                  console.log(data);
                }}
                sx={{
                  display: {
                    xl: "flex",
                    lg: "flex",
                    md: "flex",
                    sm: "none",
                    xs: "none",
                  },
                }}
              >
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
            </Tooltip>
            <EmojiPedia
              anchorEl={data.emojiAnchor}
              open={data.emojiPicker}
              onClose={() => {
                setData({ ...data, emojiPicker: false, emojiAnchor: null });
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              emojiList={data.emojiList}
            />
          </Box>
          <Tooltip title="Send message" placement="top">
            <IconButton type="submit" variant="contained" color="secondary">
              <SendIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </form>
    </Paper>
  );
}
