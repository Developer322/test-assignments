const Error = () => {
    return (
        <section className="contentContainer">
            <div className="flex flex-col max-w-md text-center">
                <h2 className="mb-8 font-extrabold text-9xl">404</h2>
                <p className="text-2xl font-semibold md:text-3xl">
                    Page not found.
                </p>
                <a
                    rel="noopener noreferrer"
                    href="/"
                    className="mt-4 px-8 py-3 font-semibold rounded border border-gray-700 text-gray-700 hover:bg-gray-100"
                >
                    Home
                </a>
            </div>
        </section>
    );
};
export default Error;
