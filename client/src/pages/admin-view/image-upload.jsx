// import { Input } from '@/components/ui/input';
// import { Label } from '@radix-ui/react-label'
// import { UploadCloud } from 'lucide-react';
// import React, { useRef } from 'react'

// export default function ProductsImageUpload({imageFile,setImageFile,uploadedImageUrl,setUploadedImageUrl}) {
//     const inputRef=useRef(null);
//     function handleImageFileChange(event){
//         console.log(event.target.files);
//         const selectedFile=event.target.files?.[0];
//         if(selectedFile){
//             setImageFile(selectedFile)
//         }
//     }
//   return (
//     <div className='w-full max-w-md mx-auto mt-4'>
//       <Label className='text-lg font-semibold mb-2 block '>Upload Image</Label>
// <div className='border-2 border-dashed rounded-lg p-4'>
//     <Input id="image-upload" type="file"
//     //  className="hidden"
//       ref={inputRef} onChange={handleImageFileChange}></Input>

      
//  {!imageFile && (
//                     <Label
//                         htmlFor='image-upload'
//                         className='flex flex-col items-center justify-center h-32 cursor-pointer'
//                     >
//                         <UploadCloud className='w-10 h-10 text-muted-foreground mb-2' />
//                         <span>Drag and drop or click to upload image</span>
//                     </Label>
//                 )}
// </div>
//     </div>
//   )
// }

// import { Input } from '@/components/ui/input';
// import { Label } from '@radix-ui/react-label';
// import { UploadCloud, FileText, X } from 'lucide-react';
// import React, { useRef } from 'react';
// import { Button } from '@/components/ui/button'; // Import your custom Button component

// export default function ProductsImageUpload({ imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl }) {
//   const inputRef = useRef(null);

//   // Handle file selection
//   function handleImageFileChange(event) {
//     console.log(event.target.files);
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       setImageFile(selectedFile);
//     }
//   }

//   // Handle drag over event
//   function handleDragOver(event) {
//     event.preventDefault(); // Prevent default behavior to allow dropping
//     event.stopPropagation();
//   }

//   // Handle drop event
//   function handleDrop(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     const droppedFiles = event.dataTransfer.files;
//     if (droppedFiles.length > 0) {
//       setImageFile(droppedFiles[0]);
//     }
//   }

//   // Remove the selected image
//   function removeImage() {
//     setImageFile(null);
//     if (inputRef.current) {
//       inputRef.current.value = ''; // Clear the file input value
//     }
//   }

//   return (
//     <div
//       className='w-full max-w-md mx-auto mt-4'
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
//       <div className='border-2 border-dashed rounded-lg p-4 relative'>
//         <Input
//           id="image-upload"
//           type="file"
//           ref={inputRef}
//           multiple
//           onChange={handleImageFileChange}
//         //   className="hidden" // Hide the default file input
//         />

//         {!imageFile ? (
//           <Label
//             htmlFor='image-upload'
//             className='flex flex-col items-center justify-center h-32 cursor-pointer'
//           >
//             <UploadCloud className='w-10 h-10 text-muted-foreground mb-2' />
//             <span>Drag and drop or click to upload image</span>
//           </Label>
//         ) : (
//           <div className='flex items-center justify-center mt-3' >
//             <FileText className='w-10 h-10 text-muted-foreground mr-2' />
//             <span className='mr-2'>{imageFile.name}</span>
//             <Button
//               type='button'
//               onClick={removeImage}
//               aria-label='Remove file'
//               variant='outline' // Assuming your Button component has a variant prop
//               className='text-red-500 hover:text-red-700'
//             >
//               <X className='w-6 h-6' />
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useRef } from 'react';
// import { Input } from '@/components/ui/input';
// import { Label } from '@radix-ui/react-label';
// import { UploadCloud, FileText, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import axios from 'axios';

// export default function ProductsImageUpload({
//   imageFile,
//   setImageFile,
//   uploadedImageUrl,
//   setUploadedImageUrl,
// }) {
//   const inputRef = useRef(null);

//   // Handle file selection
//   function handleImageFileChange(event) {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       setImageFile(selectedFile);
//     }
//   }

//   // Handle drag over event
//   function handleDragOver(event) {
//     event.preventDefault(); // Prevent default behavior to allow dropping
//   }

//   // Handle drop event
//   function handleDrop(event) {
//     event.preventDefault();
//     const droppedFiles = event.dataTransfer.files;
//     if (droppedFiles.length > 0) {
//       setImageFile(droppedFiles[0]);
//     }
//   }

