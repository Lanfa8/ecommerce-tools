import { useMutation } from '@tanstack/react-query'

type Response = {
    parsed_image_url: string
}

const sendImageToRemoveBackgroundAPI = async (imageFile: File): Promise<Response> => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch('/api/images/remove-background', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to remove background from image');
    }

    return response.json();
};


const useImageBackgroundRemoval = () => {
    return useMutation({
        mutationFn: (imageFile: File) => sendImageToRemoveBackgroundAPI(imageFile),
    })
};

export { useImageBackgroundRemoval }