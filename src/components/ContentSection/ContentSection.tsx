import React, { useState } from "react";
import { marked } from "marked";

const applyTailwindClasses = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  // Define Tailwind classes for each element type
  const classes = {
    h1: "text-3xl text-gray-800 font-bold mb-4",
    h2: "text-2xl text-gray-700 font-semibold mb-3",
    h3: "text-xl text-gray-600 font-medium mb-2",
    h4: "text-lg text-gray-500 font-medium mb-2",
    h5: "text-base text-gray-400 font-medium mb-1",
    h6: "text-sm text-gray-300 font-medium mb-1",
    p: "text-base leading-relaxed text-gray-700 mb-3",
    li: "text-gray-600 mb-1",
    ol: "list-decimal pl-5 mb-3",
    ul: "list-disc pl-5 mb-3",
  };

  // Apply Tailwind classes to each element type
  Object.keys(classes).forEach((tag) => {
    const elements = doc.querySelectorAll(tag);
    elements.forEach((el) => {
      el.className = classes[tag]; // This will replace existing classes if any
    });
  });

  return doc.body.innerHTML;
};

const ContentSection = ({ highlightedElement }) => {
  const markdownContent = `
  # Chicken Tomato Stir-Fry  
    
  **Description:**  
  A savory stir-fry featuring juicy chicken and a tangy tomato-based sauce.  
    
  **Ingredients:**  
  - 2 chicken breasts, cut into strips  
  - 2 tomatoes, diced  
  - 1 onion, sliced  
  - 3 cloves garlic, minced  
  - 2 tbsp olive oil  
  - 1 tsp soy sauce  
  - 1 tsp sugar  
  - Salt and pepper, to taste  
    
  **Instructions:**  
  1. Heat olive oil in a skillet over medium-high heat. Sauté garlic until fragrant.  
  2. Add chicken strips and cook until golden brown.  
  3. Stir in onions and tomatoes, cooking until softened.  
  4. Add soy sauce, sugar, salt, and pepper, stirring to combine.  
  5. Serve hot over rice or noodles.  
    
  **Notes:**  
  - Add chili flakes for extra heat.  
  - Use canned tomatoes if fresh ones are unavailable.  
  `;

  const highlightElement = (html, elementToHighlight) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Example: Highlighting the Ingredients section
    if (elementToHighlight === "ingredients") {
      const ingredients =
        doc.querySelector("h3, h4, h5, h6").nextElementSibling;
      if (ingredients && ingredients.nodeName === "UL") {
        ingredients.style.backgroundColor = "#FFFF00"; // neon yellow
        ingredients.style.padding = "10px";
      }
    }
    // You can add more conditions here for other sections or specific elements

    return doc.body.innerHTML;
  };

  marked.use({
    gfm: true,
    breaks: true,
  });
  const htmlContent = marked.parse(markdownContent);
  console.log(htmlContent);
  // const highlightedHtml = highlightElement(htmlContent, highlightedElement);
  const styledHtml = applyTailwindClasses(htmlContent);

  return (
    <div className="content-section">
      <div className="">
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: styledHtml }}
        />
      </div>
    </div>
  );
};

export default ContentSection;
