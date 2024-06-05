import {Separator} from "@/components/ui/separator.jsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {Plus, Trash} from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea.jsx";
import macbook from "../../assets/images/macbook.png";





const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    image: z.string()
})


const CollectionForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "Cargo Pant",
            description: "new collection"
        },
    })


    const onSubmit = (values) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    };



    return (
        <>
            <div className="p-10">
                <p className="text-heading2-bold">Create Collection</p>
                <Separator className="bg-grey-1 mt-4 mb-7"/>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Title </FormLabel>
                                    <FormControl>
                                        <Input placeholder="title" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Description </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description" rows={5} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*Upload Image Field*/}
                        <div>
                            <div className="mb-4 flex flex-wrap items-center gap-4">
                                <div className="w-[200px] h-[200px] relative rounded-lg border">
                                    <img className="object-cover rounded-lg border w-[200px] h-[200px]" src={macbook}
                                         alt="collection"/>
                                    <div className="absolute right-0 top-0 z-10 p-3 bg-red-1 text-white cursor-pointer rounded-lg">
                                        <Trash className="h-4 w-4"/>
                                    </div>
                                </div>
                            </div>
                            <Button className="bg-grey-1 text-white">
                            <Plus className="h-4 w-4 mr-2"/>
                                Upload Image
                            </Button>
                        </div>
                        
                        <div className="flex gap-8">
                            <Button type="submit" className="bg-blue-1 text-white">
                                Submit
                            </Button>
                            <Button type="button" className="bg-red-1 text-white">
                               Discard
                            </Button>
                        </div>
                    </form>

                </Form>

            </div>
        </>
    );
};

export default CollectionForm;