import React, { useState } from 'react';
import './HelpCenter.css';

const faqData = [
  {
    question: 'How do I submit a ticket?',
    answer: 'Go to the Ticket Submission page, fill in the required details, and click submit.',
  },
  {
    question: 'How can I track my ticket status?',
    answer: 'Navigate to the "My Tickets" page to see your submitted tickets and their current status.',
  },
  {
    question: 'What types of issues can I report?',
    answer: 'You can report bugs, request features, or ask general queries.',
  },
  {
    question: 'How long does it take to resolve a ticket?',
    answer: 'Resolution time depends on the issue type and priority, but most are handled within 48 hours.',
  },
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="help-center-container">
      <h2 className="help-title">❓ Help Center</h2>
      <p className="help-subtitle">Find answers to common questions and learn how to get the most out of the system.</p>

      <div className="faq-section">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
