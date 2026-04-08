// // app/(main)/contact/page.tsx
// "use client";

// import { useState } from "react";
// import Link from "next/link";

// const BRAND = "#4f0d0d";
// const BRAND_PALE = "#fdf5f5";
// const BRAND_BORDER = "#f0dada";

// const contactInfo = [
//   {
//     icon: (
//       <svg
//         viewBox="0 0 24 24"
//         className="w-5 h-5"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth={1.5}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
//         />
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
//         />
//       </svg>
//     ),
//     label: "Visit Us",
//     value: "LG 01-02, Menara The MET, Mont Kiara, KL",
//     sub: "& 2 other locations",
//     href: "/our-locations",
//   },
//   {
//     icon: (
//       <svg
//         viewBox="0 0 24 24"
//         className="w-5 h-5"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth={1.5}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372
//           c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97
//           1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441
//           .004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125
//           1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
//         />
//       </svg>
//     ),
//     label: "Call Us",
//     value: "+603-7627 1202",
//     sub: "Mon – Sun, 9am – 6pm",
//     href: "tel:+60376271202",
//   },
//   {
//     icon: (
//       <svg
//         viewBox="0 0 24 24"
//         className="w-5 h-5"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth={1.5}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0
//           01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25
//           0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5
//           4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
//         />
//       </svg>
//     ),
//     label: "Email Us",
//     value: "hello@douceur.com.my",
//     sub: "We reply within 24 hours",
//     href: "mailto:hello@douceur.com.my",
//   },
//   {
//     icon: (
//       <svg
//         viewBox="0 0 24 24"
//         className="w-5 h-5"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth={1.5}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3
//           12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483
//           4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402
//           3.445-1.087.81.22 1.668.337 2.555.337z"
//         />
//       </svg>
//     ),
//     label: "Instagram",
//     value: "@douceurpatisserie",
//     sub: "DM us anytime",
//     href: "https://instagram.com/douceurpatisserie",
//   },
// ];

// const topics = [
//   "General Enquiry",
//   "Order Issue",
//   "Bulk / Corporate Order",
//   "Feedback",
//   "Partnership",
//   "Other",
// ];

// export default function ContactPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     topic: "",
//     message: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const update = (field: string, value: string) =>
//     setForm((prev) => ({ ...prev, [field]: value }));

//   const handleSubmit = async () => {
//     if (!form.name || !form.email || !form.message) return;
//     setLoading(true);
//     // Simulate submission
//     await new Promise((res) => setTimeout(res, 1500));
//     setLoading(false);
//     setSubmitted(true);
//   };

//   return (
//     <main
//       className="min-h-screen pt-[60px]"
//       style={{ backgroundColor: BRAND_PALE }}
//     >
//       {/* ── Hero strip ── */}
//       <section
//         className="px-6 py-20 text-center"
//         style={{ backgroundColor: BRAND }}
//       >
//         <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">
//           Douceur Patisserie
//         </p>
//         <h1 className="text-white text-5xl font-light mb-4">Get in Touch</h1>
//         <p className="text-white/60 text-sm max-w-sm mx-auto leading-relaxed">
//           Have a question, feedback, or a special request? We'd love to hear
//           from you.
//         </p>
//       </section>

//       <div className="max-w-5xl mx-auto px-6 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* ── Left: Contact info cards ── */}
//           <div className="space-y-4">
//             <p
//               className="text-xs tracking-[0.3em] uppercase mb-6"
//               style={{ color: `${BRAND}70` }}
//             >
//               Contact Info
//             </p>

//             {contactInfo.map((info) => (
//               <a
//                 key={info.label}
//                 href={info.href}
//                 target={info.href.startsWith("http") ? "_blank" : undefined}
//                 rel="noreferrer"
//                 className="block bg-white rounded-2xl border p-5 transition-all
//                   hover:shadow-md group"
//                 style={{ borderColor: BRAND_BORDER }}
//               >
//                 <div className="flex items-start gap-4">
//                   <div
//                     className="w-10 h-10 rounded-xl flex items-center justify-center
//                     flex-shrink-0 transition-colors group-hover:bg-opacity-20"
//                     style={{
//                       backgroundColor: `${BRAND}10`,
//                       color: BRAND,
//                     }}
//                   >
//                     {info.icon}
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-400 mb-0.5">{info.label}</p>
//                     <p className="text-sm font-medium text-gray-800 mb-0.5">
//                       {info.value}
//                     </p>
//                     <p className="text-xs text-gray-400">{info.sub}</p>
//                   </div>
//                 </div>
//               </a>
//             ))}

