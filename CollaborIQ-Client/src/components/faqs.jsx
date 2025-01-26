const Faqs = () => {
  return (
    <section className="my-16">
      <div className="container mx-auto p-5">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          <div className="collapse collapse-arrow bg-white dark:bg-neutral-800">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium text-gray-900 dark:text-gray-100">
              How does CollaborIQ work?
            </div>
            <div className="collapse-content text-gray-600 dark:text-gray-300">
              <p>
                CollaborIQ is a collaborative platform that allows users to
                create, submit, and evaluate assignments in an engaging and
                interactive way. Simply sign up, create an assignment, and share
                it with peers for collaboration.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-white dark:bg-neutral-800">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium text-gray-900 dark:text-gray-100">
              Is CollaborIQ free to use?
            </div>
            <div className="collapse-content text-gray-600 dark:text-gray-300">
              <p>
                Yes, CollaborIQ is free to use for creating and submitting
                assignments. However, premium features such as advanced
                analytics and team management tools may have associated costs.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-white dark:bg-neutral-800">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium text-gray-900 dark:text-gray-100">
              Can I collaborate with my peers?
            </div>
            <div className="collapse-content text-gray-600 dark:text-gray-300">
              <p>
                Absolutely! CollaborIQ is designed for collaboration. Share
                assignments with peers, review submissions, and provide feedback
                to enhance the learning experience.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-white dark:bg-neutral-800">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium text-gray-900 dark:text-gray-100">
              What kind of assignments can I create?
            </div>
            <div className="collapse-content text-gray-600 dark:text-gray-300">
              <p>
                You can create a variety of assignments, including academic
                tasks, skill-building exercises, and team projects. The platform
                supports multimedia resources, deadlines, and grading options.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-white dark:bg-neutral-800">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium text-gray-900 dark:text-gray-100">
              How do I get support if I have questions?
            </div>
            <div className="collapse-content text-gray-600 dark:text-gray-300">
              <p>
                Our support team is available 24/7. You can reach us through the
                chat feature on the platform or send an email to
                support@collaboriq.com. We’re here to help!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
