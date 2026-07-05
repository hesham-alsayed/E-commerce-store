"use client";

import { api } from "@/api";
import { createOrderApi } from "@/api/orderApi";
import AddressMethod from "@/components/checkout/AddressMethod";
import ContactForm from "@/components/checkout/ContactForm";
import DeliveryForm from "@/components/checkout/DeliveryForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, removeCoupon, fetchCart } from "@/lib/features/cartSlice";
import { createOrder } from "@/lib/features/orderSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SlPaypal } from "react-icons/sl";
import CheckoutSkeleton from "@/skeleton/CheckoutPageSkeleton";
import EmptyCart from "@/components/EmptyCart";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    cart,
    initialized,
    loading: loadingCart,
  } = useSelector((state) => state.cart);

  const { loading } = useSelector((state) => state.order);

  const [shipping, setShipping] = useState(null);
  const [zones, setZones] = useState([]);

  const [coupon, setCoupon] = useState("");
  const [errorCoupon, setErrorCoupon] = useState("");
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);

  useEffect(() => {
    const getShippingZonesApi = async () => {
      try {
        const res = await api.get("/shipping-zones");
        setZones(res.data.zones);
      } catch (err) {
        console.error(err);
      }
    };

    getShippingZonesApi();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contact: { email: "" },
      delivery: {
        country: "Egypt",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        governorate: "Cairo",
        postal: "",
        saveInfo: false,
      },
      billing: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        governorate: "Cairo",
        postal: "",
      },
      addressMethod: "same",
      paymentMethod: "",
    },
  });

  const paymentMethod = watch("paymentMethod");

  // ================= VALIDATION =================
  const validateBeforePayment = () => {
    const data = getValues();

    if (!data.contact.email) {
      toast.error("Email is required");
      return false;
    }

    if (!data.delivery.firstName || !data.delivery.address) {
      toast.error("Shipping data is required");
      return false;
    }

    return true;
  };

  // ================= PAYLOAD =================
  const buildPayload = (data) => ({
    contactEmail: data.contact.email,
    shippingAddress: {
      firstName: data.delivery.firstName,
      lastName: data.delivery.lastName,
      address: data.delivery.address,
      city: data.delivery.city,
      governorate: data.delivery.governorate,
      postal: data.delivery.postal,
    },
    billingAddress: data.billing,
    billingSameAsShipping: data.addressMethod === "same",
    shipping: {
      zoneName: data.delivery.governorate,
      city: data.delivery.city,
    },
  });

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const submitOrder = async (data) => {
    try {
      const payload = {
        ...buildPayload(data),
        paymentMethod: "cash",
      };

      const resultAction = await dispatch(createOrder(payload));

      if (createOrder.fulfilled.match(resultAction)) {
        const order = resultAction.payload;
        toast.success("Order Created");
        router.replace(`/order-confirmation/${order._id}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Order failed");
    }
  };

  const onSubmit = (data) => {
    if (data.paymentMethod === "cash") {
      submitOrder(data);
    }
  };

  const handlePayPal = async () => {
    try {
      if (!user) {
        toast.error("You must be logged in to continue payment");

        setTimeout(() => {
          router.push("/auth?mode=login&from=/checkout");
        }, 1000);

        return;
      }
      if (!validateBeforePayment()) return;

      setPaypalLoading(true);

      const payload = {
        ...buildPayload(getValues()),
        paymentMethod: "paypal",
      };

      const res = await createOrderApi(payload);

      if (!res?.approvalUrl) {
        toast.error("No approval URL returned");
        return;
      }

      window.location.href = res.approvalUrl;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Payment init failed");
    } finally {
      setPaypalLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      if (!user) {
        toast.error("You must be logged in To Apply Coupon");

        setTimeout(() => {
          router.push("/auth?mode=login&from=/checkout");
        }, 1000);

        return;
      }
      if (!coupon.trim()) {
        setErrorCoupon("Please enter a coupon code");
        return;
      }

      setLoadingCoupon(true);

      await dispatch(applyCoupon(coupon.trim()));
      await dispatch(fetchCart());

      setCoupon("");
      setErrorCoupon("");
    } catch (err) {
      setErrorCoupon(err?.response?.data?.message || "Invalid coupon");
    } finally {
      setLoadingCoupon(false);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      setLoadingRemove(true);

      await dispatch(removeCoupon());
      await dispatch(fetchCart());

      setCoupon("");
      setErrorCoupon("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRemove(false);
    }
  };

  const isLoadingCart = !initialized || loadingCart;

  const hasItems =
    initialized && Array.isArray(cart?.items) && cart.items.length > 0;

  // 1. LOADING FIRST (NO EMPTY EVER HERE)
  if (isLoadingCart) {
    return <CheckoutSkeleton />;
  }

  if (!initialized) {
    return <CheckoutSkeleton />;
  }
  if (!hasItems) {
    return <EmptyCart />;
  }

  if (!cart?.items?.length) {
    return <EmptyCart />;
  }
  return (
    <section className="min-h-screen bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:grid-cols-[720px_480px] gap-6 justify-center"
      >
        <div className="p-6 lg:p-10 space-y-8 mt-6">
          <ContactForm register={register} errors={errors} />

          <DeliveryForm
            register={register}
            errors={errors}
            setValue={setValue}
            zones={zones}
            setShipping={setShipping}
          />

          <PaymentMethod
            register={register}
            errors={errors}
            watchValue={paymentMethod}
            setValue={setValue}
          />

          <AddressMethod
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          {paymentMethod === "paypal" ? (
            <button
              type="button"
              onClick={handlePayPal}
              disabled={paypalLoading}
              className="w-full bg-blue-900 flex items-center justify-center gap-3 py-3 rounded-lg text-white"
            >
              {paypalLoading ? "Processing..." : "Pay with PayPal"}
              <SlPaypal size={20} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              {loading ? "Processing..." : "Complete Order"}
            </button>
          )}
        </div>

        {/* RIGHT */}
        <div className="p-6 lg:p-10 lg:sticky lg:top-6 self-start">
          <OrderSummary
            cart={cart}
            shipping={shipping}
            coupon={coupon}
            setCoupon={setCoupon}
            errorCoupon={errorCoupon}
            setErrorCoupon={setErrorCoupon}
            onApplyCoupon={handleApplyCoupon}
            onRemoveCoupon={handleRemoveCoupon}
            loadingCoupon={loadingCoupon}
            loadingRemoveCoupon={loadingRemove}
          />
        </div>
      </form>
    </section>
  );
}
