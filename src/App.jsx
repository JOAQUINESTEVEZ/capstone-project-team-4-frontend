import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import About from "./components/About"
import Home from "./components/Home"
import Event from "./components/Event"
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element = {<RootLayout />}>
          <Route index element={<Home />}/>
          <Route path="about" element={<About />}/>
          <Route path="event" element={<Event />}/>
        </Route>
    )
)

function App() {

  return (
      <RouterProvider router={router}/>
  );
}
export default App
