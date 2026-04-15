"use client";

import { useEffect, useState } from "react";
import { user } from "@/services/getAllUser.service";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  image?: string | null;
  isBanned?: boolean;
};

export default function GetAllUser() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await user.getAllUser();
      setUsers(data.data || []);
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (id: string, role: string) => {
    const { data, error } = await user.changeRole(id, role);
    if (error || !data?.success) {
      toast("Role update failed");
      return;
    }

    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  const handleBanChange = async (id: string, status: string) => {
    const isBanned = status === "true";

    const { data, error } = await user.changeIsBanned(id, isBanned);
    if (error || !data?.success) {
      toast("Ban update failed");
      return;
    }

    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isBanned } : u)));
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">All Users</h1>

      {/*  Desktop Table */}
      <div className="hidden md:block overflow-x-auto border rounded-lg  ">
        <table className="w-full text-sm text-left">
          <thead className="">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Banned</th>
              <th className="p-3">Phone</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-500">
                <td className="p-3">
                  {user.image ? (
                    <img src={user.image} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </td>

                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3">{user.email}</td>

                <td className="p-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border  rounded px-2 py-1"
                  >
                    <option value="STUDENT">Student</option>
                    <option value="TUTOR">Tutor</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>

                <td className="p-3">
                  <select
                    value={String(user.isBanned)}
                    onChange={(e) => handleBanChange(user.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="false">Active</option>
                    <option value="true">Banned</option>
                  </select>
                </td>

                <td className="p-3">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  Mobile Card View */}
      <div className=" grid grid-cols-1 gap-4 md:hidden ">
        {users.map((user) => (
          <div key={user.id} className="border rounded-lg p-4 shadow-sm ">
            <div className="flex items-center gap-3">
              {user.image ? (
                <img src={user.image} className="w-12 h-12 rounded-full" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
              )}

              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="mt-3 text-sm space-y-2">
              <p>📞 {user.phone}</p>

              <div className="flex justify-between items-center">
                <span>Role:</span>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="STUDENT">Student</option>
                  <option value="TUTOR">Tutor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <span>Status:</span>
                <select
                  value={String(user.isBanned)}
                  onChange={(e) => handleBanChange(user.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="false">Active</option>
                  <option value="true">Banned</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
