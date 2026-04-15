"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Thanks for subscribing! 🎉");
      }}
    >
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-full hover:bg-pink-50 transition-colors text-sm"
      >
        Subscribe
      </button>
    </form>
  );
}
