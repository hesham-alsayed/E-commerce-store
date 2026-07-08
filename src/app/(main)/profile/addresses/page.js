"use client";

import useAddresses from "@/components/profile/addresses/useAddresses";
import { Button } from "@/components/ui/button";
import AddressesPageSkeleton from "@/skeleton/AddressesPageSkeleton";
import { Plus } from "lucide-react";
import CurrentRoute from "@/views/CurrentRoute";
import AddressModal from "@/components/profile/addresses/AddressModal";
import AddressCard from "@/components/profile/addresses/AddressCard";
import { DeleteModal } from "@/modal/DeleteModal";

export default function AddressesPage() {
  const {
    addresses,
    user,
    loadingData,
    error,

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

    setDefaultAddress,
    loading,
    setForm,
    emptyForm,
  } = useAddresses();

  if (error) {
    return <div className="text-center py-20 text-red-500 text-sm">{error}</div>;
  }

  if (loadingData) return <AddressesPageSkeleton />;

  const safeAddresses = Array.isArray(addresses) ? addresses : [];

  const isEmpty = safeAddresses.length === 0;

  return (
    <div className="flex flex-col space-y-6">
      <CurrentRoute />

      {}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Addresses</h1>
          <p className="text-sm text-gray-500">
            Manage your shipping addresses
          </p>
        </div>

        {!isEmpty && (
          <Button onClick={handleOpen}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Address
          </Button>
        )}
      </div>

      {}
      <AddressModal
        open={open}
        setOpen={setOpen}
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        editingId={editingId}
        setForm={setForm}
        emptyForm={emptyForm}
      />

      {}
      {isEmpty ? (
        
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center flex flex-col items-center max-w-md px-4">
            {}
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>

            {}
            <h2 className="text-xl font-semibold">No addresses found</h2>

            {}
            <p className="text-sm text-gray-500 mt-2">
              You haven't added any shipping addresses yet.
            </p>

            {}
            <Button onClick={handleOpen} className="mt-6 px-6">
              <Plus className="w-4 h-4 mr-2" />
              Add New Address
            </Button>
          </div>
        </div>
      ) : (
        
        <div className="grid md:grid-cols-2 gap-4">
          {safeAddresses.map((addr) => (
            <AddressCard
              key={addr._id}
              addr={addr}
              user={user}
              setDefaultAddress={setDefaultAddress}
              handleEdit={handleEdit}
              onClickDelete={handleOpenDelete}
            />
          ))}
        </div>
      )}

      {}
      <DeleteModal
        isLoadingDelete={loadingDelete}
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        itemTitle="address"
        title="Address"
        onConfirm={handleDelete}
      />
    </div>
  );
}
