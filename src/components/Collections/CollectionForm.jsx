import {Button, Card, Input, Textarea, Typography} from "@material-tailwind/react";
import ErrorText from "../Validation/ErrorText.jsx";
import { Plus, Trash } from "lucide-react";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import convertToBase64 from "../../helper/convertToBase64.js";
import {useCreateCollectionMutation} from "../../redux/features/collection/collectionApi.js";



const CollectionForm = () => {
    const [createCollection, {isLoading, isSuccess}] = useCreateCollectionMutation();
    const [image, setImage] = useState();
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues:{
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





    //click on input file
    const handleClickButton = () => {
        document.getElementById("file").click();
    };


    const handleFileRemove = () => {
      setValue('files', []);
    }




    const onSubmit = (data) =>{
        const {title, description, files} = data;
        let formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", files[0]);
        createCollection(formData);
    }








    return (
        <>
            <div className="p-5">
                <Card color="transparent" className="px-7 py-3 bg-white" shadow={true}>
                    <p className="text-heading2-bold text-center mb-2">Create Collection</p>
                    {/*<hr className="border-b border-gray-400"/>*/}
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
                                            maxLength: {value: 32, message: "Maximum 32 character"}
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
                            files.length>0 ? (
                                <div>
                                    <div className="mb-4 flex flex-wrap items-center gap-4">
                                        <div className="w-[200px] h-[200px] relative rounded-lg border">
                                            <img className="object-cover rounded-lg border w-[200px] h-[200px]"
                                                 src={image}
                                                 alt="collection"/>
                                            <div
                                                onClick={handleFileRemove}
                                                className="absolute right-0 top-0 z-10 p-3 bg-red-1 text-white cursor-pointer rounded-lg">
                                                <Trash className="h-4 w-4"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <Button onClick={handleClickButton}
                                            className="capitalize bg-grey-1 flex items-center text-white mb-2 cursor-pointer">
                                        <Plus className="h-4 w-4 mr-2"/>
                                        Upload Image
                                    </Button>

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
                                        required: "Image is required!",
                                        validate: (value)=>{
                                            let fileType = value[0]['type'];
                                            let fileSize = value[0]['size'];
                                            console.log(value)

                                            if(fileType !== "image/jpeg"){
                                                return "Select an Image"
                                            }
                                            else if(fileSize > 1048576){
                                                return "Image file size maximum 1 MB"
                                            }

                                        }
                                    })}
                                error={Boolean(errors?.files?.message)}
                                hidden
                                accept="image/*"
                            />
                        </div>




                        <div className="flex gap-10 -mt-5">
                            <Button disabled={isLoading} type="submit" className={`bg-blue-1 text-white disabled:cursor-not-allowed ${isLoading && "capitalize"}`}>
                                {isLoading ? "Processing..." : "Submit"}
                            </Button>
                            <Button
                                type="button"
                                className="bg-blue-1 text-white"
                            >
                                Discard
                            </Button>
                        </div>


                    </form>
                </Card>
            </div>
        </>
    );
};

export default CollectionForm;