//   // Remove the selected image
//   function removeImage() {
//     setImageFile(null);
//     if (inputRef.current) {
//       inputRef.current.value = ''; // Clear the file input value
//     }
//   }
// async function uploadImageToCloudinary(){
//     const data=new FormData();
//     data.append('my_file',imageFile);
//     const response=axios.post('http://localhost:5000/api/admin/products/upload-image',data)
// // console.log(res.data);
//     if(response){
//    setUploadedImageUrl(response.data) 
// }
// }
// useEffect(()=>{
// if(imageFile!==null){
//     uploadImageToCloudinary()
// }

// },[imageFile])
//   return (
//     <div
//       className='w-full max-w-md mx-auto mt-4'
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
//       <div className='border-2 border-dashed rounded-lg p-4 relative'>
//         <Input
//           id="image-upload"
//           type="file"
//           ref={inputRef}
//           multiple
//           onChange={handleImageFileChange}
//         //   className="hidden" // Hide the default file input
//         />

//         {!imageFile ? (
//           <Label
//             htmlFor='image-upload'
//             className='flex flex-col items-center justify-center h-32 cursor-pointer'
//           >
//             <UploadCloud className='w-10 h-10 text-muted-foreground mb-2' />
//             <span>Drag and drop or click to upload image</span>
//           </Label>
//         ) : (
//           <div className='flex items-center justify-center mt-3'>
//             <FileText className='w-10 h-10 text-muted-foreground mr-2' />
//             <span className='mr-2'>{imageFile.name}</span>
//             <Button
//               type='button'
//               onClick={removeImage}
//               aria-label='Remove file'
//               variant='outline' // Assuming your Button component has a variant prop
//               className='text-red-500 hover:text-red-700'
//             >
//               <X className='w-6 h-6' />
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Label } from '@radix-ui/react-label';
// import { UploadCloud, FileText, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import axios from 'axios';

// // Skeleton loader component
// const SkeletonLoader = () => (
//   <div className="animate-pulse flex items-center justify-center mt-3">
//     <div className="w-10 h-10 bg-gray-300 rounded mr-2"></div>
//     <div className="h-6 bg-gray-300 rounded w-1/2"></div>
//   </div>
// );

// export default function ProductsImageUpload({
//   imageFile,
//   setImageFile,
//   uploadedImageUrl,
//   setUploadedImageUrl,
//   isEditing, // New prop to determine mode (adding or editing)
// }) {
//   const inputRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(false); // Track loading state

//   // Handle file selection
//   function handleImageFileChange(event) {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       setImageFile(selectedFile);
//     }
//   }

//   // Handle drag over event
//   function handleDragOver(event) {
//     event.preventDefault(); // Prevent default behavior to allow dropping
//   }

//   // Handle drop event
//   function handleDrop(event) {
//     event.preventDefault();
//     const droppedFiles = event.dataTransfer.files;
//     if (droppedFiles.length > 0) {
//       setImageFile(droppedFiles[0]);
//     }
//   }

//   // Remove the selected image
//   function removeImage() {
//     setImageFile(null);
//     setUploadedImageUrl(''); // Clear uploaded image URL
//     if (inputRef.current) {
//       inputRef.current.value = ''; // Clear the file input value
//     }
//   }

//   // Upload image to the backend (or Cloudinary in this case)
//   async function uploadImageToCloudinary() {
//     const data = new FormData();
//     data.append('my_file', imageFile);
//     setIsLoading(true); // Set loading to true before upload

//     try {
//       const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data);
//       console.log(response.data); // Ensure this is printing the expected response
//       if (response.data.success) {
//         setUploadedImageUrl(response.data.result.url); // Adjust according to your backend response structure
//       } else {
//         console.error('Image upload failed:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     } finally {
//       setIsLoading(false); // Set loading to false after upload completes
//     }
//   }

//   useEffect(() => {
//     if (imageFile !== null) {
//       uploadImageToCloudinary();
//     }
//   }, [imageFile]);

