/* ==========================================================================
   forms.js — accessible client-side validation for <form data-validate>
   - Each .field has an input and a .field__error element (aria-live) for messages.
   - On success: hides the form, shows .form__success with a reference number,
     and keeps a copy in localStorage so the user can see it again.
   - No backend is required (competition build); swap `submit()` for a fetch() later.
   ========================================================================== */
(function () {
  "use strict";

  const RULES = {
    name: { test: (v) => v.trim().length >= 2, msg: "Please enter your full name." },
    usn: { test: (v) => /^1[A-Z]{2}\d{2}[A-Z]{2}\d{3}$/i.test(v.trim()) || v.trim() === "", msg: "USN looks like 1RR23CS001." },
    email: { test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), msg: "Enter a valid email address." },
    phone: { test: (v) => /^(\+91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/\s/g, "")), msg: "Enter a valid 10-digit Indian mobile number." },
    required: { test: (v) => v.trim() !== "", msg: "This field is required." },
    message: { test: (v) => v.trim().length >= 10, msg: "Tell us a little more (10+ characters)." }
  };

  const fieldOf = (input) => input.closest(".field");
  const errorOf = (input) => fieldOf(input) && fieldOf(input).querySelector(".field__error");

  const setError = (input, msg) => {
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    const err = errorOf(input);
    if (err) err.textContent = msg || "";
  };

  const validateInput = (input) => {
    const rule = input.dataset.rule;
    const value = input.type === "checkbox" ? (input.checked ? "x" : "") : input.value;
    if (input.required && !RULES.required.test(value)) { setError(input, RULES.required.msg); return false; }
    if (rule && RULES[rule] && value.trim() !== "" && !RULES[rule].test(value)) { setError(input, RULES[rule].msg); return false; }
    setError(input, "");
    return true;
  };

  const makeRef = (prefix) => {
    const n = Math.floor(1000 + Math.random() * 9000);
    return prefix + "-" + new Date().getFullYear() + "-" + n;
  };

  document.querySelectorAll("form[data-validate]").forEach((form) => {
    form.setAttribute("novalidate", "");
    const inputs = Array.from(form.querySelectorAll("input, select, textarea")).filter((i) => i.type !== "hidden" && i.type !== "checkbox" || i.required);

    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateInput(input));
      input.addEventListener("input", () => { if (input.getAttribute("aria-invalid") === "true") validateInput(input); });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const results = inputs.map(validateInput);
      const firstBad = inputs[results.indexOf(false)];
      if (firstBad) { firstBad.focus(); return; }

      // Collect data
      const data = {};
      new FormData(form).forEach((v, k) => { data[k] = data[k] ? [].concat(data[k], v) : v; });
      const ref = makeRef(form.dataset.refPrefix || "IEEE-RRCE");
      data.reference = ref; data.submittedAt = new Date().toISOString();
      try { localStorage.setItem("ieee-rrce:" + ref, JSON.stringify(data)); } catch (err) { /* private mode */ }

      // Show success state
      const success = form.parentElement.querySelector(".form__success") || document.querySelector(form.dataset.success);
      form.classList.add("is-submitted");
      if (success) {
        const refEl = success.querySelector("[data-ref]"); if (refEl) refEl.textContent = ref;
        const nameEl = success.querySelector("[data-name]"); if (nameEl) nameEl.textContent = (data.name || "").split(" ")[0] || "there";
        success.classList.add("is-visible");
        success.setAttribute("tabindex", "-1"); success.focus();
      }
    });

    // "Submit another" buttons
    const again = form.parentElement.querySelector("[data-reset]");
    if (again) again.addEventListener("click", () => {
      form.reset(); inputs.forEach((i) => setError(i, ""));
      form.classList.remove("is-submitted");
      const success = form.parentElement.querySelector(".form__success");
      if (success) success.classList.remove("is-visible");
      form.querySelector("input, select, textarea").focus();
    });
  });
})();
