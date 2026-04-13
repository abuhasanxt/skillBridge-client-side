"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Profile } from "@/services/updateProfile.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



export default function UpdateProfile() {
  const [hasProfile, setHasProfile] = useState(false);

const router=useRouter()
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    phone: "",
    bio: "",
    hourlyPrice: "",
    subject: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Profile.getProfile();
      if (data) {
        setHasProfile(!!data.user.tutorProfile);

        setFormData({
          name: data.user.name || "",
          image: data.user.image || "",
          phone: data.user.phone || "",
          bio: data.user.tutorProfile?.bio || "",
          hourlyPrice: data.user.tutorProfile?.hourlyPrice?.toString() || "",
          subject: data.user.tutorProfile?.subject?.join(", ") || "",
        });
      }
    };

    fetchData();
  }, []);

  // handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let payload: any = {
      name: formData.name,
      image: formData.image,
      phone: formData.phone,
    };

    // only if profile exists
    if (hasProfile) {
      payload = {
        ...payload,
        bio: formData.bio || undefined,
        hourlyPrice: formData.hourlyPrice
          ? Number(formData.hourlyPrice)
          : undefined,
        subject: formData.subject
          ? formData.subject.split(",").map((s) => s.trim())
          : undefined,
      };
    }

    //remove undefined
    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key],
    );

    //  API call
    const res = await Profile.update(payload);

    if (res?.success) {
      toast("Profile Updated Successfully");
 router.push("/tutor/profile")
    } else {
      toast("Update Failed");
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block mb-1 font-medium">Name</label>
        <Input
          name="name"
          placeholder="Type your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <label className="block mb-1 font-medium">Image</label>
        <Input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <label className="block mb-1 font-medium">Contact Number</label>
        <Input
          name="phone"
          placeholder=" Type your Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        {/*if tutor */}
        {hasProfile && (
          <>
            <div>
              <label className="block mb-1 font-medium">Bio</label>
              <textarea
                name="bio"
                placeholder="Type your bio dara"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <label className="block mb-1 font-medium">HourlyPrice</label>
            <Input
              type="number"
              name="hourlyPrice"
              placeholder="Hourly Price"
              value={formData.hourlyPrice}
              onChange={handleChange}
            />
            <label className="block mb-1 font-medium">Subject</label>
            <Input
              name="subject"
              placeholder="Subjects (comma separated)"
              value={formData.subject}
              onChange={handleChange}
            />
          </>
        )}

        <Button type="submit" className="w-full">
          Update Profile
        </Button>
      </form>
    </div>
  );
}
