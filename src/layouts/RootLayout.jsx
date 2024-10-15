import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import {Box, Spinner} from "@chakra-ui/react";
import UserNavbar from "../components/UserNavbar";
import { useAuth } from "../context/AuthContext.jsx";
const RootLayout = () => {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

    return(
        <Box>
            <div className="root-layout">
                <header>
                    {isAuthenticated ? <UserNavbar /> : <Navbar />}
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </Box>
    );
}
export default RootLayout