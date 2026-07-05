import { forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordField = forwardRef(({ label, show, toggle, ...props }, ref) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <div className="relative">
        <input
          ref={ref}
          type={show ? "text" : "password"}
          className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black/20"
          {...props}
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
});

PasswordField.displayName = "PasswordField";

export default PasswordField;
