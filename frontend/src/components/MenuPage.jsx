import MenuList from "./MenuList";
import Box from "@mui/material/Box";

export const MenuPage = () => {
    return (
        <Box display="flex" flexDirection='row' justifyContent="center" sx={{ padding: '30px' }}>
            <MenuList />
            <div>
                ordersx 
            </div>
        </Box>
    )
}