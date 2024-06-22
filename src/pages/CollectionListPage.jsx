import {Button} from "@material-tailwind/react";
import { Plus, Trash } from "lucide-react";
import {useNavigate} from "react-router-dom";
import CollectionList from "../components/Collections/CollectionList.jsx";
import CollectionDeleteModal from "../components/modal/CollectionDeleteModal.jsx";

const CollectionListPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="px-10 py-5">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-heading2-bold">Collections</p>
                    <Button className="bg-blue-1 text-white capitalize flex items-center" onClick={() => navigate("/collections/new")}>
                        <Plus className="h-4 w-4 mr-2"/>
                        Create Collection
                    </Button>
                </div>
                <hr className="border-b border-gray-400"/>
                <CollectionList/>

            </div>
        </>
    );
};

export default CollectionListPage;