//   return (
//     <div
//       className='w-full max-w-md mx-auto mt-4'
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <Label className='text-lg font-semibold mb-2 block'>
//         {isEditing ? 'Uploaded Image' : 'Upload Image'}
//       </Label>
//       <div className='border-2 border-dashed rounded-lg p-4 relative'>
//         {/* If in edit mode, just display the previous image name */}
//         {isEditing ? (
//           <div className='flex items-center'>
//             {uploadedImageUrl ? (
//               <>
//                 <FileText className='w-10 h-10 text-muted-foreground mr-2' />
//                 <span>{uploadedImageUrl.split('/').pop()}</span> {/* Display only file name */}
//               </>
//             ) : (
//               <p>No image uploaded yet</p>
//             )}
//           </div>
//         ) : (
//           // If not editing, display the upload functionality
//           <>
//             <Input
//               id="image-upload"
//               type="file"
//               ref={inputRef}
//               onChange={handleImageFileChange}
//               className="hidden" // Hide the default file input
//             />
//             {!imageFile ? (
//               <Label
//                 htmlFor='image-upload'
//                 className='flex flex-col items-center justify-center h-32 cursor-pointer'
//               >
//                 <UploadCloud className='w-10 h-10 text-muted-foreground mb-2' />
//                 <span>Drag and drop or click to upload image</span>
//               </Label>
//             ) : (
//               <div className='flex items-center justify-center mt-3'>
//                 {isLoading ? (
//                   // Display skeleton loader while the image is uploading
//                   <SkeletonLoader />
//                 ) : (
//                   <div className='flex items-center'>
//                     <FileText className='w-10 h-10 text-muted-foreground mr-2' />
//                     <span className='mr-2'>{imageFile.name}</span>
//                     <Button
//                       type='button'
//                       onClick={removeImage}
//                       aria-label='Remove file'
//                       variant='outline' // Assuming your Button component has a variant prop
//                       className='text-red-500 hover:text-red-700'
//                     >
//                       <X className='w-6 h-6' />
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { UploadCloud, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="animate-pulse flex items-center justify-center mt-3">
    <div className="w-10 h-10 bg-gray-300 rounded mr-2"></div>
    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
  </div>
);

export default function ProductsImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  isEditing, // New prop to determine mode (adding or editing)
}) {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Handle file selection
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  // Handle drag over event
  function handleDragOver(event) {
    event.preventDefault(); // Prevent default behavior to allow dropping
  }

  // Handle drop event
  function handleDrop(event) {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setImageFile(droppedFiles[0]);
    }
  }

  // Remove the selected image
  function removeImage() {
    setImageFile(null);
    setUploadedImageUrl(''); // Clear uploaded image URL
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the file input value
    }
  }

  // Upload image to the backend (or Cloudinary in this case)
  async function uploadImageToCloudinary() {
    const data = new FormData();
    data.append('my_file', imageFile);
    setIsLoading(true); // Set loading to true before upload

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`, data);
      console.log(response.data); // Ensure this is printing the expected response
      if (response.data.success) {
        setUploadedImageUrl(response.data.result.url); // Adjust according to your backend response structure
      } else {
        console.error('Image upload failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false); // Set loading to false after upload completes
    }
  }

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  // Open image in a new tab
  function openImageInNewTab() {
    if (uploadedImageUrl) {
      window.open(uploadedImageUrl, '_blank');
    }
  }

  return (
    <div
      className='w-full max-w-md mx-auto mt-4'
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Label className='text-lg font-semibold mb-2 block'>
        {isEditing ? 'Uploaded Image' : 'Upload Image'}
      </Label>
      <div className='border-2 border-dashed rounded-lg p-4 relative'>
        {/* If in edit mode, just display the previous image name */}
        {isEditing ? (
          <div className='flex items-center'>
            {uploadedImageUrl ? (
              <>
                <FileText className='w-10 h-10 text-muted-foreground mr-2' />
                <span
                  className="cursor-pointer text-blue-500 underline"
                  onClick={openImageInNewTab} // Open full image in a new tab on click
                >
                  {uploadedImageUrl.split('/').pop()}
                </span>
              </>
            ) : (
              <p>No image uploaded yet</p>
            )}
          </div>
        ) : (
          // If not editing, display the upload functionality
          <>
            <Input
              id="image-upload"
              type="file"
              ref={inputRef}
              onChange={handleImageFileChange}
              className="hidden" // Hide the default file input
            />
            {!imageFile ? (
              <Label
                htmlFor='image-upload'
                className='flex flex-col items-center justify-center h-32 cursor-pointer'
              >
                <UploadCloud className='w-10 h-10 text-muted-foreground mb-2' />
                <span>Drag and drop or click to upload image</span>
              </Label>
            ) : (
              <div className='flex items-center justify-center mt-3'>
                {isLoading ? (
                  // Display skeleton loader while the image is uploading
                  <SkeletonLoader />
                ) : (
                  <div className='flex items-center'>
                    <FileText className='w-10 h-10 text-muted-foreground mr-2' />
                    <span
                      className="cursor-pointer text-blue-500 underline"
                      onClick={openImageInNewTab} // Open full image in a new tab on click
                    >
                      {imageFile.name}
                    </span>
                    <Button
                      type='button'
                      onClick={removeImage}
                      aria-label='Remove file'
                      variant='outline' // Assuming your Button component has a variant prop
                      className='text-red-500 hover:text-red-700'
                    >
                      <X className='w-6 h-6' />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
