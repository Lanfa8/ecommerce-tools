import { removeBackground } from '@imgly/background-removal';
import { useMutation } from '@tanstack/react-query'

type Response = {
    parsed_image_url: string
}

const removeImageBackgroundClientSide = async (imageFile: File): Promise<Response> => {
    const blob = await removeBackground(imageFile);
    const url = URL.createObjectURL(blob);
    
    return { parsed_image_url: url };
};

const useImageBackgroundRemoval = () => {
    return useMutation({
        mutationFn: (imageFile: File) => removeImageBackgroundClientSide(imageFile),
    })
};

export { useImageBackgroundRemoval };