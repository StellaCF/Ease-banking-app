import { useState } from "react";
import heroimg from "../assets/heroimg.png";
import financeapp from "../assets/Financeapp.png";
import img4 from "../assets/img4.png";
import img7 from "../assets/img7.png";
import img6 from "../assets/img6.png";
import finance1 from "../assets/Finance1.png";
import logo from "../assets/banklogo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaXTwitter,
  FaGoogle,
  FaRegComments,
} from "react-icons/fa6";
import Navbar from "../components/Navbar";

const testimonials = [
  {
    name: "Chinelo Ugwoke",
    location: "Brisbane, Qld",
    text: `Whenever I encounter issues while navigating the app, help is provided instantly. The rates are good, and transfers are seamless. I’ve been using the service for years now and I have always been valued and well taken care of.`,
  },
  {
    name: "Uchechi Maduike",
    location: "Ipswich, Qld",
    text: `Transactions are quick and the customer service is highly supportive. After using various other services, I appreciate that there are no hidden fees or service charges with the Ease Bank platform. Everything is straightforward and transparent.`,
  },
  {
    name: "Mbaka Clement",
    location: "Gold Coast, Qld",
    text: `Ease Bank is good. The money I send reaches the recipient instantly, but in rare occasions, there were delays probably due to banking network issues. Even in such cases, I was always informed about the timelines. Their system is very effective.`,
  },
  {
    name: "Mbaka Clement",
    location: "Gold Coast, Qld",
    text: `Ease Bank is good. The money I send reaches the recipient instantly, but in rare occasions, there were delays probably due to banking network issues. Even in such cases, I was always informed about the timelines. Their system is very effective.`,
  },
  {
    name: "Uchechi Maduike",
    location: "Ipswich, Qld",
    text: `Transactions are quick and the customer service is highly supportive. After using various other services, I appreciate that there are no hidden fees or service charges with the Ease Bank platform. Everything is straightforward and transparent.`,
  },
  // Add more testimonials here if needed
];

const faqItems = [
  {
    question: "What does Ease Bank do?",
    answer:
      "Ease Bank enables fast, secure, and cost-effective cross-border money transfers.",
  },
  {
    question: "Why should I trust Ease Bank?",
    answer:
      "Ease Bank is regulated, uses advanced encryption, and has served thousands of happy users.",
  },
  {
    question: "Can anyone create a Ease Bank account?",
    answer: "To create an account, you must be over 18 years of age.",
  },
  {
    question: "What do I need to create an account?",
    answer:
      "You need a valid email address, a secure password, and identity verification.",
  },
];

