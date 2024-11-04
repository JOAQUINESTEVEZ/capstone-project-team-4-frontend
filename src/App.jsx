import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import About from "./pages/About.jsx"
import Home from "./pages/Home.jsx"
import CreateEvent from "./pages/CreateEvent.jsx"
import ManageEventGrid from "./pages/ManageEventGrid.jsx"
import EventListGrid from "./pages/EventListGrid.jsx";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element = {<RootLayout />}>
          <Route index element={<Home />}/>
          <Route path="about" element={<About />}/>
          <Route path="create-event" element={<CreateEvent />}/>
          <Route path="manage-event" element={<ManageEventGrid />}/>
          <Route path="event-list" element={<EventListGrid />}/>
        </Route>
    )
)

function App() {

  return (
      <RouterProvider router={router}/>
  );
}
export default App
