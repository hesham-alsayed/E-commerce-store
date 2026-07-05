"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Camera } from "lucide-react";
import UploadAvatarModal from "@/modal/UploadAvatarModal";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, updateUserAvatar } from "@/lib/features/authSlice";

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { loading, user } = useSelector(state => state.auth);

  const realUser = user;

  const [formData, setFormData] = useState({
    firstName: `${realUser?.firstName || ""}`,
    lastName: `${realUser?.lastName || ""}`,
    email: realUser?.email || "",
    phone: realUser?.phone || "",
  });

  useEffect(() => {
    const check = () => {
      if (realUser) {
        setFormData({
          firstName: `${realUser?.firstName || ""}`,
          lastName: `${realUser?.lastName || ""}`,
          email: realUser?.email || "",
          phone: realUser?.phone || "",
        });
      }
    };
    check();
  }, [realUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success("profile update success");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error update my profile");
    } finally {
      setIsEditing(false);
    }
  };

  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || "");
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
    setShowModal(true);
  };

  const handleSaveImage = async () => {
    if (!avatarFile) return;

    try {
      await dispatch(updateUserAvatar(avatarFile)).unwrap();
      setShowModal(false);
      setAvatarFile(null);
      toast.success("Upload Success");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed Upload");
    }
  };

  const handleCancelImage = () => {
    setPreview(user?.avatar || "");
    setAvatarFile(null);
    setShowModal(false);
  };

  return (
    <>
      <Card className="p-6">
        <CardContent className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="flex-1 w-full">
            {!isEditing ? (
              <div className="flex flex-col md:flex-row md:justify-between gap-6 items-center">
                <div className=" flex  gap-10">
                  <div className="relative group mt-4 md:mt-0">
                    <img
                      src={
                        typeof realUser?.avatar === "string"
                          ? realUser.avatar
                          : "https://ui-avatars.com/api/?name=User"
                      }
                      className="w-28 h-28 rounded-full object-cover border shadow-md"
                    />

                    <div
                      onClick={() =>
                        document.getElementById("avatarInput").click()
                      }
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full cursor-pointer transition"
                    >
                      <Camera className="text-white w-6 h-6" />
                    </div>

                    <input
                      id="avatarInput"
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="space-y-1 text-center md:text-left">
                    <h2 className="text-2xl capitalize font-semibold">
                      {realUser?.firstName} {realUser?.lastName}
                    </h2>

                    <p className="text-muted-foreground">{realUser?.email}</p>
                    <p className="text-muted-foreground">{realUser?.phone}</p>

                    <p className="text-sm text-muted-foreground">
                      Joined:{" "}
                      {realUser?.createdAt
                        ? new Date(realUser.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2">
                  <Badge
                    variant={realUser?.isVerified ? "default" : "destructive"}
                  >
                    {realUser?.isVerified ? "Verified Account" : "Not Verified"}
                  </Badge>

                  <Button onClick={() => setIsEditing(true)} className="mt-2">
                    Edit Profile
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button disabled={loading} onClick={handleUpdateProfile}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>

                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <UploadAvatarModal
          handleCancelImage={handleCancelImage}
          handleSaveImage={handleSaveImage}
          loading={loading}
          preview={preview}
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
      </Card>
    </>
  );
}
