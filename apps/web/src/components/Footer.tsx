export const Footer = () => {
  return (
    <div className="border-t-4 border-[#D9D9D9]">
      {' '}
      <footer className="text-white px-8 max-w-[1141px] justify-center mx-auto my-5  ">
        {' '}
        {/* Menambahkan mx-auto untuk membuat footer menjadi pusat */}
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          <div>
            <h2 className="text-blue-500 font-bold text-lg">Stockin</h2>
            <p className="mt-2 text-gray-400">
              Achieve logistics efficiency with smart stockin management.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[#152C5B]">Shop</h3>
            <ul className="mt-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Ladies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Man
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Kids
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Man
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#152C5B]">Explore Us</h3>
            <ul className="mt-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Agents
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#152C5B]">Connect Us</h3>
            <ul className="mt-2">
              <li>
                <a
                  href="mailto:support@staycation.id"
                  className="text-gray-400 hover:text-white"
                >
                  support@staycation.id
                </a>
              </li>
              <li>
                <a
                  href="tel:085-1500-2100"
                  className="text-gray-400 hover:text-white"
                >
                  085-1500-2100
                </a>
              </li>
              <li className="text-gray-400">Staycation, Kemang, Jakarta</li>
            </ul>
          </div>
        </div>
        <div className="  pt-4 text-center text-gray-600">
          <p>&copy; 2019 • All rights reserved • Stockin</p>
        </div>
      </footer>
    </div>
  );
};
