// components
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

// lib
import { getFormData } from "../lib/my-utils";
import { postData } from "../request";

// react
import { UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";

function Login() {
  const { setAdmin, admin } = useAppStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = getFormData(e.target);
    setLoading(true);
    postData(data)
      .then((res) => {
        setAdmin(res);
        toast.success("Welcome to Flowers App");
        setLoading(false);
      })
      .catch(({ message }) => {
        toast.error(message);
        setLoading(false);
      });
  };

  if (admin === null) {
    return (
      <div className="bg-gray-100 grid place-items-center h-screen">
        <div className="max-w-[300px] mx-auto w-full">
          <form onSubmit={handleSubmit}>
            <Label htmlFor="username" className="text-gray-600">
              Username:
            </Label>
            <Input
              name="username"
              id="username"
              type="text"
              placeholder="Enter your username"
              className="mt-1"
            />
            <Label htmlFor="password" className="text-gray-600 mt-4">
              Password:
            </Label>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1"
            />
            <div>
              <Button type="submit" className="w-full mt-3" disabled={loading}>
                {loading ? (
                  <UpdateIcon className="animate-spin ml-1" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    const lastpage = localStorage.getItem("lastPage") || "/";
    return <Navigate to={lastpage} />;
  }
}

export default Login;
