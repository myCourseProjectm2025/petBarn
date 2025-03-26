import { Input } from "antd";
const ContactUs: React.FC = () => {
  const phoneNumber = "+962791329474";
  const email = "omaribrahim.dev@Gmail.com";
  return (
    <div>
      <br />
      <h1>Contact Us</h1>
      <br />
      <h4>Get In Touch</h4>
      <br />
      <div>
        <p>
          You can email us at{" "}
          <a href={`E-mail:${email}`} className="text-blue-500 underline">
            {email}
          </a>
        </p>
      </div>
      <div>
        <p>
          Call us on{" "}
          <a href={`tel:${phoneNumber}`} className="text-blue-500 underline">
            {phoneNumber}
          </a>
        </p>
        <br />
        <p>
          Business Hours:
          <br />
          <br />
          Saturday - Thursday: 10:00am - 8:30pm Amman time.
        </p>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center p-6 md:p-8 w-full">
        <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
          <span>
            <h4>Your name:</h4>
            <Input
              name="name"
              className="py-4 min-h-12 max-w-[100vw]"
              placeholder="Your Name"
              required
            ></Input>
            <h4>Your email:</h4>
            <Input className="w-1/2 pl-6 " required></Input>
          </span>
          <span>
            <h4>Enquiry:</h4>
            <Input></Input>
            <br />
          </span>
          <button>send your Report</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
