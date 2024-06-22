import {useGetCollectionsQuery} from "../../redux/features/collection/collectionApi.js";
import {Table} from "antd";
import ListLoading from "../loader/ListLoading.jsx";
import {Trash} from "lucide-react";
import CollectionDeleteModal from "../modal/CollectionDeleteModal.jsx";
import {useDispatch, useSelector} from "react-redux";
import {SetCollectionDeleteModalOpen} from "../../redux/features/modal/modalSlice.js";
import {useState} from "react";
import {SetCollectionId} from "../../redux/features/collection/collectionSlice.js";
import {Link} from "react-router-dom";

const columns = [
    {
        title: "S.N.",
        dataIndex: "key",
    },
    {
        title: "Title",
        dataIndex: "title",
    },
    {
        title: "Products",
        dataIndex: "products",
    },
    {
        title: "Action",
        dataIndex: "action"
    },
];


const CollectionList = () => {
    const dispatch = useDispatch();
    const {data, isLoading, isError} = useGetCollectionsQuery();
    const collections = data?.data || [];




    const tableData = [];

    if (!isLoading && !isError && collections?.length > 0) {
        for (let i = 0; i < collections.length; i++) {
            tableData.push({
                key: Number(i + 1),
                title: (
                    <Link to={`/collections/${collections[i]?._id}`} className="hover:text-red-1">
                        {collections[i]?.title}
                    </Link>
                ),
                products: collections[i]?.products?.length,
                action: (
                    <button
                        onClick={()=>{
                            dispatch(SetCollectionId(collections[i]?._id))
                            dispatch(SetCollectionDeleteModalOpen(true))
                        }}
                        className="p-3 bg-red-1 text-white cursor-pointer rounded-lg">
                        <Trash className="h-4 w-4"/>
                    </button>
                )
            });
        }

    }




    return (
        <>

            <section id="main" className="py-6">
                {
                    isLoading ? (
                        <>
                            <ListLoading/>
                        </>
                    ) : (
                        <>

                            <div className="p-2 shadow-md rounded-md">
                                <Table columns={columns} dataSource={tableData} scroll={{x: true, y: 400}}/>
                            </div>
                        </>
                    )
                }
            </section>

            <CollectionDeleteModal/>






        </>
    );
};

export default CollectionList;