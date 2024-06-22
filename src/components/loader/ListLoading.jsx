

const ListLoading = () => {
    const array = [1,2,3,4, 5,6,7,8];


    return (
        <>
            <div className="flex flex-col gap-6 px-4 py-3 shadow-md rounded-md animate-pulse">
                {
                    array.map((item,i)=>{
                        return(
                            <>
                                <div
                                    key={i}
                                    className="bg-gray-300 h-[40px]  text-white font-bold py-2 px-4 rounded-md">

                                </div>
                            </>
                        )
                    })
                }


            </div>
        </>
    );
};

export default ListLoading;