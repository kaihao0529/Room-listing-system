import { useEffect, useRef, useState } from "react";
import Dashboard from "./Dashboard"
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Icon, IconButton, InputBase, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Paper, Select, styled, TextareaAutosize, TextField, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ImageIcon from '@mui/icons-material/Image';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RoomItems from "./RoomItems";


let count = 0;
const RoomListing = () => {
  const [isopen, setIsopen] = useState(true);
  const [isopendialog, setIsOpendialog] = useState(false);
  const [roomlist, setRoomlist] = useState([]);
  const [location, setLocation] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isediting, setIsediting] = useState(false);
  const roominputref = useRef(null);
  const roomlocationref = useRef(null);
  const roomdescriptionref = useRef(null);


  const addRoom = () => {
    setRoomlist([...roomlist, { RoomID: count++, RoomNo: roominputref.current.value, Location: roomlocationref.current.value, Description: roomdescriptionref.current.value }]);
    roominputref.current.value = "";
    roomlocationref.current.value = "";
    roomdescriptionref.current.value = "";
    localStorage.setItem('room-count', count)
  }
  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("room")) || [];
    setRoomlist(storedRooms);
    count = parseInt(localStorage.getItem("room-count") || "0", 10);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      console.log(roomlist);
      localStorage.setItem("room", JSON.stringify(roomlist));
    }, 1000);
  }, [roomlist]);
  useEffect(() => {
    setFilteredRooms(roomlist);
  }, [roomlist])
  const toggleDrawer = () => {
    setIsopen(!isopen);
  }
  const opendialog = () => {
    setIsOpendialog(true);
  }
  const closedialog = () => {
    setIsOpendialog(false);
  }
  const handlelocationchange = (event) => {
    // setLocation(event.target.value);
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);

    if (selectedLocation === "") {
      setFilteredRooms(roomlist);
    } else {
      const filtered = roomlist.filter(
        (item) => item.Location === selectedLocation
      );
      setFilteredRooms(filtered);
    }
  }
  const handlesearchtextchange = (event) => {
    setSearchText(event.target.value);
  }
  const handleSearchClick = () => {
    const text = searchText.toLowerCase();
    const filtered = roomlist.filter((item) =>
      item.Description.toLowerCase().includes(text) ||
      item.Location.toLowerCase().includes(text) ||
      item.RoomNo.toLowerCase().includes(text)
    );
    setFilteredRooms(filtered);
  };
  return (
    <div>
      <Dashboard open={isopen} toggleDrawer={toggleDrawer} >
        <Box sx={{ padding: '20px', background: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Paper sx={{ p: '2px 25px', display: 'flex', alignItems: 'center', width: 400, paddingBottom: '10px' }}>
            <InputBase sx={{ p: '5px' }}
              placeholder="Search Room"
              inputProps={{ 'aria-label': 'search google maps' }}
              value={searchText}
              onChange={handlesearchtextchange}
            >
            </InputBase>
            <IconButton sx={{ p: '10px' }} aria-label="search" onClick={handleSearchClick}>
              <SearchIcon
              />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Select sx={{ width: '150px' }} value={location} onChange={handlelocationchange} >
              <MenuItem value="">All</MenuItem>
              {[...new Set(roomlist.map((item) => item.Location))].map((loc, index) => (
                <MenuItem key={index} value={loc}>{loc}</MenuItem>
              ))}
            </Select>
          </Paper>
          <List sx={{
            mt: '20px',
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: '450px',
            // display: 'flex',
            // flexDirection: 'column'
          }}>
            {filteredRooms.length > 0 ? (
              filteredRooms.map((item) => (
                <ListItem
                  key={item.RoomID}
                  sx={{ display: 'flex', flexDirection: 'column', paddingRight: '430px', fontSize: '30px', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <ListItemText
                    sx={{ m:'auto', display: 'flex', flexDirection: 'column' }}
                    primary={`Roomno:${item.RoomNo}`}
                  />
                  <RoomItems
                    location={item.Location}
                    setRoomlist={setRoomlist}
                    Id={item.RoomID}
                    Description={item.Description}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No results found" />
              </ListItem>
            )}
          </List>
        </Box>
        <IconButton sx={{ position: 'absolute', bottom: 10, right: 0, color: 'orange', fontSize: '40px' }} onClick={opendialog}>
          <AddCircleIcon sx={{ fontSize: '50px' }} >
          </AddCircleIcon>
        </IconButton>

        <Dialog open={isopendialog} onClose={closedialog}>
          <DialogTitle>
            Modal Title
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <div className="dialog-input-container">
              <Typography sx={{ position: 'relative', bottom: -10 }}>
                Room No:
              </Typography>
              <TextField inputRef={roominputref} id="standard-basic" label="Standard" variant="standard" />
            </div>
            <div className="dialog-input-container">
              <Typography sx={{ position: 'relative', bottom: -10 }}>
                Location:
              </Typography>
              <TextField inputRef={roomlocationref} id="standard-basic" label="Standard" variant="standard" />
            </div>
            <div className="dialog-input-container">
              <Typography sx={{ position: 'relative', bottom: -10 }}>
                Description:
              </Typography>
              <TextareaAutosize
                ref={roomdescriptionref}
                maxRows={4}
                aria-label="maximum height"
                placeholder=""
                defaultValue=""
                style={{ marginTop: 20, width: "190px", resize: 'none' }}
              />
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => { addRoom() }}>
              Add
            </Button>
            <Button onClick={closedialog}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Dashboard>
    </div>
  )
}

export default RoomListing