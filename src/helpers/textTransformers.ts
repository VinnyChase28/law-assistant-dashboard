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

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}