// react
import { useEffect } from "react";

// lib
import { useAppStore } from "../lib/zustand";

// request
import { getFlowers } from "../request";

// sonner
import { toast } from "sonner";

function Home() {
  const { flowers } = useAppStore((state) => state.flowers);
  const { user } = useAppStore((state) => state.user);
  useEffect(() => {
    getFlowers(user.access_token)
      .then((res) => console.log(res))
      .catch(({ message }) => toast.error(message));
  }, []);

  return (
    <section className="py-10">
      <div className="container">
        <h1 className="text-center text-3xl font-bold">Our Flowers</h1>
        <div>
          {flowers
            ? flowers.map((flower) => {
                return (
                  <div key={flower.id}>
                    <h1>{flower.name}</h1>
                  </div>
                );
              })
            : "There is no flowers"}
        </div>
      </div>
    </section>
  );
}

export default Home;
