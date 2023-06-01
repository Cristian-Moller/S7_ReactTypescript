import { Link } from "react-router-dom"
import "./welcome.css"

function Welcome() {

  return (
    <div className="divWelcome">
      {/* <Link to={"/"}>Welcome</Link> */}
      <h2>Welcome</h2>
      <p>Estimate the budget of your website...</p>
      <Link to={"/budget"} className="linkBudget">Budget</Link>
    </div>
  )
}

export default Welcome