// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import type { PrivateBook } from "@/Types/PrivateBook";

// type ModalSelectProps = {
//   formData: PrivateBook;
//   setFormData: React.Dispatch<React.SetStateAction<PrivateBook>>;
// }

// const ModalSelect = ({ formData, setFormData }: ModalSelectProps) => {
//   function handleSelectChange(value) {
//     setFormData((prev) => {
//       return {
//         ...prev,
//         status: value,
//       };
//     });
//   }
//   return (
//     <div className="flex-grow">
//       <Select
//         id="status"
//         onValueChange={(value) => handleSelectChange(value)}
//         value={formData.status}
//         defaultValue={formData.status}
//         className="w-full"
//       >
//         <SelectTrigger>
//           <SelectValue placeholder="Read" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="reading">Reading</SelectItem>
//           <SelectItem value="want_to_read">Want to read</SelectItem>
//           <SelectItem value="read">Read</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };

// export default ModalSelect;
