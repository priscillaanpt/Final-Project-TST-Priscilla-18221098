import { deleteProduct } from "../api/product";

export default function ProductCard({ product }: any) {

    const onDeleteClick = async () => {
        try {
            await deleteProduct(product.id);
            window.location.href = "/products";
          } catch (error) {
            window.location.href = "/products";
            console.error("Error fetching products:", error);
          }
    }

    const onEditClick = async () => {
        try {
            window.location.href = `/products/form?id=${product.id}`;
          } catch (error) {
            console.error("Error fetching products:", error);
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
                        <p className="text-gray-500">id : {product.id}</p>
                    </div>
                    <hr></hr>
                    <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900">
                        {product.name}
                    </h5>
                    <p>
                        Deskripsi: {product.description.substring(0, maxChar) + (product.description.length > maxChar ? '...' : '')}
                    </p>
                    <div className="flex items-center">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 22 26" fill="none">
                                <path d="M13.2653 1.21093C13.3766 1.0781 13.4382 0.900182 13.4368 0.715511C13.4354 0.53084 13.3711 0.354188 13.2578 0.223601C13.1445 0.0930138 12.9912 0.0189409 12.831 0.0173361C12.6708 0.0157314 12.5164 0.0867234 12.4011 0.215021L10.9998 1.83003L9.59855 0.215021C9.54217 0.147751 9.47474 0.0940945 9.40018 0.0571817C9.32562 0.0202689 9.24543 0.000839251 9.16428 2.65931e-05C9.08314 -0.000786065 9.00267 0.0170343 8.92756 0.0524483C8.85246 0.0878622 8.78422 0.14016 8.72685 0.206291C8.66947 0.272422 8.62409 0.351061 8.59336 0.437619C8.56263 0.524178 8.54717 0.616923 8.54787 0.710442C8.54858 0.803961 8.56544 0.896382 8.59747 0.982312C8.6295 1.06824 8.67605 1.14596 8.73442 1.21093L10.1357 2.82594L8.73442 4.44095C8.6231 4.57379 8.5615 4.7517 8.56289 4.93637C8.56429 5.12104 8.62856 5.2977 8.74186 5.42828C8.85517 5.55887 9.00845 5.63294 9.16868 5.63455C9.32892 5.63615 9.48329 5.56516 9.59855 5.43686L10.9998 3.82185L12.4011 5.43686C12.5158 5.56893 12.6713 5.64309 12.8334 5.64302C12.9955 5.64295 13.151 5.56867 13.2656 5.43651C13.3802 5.30435 13.4445 5.12514 13.4445 4.93831C13.4444 4.75147 13.3799 4.57231 13.2653 4.44025L11.864 2.82594L13.2653 1.21093Z" fill="#F5A006" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.418281 14.4113L2.44476 15.1896V21.1383C2.44476 21.2848 2.48438 21.4276 2.55809 21.5469C2.63181 21.6662 2.73595 21.756 2.85604 21.8039L10.7957 24.9712C10.9212 25.0232 11.0581 25.0259 11.185 24.979L11.1936 24.9762L11.2027 24.9726L19.1449 21.8039C19.2649 21.756 19.3691 21.6662 19.4428 21.5469C19.5165 21.4276 19.5561 21.2848 19.5561 21.1383V15.1896L21.5826 14.4113C21.6761 14.3755 21.7607 14.3142 21.8291 14.2325C21.8976 14.1509 21.9479 14.0514 21.9759 13.9425C22.0038 13.8337 22.0084 13.7186 21.9894 13.6072C21.9704 13.4958 21.9284 13.3913 21.8668 13.3027L19.4223 9.78112C19.3498 9.67708 19.2532 9.59892 19.1436 9.55573L11.2003 6.38629C11.0708 6.33466 10.9301 6.33466 10.8006 6.38629L2.85726 9.55573C2.74771 9.59889 2.65106 9.67706 2.57859 9.78112L0.134109 13.3027C0.0725316 13.3913 0.0304547 13.4958 0.0114637 13.6072C-0.0075273 13.7186 -0.00286938 13.8337 0.0250406 13.9425C0.0529505 14.0514 0.103285 14.1509 0.171756 14.2325C0.240226 14.3142 0.324804 14.3755 0.418281 14.4113ZM9.36203 17.316L10.3893 15.6256V23.3189L3.667 20.6368V15.6587L8.66841 17.5801C8.79335 17.6279 8.92836 17.628 9.05335 17.5803C9.17833 17.5326 9.2866 17.4403 9.36203 17.316ZM4.92407 10.2213L11.0004 12.6456L17.0768 10.2213L11.0004 7.79704L4.92407 10.2213ZM12.6389 17.316L11.6116 15.6263V23.3196L18.3339 20.6375V15.6587L13.3325 17.5801C13.2075 17.6279 13.0725 17.628 12.9476 17.5803C12.8226 17.5326 12.7143 17.4403 12.6389 17.316ZM3.26366 11.0496L1.63624 13.3943L5.00413 14.6881L8.62197 16.0778L10.0355 13.7514L9.95299 13.7183L3.26366 11.0489V11.0496ZM20.3647 13.3943L18.7372 11.0489L11.9654 13.7514L13.3789 16.0778L20.3647 13.3943Z" fill="#F5A006" />
                            </svg>
                        </span>
                        <span className="px-1.5 mr-1.5 text-xs font-light">Price : {product.price}
                        </span>
                    </div>
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

