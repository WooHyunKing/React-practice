import React from 'react';
import {
    Button, TextField, Typography, 
    Card, CardContent, Modal, Badge, Avatar, Menu, 
    MenuItem} from '@mui/material';
    import { createTheme } from '@mui/material/styles';
import { Favorite } from '@mui/icons-material';
import { indigo, purple, amber, brown } from '@mui/material/colors';
import Uploader from './Uploader';

const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
});
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});
const yellowTheme = createTheme({
    palette: {
        primary: {
          main: amber[500],
        },
        secondary: {
          main: brown[500],
        },
    },
});
const purpleTheme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: indigo[500],
      },
    },
});
const themes = [lightTheme, darkTheme, yellowTheme, purpleTheme];

export default function MyAccount ({setCurrentTab, setTheme}) {
    const [newId, setNewId] = React.useState('');
    const [Id, setId] = React.useState("Default User");
    const [modalOpen, setModalOpen] = React.useState([false, false, false]);
    const [favor, setFavorite] = React.useState(3);
    const [imgSrc, setImgSrc] = React.useState("../img/user.png");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [themeOpt, setThemeOpt] = React.useState(1);
    
    const open= Boolean(anchorEl);

    const handleChangeId = (event) => {
        event.preventDefault();
        console.log(newId);
        setId(newId);
        setModalOpen([false, false, false]);
    }
    const handleChangeNewId = (event) => {
        setNewId(event.target.value);
    }
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleModalOpen = () => {
        setModalOpen([true, false, false]);
    }
    const handleModalClose = () => {
        setModalOpen([false, false, false]);
    }
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        var opt = [false, false, false]
        opt[index] = true
        setModalOpen(opt);
        setAnchorEl(null);
    }
    const onFavoritesClick = () => {
        setCurrentTab(1);
    }
    const onSettingClick = () => {
        var opt = themeOpt+1;
        opt %= themes.length;
        setThemeOpt(opt)
        setTheme(themes[themeOpt]);
    }


    const options = [
        '아이디 변경',
        '사진 변경',
        '사진 보기',
    ]

    const badgeStyle = {
        "& .MuiBadge-badge": {
            color: 'white',
            backgroundColor: 'blue',

        }
    }
    

    return (
        <React.Fragment>

            <form style={{display: 'flex', marginTop : 20, marginBottom : 15, flexDirection: 'column'}}>
                <div style={{display : 'flex', marginLeft : 'auto', marginRight : 'auto', flexDirection: 'column'}}>  

                    <Avatar 
                        alt="Profile Image"
                        src={imgSrc}
                        sx={{mx : 'auto', width: 100, height: 100}}
                    />

                    <Button onClick={handleOpen}>ID : {Id}</Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        >
                            {options.map((option, index) => (
                                <MenuItem
                                    key={option}
                                    onClick={(event) => handleMenuItemClick(event, index)}
                                >
                                    {option}
                                </MenuItem>
                            ))}

                    </Menu>
                    <Button onClick={onSettingClick}>Setting</Button>
                    <Button onClick={onFavoritesClick}>Favorites   
                        <Badge sx={badgeStyle} badgeContent={favor} max={99}>
                            <Favorite />
                        </Badge>
                    </Button>
                    <Modal
                    open={modalOpen[0]}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{mx: 'auto'}}
                    
                    >
                        <Card 
                            sx={{
                                mx: 'auto',
                                display: 'flex',
                                backgroundColor: 'white',
                                top : '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 380,
                                position: 'absolute',

                            }}
                                                       
                        >
                            <CardContent>
                                <TextField 
                                    variant="outlined" 
                                    label={Id}
                                    type="input" 
                                    onChange={handleChangeNewId} 
                                    value={newId}
                                    color="primary"
                                    />
                                    
                                <Button variant="contained" color="primary" 
                                    type="submit" onClick={handleChangeId}
                                    style={{
                                        marginLeft: 25,
                                        height: 55
                                        }}>
                                    Change
                                </Button>
                            </CardContent>
                                                                                   
                        </Card>
                    </Modal>
                    <Modal
                    open={modalOpen[1]}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{mx: 'auto'}}
                    
                    >
                        <Card 
                            sx={{
                                mx: 'auto',
                                display: 'flex',
                                backgroundColor: 'white',
                                top : '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                position: 'absolute',

                            }}
                                                       
                        >
                            <CardContent>
                                <Uploader setImgSrc={setImgSrc} imgSrc={imgSrc}/>
                            </CardContent>
                                                                                   
                        </Card>
                    </Modal>
                    <Modal
                    open={modalOpen[2]}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{mx: 'auto'}}
                    
                    >
                        <Card 
                            sx={{
                                mx: 'auto',
                                display: 'flex',
                                backgroundColor: 'white',
                                top : '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                position: 'absolute',

                            }}
                                                       
                        >
                            <CardContent>
                                <img 
                                    src = {imgSrc}
                                    width = '700'
                                    height = '700'
                                    onClick = {handleModalClose}
                                />
                            </CardContent>
                                                                                   
                        </Card>
                    </Modal>
                </div>
                
                
            </form>

        </React.Fragment>
    )
}