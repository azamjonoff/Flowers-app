import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col">
        <h1 className="text-6xl text-center font-bold text-red-600">404</h1>
        <h2 className="text-2xl font-semibold mt-3 text-red-600">
          Something went wrong :(
        </h2>
        <Link
          to="/"
          className="py-2 px-3 rounded-md bg-blue-800 text-white font-bold text-center mt-4"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
