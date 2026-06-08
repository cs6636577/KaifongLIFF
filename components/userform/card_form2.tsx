"use client"
import React, { useEffect } from 'react'
import DropDown from '../userform/dropdown'
import { RiMapPin2Fill } from 'react-icons/ri';
import map from '../../public/map/map.png'
import Image from 'next/image'
import { MdOutlineCameraAlt } from 'react-icons/md';
import { IoMdArrowRoundForward } from 'react-icons/io';
import Link from 'next/link'
import { GrWaypoint } from 'react-icons/gr';
import { useRouter } from 'next/navigation' 
import { useState, useRef } from 'react';
import { usePhotoStore } from "@/hooks/usePhotoStore"
import mockData from "@/data/mock_data_may2026.json"


const categories = mockData.meta.reference_ids.categories;
const subcategories = mockData.meta.reference_ids.subcategories;

/*ตอนนี้ข้อมูล accuracy ไม่ได้ถูกใช้งานแล้ว */

interface FormErrors {
    issueType: string;
    subIssue: string;
    detail: string;
    location: string;
    locationDescription: string;
    additionalNotes: string;
    photo: string;
}

const MAX_PHOTOS = 5 

const card_form2 = () => {
    const router = useRouter()
    const [selected, setSelected] = React.useState<string>("");
    const [selectedSub, setselectedSub] = React.useState<string>("");
    const [detail, setDetail] = React.useState<string>("");
    const [location, setLocation] = React.useState<string>("");
    const [locationDescription, setLocationDescription] = React.useState<string>("");
    const [additionalNotes, setAdditionalNotes] = React.useState<string>("");
    const [province, setProvince] = React.useState<string>("");
    const [district, setDistrict] = React.useState<string>("");
    const [latitude, setlatitude] = React.useState<string>("");
    const [longtitude, setLongtitude] = React.useState<string>("");
    const [geocodedAt, setGeocodedAt]           = useState<string>("")
    const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null)

      
    const [errors, setErrors] = React.useState<FormErrors>({
        issueType: "",
        subIssue: "",
        detail: "",
        location: "",
        locationDescription: "",
        additionalNotes: "",
        photo: "",
    })

    const { photos, photoPreviews, addPhoto, removePhoto } = usePhotoStore()
    useEffect(() => {
      if (photos.length > 0 && errors.photo) {
        setErrors((prev) => ({ ...prev, photo: "" }))
      }
    }, [photos.length, errors.photo])

    useEffect(() => {
    //   if (typeof window === 'undefined') return;
      const storedDraft = sessionStorage.getItem("complaintFormDraft");
      if (storedDraft) {
        try {
          const draft = JSON.parse(storedDraft) as {
            selected: string;
            selectedSub: string;
            detail: string;
            location: string;
            Latitude: string;
            longitude: string;
            province: string;
            district: string;
            locationDescription: string;
            additionalNotes: string;
            geocodedAt: string;       
            locationAccuracy: number | null;  
          };

          setSelected(draft.selected ?? "");
          setselectedSub(draft.selectedSub ?? "");
          setDetail(draft.detail ?? "");
          setLocation(draft.location ?? "");
          setDistrict(draft.district ?? "");
          setProvince(draft.province ?? "");
          setLongtitude(draft.longitude ?? "");
          setlatitude(draft.Latitude ?? "");
          setLocationDescription(draft.locationDescription ?? "");
          setAdditionalNotes(draft.additionalNotes ?? "");
          setGeocodedAt(draft.geocodedAt ?? "")
          setLocationAccuracy(draft.locationAccuracy ?? null)
        } catch (error) {
          console.warn("ไม่สามารถโหลดฟอร์มฉบับร่างจาก sessionStorage", error);
        }
      }

      const stored = sessionStorage.getItem("complaintLocation");
      if (stored) {
        try {
          const payload = JSON.parse(stored) as { name: string; address: string; locationNotes: string; lat: number; lng: number; province?: string; district?: string };
          if (payload.name || payload.address) {
            setLocation(payload.name || payload.address);
            setLocationDescription(payload.locationNotes ?? "");
            setProvince(payload.province ?? "");
            setDistrict(payload.district ?? "");
            setlatitude(payload.lat?.toString() ?? "");
            setLongtitude(payload.lng?.toString() ?? "");
            
          }
        } catch (error) {
          console.warn("ไม่สามารถโหลดตำแหน่งจาก sessionStorage", error);
        }
      }
      
      //อนาคตอาจจะเพิ่มvalidateตรงนี้ (ตอนนี้คือถ้าเพิ่มแล้วหน้ามันรีตลอดไม่รู้เกิดจากอะไร)

    }, []);

    const handleUseCurrentLocation = () => {
      if (!navigator.geolocation) {
        alert("เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const accuracy = position.coords.accuracy       
          const geocodedTime = new Date().toISOString()    
          setlatitude(lat.toString());
          setLongtitude(lng.toString());
          setLocationAccuracy(accuracy)
          setGeocodedAt(geocodedTime)
        
          const current = JSON.parse(sessionStorage.getItem("complaintFormDraft") ?? "{}")
            sessionStorage.setItem("complaintFormDraft", JSON.stringify({
                ...current,
                Latitude: lat.toString(),
                longitude: lng.toString(),
                geocodedAt: geocodedTime,
                locationAccuracy: accuracy,
            }))
          
          const latLngText = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;

          if (typeof window !== 'undefined' && window.google && window.google.maps && window.google.maps.Geocoder) {
            const geocoder = new window.google.maps.Geocoder();
            const latlng = { lat, lng };

            geocoder.geocode({ location: latlng }, (results, status) => {
              if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
                setLocation(results[0].formatted_address || latLngText);
                // setLocationDescription(results[0].formatted_address || latLngText);
                console.log("พิกัด: "+lat+" "+lng);
              } else {
                setLocation(`ตำแหน่งปัจจุบัน (${latLngText})`);
                // setLocationDescription(latLngText);
              }
            });
          } else {
            setLocation(`ตำแหน่งปัจจุบัน (${latLngText})`);
            // setLocationDescription(latLngText);
          }
        },
        (error) => {
          console.error(error);
          alert("ไม่สามารถดึงตำแหน่งปัจจุบันได้ กรุณาลองใหม่");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }

    const validateForm = () => {
        const newErrors: FormErrors = {
            issueType: "",
            subIssue: "",
            detail: "",
            location: "",
            locationDescription: "",
            additionalNotes: "",
            photo: "",
        };

        // ตรวจสอบหมวดปัญหา (category_id)
        if (!selected) {
            newErrors.issueType = "*กรุณาเลือกประเภทปัญหา";
        } else if (!categories.some(cat => cat.category_id === selected)) {
            newErrors.issueType = "ประเภทปัญหาที่เลือกไม่ถูกต้อง";
        }

        // ตรวจสอบปัญหาย่อย (subcategory_id)
        const selectedCategoryIdx = categories.findIndex(cat => cat.category_id === selected);
        const relatedSubs = selectedCategoryIdx >= 0 ? subcategories.filter(sub => sub.category_idx === selectedCategoryIdx) : [];
        
        if (relatedSubs && relatedSubs.length > 0) {
            if (!selectedSub) {
                newErrors.subIssue = "*กรุณาเลือกปัญหาย่อย";
            } else if (!subcategories.some(sub => sub.subcategory_id === selectedSub)) {
                newErrors.subIssue = "ปัญหาย่อยที่เลือกไม่ถูกต้อง";
            }
        }

        // ตรวจสอบรายละเอียด
        if (!detail.trim()) {
            newErrors.detail = "*กรุณากรอกรายละเอียด";
        } else if (detail.trim().length > 300) {
            newErrors.detail = "รายละเอียดต้องไม่เกิน 300 ตัวอักษร";
        }

        // ตรวจสอบตำแหน่ง
        if (!location.trim()) {
            newErrors.location = "*กรุณาระบุสถานที่";
        }

        // ตรวจสอบหมายเหตุเพิ่มเติม
        if (additionalNotes.trim().length > 100) {
            newErrors.additionalNotes = "หมายเหตุเพิ่มเติมต้องไม่เกิน 100 ตัวอักษร";
        }

        if(photos.length === 0){
            newErrors.photo = "*กรุณาอัพโหลดรูปภาพอย่างน้อย 1 รูป";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const isValid = validateForm();

        if(!isValid) {
            return;
        }

        // ค้นหา label จากไอดี
        const categoryObj = categories.find(c => c.category_id === selected);
        const subcategoryObj = subcategories.find(s => s.subcategory_id === selectedSub);
        
        const categoryName = categoryObj?.name ?? selected;
        const subcategoryName = subcategoryObj?.name ?? selectedSub;

        const res = await fetch('/api/form/complaint', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
               title:              categoryName,
                category_id:        selected,
                subcategory_id:     selectedSub,
                detail:             detail,
                location:           location,
                additional:         additionalNotes,
                latitude:           latitude,
                longitude:          longtitude,
                province:           province,
                district:           district,
                geocoded_at:         geocodedAt,
                location_accuracy:   locationAccuracy
            }),
        })

        if (res.ok) {
            router.push("/userform/details")
        }
    };
   
    //กัน error
    const [uploadError, setUploadError] = useState<string | null>(null)

    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
    const MAX_SIZE = 5 * 1024 * 1024
    const MIN_SIZE = 1 * 1024

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUploadError(null)
        const files = Array.from(e.target.files ?? [])
        const remaining = MAX_PHOTOS - photos.length

        let addedPhoto = false
    for (const file of files.slice(0, remaining)) {
            if (!ALLOWED_TYPES.includes(file.type)) {
                setUploadError(`"${file.name}" ไม่รองรับ รองรับเฉพาะ JPEG, PNG, WebP`)
                continue
            }
            if (file.size < MIN_SIZE) {
                setUploadError(`"${file.name}" เล็กเกินไป (ขั้นต่ำ 1 KB)`)
                continue
            }
            if (file.size > MAX_SIZE) {
                setUploadError(`"${file.name}" ใหญ่เกิน 5 MB`)
                continue
            }
            addPhoto(file)
            addedPhoto = true
        }

        if (addedPhoto && errors.photo) {
            setErrors((prev) => ({ ...prev, photo: "" }))
        }

        e.target.value = ""
    }
    //ตอนกด zoom รุป
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  return (
    <div className='w-full'>
        {/* <StepProgress currentStep={1} /> */}
      <form onSubmit={handleSubmit}>
        <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
            {/* ประเภทปัญหา */}
            <p className='text-[#5D5C74] text-lg font-semibold'>ประเภทหมวดปัญหา</p>
            <p className='text-[#4D4632] text-base font-normal mb-2'>Issue Type</p>
            <DropDown
                selectedValue={selected}
                onSelectedChange={setSelected} 
                selectedSub={selectedSub} 
                onSubChange={setselectedSub}
            />
            {errors.issueType && <p className='text-[#FA3E3E] text-sm mb-4'>{errors.issueType}</p>}
        </div>

        <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
            {/* รายละเอียดปัญหา */}
            <div>
                <p className='text-[#5D5C74] text-lg font-semibold'>รายละเอียด</p>
                <p className='text-[#4D4632] text-base font-normal mb-1'>Details</p>
                <textarea
                    value={detail}
                    placeholder='กรุณาระบุรายละเอียดที่พบ...'
                    onChange={(e) => setDetail(e.target.value)}
                    className="w-full bg-[#F4F4F1] rounded-xl p-2 mt-1 mb-1 py-4 px-4 placeholder:text-[#7F7660] text-base h-36 align-top"
                />
                {errors.detail && <p className='text-[#FA3E3E] text-sm mb-4'>{errors.detail}</p>}       
            </div>
        </div>

        <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
            {/* ปักหมุดสถานที่ */}
            <p className='text-[#5D5C74] text-lg font-semibold'>ตำแหน่งเรื่องร้องทุกข์</p>
            <p className='text-[#4D4632] text-base font-normal mb-2'>Location</p>
            <div className='flex flex-row'>
                <input
                    id="map"
                    type="text"
                    value={location}
                    placeholder='กดปุ่มเพื่อระบุสถานที่ปัจจุบัน หรือ ปักหมุดในแผนที่'
                    onChange={(e) => setLocation(e.target.value)}
                    className={`w-full bg-[#F4F4F1] rounded-xl p-2 mt-1 mb-1 py-8 px-4 placeholder:text-[#7F7660] text-base`}
                    disabled
                />
                <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    className='bg-nt px-5 py-5 w-15 h-15 items-center rounded-2xl shadow-lg mx-5 mt-1 hover:cursor-pointer'
                >
                    <RiMapPin2Fill  size={22} color='695400'/>
                </button>
            </div>
            {/* {errors.location && <p className='text-[#FA3E3E] text-sm mb-4'>{errors.location}</p>}        */}

{/* 
            {(district || province) && (
              <div className='text-sm text-[#4D4632]/80 mt-2'>
                {district ? `${district}` : ""}{district && province ? ", " : ""}{province ? `${province}` : ""}
              </div>
            )} */}

            {/* เพิ่มรายละเอียดสถานที่เอาไว้ */}
            <p className='text-[#4D4632]'>Details</p>
            <input
                type="text"
                value={locationDescription}
                placeholder='คำอธิบายเพิ่มเติม เช่น ท่อน้ำรั่วหน้าประตูทางเข้าตึก...'
                onChange={(e) => setLocationDescription(e.target.value)}
                className={`w-full bg-[#F4F4F1] rounded-xl p-2 mt-1 mb-1 py-8 px-4 placeholder:text-[#7F7660] text-base`}
            />

            {/* แผนที่ */}
            <div className='bg-[#F4F4F1] rounded-2xl pt-1 overflow-hidden mt-2 relative'> 
                <Image
                    src={map}
                    className='w-full h-40'
                    alt="Picture"
                />
                    <button
                        type='button'
                        onClick={() => {
                            const draft = {
                            selected,
                            selectedSub,
                            detail,
                            location,
                            locationDescription,
                            additionalNotes,
                            geocodedAt,           
                            locationAccuracy, 
                            Latitude: latitude,      
                            longitude: longtitude,   
                            province,                
                            district,                   
                            };
                            sessionStorage.setItem("complaintFormDraft", JSON.stringify(draft));
                            router.push('/userform/Complaint_Details/MapEdit');
                        }}
                    className='absolute bottom-15 left-1/2 -translate-x-1/2 bg-white/80 h-10 rounded-full cursor-pointer'
                    >
                        <div className='flex flex-row items-center justify-center px-4  text-base text-[#725C00]'>
                            <GrWaypoint className='mr-2'/>
                            <span className='text-xs font-semibold tracking-widest'>PIN LOCATION</span>
                        </div>
                    </button>
            </div>
        </div>

        <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
            {/* อัพโหลดรูปภาพ */}
            <div>
                <p className='text-[#5D5C74] text-lg font-semibold'>รูปภาพ</p>
                <p className='text-[#4D4632] text-base font-normal mb-3'>Photo</p>

                 {/* Upload Zone — ซ่อนถ้าครบ 5 รูปแล้ว */}
                {photos.length < MAX_PHOTOS && (
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border-dashed border-3 border-[#D1C6AB] rounded-2xl cursor-pointer hover:bg-neutral-tertiary-medium">
                            <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                                <div className='bg-white px-5 py-5 shadow-md rounded-full mb-5'>
                                    <MdOutlineCameraAlt size='30' color='725C00' />
                                </div>
                                <p className="mb-2 text-lg text-[#5D5C74] font-semibold">
                                    Upload รูป <span className="font-normal">(Upload Photo)</span>
                                </p>
                                <p className="text-base text-[#4D4632]">
                                    อย่างน้อย 1 รูป (At least 1 photo)
                                </p>
                                <p className="text-sm text-[#9E9E9E] mt-1">
                                    {photos.length}/{MAX_PHOTOS} รูป
                                </p>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                )}
                {uploadError && (
                    <p className="text-red-500 text-sm mt-2 text-center">{uploadError}</p>
                )}

            {errors.photo && <p className='text-[#FA3E3E] text-sm mb-4'>{errors.photo}</p>}       

               {/* Preview รูปที่เลือก */}
{photoPreviews.length > 0 && (
    <div className="grid grid-cols-3 gap-3 mt-4">
        {photoPreviews.map((url, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                <img
                    src={url}
                    alt={`photo-${i}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedPhoto(url)}
                />
                <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black/70"
                >
                    ✕
                </button>
            </div>
        ))}
    </div>
)}

{/* Modal */}
{selectedPhoto && (
    <div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        onClick={() => setSelectedPhoto(null)}
    >
        <button
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-9 h-9 flex items-center justify-center text-lg hover:bg-black/70"
            onClick={() => setSelectedPhoto(null)}
        >
            ✕
        </button>
        <img
            src={selectedPhoto}
            className="max-w-[90vw] max-h-[90vh] rounded-2xl object-contain"
            alt="preview"
            onClick={(e) => e.stopPropagation()}
        />
    </div>
)}
            </div>
        </div>

        <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
            {/* รายละเอียดปัญหา additionalNotes*/}
            <div>
                <p className='text-[#5D5C74] text-lg font-semibold'>หมายเหตุเพิ่มเติม</p>
                <p className='text-[#4D4632] text-base font-normal mb-2'>Additional Notes</p>
                <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full min-h-[5.5rem] bg-[#F4F4F1] rounded-xl p-4 mt-1 mb-1 placeholder:text-[#7F7660] text-base resize-none"
                    placeholder='ข้อมูลอื่นๆ ที่ต้องการแจ้ง...'
                />         
            </div>
            {errors.additionalNotes && <p className='text-[#FA3E3E] text-sm mb-4'>{errors.additionalNotes}</p>}
        </div>

        {/* ปุ่มถัดไป */}
         {/* <Link href='/userform/details'> */}
        <div className='flex items-center justify-center w-full mt-5 mb-10'>
            <button 
                type="submit" 
                id="next-button" 
                className='bg-nt text-black rounded-full px-6 py-3 mt-6 font-bold w-100 h-18 shadow-md hover:cursor-pointer hover:bg-nt/70 transition duration-300 ease-in-out flex items-center justify-center space-x-2'
            > 
                <div className='flex items-center justify-center text-xl'>
                    <span className='mr-2'>ถัดไป</span>
                    <span className='text-xl'>
                        <IoMdArrowRoundForward  />
                    </span>
                </div>
            </button>
        </div>
        {/* </Link> */}

        {/* ปุ่มย้อนกลับ */}
        <div className='flex items-center justify-center w-full mb-30'>
            <Link href='/userform/Reporter_Info' shallow={false}>
                <p className='text-[#4D4632] font-bold text-lg'>ย้อนกลับ (Back)</p>
            </Link>
        </div>
      </form>
    </div>
  )
}

export default card_form2
