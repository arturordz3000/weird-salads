import { useStaff } from "../hooks/useStaff";
import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from "@mui/material/IconButton";

const StaffListSkeleton = () => (
    <List sx={{ width: '400px', bgcolor: 'background.paper' }}>
        {Array.from(new Array(5)).map((_, index) => (
        <div key={index}>
            <ListItem alignItems="flex-center">
            <ListItemAvatar>
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText>
                <Skeleton animation="wave" height={20} width="100%" />
            </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
        ))}
    </List>
)

export const StaffList = ({ onLogin }) => {
    const { data, loading } = useStaff();

    if (loading || data === undefined) {
        return <StaffListSkeleton />
    }

    return (
        <List sx={{ width: '400px', bgcolor: 'background.paper' }}>
            {
                data?.staff.map(staff => (
                    <>
                        <ListItem alignItems="flex-center"
                            secondaryAction={
                                <IconButton edge="end" aria-label="login" onClick={() => { onLogin(staff) }}>
                                  <LoginIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar alt={staff.name} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={staff.name}
                                secondary={null}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </>
                ))
            }
        </List>
    )
}