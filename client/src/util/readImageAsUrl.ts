const handleImgChange = (e: React.ChangeEvent<HTMLInputElement | null>): string => {
  const file = e.target.files && e.target.files[0];
  if (file) {
    const reader = new FileReader();
    let result = "";
    reader.onload = () => {
      if (typeof reader.result === "string") {
        result = reader.result;
      }
    };
    reader.readAsDataURL(file);
    return result;
  }
  return "";
};

export default handleImgChange;