//             {/* Operating hours card */}
//             <div
//               className="bg-white rounded-2xl border p-5"
//               style={{ borderColor: BRAND_BORDER }}
//             >
//               <p className="text-xs text-gray-400 mb-3">Operating Hours</p>
//               {[
//                 { day: "Mon – Sun", time: "9am – 6pm" },
//                 { day: "Public Holidays", time: "10am – 5pm" },
//               ].map((h) => (
//                 <div
//                   key={h.day}
//                   className="flex justify-between items-center py-2 border-b last:border-0"
//                   style={{ borderColor: BRAND_BORDER }}
//                 >
//                   <span className="text-sm text-gray-600">{h.day}</span>
//                   <span
//                     className="text-sm font-medium"
//                     style={{ color: BRAND }}
//                   >
//                     {h.time}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── Right: Contact form ── */}
//           <div className="md:col-span-2">
//             <p
//               className="text-xs tracking-[0.3em] uppercase mb-6"
//               style={{ color: `${BRAND}70` }}
//             >
//               Send a Message
//             </p>

//             {submitted ? (
//               /* ── Success state ── */
//               <div
//                 className="bg-white rounded-3xl border p-16 text-center"
//                 style={{ borderColor: BRAND_BORDER }}
//               >
//                 <div
//                   className="w-16 h-16 rounded-full flex items-center justify-center
//                   mx-auto mb-6"
//                   style={{ backgroundColor: `${BRAND}10` }}
//                 >
//                   <svg
//                     viewBox="0 0 24 24"
//                     className="w-8 h-8"
//                     fill="none"
//                     stroke={BRAND}
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                 </div>
//                 <h2
//                   className="text-xl font-semibold mb-2"
//                   style={{ color: BRAND }}
//                 >
//                   Message Sent!
//                 </h2>
//                 <p className="text-gray-400 text-sm mb-8">
//                   Thank you for reaching out. We'll get back to you within 24
//                   hours.
//                 </p>
//                 <button
//                   onClick={() => {
//                     setSubmitted(false);
//                     setForm({
//                       name: "",
//                       email: "",
//                       phone: "",
//                       topic: "",
//                       message: "",
//                     });
//                   }}
//                   className="px-8 py-3 rounded-full text-white text-sm font-medium
//                     transition-opacity hover:opacity-90"
//                   style={{ backgroundColor: BRAND }}
//                 >
//                   Send Another Message
//                 </button>
//               </div>
//             ) : (
//               /* ── Form ── */
//               <div
//                 className="bg-white rounded-3xl border p-8"
//                 style={{ borderColor: BRAND_BORDER }}
//               >
//                 {/* Name + Email */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1.5 block">
//                       Full Name <span style={{ color: BRAND }}>*</span>
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Joyce Kang"
//                       value={form.name}
//                       onChange={(e) => update("name", e.target.value)}
//                       className="w-full border rounded-xl px-4 py-3 text-sm outline-none
//                         transition-all"
//                       style={{ borderColor: "#e5e7eb" }}
//                       onFocus={(e) => (e.target.style.borderColor = BRAND)}
//                       onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1.5 block">
//                       Email Address <span style={{ color: BRAND }}>*</span>
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="hello@email.com"
//                       value={form.email}
//                       onChange={(e) => update("email", e.target.value)}
//                       className="w-full border rounded-xl px-4 py-3 text-sm outline-none
//                         transition-all"
//                       style={{ borderColor: "#e5e7eb" }}
//                       onFocus={(e) => (e.target.style.borderColor = BRAND)}
//                       onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
//                     />
//                   </div>
//                 </div>

//                 {/* Phone + Topic */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1.5 block">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       placeholder="+60 12-345 6789"
//                       value={form.phone}
//                       onChange={(e) => update("phone", e.target.value)}
//                       className="w-full border rounded-xl px-4 py-3 text-sm outline-none
//                         transition-all"
//                       style={{ borderColor: "#e5e7eb" }}
//                       onFocus={(e) => (e.target.style.borderColor = BRAND)}
//                       onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1.5 block">
//                       Topic
//                     </label>
//                     <select
//                       value={form.topic}
//                       onChange={(e) => update("topic", e.target.value)}
//                       className="w-full border rounded-xl px-4 py-3 text-sm outline-none
//                         transition-all bg-white text-gray-700"
//                       style={{ borderColor: "#e5e7eb" }}
//                       onFocus={(e) => (e.target.style.borderColor = BRAND)}
//                       onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
//                     >
//                       <option value="">Select a topic</option>
//                       {topics.map((t) => (
//                         <option key={t} value={t}>
//                           {t}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Message */}
//                 <div className="mb-6">
//                   <label className="text-xs text-gray-500 mb-1.5 block">
//                     Message <span style={{ color: BRAND }}>*</span>
//                   </label>
//                   <textarea
//                     rows={5}
//                     placeholder="Tell us how we can help..."
//                     value={form.message}
//                     onChange={(e) => update("message", e.target.value)}
//                     className="w-full border rounded-xl px-4 py-3 text-sm outline-none
//                       transition-all resize-none"
//                     style={{ borderColor: "#e5e7eb" }}
//                     onFocus={(e) => (e.target.style.borderColor = BRAND)}
//                     onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
//                   />
//                 </div>

