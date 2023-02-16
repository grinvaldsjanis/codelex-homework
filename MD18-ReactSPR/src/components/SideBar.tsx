
// import { Link } from "react-router-dom";
import BlogWidget from "./BlogWidget/BlogWidget";

function SideBar() {
    return (
        <>
          <div className="sidebar--right">
              <BlogWidget />
              <BlogWidget />
              <BlogWidget />
            
          </div>
        </>
      );

}
 
export default SideBar;