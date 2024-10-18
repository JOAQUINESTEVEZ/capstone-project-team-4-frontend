import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import About from "./components/About"
import Home from "./components/Home"
import CreateEvent from "./components/CreateEvent"
import EventGrid from "./components/EventGrid.jsx"
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element = {<RootLayout />}>
          <Route index element={<Home />}/>
          <Route path="about" element={<About />}/>
          <Route path="create-event" element={<CreateEvent />}/>
          <Route path="manage-event" element={<EventGrid />}/>
        </Route>
    )
)

function App() {

  return (
      <RouterProvider router={router}/>
  );
}
export default App
