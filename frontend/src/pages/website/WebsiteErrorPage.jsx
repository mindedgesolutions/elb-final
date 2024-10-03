import { Link, useRouteError } from "react-router-dom";

const WebsiteErrorPage = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <main className="grid min-h-screen place-items-center px-8">
        <div className="text-center">
          <p className="text-9xl font-bold tracking-widest text-gray-700">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-widest text-gray-700">
            Page not found!!!
          </h1>
          <p className="mt-6 text-lg leading-7 tracking-widest text-gray-700">
            Sorry!!! We couldn't find the page you're looking for!
          </p>
          <div className="mt-10">
            <Link
              to={`/`}
              className="py-3 px-4 bg-green-500 rounded-md text-white tracking-widest"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="grid min-h-screen place-items-center px-8">
      <div className="text-center">
        <p className="text-5xl font-bold tracking-widest uppercase text-gray-700">
          error{" "}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-widest text-gray-700">
          There was an error
        </h1>
        <p className="mt-6 text-lg leading-7 tracking-widest text-gray-700">
          Sorry!!! We there was an error and we couldn't process the request!
        </p>
        <div className="mt-10">
          <Link
            to={`/`}
            className="py-3 px-4 bg-green-500 rounded-md text-white tracking-widest"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
};
export default WebsiteErrorPage;
