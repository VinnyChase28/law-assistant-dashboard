export function truncateFileName(fileName: string, maxLength = 10) {
  if (fileName.length <= maxLength) {
    return fileName;
  }

  const extension = fileName.substring(fileName.lastIndexOf(".") + 1);
  const name = fileName.substring(0, fileName.lastIndexOf("."));

  if (name.length <= maxLength) {
    return fileName;
  }

  return name.substring(0, maxLength) + "..." + extension;
}