//                 {/* Submit */}
//                 <button
//                   onClick={handleSubmit}
//                   disabled={
//                     loading || !form.name || !form.email || !form.message
//                   }
//                   className="w-full py-4 rounded-2xl text-white font-semibold text-sm
//                     tracking-wide transition-all hover:opacity-90 disabled:opacity-50
//                     disabled:cursor-not-allowed"
//                   style={{ backgroundColor: BRAND }}
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <span
//                         className="w-4 h-4 border-2 border-white/30 border-t-white
//                         rounded-full animate-spin"
//                       />
//                       Sending...
//                     </span>
//                   ) : (
//                     "Send Message"
//                   )}
//                 </button>

//                 <p className="text-xs text-gray-400 text-center mt-4">
//                   Fields marked with <span style={{ color: BRAND }}>*</span> are
//                   required.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── Bottom CTA ── */}
//         <div
//           className="mt-12 rounded-3xl p-10 flex flex-col md:flex-row
//           items-center justify-between gap-6"
//           style={{ backgroundColor: BRAND }}
//         >
//           <div>
//             <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-2">
//               Planning something big?
//             </p>
//             <h3 className="text-white text-xl font-semibold mb-1">
//               Bulk & Corporate Orders
//             </h3>
//             <p className="text-white/60 text-sm">
//               Gifting, events, or office parties — we've got you covered.
//             </p>
//           </div>
//           <Link
//             href="/our-locations"
//             className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5
//               rounded-full text-sm font-semibold tracking-wide bg-white
//               transition-all hover:gap-3"
//             style={{ color: BRAND }}
//           >
//             View Locations
//             <svg
//               viewBox="0 0 24 24"
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//               />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }

// app/(main)/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormValidation, VALIDATION } from "@/lib/use-form-validation";
import ErrorMessage from "../../components/ui/ErrorMessage";

const BRAND = "#4f0d0d";
const BRAND_PALE = "#fdf5f5";
const BRAND_BORDER = "#f0dada";

const contactInfo = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
    label: "Visit Us",
    value: "LG 01-02, Menara The MET, Mont Kiara, KL",
    sub: "& 2 other locations",
    href: "/our-locations",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372
          c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97
          1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441
          .004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125
          1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
    label: "Call Us",
    value: "+603-7627 1202",
    sub: "Mon – Sun, 9am – 6pm",
    href: "tel:+60376271202",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0
          01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25
          0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5
          4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
    label: "Email Us",
    value: "hello@douceur.com.my",
    sub: "We reply within 24 hours",
    href: "mailto:hello@douceur.com.my",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3
          12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483
          4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402
          3.445-1.087.81.22 1.668.337 2.555.337z"
        />
      </svg>
    ),
    label: "Instagram",
    value: "@douceurpatisserie",
    sub: "DM us anytime",
    href: "https://instagram.com/douceurpatisserie",
  },
];

