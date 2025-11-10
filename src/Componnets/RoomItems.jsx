import { IconButton, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from "react";

const RoomItems = ({ location, Id, setRoomlist, Description }) => {
  const [Location, setLocation] = useState(location);
  const [description, setDescription] = useState(Description);
  const [isediting, setIsediting] = useState(false);
  const editroom = () => {
    if (isediting) {
      let roomdata = JSON.parse(localStorage.getItem('room')) || [];
      console.log(JSON.parse(localStorage.getItem('room')));

      const updatedRooms = roomdata.map((item) => {
        if (item.RoomID === Id) {
          return { ...item, Location, Description: description };
        } else {
          return item;
        }
      });
      setRoomlist(updatedRooms)
      localStorage.setItem('room', JSON.stringify(updatedRooms));
    }
    setIsediting(!isediting);
  }

  const deletroom = (id) => {
    let roomdata = JSON.parse(localStorage.getItem('room'));
    roomdata = roomdata.filter(item => item.RoomID !== id);
    setRoomlist(roomdata);
    console.log("The room data is" + roomdata);

    localStorage.setItem('room', JSON.stringify(roomdata));
  }
  return (
    <>
      {isediting ?
        <>
          <Typography
            component="div"
            variant="body2"
            sx={{ml:'auto', display: 'flex',justifyContent:'space-between', color: 'text.primary', width: '300px', alignItems: 'center' }}

          >
            Location:

              <TextField sx={{p:'16px 12px'}} value={Location} onChange={(event) => {
                console.log('The current location is ' + Location);
                setLocation(event.target.value);
              }} />

          </Typography>

          <Typography
            variant="body2"
            sx={{ ml:'auto',display: 'flex',justifyContent:'space-between', color: 'text.primary', width: '300px', alignItems: 'center', flexDirection: 'row' }}
          >
            Description:
            <TextField sx={{p:'16px 12px'}} value={description} onChange={(event) => {
              console.log('The current description is ' + description);
              setDescription(event.target.value);
            }} />
          </Typography>
        </>
        :
        <>
          <Typography
            variant="body2"
            sx={{ display: 'flex', color: 'text.primary',m:'auto', alignItems: 'center' }}
          >
            Location:
             {Location}
          </Typography>
          <Typography
            component="div"
            variant="body2"
            sx={{ display: 'flex', color: 'text.primary',m:'auto',alignItems: 'center' }}
          >
            Description:&nbsp;
            {description}
          </Typography>
        </>
      }
      <IconButton onClick={() => { editroom(Id) }} sx={{ position: "absolute", top: 20, right: 30, display: 'flex', gap: '5px', justifyContent: 'end', alignItems: 'center' }}>
        <BorderColorIcon />
      </IconButton>
      <IconButton onClick={() => { deletroom(Id) }} sx={{ position: "absolute", top: 20, right: 0, display: 'flex', gap: '5px', justifyContent: 'end' }}>
        <DeleteOutlineIcon />
      </IconButton>
    </>
  )
}

export default RoomItems