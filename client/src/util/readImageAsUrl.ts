const handleImgChange = (e: React.ChangeEvent<HTMLInputElement | null>): Promise<string> => {
  return new Promise((resolve, reject) => {
    const file = e?.target?.files?.[0];
    if (!file) {
      return reject("No file selected");
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("Invalid file result");
      }
    };

    reader.onerror = () => {
      reject("Error reading file");
    };

    reader.readAsDataURL(file);
  });
};

export default handleImgChange;
