import {useDispatch, useSelector} from "react-redux";
import {Button} from "@material-tailwind/react";
import {SetCollectionDeleteModalOpen} from "../../redux/features/modal/modalSlice.js";
import {Modal} from "antd";
import {useDeleteCollectionMutation} from "../../redux/features/collection/collectionApi.js";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";


const CollectionDeleteModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.collectionDeleteModalOpen);
    const {collectionId} = useSelector(state=>state.collection);
    const [deleteCollection, {isSuccess,isLoading}] = useDeleteCollectionMutation();
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();


    const handleOk = () => {
        dispatch(SetCollectionDeleteModalOpen(false));
    };
    const handleCancel = () => {
        dispatch(SetCollectionDeleteModalOpen(false));
    };

    useEffect(()=>{
        if(isSuccess){
            dispatch(SetCollectionDeleteModalOpen(false))
            if(pathname !=="/collections"){
               navigate("/collections")
            }
        }
    },[isSuccess, dispatch])


    const handleDelete = () => {
        deleteCollection(collectionId);
    }


    return (
        <>

            <Modal title="Are you sure? You want to delete." open={modalOpen} onOk={handleOk}>
                <p className="text-gray-700 text-lg">
                    This action can not be undone. This will permanently delete your collection.
                </p>
                <div className="w-full">
                    <div className="w-full flex justify-end mt-6 gap-6 pt-5">
                        <Button variant="outlined" onClick={handleCancel} className="capitalize py-2 px-4 rounded disabled:cursor-not-allowed">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            loading={isLoading}
                            disabled={isLoading}
                            className={`${isLoading && "capitalize"} flex gap-3 items-center justify-center disabled:cursor-not-allowed`}
                            type="submit"
                        >
                            {isLoading ? "Processing..." : "Confirm"}

                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CollectionDeleteModal;