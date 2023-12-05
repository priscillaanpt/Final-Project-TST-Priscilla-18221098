import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import PelangganCard from "../../components/PelangganCard";
import { Pelanggan as IPelanggan, fetchAllPelanggan } from "../../api/pelanggan";

const Pelanggan = () => {
  const [pelanggan, setPelanggan] = useState<IPelanggan[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 21;
  const maxPage = Math.ceil(pelanggan.length / pageSize)
  const nextPage = () =>{
    if (page < maxPage) setPage(page + 1);
  }
  const prevPage = () =>{
    if (page > 1) setPage(page - 1);
  }
  useEffect(() => {
    const getPelanggan = async () => {
      try {
        const pelangganData: any = await fetchAllPelanggan(); // Fetch products from your API
        setPelanggan(pelangganData.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error (e.g., show an error message to the user)
      }
    };

    getPelanggan();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div className="text-white text-2xl font-bold py-4 px-8 justify-between flex">
        <h2>List of Pelanggan</h2>
        <div className="text-right">
          <a href="/pelanggan/form" color="primary">
                  Add Pelanggan
                </a>
          </div>
      </div>
      <div className="flex flex-row flex-wrap flex justify-center items-center min-h-full">
        {pelanggan.slice((page - 1)*pageSize, (page) * pageSize).map((p, i) => (
              <PelangganCard key={i} pelanggan={p} />
            ))}
      </div>
      
      <div className="flex flex-col items-center absolute inset-x-0 bottom-10">
        <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{(page - 1)*pageSize + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{ Math.min( pelanggan.length, (page) * pageSize) }</span> of <span className="font-semibold text-gray-900 dark:text-white">{pelanggan.length}</span> Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
            <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={prevPage} >
                Prev
            </button>
            <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={nextPage}>
                Next
            </button>
        </div>
      </div>
  </div>
  );
};

export default Pelanggan;
