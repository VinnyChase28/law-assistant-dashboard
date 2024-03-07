export const css = `
@page {
  margin: 1in; /* Set page margins to 1 inch on all sides */
}

* {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  font-size: 0.75em; /* Adjusted to 12pt for better readability */
  color: #111;
  margin: 0;
  padding: 0.5in; /* Add padding to ensure content is inset within the defined margins */
}

h1, h2, h3, h4, h5, h6 {
  margin: 0.5em 0;
  padding: 0;
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.75em;
}

h3 {
  font-size: 1.5em;
}

h4 {
  font-size: 1.25em;
}

h5 {
  font-size: 1em;
}

h6 {
  font-size: 0.875em;
  text-transform: uppercase;
}

p {
  margin: 0.25em 0 1em;
}

blockquote {
  margin: 0.5em 0 1em;
  padding-left: 0.5em;
  padding-right: 1em;
  border-left: 4px solid #ddd; /* Soften color for better aesthetics */
  font-style: italic;
  background-color: #f9f9f9; /* Add a subtle background to distinguish from the main content */
}

ul, ol {
  margin: 0;
  margin-left: 1em;
  padding: 0 1.5em 0.5em;
}

pre {
  white-space: pre-wrap;
  background-color: #f5f5f5; /* Lighter background for code blocks */
  border: 1px solid #ddd;
  padding: 0.5em;
  overflow: auto; /* Ensure large code blocks are scrollable */
}

code {
  background-color: #f8f8f8;
  padding: 0.1em 0.375em;
  border: 1px solid #eee;
  border-radius: 0.25em;
  font-family: monospace;
  font-size: 0.9em; /* Slightly reduce font size for inline code for better flow */
}

.page-break {
  page-break-after: always;
}

img {
  max-width: 100%;
  margin: 1em 0;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0 0 1em;
  width: 100%;
  overflow: auto;
}

table th, table td {
  padding: 0.5em 1em;
  border: 1px solid #ddd; /* Lighter border for a cleaner look */
}

table th {
  background-color: #f9f9f9; /* Subtle background for headers */
  font-weight: 600;
}

table tr:nth-child(2n) {
  background-color: #f9f9f9; /* Alternating row background for better readability */
}
`;
