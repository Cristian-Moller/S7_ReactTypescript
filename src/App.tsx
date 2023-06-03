import { Route, Routes } from "react-router-dom"
import Welcome from "./pages/welcome"
import Budget from "./pages/budget"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" >
          <Route index path="/" element={<Welcome />} />
          <Route path="budget" element={<Budget />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
