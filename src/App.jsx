import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate} from 'react-router-dom';
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import ManageEventGrid from "./pages/ManageEventGrid.jsx";
import EventListGrid from "./pages/EventListGrid.jsx";
import RootLayout from "./layouts/RootLayout";
import InvitationGrid from "./pages/InvitationGrid.jsx";
import JoinedEventList from "./pages/JoinedEventList.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = () => {

        return localStorage.getItem('token') !== null;
    };

    return isAuthenticated() ? children : <Navigate to="/"/>;
};

const router = createBrowserRouter(
    createRoutesFromElements(

         <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            {/* Protected Routes */}
            <Route
                path="create-event"
                element={
                    <ProtectedRoute>
                        <CreateEvent />
                    </ProtectedRoute>
                }
            />
            <Route
                path="manage-event"
                element={
                    <ProtectedRoute>
                        <ManageEventGrid />
                    </ProtectedRoute>
                }
            />
            <Route
                path="event-list"
                element={
                    <ProtectedRoute>
                        <EventListGrid />
                    </ProtectedRoute>
                }
            />
            <Route
                path="invitations"
                element={
                    <ProtectedRoute>
                        <InvitationGrid />
                    </ProtectedRoute>
                }
            />
            <Route
                path="joined-event"
                element={
                    <ProtectedRoute>
                        <JoinedEventList />
                    </ProtectedRoute>
                }
            />

             {/* 404 page */}
            <Route
                path="*"
                element={ <PageNotFound /> } />
        </Route>
    )
);

function App() {

  return (
      <RouterProvider router={router}/>
  );
}
export default App
