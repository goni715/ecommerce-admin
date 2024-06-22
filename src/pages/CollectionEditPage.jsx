import CollectionEditForm from "../components/Collections/CollectionEditForm.jsx";
import {useGetCollectionQuery} from "../redux/features/collection/collectionApi.js";
import {useParams} from "react-router-dom";
import ListLoading from "../components/loader/ListLoading.jsx";


const CollectionEditPage = () => {
    const {id} = useParams();
    const {data, isLoading, isError} = useGetCollectionQuery(id);
    const collection = data?.data || {};

    if (isLoading) {
        return (
            <>
                <div className="px-5 py-5">
                    <ListLoading/>
                </div>
            </>
        )
    }


    if (!isLoading && !isError && collection?._id) {
        return (
            <>
                <CollectionEditForm collection={collection}/>
            </>
        )
    }
};

export default CollectionEditPage;