"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, updateExistingAddress, removeAddress, fetchAddresses } from "@/lib/features/userSlice";

const emptyForm = {
  country: "",
  governorate: "",
  city: "",
  street: "",
  postalCode: "",
};

export default function useAddresses() {
  const dispatch = useDispatch();
  const { addresses, loading: loadingData, user } = useSelector(state => state.user);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);

  const [selectedDelete, setSelectedDelete] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpen = () => {
    setForm(emptyForm);
    setEditingId(null);
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (editingId) {
        await dispatch(updateExistingAddress({ id: editingId, data: form })).unwrap();
      } else {
        await dispatch(addNewAddress(form)).unwrap();
      }

      setOpen(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (addr) => {
    setForm({
      country: addr.country || "",
      governorate: addr.governorate || "",
      city: addr.city || "",
      street: addr.street || "",
      postalCode: addr.postalCode || "",
    });

    setEditingId(addr._id);
    setOpen(true);
  };

  const handleOpenDelete = (id) => {
    setSelectedDelete(id);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);

      await dispatch(removeAddress(selectedDelete)).unwrap();

      setOpenDelete(false);
      setSelectedDelete(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setLoadingDelete(false);
    }
  };
  useEffect(() => {
    dispatch(fetchAddresses());
  }, []);
  return {
    addresses,
    user,
    loadingData,

    form,
    editingId,
    open,
    setOpen,

    handleChange,
    handleOpen,
    handleSubmit,
    handleEdit,

    openDelete,
    setOpenDelete,
    handleOpenDelete,
    handleDelete,
    loadingDelete,
    fetchAddresses: () => dispatch(fetchAddresses()),

    loading,
    setForm,
    emptyForm,
  };
}
