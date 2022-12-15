import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { RiNotification2Fill, RiProductHuntLine } from "react-icons/ri";
import { TbUser } from "react-icons/tb";
import { Navigate } from "react-router-dom";
import useSWR from "swr";
import AdminLayout from "../../components/admin/AdminLayout";
import Card from "../../components/dashboard/Card";
import sound from '../../ringtone.wav';
import ServerError from "../500";
import { faker } from '@faker-js/faker';

import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

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

  if (error) {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/" />;
    }
    else {
      return <ServerError />;
    }
  }

  if (data) {
    // For PIE Chart Data
    const chartData = {
      labels: ['Smartphone', 'Watch', 'Timmer', 'Earpods', 'phoneCover'],
      datasets: [
        {
          label: 'Total Products',
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',

          ],
          borderWidth: 1,
        },
      ],
    };

    // For Bar graph Data
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart',
        },
      },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const bardata = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    return (
      <>
        <AdminLayout >
          <div className="px-6 py-3">
            <div className="flex flex-wrap gap-5">
              <Card color="bg-indigo-600" icon={<TbUser size={28} />} title="Total Users" value="50000" />

              <Card color="bg-amber-600" icon={<RiProductHuntLine size={28} />} title="Total Products" value="50000" />

              <Card color="bg-green-600" icon={<TbUser size={28} />} title="Today Orders" value="50000" />

              <Card color="bg-indigo-600" icon={<TbUser size={28} />} title="Total Users" value="50000" />

              <Card color="bg-rose-600" icon={<TbUser size={28} />} title="Total Visits" value="50000" />
            </div>
            <div className="mt-5">
              <div className="grid grid-cols-2">
                <div>
                  <Pie data={chartData} />
                </div>
                <div>
                  <Bar options={options} data={bardata} />
                </div>
              </div>
            </div>
          </div>
          {/* For showing new order popup */}
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
          {/* For showing new order pop up close */}
        </AdminLayout>
      </>
    );
  }
}

export default Dashboard;
