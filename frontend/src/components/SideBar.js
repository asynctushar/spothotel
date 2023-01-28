import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MapsHomeWorkSharpIcon from '@mui/icons-material/MapsHomeWorkSharp';
import AddHomeWorkSharpIcon from '@mui/icons-material/AddHomeWorkSharp';
import BookmarkAddedSharpIcon from '@mui/icons-material/BookmarkAddedSharp';
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import { useSelector, useDispatch } from 'react-redux';
import {setAdminbar} from '../redux/slices/appSlice';
import { NavLink } from 'react-router-dom';

const openedMixin = (theme) => ({
    width: 240,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: "0 .5rem"
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        position: "relative",
        width: 240,
        ".MuiDrawer-paper": {
            zIndex: 1,
            top: "auto",
            position: "relative",
        },
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const SideBar = () => {
    const open = useSelector((state) => state.appState.isAdminbarOpen);
    const dispatch = useDispatch();
    const isMobileDevice = useMediaQuery('(max-width:640px)')

    const handleDrawerOpen = () => {
        dispatch(setAdminbar(!open));
    };

    useEffect(() => {
        if (isMobileDevice) {
            dispatch(setAdminbar(false));
        }
    }, [isMobileDevice, dispatch])

    return (
        <Drawer variant="permanent" open={open}>
            {!isMobileDevice && (
                <DrawerHeader>
                    <IconButton onClick={handleDrawerOpen} className="!text-red-500">
                        {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
            )}
            <List className="!-mt-2">
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={open ? '' : 'Dashboard'} placement="right">
                        <NavLink to="/admin/dashboard">
                            {({ isActive }) => (
                                <ListItemButton
                                    selected={isActive}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <DashboardSharpIcon className="text-red-400" />
                                    </ListItemIcon>
                                    <ListItemText className="text-red-400 font-semibold" primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            )}
                        </NavLink>
                    </Tooltip>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={open ? '' : 'All Users'} placement="right">
                        <NavLink to="/admin/users">
                            {({ isActive }) => (
                                <ListItemButton
                                    selected={isActive}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <PeopleAltIcon className="text-red-400" />
                                    </ListItemIcon>
                                    <ListItemText className="text-red-400 font-semibold" primary="All Users" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            )}
                        </NavLink>
                    </Tooltip>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={open ? '' : 'All Hotels'} placement="right">
                        <NavLink to="/admin/hotels">
                            {({ isActive }) => (
                                <ListItemButton
                                    selected={isActive}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <MapsHomeWorkSharpIcon className="text-red-400" />
                                    </ListItemIcon>
                                    <ListItemText className="text-red-400 font-semibold" primary="All Hotels" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            )}
                        </NavLink>
                    </Tooltip>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={open ? '' : 'Create Hotel'} placement="right">
                        <NavLink to="/admin/hotel/new">
                            {({ isActive }) => (
                                <ListItemButton
                                    selected={isActive}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <AddHomeWorkSharpIcon className="text-red-400" />
                                    </ListItemIcon>
                                    <ListItemText className="text-red-400 font-semibold" primary="Create Hotel" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            )}
                        </NavLink>
                    </Tooltip>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={open ? '' : 'Bookings'} placement="right">
                        <NavLink to="/admin/bookings">
                            {({ isActive }) => (
                                <ListItemButton
                                    selected={isActive}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <BookmarkAddedSharpIcon className="text-red-400" />
                                    </ListItemIcon>
                                    <ListItemText className="text-red-400 font-semibold" primary="All Bookings" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            )}
                        </NavLink>
                    </Tooltip>
                </ListItem>

            </List>
        </Drawer>
    );
}

export default SideBar;