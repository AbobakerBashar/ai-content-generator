"use client";

const ErrorPage = ({ reset, error }) => {
	return <div>{error.message}</div>;
};

export default ErrorPage;
