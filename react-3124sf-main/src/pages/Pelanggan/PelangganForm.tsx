import React, { useState, useEffect } from 'react';
import { createPelanggan, getPelangganById, updatePelanggan } from '../../api/pelanggan';
import NavbarComponent from '../../components/NavbarComponent';
import { useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
export default function PelangganForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pelangganId = searchParams.get('id');

  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    alamat: '',
    telepon: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (pelangganId) {
      await updatePelanggan(pelangganId, {
        id: parseInt(pelangganId),
        nama: formData.nama,
        alamat: formData.alamat,
        telepon: formData.telepon,
      });
    }else{
      await createPelanggan({
        id : null,
        nama: formData.nama,
        alamat: formData.alamat,
        telepon: formData.telepon,
      });
    }

    setFormData({
      id: '',
      nama: '',
      alamat: '',
      telepon: '',
    });

    window.location.href = "/pelanggan";
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (pelangganId) {
        try {
          const pel = await getPelangganById(pelangganId);
          setFormData({
            id : pelangganId,
            nama: pel.nama,
            alamat: pel.alamat,
            telepon: pel.telepon,
          });
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchProductDetails();
  }, [pelangganId]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div className="text-white text-2xl font-bold py-4 px-8">
        <h2>Form Pelanggan</h2>
      </div>
      <div className="flex justify-center items-center min-h-full">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-medium text-white">
              Name:
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="alamat" className="block text-sm font-medium text-white">
              Alamat:
            </label>
            <textarea
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
                <label>Nomor Telepon</label>
                <PhoneInput
                    value={formData.telepon}
                    defaultCountry='ID'
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    onChange={(newVal) =>{
                        handleChange({target: {name : "telepon", value : newVal}})
                    }}/>
            </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
