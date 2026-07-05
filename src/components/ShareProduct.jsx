import {
  FiFacebook,
  FiTwitter,
  FiLink,
  FiShare2
} from "react-icons/fi";
import {FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ShareProduct({ url, title }) {

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`,
    whatsapp: `https://wa.me/?text=${title}%20${url}`,
    telegram: `https://t.me/share/url?url=${url}&text=${title}`
  };

  const openPopup = (shareUrl) => {
    window.open(
      shareUrl,
      "share-window",
      "width=600,height=500,top=200,left=300"
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      toast("Sharing not supported on this device");
    }
  };

  return (
    <div className="flex items-center gap-3 text-gray-600 mt-4">

      <span className="text-sm">Share</span>

      {}
      <button
        onClick={() => openPopup(shareLinks.facebook)}
        className="hover:text-black hover:bg-gray-200 transition rounded p-2"
      >
        <FiFacebook size={18} />
      </button>

      {}
      <button
        onClick={() => openPopup(shareLinks.twitter)}
        className="hover:text-black hover:bg-gray-200 transition rounded p-2"
      >
        <FiTwitter size={18} />
      </button>

      {}
      <button
        onClick={() => openPopup(shareLinks.whatsapp)}
        className="hover:text-black hover:bg-gray-200 transition rounded p-2"
      >
        <FaWhatsapp size={18} />
      </button>

      {}
      <button
        onClick={() => openPopup(shareLinks.telegram)}
        className="hover:text-black hover:bg-gray-200 transition rounded p-2"
      >
        <FaTelegramPlane size={18} />
      </button>

      {}
      <button
        onClick={nativeShare}
        className="hover:text-black hover:bg-gray-200 transition rounded p-2"
      >
        <FiShare2 size={18} />
      </button>

      {}
      <button
        onClick={copyLink}
        className="hover:text-black hover:bg-gray-200 transition rounded p-2"
      >
        <FiLink size={18} />
      </button>

    </div>
  );
}