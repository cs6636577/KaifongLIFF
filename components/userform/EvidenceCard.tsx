import { usePhotoStore } from "@/hooks/usePhotoStore"
import { useState } from "react"

interface EvidenceCardProps {
    photos?: string[]  // URL string (preview หรือจาก DB ก็ได้)
}

function EvidenceCard({ photos }: EvidenceCardProps) {
    // ถ้าไม่ส่ง prop มา → ดึงจาก store (หน้า form)
    const { photoPreviews } = usePhotoStore()
    const displayPhotos = photos ?? photoPreviews
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

    return (
        <div className="rounded-xl bg-white p-3 shadow-sm">
            <div className="flex gap-2 m-3">
                <div className="w-1.5 h-6 rounded-md bg-[#725C00] mt-3"></div>
                <div>
                    <p className="text-lg font-bold text-[#1A1A2E]">หลักฐานประกอบ</p>
                    <p className="text-sm text-[#4D4632]">Supporting Evidence</p>
                </div>
            </div>

            {/* รูป thumbnail */}
            <div className="grid grid-cols-3 m-3 gap-3">
                {displayPhotos.map((url, i) => (
                    <img
                        key={i}
                        src={url}
                        className="rounded-full w-18 h-18 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        alt={`evidence-${i}`}
                        onClick={() => setSelectedPhoto(url)}
                    />
                ))}
            </div>

            {/* Modal แสดงรูปใหญ่ */}
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
    )
}

export default EvidenceCard