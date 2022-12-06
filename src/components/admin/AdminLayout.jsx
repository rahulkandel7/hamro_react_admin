import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";
import Sidebar from "./Sidebar";

function AdminLayout(props) {
  const navigation = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigation("/");
    } else {
      fetch("https://api.hamroelectronics.com.np/api/v1/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) =>
        response.json().then((data) => {
          if (data.user.role !== "admin") {
            navigation("/");
          }
        })
      );
    }
  }, []);


  return (
    <>

      <div className="flex w-full">
        <Sidebar />
        {
          props.loading ?
            <Spinner />
            : <div className="w-full">
              <div className="w-full flex-grow-0 overflow-hidden min-h-screen max-h-fit">
                {props.children}
              </div>
            </div>
        }

      </div>
    </>
  );
}


export default AdminLayout;
