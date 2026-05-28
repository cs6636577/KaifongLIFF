// hooks/usePhotoStore.ts
import { create } from "zustand"

interface PhotoState {
    photos:        File[]
    photoPreviews: string[]

    addPhoto:    (file: File) => void
    removePhoto: (index: number) => void
    clearPhotos: () => void
}

export const usePhotoStore = create<PhotoState>((set, get) => ({
    photos:        [],
    photoPreviews: [],

    addPhoto: (file) => {
        const preview = URL.createObjectURL(file)
        set((state) => ({
            photos:        [...state.photos, file],
            photoPreviews: [...state.photoPreviews, preview],
        }))
    },

    removePhoto: (index) => {
        const { photos, photoPreviews } = get()
        URL.revokeObjectURL(photoPreviews[index]) // ป้องกัน memory leak
        set({
            photos:        photos.filter((_, i) => i !== index),
            photoPreviews: photoPreviews.filter((_, i) => i !== index),
        })
    },

    clearPhotos: () => {
        get().photoPreviews.forEach(URL.revokeObjectURL)
        set({ photos: [], photoPreviews: [] })
    },
}))