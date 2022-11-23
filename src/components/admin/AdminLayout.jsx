import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function AdminLayout(props) {
  const navigation = useNavigate();

  const [isLogged, setIsLogged] = useState(false);

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
          } else {
            setIsLogged(true);
          }
        })
      );
    }
  }, []);

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full min-h-screen max-h-fit">{props.children}</div>
      </div>
    </>
  );
}

export default AdminLayout;
