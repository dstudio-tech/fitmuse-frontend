"use client";
import React, { useContext, useState } from "react";
import { BackendUrlContext } from "@/components/SessionProvider";
import { toast } from "react-toastify";

export default function ContactForm() {
  const backendUrl = useContext(BackendUrlContext);

  const intialState = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    validate: "",
  };

  const [text, setText] = useState(intialState);

  const handleTextChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value, validate: "" });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // simple form validation
    if (
      text.name === "" ||
      text.email === "" ||
      text.subject === "" ||
      text.message === ""
    ) {
      toast("A few details from you, a whole lot of attention from us.");
      return;
    }

    // POST request sent
    try {
      const response = await fetch(`${backendUrl}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            name: text.name,
            email: text.email,
            subject: text.subject,
            message: text.message,
          },
        }),
      });

      setText({ ...text, validate: "loading" });

      const result = await response.json();
      if (result) {
        setText(intialState);
        toast("Message received — we'll be sliding into your inbox soon.");
      } else {
        setText({ ...text, validate: "error" });
        toast("Hmm… looks like something slipped. Try again, gorgeous.");
      }
    } catch (error) {
      setText({ ...text, validate: "error" });
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="contact-form">
      <div className="mb-3">
        <label htmlFor="contactName" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Enter your full name"
          value={text.name}
          onChange={handleTextChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="contactEmail" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Enter your email address"
          value={text.email}
          onChange={handleTextChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="contactSubject" className="form-label">
          Subject
        </label>
        <input
          type="text"
          className="form-control"
          name="subject"
          placeholder="Enter message subject"
          value={text.subject}
          onChange={handleTextChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="contactMessage" className="form-label">
          Your Message
        </label>
        <textarea
          className="form-control message-textarea"
          name="message"
          rows={5}
          placeholder="Enter your message"
          value={text.message}
          onChange={handleTextChange}
        ></textarea>
      </div>
      <button type="submit" className="submit-btn">
        <span>Send Message</span>
        <i className="bi bi-arrow-right"></i>
      </button>
    </form>
  );
}
