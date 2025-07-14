// src/pages/Contact.jsx
const Contact = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero min-h-[50vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold">Contact Us</h1>
            <p className="py-6 text-base-content">
              Have questions, feedback, or need support? We’d love to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="px-6 py-12 max-w-3xl mx-auto">
        <form className="space-y-6">
          <div>
            <label className="label">
              <span className="label-text text-base-content">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full bg-base-100"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-base-100"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full bg-base-100"
              rows="5"
              placeholder="Your message..."
              required
            ></textarea>
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Contact;
