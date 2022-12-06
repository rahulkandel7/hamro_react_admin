import { useEffect } from "react";
import { useState } from "react";
import { RiNotification2Fill, RiNotification2Line } from "react-icons/ri";
import useSWR from "swr";
import AdminLayout from "../../components/admin/AdminLayout";
import sound from '../../ringtone.wav';

function Dashboard() {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => res.json());

  const { data, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/dashboard",
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const [change, setChange] = useState(false);
  useEffect(() => {
    if (data) {
      localStorage.setItem("orderCount", data?.data?.length);
    }
  }, [change]);

  function playAudio() {
    new Audio(
      sound
    ).play();

  }

  if (data) {
    return (
      <>
        <AdminLayout >
          <h1>THis is dashboard of admin pabel</h1>

          {data.data.length != localStorage.getItem("orderCount") ? (
            <div
              className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
              onLoad={playAudio()}
            >
              <div className="bg-white rounded-md shadow-md w-80">
                <div className="p-10">
                  <div className="flex justify-center">
                    <RiNotification2Fill size={32} className="text-yellow-400" />

                  </div>
                  <h1 className="text-xl font-semibold text-center mt-2">New Orders Detect</h1>
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => setChange(!change)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 my-3 py-1 rounded-md"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </AdminLayout>
      </>
    );
  }
}

export default Dashboard;
