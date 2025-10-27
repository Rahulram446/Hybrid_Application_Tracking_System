import axios from "../api/axios";

export default function BotDashboard() {
  const triggerBot = async () => {
    await axios.post("/bot/run");
    alert("Bot Mimic executed successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">🤖 Bot Mimic Panel</h1>
      <button
        onClick={triggerBot}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Run Bot Mimic Now
      </button>
    </div>
  );
}
