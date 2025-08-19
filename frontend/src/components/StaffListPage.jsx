import Box from "@mui/material/Box";
import { StaffList } from "./StaffList";
import { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

export const StaffListPage = () => {
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();

    const onLogin = useCallback(({ staff_id, name }) => {
        setCookies('staffId', staff_id);
        setCookies('staffName', name);
    }, [setCookies]);

    useEffect(() => {
        if (!!cookies.staffId) {
            navigate('/home')
        }
    }, [cookies.staffId]);

    return (
        <>
            <h2>Choose your user</h2>
            <Box display="flex" justifyContent="center">
                <StaffList onLogin={onLogin} />
            </Box>
        </>
    )
}