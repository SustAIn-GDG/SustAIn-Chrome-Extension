export default function ErrorCard() {
  return (
    <div className="text-center p-4 bg-white rounded-lg shadow-md mt-4">
      <h3 className="font-bold text-lg text-red-600 mb-2">
        Oops! Something went wrong.
      </h3>
      <p className="mb-2 text-red-500">
        We encountered an error while processing your data.
      </p>
      <div className="bg-red-50 p-3 rounded-md border border-red-200 mt-1">
        <p className="font-medium text-red-700">Please try the following:</p>
        <ul className="list-disc list-inside text-red-600 mt-1 text-left">
          <li>
            Continue your conversation with the AI and try again after a few
            queries.
          </li>
          <li>Alternatively, refresh the page and try again.</li>
        </ul>
      </div>
      <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 mt-3">
        <p className="font-semibold text-yellow-700">Important Notice:</p>
        <p className="mt-1 text-yellow-600">
          Do <span className="font-bold">not</span> press the extension button
          while the AI is still generating a response. Only click after the
          response has been{" "}
          <span className="font-bold">completely generated</span> to ensure
          accurate tracking.
        </p>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Thank you for your understanding and patience!
      </p>
    </div>
  );
}