export default function MoneyTransferLanding() {
  const [openIndex, setOpenIndex] = useState(2); // "Can anyone..." is open by default

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="min-h-screen  text-white font-sans">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Section */}
      <div className="bg-gradient-to-r from-[#02487F] to-[#1384AB] w-full">
        <section className="flex flex-col w-10/12 mx-auto lg:flex-row items-center justify-between py-16 lg:py-1">
          {/* Left Content */}
          <div className="max-w-lg text-left">
            <div className="flex items-center mb-4">
              <div className="bg-white text-[#004876] rounded-full px-4 py-2 font-semibold flex items-center space-x-2">
                <span>Zero Transfer fee for new users!</span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Quick and easy way to send and receive money internationally
            </h1>
            <p className="text-lg mb-6">
              Send funds to loved ones or receive payments from clients abroad
              with minimal fees, in just 5 minutes!
            </p>

            <div className="mt-6 flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 bg-green-500 rounded text-white flex items-center justify-center"
                  >
                    ★
                  </div>
                ))}
                <div className="w-5 h-5 bg-gray-300 rounded text-white flex items-center justify-center">
                  ★
                </div>
              </div>
              <span className="ml-2 text-white text-lg font-semibold">4.3</span>
              <span className="text-white text-sm">Trustpilot</span>
            </div>
          </div>

          {/* Right Panel - Check Rates */}
          <div className=" p-6 mt-12 lg:mt-0 w-full max-w-2xl">
            <img src={heroimg} alt="Finance" />
          </div>
        </section>
      </div>

      <section className="bg-white text-[#004876] py-20 w-10/12 mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Text Content */}
        <div className="max-w-lg mb-10 lg:mb-0">
          <button className="mb-4 px-4 py-2 border border-[#004876] rounded-full text-sm">
            Make Transfer
          </button>
          <h2 className="text-4xl font-bold mb-6">
            Send money to your loved ones
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <span className="mr-2">📹</span>
                <h4 className="text-lg font-semibold">
                  Friends and Acquaintances
                </h4>
              </div>
              <p>
                Baby showers, birthdays, celebrations? Stay involved in the
                lives of your friends no matter the distance
              </p>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <span className="mr-2">🏦</span>
                <h4 className="text-lg font-semibold">
                  Families and Loved ones
                </h4>
              </div>
              <p>
                Allowances, emergencies, fees? We have got you covered. Stay
                connected to your loved ones no matter the distance
              </p>
            </div>
          </div>
        </div>

        {/* Right Image Content */}
        <div className="max-w-xl">
          <img src={img6} alt="" />
        </div>
      </section>

      <section className=" bg-gradient-to-r from-[#02487F] to-[#1384AB] flex flex-col items-center justify-center p-6 text-white">
        <div className="w-10/12 mx-auto flex flex-col md:flex-row items-center gap-20">
          {/* Left side: Image */}
          <div className="w-[50%] flex flex-col sm:flex-row">
            <img
              src={img7}  
              alt="..."
              className="hidden md:block w-full object-cover"
            />
          </div>

          {/* Right side: Text content */}
          <div className="w-full md:w-[50%]">
            <div className="inline-block px-4 py-1 text-sm bg-white text-[#02487F] rounded-full font-semibold mb-4">
              Receive Payments
            </div>
            <h2 className="w-full text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Get paid for your services quickly
            </h2>

            <div className="space-y-6 text-white">
              <div>
                <h3 className="font-bold text-lg">🎬 Creative</h3>
                <p className="text-base text-white/90">
                  Get paid on time for your work at the best possible rates.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg">📦 Freelancer</h3>
                <p className="text-base text-white/90">
                  Get paid hassle-free. No lengthy documentation, no waiting, no
                  exclusions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="w-10/12 mx-auto flex flex-col-reverse md:flex-row items-center gap-20">
          {/* Left content */}
          <div className="w-full md:w-1/2 text-[#02487F]">
            <div className="inline-block px-4 py-1 text-sm bg-[#f1f5f9] text-[#02487F] rounded-full font-semibold mb-4">
              Make Transfer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
              Pay your partners, both home and abroad
            </h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-bold text-lg text-black">
                  💼 Business Partners
                </h3>
                <p className="text-base">
                  Pay for services and meet time-sensitive payment deadlines
                  easily with Ease Bank.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-black">📦 Suppliers</h3>
                <p className="text-base">
                  Pay for your goods easily, meet shipment deadlines, and
                  maintain business relationships with Ease Bank.
                </p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="w-full md:w-1/2 flex justify-center bg-[#E5F6FB] rounded-[2rem] p-5 shadow-lg">
            {/* <div className="w-[350px] h-[500px]  overflow-hidden"> */}
                <img src={img4} alt="" />
            {/* </div> */}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#02487F] to-[#1384AB] w-full">
        <div className="text-white py-12 w-10/12 mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-xl space-y-6">
            <h2 className="text-3xl font-bold">
              All The Reasons To Choose <br />
              <span className="text-cyan-400">Ease Bank</span>
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">24/7 Live Support</h3>
                <p className="text-sm">
                  At Ease Bank, we strive for excellence by providing timely 24/7
                  assistance and ensuring a seamless cross-border transaction
                  experience.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Super-Fast Transfers</h3>
                <p className="text-sm">
                  We prioritise seamless transactions to ensure your funds arrive
                  promptly and reliably.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Regulatory Compliance</h3>
                <p className="text-sm">
                  We are registered with all necessary bodies, including ASIC, and
                  strictly adhere to regulatory compliance for customer safety and
                  convenience.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">100% Safe Transactions</h3>
                <p className="text-sm">
                  We employ bank-grade security to protect your funds throughout
                  the transfer process, ensuring safe and secure delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Right side image placeholder */}
          <div className="w-full md:w-1/2">
            <img className="h-[80vh] hidden md:block" src={financeapp} alt="" />
          </div>
        </div>
      </section>

      <section className="bg-[#F3FAFC] w-full py-12">
        <div className="w-10/12 mx-auto flex gap-10 items-center min-h-screen">
          {/* Left Panel - Instructions */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-[#003366] mb-8">
              How to start transacting in less than 3 minutes
            </h1>
            {[
              {
                number: "01",
                title: "Create an Account",
                description:
                  "Sign up with your email and a secure password either through our app or website.",
              },
              {
                number: "02",
                title: "Verify Your Details",
                description:
                  "Our verification process ensures the authenticity of our users. This takes a few quick minutes.",
              },
              {
                number: "03",
                title: "Start Sending Money",
                description:
                  "Choose a destination, enter the amount, and see the exchange rate and our fees instantly.",
              },
              {
                number: "04",
                title: "Add Beneficiary Details",
                description:
                  "Enter the recipient's information accurately and save it for faster future transactions.",
              },
              {
                number: "05",
                title: "Complete Your Transfer",
                description:
                  "Go to your bank app, select 'pay someone' or 'pay anyone' and follow the prompts to complete your transaction.",
              },
            ].map((step) => (
              <div key={step.number} className="mb-6 flex items-start gap-2">
                <div className="w-10 h-10 flex items-center justify-center bg-[#003366] text-white font-bold rounded-full">
                  {step.number}
                </div>
                <div>
                  <h2 className="text-xl text-black font-semibold">
                    {step.title}
                  </h2>
                  <p className="text-black">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Panel - Static Image */}
          <div className="hidden md:flex w-1/2 items-center justify-center">
            <img
              src={finance1}
              alt="Dashboard Screenshot"
              className="w-full h-[90vh] rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#02487F] to-[#1384AB] py-16 w-full flex flex-col justify-center items-center" id="faq">
        <div className="text-center mb-10">
          <h5 className="text-sm font-semibold text-white uppercase">FAQ</h5>
          <h2 className="text-3xl font-bold text-white mt-1">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3 w-11/12 md:w-3xl">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`rounded-md border border-gray-200 overflow-hidden transition-all duration-300 ${
                openIndex === index ? "bg-blue-50" : "bg-white"
              }`}
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center"
                onClick={() => toggleItem(index)}
              >
                <span className="text-md font-semibold text-gray-800">
                  {item.question}
                </span>
                <span className="text-2xl text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 text-sm">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 py-16 px-4 sm:px-8">
        <div className="text-center mb-10">
          <h5 className="text-sm font-medium text-gray-700">Testimonials</h5>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Don’t take our word, take theirs
          </h2>
        </div>

        <div className="max-w-7xl mx-auto">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="px-3 h-80"
          >
            {testimonials.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white rounded-xl shadow-sm p-6 h-full flex flex-col justify-between">
                  <p className="text-gray-700 text-sm mb-6">{item.text}</p>
                  <div>
                    <p className="font-semibold text-black">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.location}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <footer className="bg-white text-gray-700 text-sm" id="contact us">
        <div className="w-11/12 mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <img src={logo} alt="Ease Bank Logo" className="w-20 h-20" />
            <p className="mb-4">
              Ease Bank allows you to send funds to your loved ones or receive
              payments from clients abroad with minimal fees.
            </p>
            <div className="flex space-x-4 text-[#00315E] text-lg">
              <FaGoogle />
              <FaWhatsapp />
              <FaFacebookF />
              <FaInstagram />
              <FaXTwitter />
              <FaRegComments />
            </div>
          </div>

          {/* Ease Bank Links */}
          <div>
            <h5 className="text-gray-400 font-semibold mb-3">Ease Bank</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Provide Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h5 className="text-gray-400 font-semibold mb-3">Legals</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Money Laundering Statement
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Complaints Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-gray-400 font-semibold mb-3">Contact Us</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:help@Ease Bank.com.au"
                  className="hover:underline"
                >
                  help@Ease Bank.com.au
                </a>
              </li>
              <li>
                <a href="tel:+61482076208" className="hover:underline">
                  +61 482 076 208
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chat with Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-4 py-6 text-center text-sm px-4 sm:px-8">
          <p className="mb-2">
            Ease Bank Transfers, Level 6, 200 Adelaide Street, Brisbane City,
            QLD 4000.
          </p>
          <p className="mb-2">
            Orbuis Group Pty Ltd trading as Ease Bank Transfers is registered
            with Australia Securities and Investment Commission. ABN Number: 17
            651 460 114. Orbuis Group Pty Ltd is registered with AUSTRAC
          </p>
          <p className="text-gray-500">
            ©Ease Bank Platform 2025. Powered By Orbuis Group.
          </p>
        </div>
      </footer>
    </div>
  );
}
