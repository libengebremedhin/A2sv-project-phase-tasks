import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import "./ContactForm.css";

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<IFormInput>({
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    alert("Message sent!");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Contact Us</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        {...register("name", { required: "Name is required" })}
        placeholder="Your name"
      />
      {errors.name && <p className="error">{errors.name.message}</p>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        })}
        placeholder="you@example.com"
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        {...register("message", { required: "Message is required" })}
        placeholder="Your message"
      />
      {errors.message && <p className="error">{errors.message.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {isSubmitSuccessful && (
        <p className="success">Thank you for your message!</p>
      )}
    </form>
  );
}
