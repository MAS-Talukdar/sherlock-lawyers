      // --- Global Variables and Setup ---
      const customCursor = document.getElementById("custom-cursor");
      const fullSiteMorphWrapper = document.getElementById(
        "full-site-morph-wrapper"
      );
      const initialModal = document.getElementById("initial-modal");
      const interactiveElements =
        "a, button, input, textarea, select, [onclick]"; // Elements that trigger the hover state

      // --- 1. Custom Cursor Logic ---
      document.addEventListener("mousemove", (e) => {
        customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      });

      document.addEventListener("mouseover", (e) => {
        let target = e.target;
        if (
          target.matches(interactiveElements) ||
          target.closest(interactiveElements)
        ) {
          customCursor.classList.add("cursor-hover");
        }
      });

      document.addEventListener("mouseout", (e) => {
        let target = e.target;
        if (
          target.matches(interactiveElements) ||
          target.closest(interactiveElements)
        ) {
          customCursor.classList.remove("cursor-hover");
        }
      });

      // --- 2. Initial Modal Logic ---
      window.onload = function () {
        // Restore opacity-0 and pointer-events-none classes which were removed for initial visibility in the original prompt
        // Now we add them back to ensure the modal disappears after entry.
        initialModal.classList.remove("opacity-0", "pointer-events-none");
        document.body.style.overflow = "hidden";

        const homeLink = document.querySelector(
          '.nav-link[onclick*="home-section"]'
        );
        if (homeLink) {
          // Ensure initial active state is applied after load
          homeLink.classList.add("bg-gray-100", "text-[#A37A00]");
        }

        // Check if the device is a touch device and hide the custom cursor if it is
        if ("ontouchstart" in window || navigator.maxTouchPoints) {
          customCursor.style.display = "none";
          document.body.style.cursor = "default"; // Restore default cursor
        }
      };

      function closeModal() {
        initialModal.classList.add("opacity-0");
        initialModal.querySelector("div:last-child").classList.add("scale-90");

        setTimeout(() => {
          initialModal.classList.add("hidden", "pointer-events-none");
          document.body.style.overflow = ""; // Re-enable scrolling
        }, 500);
      }

      // --- 3. Dynamic Page Navigation with Full Site Morph Transition ---
      function changePage(pageId, event) {
        if (event) event.preventDefault(); // Stop link from jumping

        const targetSection = document.getElementById(pageId);
        const allSections = document.querySelectorAll(".page-section");

        // Check if the target section is already visible to prevent unnecessary morphing
        if (targetSection && targetSection.classList.contains("hidden")) {
          // 1. Start "Morph Out" (Fade and Shrink) transition on the full content wrapper
          fullSiteMorphWrapper.classList.remove("opacity-100", "scale-100");
          fullSiteMorphWrapper.classList.add("opacity-0", "scale-95");

          // Wait for the transition out to complete (300ms)
          setTimeout(() => {
            // 2. Change content (hide old, show new)
            allSections.forEach((section) => {
              section.classList.add("hidden");
            });
            targetSection.classList.remove("hidden");

            // 3. Start "Morph In" (Fade and Expand) transition on the full content wrapper
            fullSiteMorphWrapper.classList.remove("opacity-0", "scale-95");
            fullSiteMorphWrapper.classList.add("opacity-100", "scale-100");

            // Scroll to the top of the dynamic content container (below the header)
            const dynamicContentContainer = document.getElementById(
              "dynamic-content-container"
            );
            // Scroll to the content area itself, which is right below the header
            window.scrollTo({
              top: dynamicContentContainer.offsetTop - 30,
              behavior: "smooth",
            });
          }, 300);

          // Update active navigation link
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("bg-gray-100", "text-[#A37A00]");
          });

          let activeLink = document.querySelector(
            `.nav-link[onclick*="${pageId}"]`
          );

          if (activeLink) {
            activeLink.classList.add("bg-gray-100", "text-[#A37A00]");
          }
        }
      }

      // --- 4. Form Submission Handler ---
      function handleAppointmentSubmit(event) {
        event.preventDefault(); // Prevent actual form submission
        const form = document.getElementById("appointment-form");
        const message = document.getElementById("appointment-message");
        const submitButton = document.getElementById("submit-button");

        // Simulate form submission success
        message.classList.remove("hidden");
        form.reset(); // Clear the form

        // Optionally hide the success message after a few seconds
        setTimeout(() => {
          message.classList.add("hidden");
        }, 5000);
      }