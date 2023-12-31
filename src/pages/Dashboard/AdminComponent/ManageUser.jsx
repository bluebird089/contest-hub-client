import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: users,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    if (isPending) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    const handleDeleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                    }
                });
            }
        });
    };

    return (
        <div className="p-5">
            <div className="flex justify-center text-2xl gap-10 pb-10">
                <h3>Manage Users</h3>
                <h3>Total Users: {users?.length}</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={user.userImage}
                                                    alt="User Image"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{user.userName}</p>
                                    </td>
                                    <td>
                                        <p>{user.userEmail}</p>
                                    </td>
                                    <td>
                                        <p>{user.role}</p>
                                    </td>
                                    <th>
                                        <button
                                            onClick={() =>
                                                handleDeleteItem(user._id)
                                            }
                                            className="btn btn-ghost"
                                        >
                                            <FaRegTrashAlt className="text-lg text-red-600"></FaRegTrashAlt>
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
