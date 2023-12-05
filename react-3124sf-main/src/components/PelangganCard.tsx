import { deletePelanggan } from "../api/pelanggan";

export default function PelangganCard({ pelanggan }: any) {

    const onDeleteClick = async () => {
        try {
            await deletePelanggan(pelanggan.id);
            window.location.href = "/pelanggan";
          } catch (error) {
            window.location.href = "/pelanggan";
            console.error("Error fetching products:", error);
        }
    }

    const onEditClick = async () => {
        try {
            window.location.href = `/pelanggan/form?id=${pelanggan.id}`;
          } catch (error) {
            console.error("Error fetching pelanggan:", error);
          }
    }
    const maxChar = 15;

    return (
        <div className="my-2">
            <div className="w-60 h-48 bg-white rounded-3xl drop-shadow-lg mx-2">
                <div className="flex flex-col items-center justify-center">
                <div className="rounded-3xl w-40 h-2"></div>
                </div>
                <div className="mt-3 px-4">
                    <div>
                        <p className="text-gray-500">id : {pelanggan.id}</p>
                    </div>
                    <hr></hr>
                    <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900">
                        {pelanggan.nama}
                    </h5>
                    <p>
                        Alamat: {pelanggan.alamat.substring(0, maxChar) + (pelanggan.alamat.length > maxChar ? '...' : '')}
                    </p>
                    <p>
                        Telepon: {pelanggan.telepon}
                    </p>
                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <button type="button" className="w-20 h-8 mx-2 my-2 hover:text-white bg-mealshub-blue hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 font-lato font-bold rounded-full text-xs" onClick={onEditClick}>Edit</button>
                            <button type="button" className="w-20 h-8 mx-2 my-2 text-mealshub-red bg-white border-2 border-mealshub-red hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-red-300 font-lato font-bold rounded-full text-xs" onClick={onDeleteClick}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