const topics = [
  "General Enquiry",
  "Order Issue",
  "Bulk / Corporate Order",
  "Feedback",
  "Partnership",
  "Other",
];

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { errors, validate, clearError } = useFormValidation<ContactForm>({
    name: VALIDATION.name,
    email: VALIDATION.email,
    phone: VALIDATION.phone, // optional but validated if filled
    message: VALIDATION.message,
  });

  const update = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const handleSubmit = async () => {
    if (!validate(form)) return;
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const fieldClass = (field: keyof ContactForm) =>
    `w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all text-gray-800 placeholder:text-gray-400 ${
      errors[field] ? "border-red-300 bg-red-50" : "border-gray-200"
    }`;

  return (
    <main
      className="min-h-screen pt-[60px]"
      style={{ backgroundColor: BRAND_PALE }}
    >
      {/* ── Hero ── */}
      <section
        className="px-6 py-20 text-center"
        style={{ backgroundColor: BRAND }}
      >
        <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-3">
          Douceur Patisserie
        </p>
        <h1 className="text-white text-5xl font-light mb-4">Get in Touch</h1>
        <p className="text-white/60 text-sm max-w-sm mx-auto leading-relaxed">
          Have a question, feedback, or a special request? We'd love to hear
          from you.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ── Contact info ── */}
          <div className="space-y-4">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: `${BRAND}70` }}
            >
              Contact Info
            </p>
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="block bg-white rounded-2xl border p-5 transition-all
                  hover:shadow-md group"
                style={{ borderColor: BRAND_BORDER }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center
                    flex-shrink-0"
                    style={{ backgroundColor: `${BRAND}10`, color: BRAND }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{info.label}</p>
                    <p className="text-sm font-medium text-gray-800 mb-0.5">
                      {info.value}
                    </p>
                    <p className="text-xs text-gray-400">{info.sub}</p>
                  </div>
                </div>
              </a>
            ))}

            {/* Hours */}
            <div
              className="bg-white rounded-2xl border p-5"
              style={{ borderColor: BRAND_BORDER }}
            >
              <p className="text-xs text-gray-400 mb-3">Operating Hours</p>
              {[
                { day: "Mon – Sun", time: "9am – 6pm" },
                { day: "Public Holidays", time: "10am – 5pm" },
              ].map((h) => (
                <div
                  key={h.day}
                  className="flex justify-between items-center py-2
                  border-b last:border-0"
                  style={{ borderColor: BRAND_BORDER }}
                >
                  <span className="text-sm text-gray-600">{h.day}</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: BRAND }}
                  >
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Form ── */}
          <div className="md:col-span-2">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: `${BRAND}70` }}
            >
              Send a Message
            </p>

            {submitted ? (
              <div
                className="bg-white rounded-3xl border p-16 text-center"
                style={{ borderColor: BRAND_BORDER }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center
                  mx-auto mb-6"
                  style={{ backgroundColor: `${BRAND}10` }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8"
                    fill="none"
                    stroke={BRAND}
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2
                  className="text-xl font-semibold mb-2"
                  style={{ color: BRAND }}
                >
                  Message Sent!
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      topic: "",
                      message: "",
                    });
                  }}
                  className="px-8 py-3 rounded-full text-white text-sm font-medium
                    transition-opacity hover:opacity-90"
                  style={{ backgroundColor: BRAND }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div
                className="bg-white rounded-3xl border p-8"
                style={{ borderColor: BRAND_BORDER }}
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 block">
                      Full Name <span style={{ color: BRAND }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Joyce Kang"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={fieldClass("name")}
                      onFocus={(e) =>
                        !errors.name && (e.target.style.borderColor = BRAND)
                      }
                      onBlur={(e) =>
                        !errors.name && (e.target.style.borderColor = "#e5e7eb")
                      }
                    />
                    <ErrorMessage message={errors.name} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 block">
                      Email Address <span style={{ color: BRAND }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={fieldClass("email")}
                      onFocus={(e) =>
                        !errors.email && (e.target.style.borderColor = BRAND)
                      }
                      onBlur={(e) =>
                        !errors.email &&
                        (e.target.style.borderColor = "#e5e7eb")
                      }
                    />
                    <ErrorMessage message={errors.email} />
                  </div>
                </div>

                {/* Phone + Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 block">
                      Phone Number
                      <span className="text-gray-300 ml-1">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+60123456789"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={fieldClass("phone")}
                      onFocus={(e) =>
                        !errors.phone && (e.target.style.borderColor = BRAND)
                      }
                      onBlur={(e) =>
                        !errors.phone &&
                        (e.target.style.borderColor = "#e5e7eb")
                      }
                    />
                    <ErrorMessage message={errors.phone} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 block">
                      Topic
                    </label>
                    <select
                      value={form.topic}
                      onChange={(e) => update("topic", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                        outline-none transition-all bg-white text-gray-700"
                      onFocus={(e) => (e.target.style.borderColor = BRAND)}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    >
                      <option value="">Select a topic</option>
                      {topics.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="text-xs text-gray-500 mb-1.5 block">
                    Message <span style={{ color: BRAND }}>*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={`${fieldClass("message")} resize-none`}
                    onFocus={(e) =>
                      !errors.message && (e.target.style.borderColor = BRAND)
                    }
                    onBlur={(e) =>
                      !errors.message &&
                      (e.target.style.borderColor = "#e5e7eb")
                    }
                  />
                  <ErrorMessage message={errors.message} />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 rounded-2xl text-white font-semibold text-sm
                    tracking-wide transition-all hover:opacity-90 disabled:opacity-60
                    disabled:cursor-not-allowed"
                  style={{ backgroundColor: BRAND }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span
                        className="w-4 h-4 border-2 border-white/30 border-t-white
                        rounded-full animate-spin"
                      />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center mt-4">
                  Fields marked with <span style={{ color: BRAND }}>*</span> are
                  required.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-12 rounded-3xl p-10 flex flex-col md:flex-row
          items-center justify-between gap-6"
          style={{ backgroundColor: BRAND }}
        >
          <div>
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-2">
              Planning something big?
            </p>
            <h3 className="text-white text-xl font-semibold mb-1">
              Bulk & Corporate Orders
            </h3>
            <p className="text-white/60 text-sm">
              Gifting, events, or office parties — we've got you covered.
            </p>
          </div>
          <Link
            href="/our-locations"
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5
              rounded-full text-sm font-semibold tracking-wide bg-white
              transition-all hover:gap-3"
            style={{ color: BRAND }}
          >
            View Locations
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
