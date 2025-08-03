const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Ready to Start Your MBA Journey?
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Join thousands of professionals who have advanced their careers with
          our partner universities. Get personalized guidance and find the
          perfect program for your goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-400">✓</span>
            <span>Expert Counseling</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-400">✓</span>
            <span>No Hidden Fees</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-400">✓</span>
            <span>100% Genuine Reviews</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
