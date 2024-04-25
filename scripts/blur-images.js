const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Define the directory containing the images
const imagesDir = path.join("public", "images");

// Function to create a blurred version of an image
const blurImage = async (filePath) => {
  const outputPath = path.join(
    path.dirname(filePath),
    `${path.basename(filePath, path.extname(filePath))}-blurred${path.extname(filePath)}`,
  );

  // Check if the blurred image already exists
  if (!fs.existsSync(outputPath)) {
    try {
      await sharp(filePath)
        .blur(10) // Adjust the blur intensity as needed
        .toFile(outputPath);
      console.log(`Blurred image created: ${outputPath}`);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  } else {
    console.log(`Blurred image already exists: ${outputPath}`);
  }
};

// Read the images directory and apply blur to each image
fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error("Error reading the images directory:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(imagesDir, file);
    // Filter files to process only images and skip already blurred images
    if (/\.(jpg|jpeg|png|gif)$/i.test(file) && !/-blurred\./i.test(file)) {
      blurImage(filePath);
    }
  });
});

console.log(`Processing all images in ${imagesDir}`);
