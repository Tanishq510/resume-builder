export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "How do I use a resume builder for free?",
    answer:
      "Open the tool, fill in your personal details, work experience, education, skills, and projects — or upload an existing resume to prefill those sections automatically. Reorder sections if you need to, pick a template, and check the live preview as you go. When you're happy with the result, click Download PDF. Every step is free, with no account or payment required.",
  },
  {
    question: "What should you put on a resume?",
    answer:
      "At minimum: your contact information, a short professional summary, your work experience (with measurable achievements, not just a list of duties), your education, and a list of relevant skills. Many candidates also add a projects section to showcase specific work, especially early in their career or when changing fields. Keep the formatting simple — single-column, standard headings — so both a recruiter and an ATS can read it easily.",
  },
  {
    question:
      "What skills should you put on a resume? And how do you list skills on a resume?",
    answer:
      "List the skills that match what's mentioned in the job description, using the same exact wording the employer uses — ATS software often matches on precise keywords, not synonyms. Mix technical or role-specific skills (tools, software, languages) with a few genuinely relevant soft skills, and keep the list scannable: short, comma-separated entries work better than a paragraph. Avoid padding the list with skills you can't back up in an interview.",
  },
  {
    question: "What is the best layout for a resume?",
    answer:
      "For most applications — especially anywhere your resume might pass through an ATS — a single-column layout with standard section headings (Experience, Education, Skills) is the safest choice. Avoid multi-column layouts, tables, text boxes, graphics, or icons; they can look great to a human but often get scrambled or dropped by parsing software. Every template in this tool — modern, classic, minimal, and compact — follows that single-column, ATS-safe structure; they only differ in typography and spacing, not layout risk.",
  },
  {
    question: "What is the difference between a CV and a resume?",
    answer:
      "A resume is typically a concise, one-to-two-page summary of your relevant work experience, tailored to a specific job — the format this tool is built for. A CV (curriculum vitae) is usually longer and more comprehensive, commonly used in academic, research, or medical fields, and includes things like publications, presentations, and full teaching or research history. In the US and Canada, \"resume\" and \"CV\" are often used interchangeably for job applications, while in the UK, Europe, and elsewhere, \"CV\" is the standard term even for a short job-application document.",
  },
  {
    question: "Should I make a different resume for every job application?",
    answer:
      "Yes, ideally. Tailoring your resume for each role — adjusting the summary, reordering sections, and swapping in skills and bullet points that match the specific job description — meaningfully improves how well it matches what both the ATS and the recruiter are looking for. Editing here takes a couple of minutes, so it's worth downloading a fresh, tailored PDF for each application rather than sending the same generic version everywhere.",
  },
  {
    question:
      "Do I need to create an account to use this free resume builder?",
    answer:
      "No account, email, or password is required. Open the page, fill in your details — or upload an existing resume — and download the PDF. The entire workflow works without signing up.",
  },
  {
    question: "Does this website sell my data to third parties?",
    answer:
      "No. This tool doesn't collect accounts, run tracking analytics, or sell your resume data to anyone — there's no backend server involved at all. Building your resume, uploading an existing one to prefill fields, and generating the final PDF all happen entirely in your browser, so there's nothing to sell in the first place.",
  },
  {
    question: "Is my resume data stored securely, and where?",
    answer:
      "Your resume data is saved only in your browser's local storage, on your own device — never on a server. It stays private to you and persists between visits on that browser, but it won't sync across devices, and clearing your browser's site data will remove it.",
  },
  {
    question: "How do I create a resume from LinkedIn?",
    answer:
      "Export your LinkedIn profile as a PDF, then use the upload feature on this page to import it. Your name, contact details, work history, education, and skills are extracted automatically into editable fields.",
  },
  {
    question: "Does this resume builder use AI?",
    answer:
      "No — this tool intentionally skips AI-generated bullet points. It focuses on structure and ATS compatibility, so the words on your resume stay entirely yours; you write the content, and the tool handles the formatting.",
  },
];
