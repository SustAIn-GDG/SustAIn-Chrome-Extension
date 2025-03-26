export default function InfoCard() {
  return (
    <div className="text-center p-4 bg-white rounded-lg shadow-md mt-4">
      <h3 className="font-bold text-lg text-blue-600 mb-2">
        No Conversation Data Yet
      </h3>
      <p className="mb-2 text-gray-700">
        To calculate impact, we need a bit more context from your AI
        conversation.
      </p>
      <div className="bg-blue-50 p-3 rounded-md border border-blue-200 mt-1">
        <p className="font-medium text-blue-700">What to do:</p>
        <p className="mt-1 text-blue-600">
          Continue chatting with your AI tool like ChatGPT or Gemini. Once your
          conversation grows a bit, return here to check your impact.
        </p>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        <span className="font-semibold text-gray-700">Note:</span> Please wait
        until the AI has finished generating its response before using the
        extension. Clicking too early may result in missing or incomplete data.
      </p>
    </div>
  );
}
