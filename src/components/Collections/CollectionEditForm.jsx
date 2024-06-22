import {Button, Card, Input, Textarea, Typography} from "@material-tailwind/react";
import ErrorText from "../Validation/ErrorText.jsx";
import { Plus, Trash, Pencil} from "lucide-react";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import convertToBase64 from "../../helper/convertToBase64.js";
import {
    useUpdateCollectionMutation, useUpdateCollectionWithImageMutation
} from "../../redux/features/collection/collectionApi.js";
import {useDispatch, useSelector} from "react-redux";
import Error from "../Validation/Error.jsx";
import {
    SetCollectionEditError,
    SetCollectionId
} from "../../redux/features/collection/collectionSlice.js";
import {useNavigate} from "react-router-dom";
import {SetCollectionDeleteModalOpen} from "../../redux/features/modal/modalSlice.js";
import CollectionDeleteModal from "../modal/CollectionDeleteModal.jsx"
import placeholder from "../../assets/images/placeholder.png";



const CollectionEditForm = ({collection}) => {
    const [updateCollection, {isLoading, isSuccess}] = useUpdateCollectionMutation();
    const [updateCollectionWithImage, {isLoading:loading, isSuccess:success}] = useUpdateCollectionWithImageMutation();
    const [image, setImage] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state)=> state.collection.editError);

    const {
        _id,
        title:initialTitle,
        description:initialDescription,
        image:initialImage,
    } = collection || {};

    const {public_id, image_url} = initialImage || {};




    const {
        register,
        handleSubmit,
        watch,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues:{
            title: initialTitle,
            description: initialDescription,
            files: []
        }
    });

    const files = watch("files");


    useEffect(()=>{
        (async () => {
            if(files.length>0){
                const base64 = await convertToBase64(files[0]);
                setImage(base64);
            }
        })();
    },[files])



    useEffect(()=>{
        if(isSuccess || success){
            navigate('/collections');
        }
    },[navigate,success, isSuccess]);





    //click on input file
    const handleClickButton = () => {
        document.getElementById("file").click();
    };


    const handleFileRemove = () => {
        setValue('files', []);
    }

    // Handle click to clear errors for a specific field
    const handleRemoveError = () => {
        clearErrors('files'); // Replace 'fieldName' with your actual field name
    };



    const onSubmit = (data) =>{
        const {title, description, files} = data;
        let formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("public_id", public_id);
        formData.append("image", files[0]);
        dispatch(SetCollectionEditError(""));
        if(files.length===0) {
            updateCollection({
                id: _id,
                data: {
                    title,
                    description
                }
            })
        }else{
            updateCollectionWithImage({
                id:_id,
                data: formData
            });
        }
    }








    return (
        <>
            <div className="p-5">
                <Card color="transparent" className="px-7 py-3 bg-white" shadow={true}>
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-heading2-bold">Edit Collections</p>
                        <button
                            onClick={()=> {
                                dispatch(SetCollectionId(_id));
                                dispatch(SetCollectionDeleteModalOpen(true))
                            }}
                            className="p-3 bg-red-1 text-white cursor-pointer rounded-lg">
                            <Trash className="h-4 w-4"/>
                        </button>
                    </div>
                    <hr className="border-b border-gray-400"/>
                    {error && (
                        <>
                            <Error message={error}/>
                        </>

                    )
                    }
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid grid-cols-1">
                        <div className="flex flex-col space-y-2 mb-6">
                            <div className="flex flex-col space-y-6">
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Title
                                </Typography>
                                <Input
                                    type="text"
                                    label="Enter Title"
                                    {...register("title",
                                        {
                                            required: "Title is required",
                                            maxLength: {value: 32, message: "Maximum 32 character"}
                                        })}
                                    error={Boolean(errors?.title?.message)}
                                />
                            </div>
                            {errors?.title?.message && (
                                <ErrorText>
                                    {errors?.title?.message}
                                </ErrorText>
                            )}
                        </div>
                        <div className="flex flex-col space-y-2 mb-6">
                            <div className="flex flex-col space-y-6">
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Description
                                </Typography>
                                <Textarea
                                    size="lg"
                                    label="Write something..."
                                    {...register("description",
                                        {
                                            required: "Description is required",
                                            maxLength: {value: 500, message: "Maximum 32 character"}
                                        })}
                                    error={Boolean(errors?.description?.message)}
                                />
                            </div>
                            {errors?.description?.message && (
                                <ErrorText>
                                    {errors?.description?.message}
                                </ErrorText>
                            )}
                        </div>

                        {/*Preview Image Field*/}
                        {
                            files.length > 0 ? (
                                <div>
                                    <div className="mb-4 flex flex-wrap items-center gap-4">
                                        <div className="w-[200px] h-[200px] relative rounded-lg border">
                                            <img
                                                className="object-center rounded-lg border w-[200px] h-[200px]"
                                                src={image || placeholder}
                                                alt="collection"
                                            />
                                            <div
                                                onClick={()=>{
                                                    handleFileRemove();
                                                    handleRemoveError()
                                                }}
                                                className="absolute right-0 top-0 z-10 p-3 bg-red-1 text-white cursor-pointer rounded-lg">
                                                <Trash className="h-4 w-4"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="mb-4 flex flex-wrap items-center gap-4">
                                        <div className="w-[200px] h-[200px] relative rounded-lg border">
                                            <img
                                                className="object-center rounded-lg border w-[200px] h-[200px]"
                                                src={image_url || placeholder}
                                                alt="collection"
                                            />
                                            <div
                                                onClick={handleClickButton}
                                                className="absolute left-0 top-0 z-10 p-3 bg-black text-white cursor-pointer rounded-lg">
                                                <Pencil className="h-4 w-4"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {errors?.files?.message && (
                            <ErrorText>
                                {errors?.files?.message}
                            </ErrorText>
                        )}

                        <div>
                            <Input
                                type="file"
                                id="file"
                                className="h-[2px] !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none"
                                }}
                                {...register("files",
                                    {
                                        validate: (value) => {
                                            if(value.length>0){
                                                let fileType = value[0]?.type.split("/")[0];
                                                let fileSize = value[0]?.size;
                                                if (fileType !== "image") {
                                                    return "Select an Image File"
                                                } else if (fileSize > 1048576) {
                                                    return "Image file size maximum 1 MB"
                                                }
                                            }

                                            if(image_url ==="" && files.length===0){
                                               return "Image is required!"
                                            }

                                        }
                                    })}
                                error={Boolean(errors?.files?.message)}
                                hidden
                                accept="image/*"
                            />
                        </div>


                        <div className="flex gap-10 -mt-5">
                            <Button
                                disabled={isLoading || loading}
                                type="submit"
                                className={`bg-blue-1 text-white disabled:cursor-not-allowed capitalize`}
                                loading={isLoading || loading}
                            >
                                {
                                    isLoading===true || loading===true ? (
                                        "Processing..."
                                    ): (
                                        "Save Changes"
                                    )
                                }
                            </Button>
                            <Button
                                onClick={()=>navigate('/collections')}
                                type="button"
                                className="bg-blue-1 text-white capitalize"
                            >
                                Discard
                            </Button>
                        </div>


                    </form>
                </Card>
            </div>

            <CollectionDeleteModal/>
        </>
    );
};

export default CollectionEditForm;