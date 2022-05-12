import Button from "@/Components/Button";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import Modal from "react-modal";

const CreatePost = ({ closeModal, showCreatePostModal }) => {
    const style = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            padding: 0,
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            minHeight: "40%",
        },
    };

    const { setData, post, processing, errors } = useForm({
        title: "",
        description: "",
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((values) => ({
            ...values,
            [name]: value,
        }));
    };

    const createPost = (event) => {
        event.preventDefault();
        post("/posts", {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
        });
    };
    return (
        <div>
            <Modal
                isOpen={showCreatePostModal}
                contentLabel="Minimal Modal Example"
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={style}
            >
                <div className="w-full bg-slate-50 p-4">
                    <form onSubmit={createPost}>
                        <h3 className="font-semibold mb-4">Add Post</h3>
                        <div className="mb-4">
                            <span className="font-semibold">Title</span>
                            <Input
                                className="w-full"
                                placeHolder="Add a title"
                                required
                                handleChange={handleChange}
                                name="title"
                            />
                            {errors.title && <div className="text-red-600">{errors.title}</div>}
                        </div>
                        <div>
                            <span className="font-semibold">Description</span>
                            <TextArea
                                className="w-full"
                                placeHolder="Add a description"
                                required
                                handleChange={handleChange}
                                name="description"
                            />
                            {errors.description && (
                                <div className="text-red-600">{errors.description}</div>
                            )}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button
                                onClick={closeModal}
                                className="mr-4 bg-red-900"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-blue-800">
                                {processing ? "creating post..." : "submit"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default CreatePost;
